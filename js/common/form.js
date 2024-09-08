// Contact Form
const formContact = document.querySelector('#formContact');
formContact && contactValidate();

function contactValidate() {
	const btnSend = formContact.querySelector('input[type=submit]');

	btnSend.addEventListener('click', (e) => {
		if (!isText(formContact, 'username', 2, '이름은 2글자 이상 입력하세요.')) e.preventDefault();
		if (!isText(formContact, 'message', 5, '문의사항은 5글자 이상 입력하세요.')) e.preventDefault();
		if (!isEmail(formContact, 'email')) e.preventDefault();
	});
}

// Text Validation
function isText(form, name, length, errMsg) {
	const input = form.querySelector(`[name=${name}]`);
	const value = input.value.trim();
	resetError(input);

	if (value.length < length) {
		createError(input, errMsg);
		return false;
	}

	return true;
}

// Email Validation
function isEmail(form, name) {
	const input = form.querySelector(`[name=${name}]`);
	const value = input.value;
	resetError(input);

	if (!/@/.test(value)) {
		createError(input, '이메일주소는 @를 포함하여 입력하세요.');
		return false;
	}

	const [beforeTxt, afterTxt] = value.split('@');

	if (!beforeTxt || !afterTxt) {
		createError(input, '@ 앞쪽과 뒤쪽에 문자값을 입력하세요.');
		return false;
	}

	if (!/\./.test(afterTxt)) {
		createError(input, '@ 뒤쪽에 서비스명이 올바른지 확인하세요.');
		return false;
	}

	return true;
}

// Error Message 생성
function createError(input, errMsg) {
	const errElement = document.createElement('p');
	errElement.className = 'error';
	errElement.innerText = errMsg;
	input.closest('.input-box').append(errElement);
}

// Error Message 제거
function resetError(input) {
	let element = null;
	input.length ? (element = input[0]) : (element = input);

	const errElement = element.closest('.input-box').querySelector('.error');
	if (errElement) element.closest('.input-box').querySelector('.error').remove();
}
