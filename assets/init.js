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

        // 스튜디오 데이터 (픽셀 단위)
        const studios = [
            { name: "Sulki and Min", x: 1157.4, y: 892.6, info: "Sulki and Min - 서울 종로구 위치" }
        ];

        // 스튜디오 마커 동적 생성
        studios.forEach(studio => {
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            marker.setAttribute('cx', studio.x);
            marker.setAttribute('cy', studio.y);
            marker.setAttribute('r', 5);
            marker.setAttribute('class', 'studio-marker');

            // 마커 호버 이벤트
            marker.addEventListener('mouseover', (event) => {
                popup.style.display = 'block';
                popup.style.left = `${event.pageX + 10}px`;
                popup.style.top = `${event.pageY + 10}px`;
                popup.innerText = `${studio.name} - ${studio.info}`;
            });

            // 마커 마우스 아웃 이벤트
            marker.addEventListener('mouseout', () => {
                popup.style.display = 'none';
            });

            // SVG에 마커 추가
            svgDoc.documentElement.appendChild(marker);
        });
    });
});