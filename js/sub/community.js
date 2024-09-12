const showElement = document.querySelector('.show-wrap');
const reviewList = Array.from(showElement.querySelectorAll('article'));

// Create 리뷰
const formCommunityInput = document.querySelector('#formCommunityInput');
const btnInputSend = formCommunityInput.querySelector('input[type=submit]');

btnInputSend.addEventListener('click', (e) => {
	e.preventDefault();
	if (!e.validate) return;
	console.log('Create');
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
	if (reviewList.find((item) => item.classList.contains('edit'))) {
		alert('수정중인 게시물이 있습니다.');
		return;
	}
	e.target.closest('article').classList.add('edit');
}

// 리뷰 수정화면 취소
function cancelReviewEdit(e) {
	e.target.closest('article').classList.remove('edit');
}

// Delete 리뷰
function deleteReview(e) {
	console.log('Delete : ', e.target.dataset.detail);
}

// Update 리뷰
function updateReview(e) {
	e.preventDefault();
	console.log('Update : ', e.target.dataset.detail);
}
