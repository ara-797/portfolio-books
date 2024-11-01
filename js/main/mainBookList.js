// 도서 목록 조회 (Books API)
const userId = '116867808673658431449';
const shelf = '1002';
const key = 'AIzaSyDeATfHBJJkjLPQmF_ePSuyuMaBGD_DipE';
const listUrl = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes?maxResults=10&key=${key}`;

fetchListData(listUrl);

async function fetchListData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		createDOM(data.items);
	} catch (err) {
		console.error('error : ', err);
	}
}

// 도서 상세 조회 (Books API)
async function fetchDetailData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		createPop(data.volumeInfo);
	} catch (err) {
		console.error('error : ', err);
	}
}

// 도서 슬라이드 create DOM
const bookListPanel = document.querySelector('#bookListPanel');

function createDOM(arr) {
	let tags = '';

	arr.forEach((item) => {
		const imgReplace = item.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=10');

		tags += `
      <div class="btnDetailBook swiper-slide" data-detail="${item.id}">
        <div class="ratio-wrap">
          <div class="img-box">
            <img src="${imgReplace}" alt="">
          </div>
        </div>

        <div class="info-box">
          <h2>${item.volumeInfo.title}</h2>
          <p>${item.volumeInfo.authors}</p>
        </div>
      </div>
    `;

		bookListPanel.innerHTML = tags;
	});
}

// 도서 상세 create popup
function createPop(obj) {
	const tags = `
		<div class="inner-pop">
      <div class="inner-content">

				<div class="inner-detail">
					<div class="img-box">
						<img src="${obj.imageLinks.small.replace('edge=curl', 'edge=')}">
					</div>
					
					<div class="info-wrap">
						<h1>${obj.title}</h1>
						<h2>${obj.subtitle ? obj.subtitle : ''}</h2>
						
						<p class="authors">작가 : ${obj.authors}</p>
						<div class="description">${obj.description}</div>
						<p>카테고리 : ${obj.categories}</p>
						<p>출판사 : ${obj.publisher}</p>
						<p>출판일 : ${obj.publishedDate}</p>
					</div>
				</div>

			</div>

			<div class="loading-wrap">LOADING...</div>

      <button type="button" class="pop-close book-list">
        <i class="fa-solid fa-circle-xmark"></i>
      </button>
    </div>
	`;

	const pop = document.createElement('aside');
	pop.className = 'pop-wrap';
	pop.innerHTML = tags;
	document.body.append(pop);

	setTimeout(() => {
		document.querySelector('.pop-wrap').classList.add('on');
	}, 100);
	document.body.style.overflow = 'hidden';

	// popup Loading
	const frame = pop.querySelector('.inner-content');
	const popLoading = pop.querySelector('.loading-wrap');
	const imgArr = frame.querySelectorAll('img');
	let count = 0;

	frame.classList.remove('on');
	popLoading.classList.remove('off');

	for (const img of imgArr) {
		img.onload = () => {
			count++;
			if (count === imgArr.length) {
				frame.classList.add('on');
				popLoading.classList.add('off');
			}
		};
	}
}

// popup 제거
function removePop() {
	document.querySelector('.pop-wrap').classList.remove('on');

	setTimeout(() => {
		document.querySelector('.pop-wrap').remove();
	}, 400);

	document.body.style.overflow = 'auto';
}

// Swiper Slide
const btnPrevBook = document.querySelector('#btnPrevBook');
const btnNextBook = document.querySelector('#btnNextBook');

const swiper = new Swiper('.bookListSwiper', {
	slidesPerView: 'auto',
	spaceBetween: 30,
	navigation: {
		nextEl: '#btnNextBook',
		prevEl: '#btnPrevBook',
	},
	autoplay: {
		delay: 1500,
	},
});

// 이벤트 위임
const btnBookListPlay = document.querySelector('#btnBookListPlay');
const btnBookListStop = document.querySelector('#btnBookListStop');

document.body.addEventListener('click', (e) => {
	if (e.target.closest('.btnDetailBook')) {
		const detailUrl = `https://www.googleapis.com/books/v1/volumes/${
			e.target.closest('.btnDetailBook').dataset.detail
		}`;
		fetchDetailData(detailUrl);
		swiperStop();
	}
	if (e.target.closest('.pop-close.book-list')) removePop();
	if (e.target.closest('#btnBookListPlay')) swiperPlay();
	if (e.target.closest('#btnBookListStop')) swiperStop();
});

function swiperPlay() {
	swiper.autoplay.start();
	btnBookListPlay.classList.add('on');
	btnBookListStop.classList.remove('on');
}

function swiperStop() {
	swiper.autoplay.stop();
	btnBookListPlay.classList.remove('on');
	btnBookListStop.classList.add('on');
}
