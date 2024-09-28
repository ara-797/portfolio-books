// 도서관 목록 조회 (location.json)
const libraryInfo = await libraryListData('DB/location.json');

async function libraryListData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (err) {
		console.error('error : ', err);
	}
}

// 도서관 리스트 create DOM
const companyWrap = document.querySelector('.company-wrap');
const list = libraryInfo.location.filter((item) => item.title === '남산도서관' || item.title === '별마당 도서관');
createDOM(list);

function createDOM(items) {
	let tags = '';

	items.forEach((item, idx) => {
		tags += `
      <article>
        <div class="img-box">
          <img src="assets/images/location/${item.thumbnailSrc}" alt="">
        </div>
        <div class="info-box">
          <h2>${item.title}</h2>
          <p>${item.description}</p>

          <a href="location.html?library=${idx + 1}">
            <i class="fa-solid fa-circle-chevron-right"></i>
          </a>
        </div>
      </article>
    `;
	});

	companyWrap.innerHTML = tags;
}
