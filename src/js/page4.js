function adjustImageBoxHeight() {
    const imageBoxes = document.querySelectorAll('.image-box');
    let maxHeight = 0;

    // 모든 이미지 박스의 높이를 확인하여 가장 큰 높이를 구합니다.
    imageBoxes.forEach(box => {
        // 각 박스의 높이를 초기화하여 오버플로우를 방지
        box.style.height = 'auto';
        const boxHeight = box.offsetHeight;
        if (boxHeight > maxHeight) {
            maxHeight = boxHeight;
        }
    });

    // 모든 이미지 박스를 가장 큰 높이로 설정합니다.
    imageBoxes.forEach(box => {
        box.style.height = `${maxHeight}px`;
    });
}

// 페이지 로드 시와 리사이즈 시 높이 조정
window.addEventListener('load', adjustImageBoxHeight);
window.addEventListener('resize', adjustImageBoxHeight);
