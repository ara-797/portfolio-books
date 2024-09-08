// EmailJS
(function () {
	emailjs.init({
		publicKey: 'DX1Rfq3IJ5zvUOONl',
	});
})();

window.onload = function () {
	document.getElementById('formContact').addEventListener('submit', function (event) {
		event.preventDefault();
		this.contact_number.value = (Math.random() * 100000) | 0;
		emailjs.sendForm('service_c30itwj', 'template_kv0vyqq', this).then(
			() => {
				alert('문의사항이 전송되었습니다.');
				resetInput();
			},
			(error) => {
				console.error('error : ', error);
			}
		);
	});
};

// Reset Input
function resetInput() {
	const form = document.querySelector('#formContact');

	const inputArr = [
		...Array.from(form.querySelectorAll('input[type=text]')),
		...Array.from(form.querySelectorAll('textarea')),
	];

	for (const element of inputArr) element.value = '';
}
