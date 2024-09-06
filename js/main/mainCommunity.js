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
          <p>${item.content}</p>
          <p class="user">${item.name}</p>
          <p>${item.date}</p>
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
		delay: 2500,
	},
});
