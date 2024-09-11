const formCommunityInput = document.querySelector('#formCommunityInput');
const btnInputSend = formCommunityInput.querySelector('input[type=submit]');

btnInputSend.addEventListener('click', (e) => {
	e.preventDefault();
	if (!e.validate) return;
	console.log('실행 TEST');
});
