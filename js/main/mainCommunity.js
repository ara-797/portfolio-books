// 커뮤니티 목록 조회 (community.json)
fetchListData('DB/community.json');

async function fetchListData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		createDOM(data.communityList);
	} catch (err) {
		console.error('error : ', err);
	}
}

// 커뮤니티 슬라이드 create DOM
const communityListPanel = document.querySelector('#communityListPanel');

function createDOM(items) {
	let tags = '';

	items.forEach((item) => {
		tags += `
      <div class="swiper-slide">
        <div class="profile-box">
          <img src="assets/images/community/${item.profileImg}" alt="">
        </div>
        <div class="info-box">
					<p class="book">${item.bookname}</p>
          <p>${item.content}</p>
          <p class="user">${item.username}</p>
          <p>${item.createAt}</p>
        </div>
      </div>
    `;
	});

	communityListPanel.innerHTML = tags;
}

// Swiper Slide
const btnPrevCommunity = document.querySelector('#btnPrevCommunity');
const btnNextCommunity = document.querySelector('#btnNextCommunity');

const swiper = new Swiper('.communityListSwiper', {
	slidesPerView: 'auto',
	spaceBetween: 30,
	navigation: {
		nextEl: '#btnNextCommunity',
		prevEl: '#btnPrevCommunity',
	},
	autoplay: {
		delay: 5000,
	},
});

// 이벤트 위임
const btnCommunityPlay = document.querySelector('#btnCommunityPlay');
const btnCommunityStop = document.querySelector('#btnCommunityStop');

document.body.addEventListener('click', (e) => {
	if (e.target.closest('#btnCommunityPlay')) swiperPlay();
	if (e.target.closest('#btnCommunityStop')) swiperStop();
});

function swiperPlay() {
	swiper.autoplay.start();
	btnCommunityPlay.classList.add('on');
	btnCommunityStop.classList.remove('on');
}

function swiperStop() {
	swiper.autoplay.stop();
	btnCommunityPlay.classList.remove('on');
	btnCommunityStop.classList.add('on');
}
