// 작가 목록 조회 (author.json)
const authorInfo = await authorListData('DB/author.json');

async function authorListData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (err) {
		console.error('error : ', err);
	}
}

// Directors create DOM
const directorsWrap = document.querySelector('#directorsWrap');
directorsDOM(authorInfo.directors);

function directorsDOM(items) {
	let tags = '';

	items.forEach((item) => {
		tags += `
      <article>
        <div class="img-box">
          <img src="assets/images/author/${item.picture}" alt="">
        </div>
        <div class="info-box">
          <p class="name">${item.name}</p>
          <p>${item.genre}</p>
        </div>
      </article>
    `;
	});

	directorsWrap.innerHTML = tags;
}

// Members create DOM
const slideList = document.querySelectorAll('.membersSwiper .swiper-slide');
let activeSlideIdx = 0;

const membersWrap = document.querySelector('#membersWrap');
membersDOM(authorInfo.members);

function membersDOM(items) {
	const key = slideList[activeSlideIdx].dataset.key;
	let tags = '';

	const selectedItems = items.filter((item) => item.genre === key);

	selectedItems.forEach((item) => {
		tags += `
      <article>
        <div class="img-box">
          <img src="assets/images/author/${item.picture}" alt="">
        </div>
        <div class="info-box">
          <p class="name">${item.name}</p>
          <p>${item.genre}</p>
        </div>
      </article>
    `;
	});

	membersWrap.innerHTML = tags;
}

// Swiper Slide
const swiper = new Swiper('.membersSwiper', {
	slidesPerView: 'auto',
	centeredSlides: true,
	breakpoints: {
		0: {
			spaceBetween: 30,
		},
		600: {
			spaceBetween: 50,
		},
	},
	on: {
		slideChange(e) {
			activeSlideIdx = e.activeIndex;
			membersDOM(authorInfo.members);
		},
		click(e) {
			swiper.slideTo(e.clickedIndex);
		},
	},
});
