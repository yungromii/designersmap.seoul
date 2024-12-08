document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('info-popup');
    const svgObject = document.getElementById('seoul-map');

    svgObject.addEventListener('load', () => {
        const svgDoc = svgObject.contentDocument;
        const svgElement = svgDoc.documentElement;

        // SVG의 원래 뷰포트 크기
        const svgWidth = 2730.67;
        const svgHeight = 2271.99;

        // SVG의 실제 표시 크기
        const actualWidth = svgObject.clientWidth;
        const actualHeight = svgObject.clientHeight;

        // 스튜디오 데이터 (원래 뷰포트 좌표)
        const studios = [
            { name: "Sulki and Min", x: 1157.4, y: 892.6, info: "Sulki and Min - 서울 종로구 위치" }
        ];

        // 비율에 맞게 좌표 변환
        studios.forEach(studio => {
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            marker.setAttribute('cx', (studio.x / svgWidth) * actualWidth);
            marker.setAttribute('cy', (studio.y / svgHeight) * actualHeight);
            marker.setAttribute('r', 5);
            marker.setAttribute('class', 'studio-marker');

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
    });
});