// Flickr 메서드별 URL 생성
const api_key = 'c398e50bf254448c674eccddf24cb43e';
const userId = '201493781@N08';
const limit = 30;

function setUrl(type, option) {
	const baseUrl = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${limit}&method=`;
	const methodInterest = 'flickr.interestingness.getList';
	const methodUser = 'flickr.people.getPhotos';
	const methodSearch = 'flickr.photos.search';

	if (type === 'interest') return `${baseUrl}${methodInterest}`;
	if (type === 'user') return `${baseUrl}${methodUser}&user_id=${option}`;
	if (type === 'search') return `${baseUrl}${methodSearch}&tags=${option}`;
}

// 이미지 데이터 조회 (Flickr API)
const galleryWrap = document.querySelector('#galleryWrap');
const loadingWrap = document.querySelector('.loading-wrap');

fetchData(setUrl('interest'));

async function fetchData(url) {
	galleryWrap.classList.remove('on');
	loadingWrap.classList.remove('off');

	try {
		const response = await fetch(url);
		const data = await response.json();

		if (!data.photos.photo.length) {
			galleryWrap.classList.add('on');
			loadingWrap.classList.add('off');
			alert('해당 검색어의 결과가 없습니다.');
			return;
		}
		createList(data.photos.photo);
	} catch (err) {
		console.error('error : ', err);
	}
}

// Gallery List create DOM
function createList(arr) {
	let tags = '';

	arr.forEach((item) => {
		tags += `
      <li class="item">
        <div>
          <div class="img-box">
            <img class="picture" 
              src="https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg" 
              alt="https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg">
          </div>

          <div class="info-wrap">
            <div class="profile-wrap">
              <img class="profile-img" 
                src="http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg"
                alt="${item.owner}">
							<p class="profile-user">${item.owner}</p>
            </div>
            <h3>${item.title}</h3>
          </div>
        </div>
      </li>
    `;
	});

	galleryWrap.innerHTML = tags;
	setImgLoading();
}

// Set Image Loading
function setImgLoading() {
	const imgArr = galleryWrap.querySelectorAll('img');
	let count = 0;

	for (const img of imgArr) {
		img.onerror = () => {
			// 프로필 이미지 에러 처리
			img.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
		};
		img.onload = () => {
			count++;
			count === imgArr.length && isoLayout();
		};
	}
}

// Isotope 라이브러리
function isoLayout() {
	new Isotope(galleryWrap, {
		itemSelector: '.item',
		transitionDuration: '0.2s',
	});
	galleryWrap.classList.add('on');
	loadingWrap.classList.add('off');
}

// 이미지 검색
const inputSearch = document.querySelector('#search');
const btnSearch = document.querySelector('.btn-search');

btnSearch.addEventListener('click', onSearchImg);

function onSearchImg() {
	const inputVal = inputSearch.value.trim();

	if (inputVal === '') {
		alert('검색어를 입력해주세요.');
		return;
	}
	fetchData(setUrl('search', inputVal));
	inputSearch.value = '';
}

// 이미지 데이터 조회 (버튼 클릭)
const btnInterest = document.querySelector('.option-interest');
const btnBook = document.querySelector('.option-book');

btnInterest.addEventListener('click', () => fetchData(setUrl('interest')));
btnBook.addEventListener('click', () => fetchData(setUrl('user', userId)));
inputSearch.addEventListener('keypress', (e) => {
	e.code === 'Enter' && onSearchImg();
});

// 이벤트 위임
document.body.addEventListener('click', (e) => {
	if (e.target.className === 'profile-img') fetchData(setUrl('user', e.target.getAttribute('alt')));
	if (e.target.className === 'profile-user') fetchData(setUrl('user', e.target.innerText));
	if (e.target.className === 'picture') createPop(e.target.getAttribute('alt'));
	if (e.target.closest('.pop-close')) removePop();
});

// 이미지 상세 create popup
function createPop(img) {
	const tags = `
		<div class="inner-pop">
      <div class="inner-content">
				<div class="media-box">
					<img src="${img}" alt="">
				</div>
			</div>

			<div class="loading-wrap">LOADING...</div>

      <button type="button" class="pop-close">
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
