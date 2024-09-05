// 도서 목록 조회 (Books API)
const userId = '116867808673658431449';
const shelf = '1001';
const listUrl = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes`;

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

// 이벤트 위임 - 도서 상세 팝업
document.body.addEventListener('click', (e) => {
	if (e.target.id === 'btnDetailVisual') {
		const detailUrl = `https://www.googleapis.com/books/v1/volumes/${e.target.dataset.detail}`;
		fetchDetailData(detailUrl);
	}
	if (e.target.closest('.pop-close.visual')) removePop();
});

// 도서 슬라이드 create DOM
const visualPanel = document.querySelector('#visualPanel');
const ratingList = [5, 4, 3];

function createDOM(arr) {
	let tags = '';

	arr.forEach((item, idx) => {
		const imgOriginReplace = item.volumeInfo.imageLinks.thumbnail
			.replace('zoom=1', 'zoom=10')
			.replace('edge=curl', 'edge=');
		const imgShadowReplace = item.volumeInfo.imageLinks.thumbnail.replace('edge=curl', 'edge=');

		tags += `
      <div class="swiper-slide">
        <div class="detail-wrap">
          <h1>${item.volumeInfo.title}</h1>

          <div class="rating-wrap">
            <div class="star-box">
              <span class=${ratingList[idx] >= 1 ? 'on' : ''}>
								<i class="fa-solid fa-star"></i>
							</span>
							<span class=${ratingList[idx] >= 2 ? 'on' : ''}>
								<i class="fa-solid fa-star"></i>
							</span>
							<span class=${ratingList[idx] >= 3 ? 'on' : ''}>
								<i class="fa-solid fa-star"></i>
							</span>
							<span class=${ratingList[idx] >= 4 ? 'on' : ''}>
								<i class="fa-solid fa-star"></i>
							</span>
							<span class=${ratingList[idx] >= 5 ? 'on' : ''}>
								<i class="fa-solid fa-star"></i>
							</span>
            </div>
            <p>${ratingList[idx] + '.0'}</p>
          </div>

          <p class="content">${item.volumeInfo.description}</p>

          <button type="button" id="btnDetailVisual" class="btn-more" data-detail="${item.id}">
						VIEW DETAIL
					</button>
        </div>

        <div class="ratio-wrap">
          <div class="double-wrap">

            <div class="img-box origin">
              <img src="${imgOriginReplace}" alt="">
            </div>

            <div class="img-box shadow">
              <img src="${imgShadowReplace}" alt="">
            </div>

          </div>
        </div>
      </div>
    `;

		visualPanel.innerHTML = tags;
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

      <button type="button" class="pop-close visual">
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
	}, 0);

	document.body.style.overflow = 'hidden';
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
const btnPrevVisual = document.querySelector('#btnPrevVisual');
const btnNextVisual = document.querySelector('#btnNextVisual');
const currentWrap = document.querySelector('.current-number');

const swiper = new Swiper('.mainVisualSwiper', {
	pagination: {
		el: '.current-number',
		type: 'fraction',
		formatFractionCurrent: function (num) {
			return num < 10 && (num = '0' + num);
		},
		formatFractionTotal: function (num) {
			return num < 10 && (num = '0' + num);
		},
	},
	navigation: {
		nextEl: '#btnNextVisual',
		prevEl: '#btnPrevVisual',
	},
	slidesPerView: 1,
	autoplay: {
		delay: 5000,
	},
});
