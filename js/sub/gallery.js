// Flickr 메서드별 URL 생성
const api_key = 'c398e50bf254448c674eccddf24cb43e';
const user_id = '201493781@N08';
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

		galleryWrap.classList.add('on');
		loadingWrap.classList.add('off');

		if (!data.photos.photo.length) {
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
}
