window.onload = function () {
  const latitude = 37.515233;
  const longitude = 126.726906;

  const mapOption = {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 3
  };

  const map = new kakao.maps.Map(document.getElementById('map'), mapOption);

  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(latitude, longitude)
  });

  marker.setMap(map);

  document.querySelector('.info-box').addEventListener('click', function () {
    const kakaoMapUrl = `https://map.kakao.com/link/map/인천 부평구 U1센터,${latitude},${longitude}`;
    window.open(kakaoMapUrl, '_blank');
  });
};
