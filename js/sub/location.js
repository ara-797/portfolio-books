// URL Parameter 페이지 접근
let libraryIdx = 0;

searchParam('library');

function searchParam(param) {
	const queryIndex = new URLSearchParams(location.search).get(param);
	if (!queryIndex) return;
	libraryIdx = queryIndex;
}

// 도서관 버튼 Active
const libraryBtns = document.querySelectorAll('.list-branch li');

libraryBtnActive();

function libraryBtnActive() {
	for (const btn of libraryBtns) btn.classList.remove('on');
	libraryBtns[libraryIdx].classList.add('on');
}

// 도서관 정보 목록 조회 (location.json)
const libraryInfo = await libraryListData('DB/location.json');

async function libraryListData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data.location;
	} catch (err) {
		console.error('error : ', err);
	}
}

const infoWrap = document.querySelector('#infoWrap');
libraryInfoDOM();

// 지도 생성하기 (Kakao api)
const mapContainer = document.querySelector('#map');
const mapOption = {
	center: new kakao.maps.LatLng(libraryInfo[libraryIdx].position[0], libraryInfo[libraryIdx].position[1]),
	level: 3,
};
const map = new kakao.maps.Map(mapContainer, mapOption);

// 지도에 컨트롤 올리기 (Kakao api)
const mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소 막기 mousewheel (Kakao api)
map.setZoomable(false);

// 확대, 축소 이벤트 등록하기 (Kakao api)
const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

libraryInfo.forEach((item, idx) => {
	// 다른 이미지로 마커 생성하기 (Kakao api)
	const markerPosition = new kakao.maps.LatLng(item.position[0], item.position[1]);
	const markerImage = new kakao.maps.MarkerImage(
		`assets/images/location/${item.imgSrc}`,
		new kakao.maps.Size(item.imgSize[0], item.imgSize[1]),
		{
			offset: new kakao.maps.Point(item.imgOption.offset[0], item.imgOption.offset[1]),
		}
	);
	const marker = new kakao.maps.Marker({
		position: markerPosition,
		image: markerImage,
	});
	marker.setMap(map);

	// 도서관 버튼 클릭 - 도서관 정보 재렌더링
	libraryBtns[idx].addEventListener('click', (e) => {
		libraryIdx = idx;
		map.panTo(new kakao.maps.LatLng(item.position[0], item.position[1]));
		libraryBtnActive();
		libraryInfoDOM();
	});
});

// 지도에 교통정보 표시하기 (Kakao api)
const btnTraffic = document.querySelector('.btn-traffic');
let trafficToggle = false;

btnTraffic.addEventListener('click', () => {
	trafficToggle = !trafficToggle;

	if (trafficToggle) {
		map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		btnTraffic.innerHTML = '교통정보 ON';
	} else {
		map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		btnTraffic.innerHTML = '교통정보 OFF';
	}
});

// 지도 중심좌표 이동시키기 (Kakao api)
window.addEventListener('resize', () => {
	map.setCenter(new kakao.maps.LatLng(libraryInfo[libraryIdx].position[0], libraryInfo[libraryIdx].position[1]));
});

// 도서관 정보 create DOM
function libraryInfoDOM() {
	const tags = `
		<h2>${libraryInfo[libraryIdx].title}</h2>
		<ul>
      <li>
        <i class="fa-solid fa-location-dot"></i>
        <p>${libraryInfo[libraryIdx].address}</p>
      </li>
      <li>
        <i class="fa-solid fa-globe"></i>
				<p>
					<a href="${libraryInfo[libraryIdx].website.link}" target="_blank">
						${libraryInfo[libraryIdx].website.title}
					</a>
				</p>
      </li>
      <li>
        <i class="fa-solid fa-phone"></i>
				<p>${libraryInfo[libraryIdx].phone}</p>
      </li>
    </ul>
    <p class='desc-info'>${libraryInfo[libraryIdx].description}</p>
		<div class="sns-wrap">
			<a href="#"><i class="fa-brands fa-instagram"></i></a>
			<a href="#"><i class="fa-brands fa-youtube"></i></a>
			<a href="#"><i class="fa-brands fa-facebook-f"></i></a>
		</div>
	`;

	infoWrap.innerHTML = tags;
}
