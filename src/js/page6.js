window.onload = function () {
    console.log('aa')
    var container = document.getElementById('kakao-map');
    var options = {
      center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울시청 좌표 (샘플)
      level: 3 // 지도 확대 레벨
    };
  
    var map = new kakao.maps.Map(container, options);
  
    var markerPosition = new kakao.maps.LatLng(37.5665, 126.9780); // 마커가 표시될 위치 (샘플)
    var marker = new kakao.maps.Marker({
      position: markerPosition
    });
  
    marker.setMap(map);
  };
  