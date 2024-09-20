// Get LocalStorage Data
let localData = [];
getLocalData();

function getLocalData() {
	const data = localStorage.getItem('review');
	localData = JSON.parse(data) || [];
}

// 리뷰 List create DOM
const showElement = document.querySelector('.show-wrap');
reviewListDOM(localData);

function reviewListDOM(arr) {
	let tags = '';

	if (!arr.length) {
		tags += '<p class="no-items">등록된 리뷰가 없습니다.</p>';
	} else {
		arr.forEach((item) => {
			tags += `
				<article>
					<div class="detail-wrap">
						<h2>${item.bookname}</h2>
						<p>${item.content}</p>

						<div class="info-wrap">
							<div class="profile-box">
								<img src="assets/images/community/blank_user.png" alt="">
							</div>
							<div class="info-box">
								<p class="user">${item.username}</p>
								<p>${item.createAt}</p>
							</div>
						</div>

						<div class="btn-wrap">
							<button type="button" class="btn-review-edit" data-detail="${item.seq}">EDIT</button>
							<button type="button" class="btn-review-delete" data-detail="${item.seq}">DELETE</button>
						</div>
					</div>

					<form action="" method="get" class="form-community-update">
						<fieldset>
							<legend class="h">Community form 수정 항목</legend>

							<div class="input-box">
								<input type="text" name="booknameUpdate" class="book-name-update" placeholder="도서명을 입력하세요." value="${item.bookname}" />
							</div>
							<div class="input-box">
								<textarea name="contentUpdate" class="content-update"
									placeholder="도서에 관련된 내용을 자유롭게 작성하세요.">${item.content}</textarea>
							</div>

							<div class="btn-wrap">
								<button type="button" class="btn-review-cancel">CANCEL</button>
								<input type="submit" class="btn-review-update" value="UPDATE" data-detail="${item.seq}">
							</div>
						</fieldset>
					</form>
				</article>
			`;
		});
	}

	showElement.innerHTML = tags;
}

// Create 리뷰
const formCommunityInput = document.querySelector('#formCommunityInput');
const btnInputSend = formCommunityInput.querySelector('input[type=submit]');

btnInputSend.addEventListener('click', (e) => {
	e.preventDefault();
	if (!e.validate) return;

	const bookname = document.querySelector('#bookname').value;
	const content = document.querySelector('#content').value;

	const params = [
		{
			seq: localData[0]?.seq + 1 || 0,
			username: 'Woo ara',
			bookname: bookname,
			content: content,
			createAt: moment().format('YYYY.MM.DD h:mm:ss a'),
		},
		...localData,
	];
	localStorage.setItem('review', JSON.stringify(params));
	getLocalData();
	reviewListDOM(localData);

	document.querySelector('#bookname').value = '';
	document.querySelector('#content').value = '';
});

// 이벤트 위임 - 리뷰 버튼
document.body.addEventListener('click', (e) => {
	if (e.target.className === 'btn-review-edit') changeReviewEdit(e);
	if (e.target.className === 'btn-review-cancel') cancelReviewEdit(e);
	if (e.target.className === 'btn-review-delete') deleteReview(e);
	if (e.target.className === 'btn-review-update') updateReview(e);
});

// 리뷰 수정화면 노출
function changeReviewEdit(e) {
	const reviewList = Array.from(showElement.querySelectorAll('article'));

	if (reviewList.find((item) => item.classList.contains('edit'))) {
		alert('수정중인 게시물이 있습니다.');
		return;
	}
	e.target.closest('article').classList.add('edit');
	btnInputSend.disabled = true;
}

// 리뷰 수정화면 취소
function cancelReviewEdit(e) {
	e.target.closest('article').classList.remove('edit');
	btnInputSend.disabled = false;
	reviewListDOM(localData);
}

// Delete 리뷰
function deleteReview(e) {
	const params = localData.filter((item) => item.seq !== parseInt(e.target.dataset.detail));
	localStorage.setItem('review', JSON.stringify(params));
	getLocalData();
	reviewListDOM(localData);
}

// Update 리뷰
function updateReview(e) {
	e.preventDefault();
	if (!e.validate) return;

	const currentForm = e.target.closest('.form-community-update');
	const bookname = currentForm.querySelector('.book-name-update').value;
	const content = currentForm.querySelector('.content-update').value;

	localData.forEach((item) => {
		if (item.seq === parseInt(e.target.dataset.detail)) {
			item.bookname = bookname;
			item.content = content;
		}
	});
	localStorage.setItem('review', JSON.stringify(localData));
	getLocalData();
	btnInputSend.disabled = false;
	reviewListDOM(localData);
}
