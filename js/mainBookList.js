// 도서 목록 조회 (Books API)
const userId = '116867808673658431449';
const shelf = '1002';
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
	if (e.target.closest('.btnDetailBook')) {
		const detailUrl = `https://www.googleapis.com/books/v1/volumes/${
			e.target.closest('.btnDetailBook').dataset.detail
		}`;
		fetchDetailData(detailUrl);
	}
	if (e.target.closest('.pop-close.book-list')) removePop();
});

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
const btnPrevBook = document.querySelector('#btnPrevBook');
const btnNextBook = document.querySelector('#btnNextBook');

const swiper = new Swiper('.bookListSwiper', {
	slidesPerView: 'auto',
	spaceBetween: 30,
	navigation: {
		nextEl: '#btnNextBook',
		prevEl: '#btnPrevBook',
	},
});
