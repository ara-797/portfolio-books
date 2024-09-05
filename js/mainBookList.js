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
		delay: 1000,
	},
});
