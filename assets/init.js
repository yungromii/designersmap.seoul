document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('info-popup');
    const svgObject = document.getElementById('seoul-map');

    // SVG 파일이 로드된 후 실행
    svgObject.addEventListener('load', () => {
        const svgDoc = svgObject.contentDocument;

        if (!svgDoc) {
            console.error("SVG 문서에 접근할 수 없습니다. 경로를 확인해 주세요.");
            return;
        }

        const svgElement = svgDoc.documentElement;

        // 모든 <g> 요소에 class="district" 추가
        const districts = svgDoc.querySelectorAll('g');
        districts.forEach(district => {
            district.classList.add('district');
        });

        // SVG의 원래 뷰포트 크기 (SVG 파일의 viewBox 값과 동일해야 함)
        const svgWidth = 2730.67;
        const svgHeight = 2271.99;

        // SVG의 실제 표시 크기
        const actualWidth = svgObject.clientWidth;
        const actualHeight = svgObject.clientHeight;

        // 스튜디오 데이터 (원래 뷰포트 좌표)
        const studios = [
            { name: "Sulki and Min", x: 1157.4, y: 892.6, info: "Sulki and Min - 서울 종로구 위치" },
            { name: "Studio XYZ", x: 1300, y: 950, info: "Studio XYZ - 서울 중구 위치" }
        ];

        // 스튜디오 마커 동적 생성
        studios.forEach(studio => {
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            marker.setAttribute('cx', (studio.x / svgWidth) * actualWidth);
            marker.setAttribute('cy', (studio.y / svgHeight) * actualHeight);
            marker.setAttribute('r', 5);
            marker.setAttribute('class', 'studio-marker');
            marker.setAttribute('fill', 'red');
            marker.setAttribute('stroke', 'white');
            marker.setAttribute('stroke-width', 1);

            // 마커 호버 이벤트
            marker.addEventListener('mouseover', (event) => {
                popup.style.display = 'block';
                popup.style.left = `${event.pageX + 10}px`;
                popup.style.top = `${event.pageY + 10}px`;
                popup.innerText = `${studio.name} - ${studio.info}`;
            });

            marker.addEventListener('mouseout', () => {
                popup.style.display = 'none';
            });

            svgElement.appendChild(marker);
        });

        console.log("모든 <g> 요소에 'district' 클래스와 스튜디오 마커가 추가되었습니다.");
    });

    // SVG 로드 오류 처리
    svgObject.addEventListener('error', () => {
        console.error("SVG 파일을 불러오는 데 실패했습니다. 경로를 확인해 주세요.");
    });
});