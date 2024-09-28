// Contact Form
const formContact = document.querySelector('#formContact');
formContact && contactValidate();

function contactValidate() {
	// Input Event - Debouncing (유효성 검사)
	let eventBlocker = null;
	formContact.addEventListener('input', () => {
		clearTimeout(eventBlocker);
		eventBlocker = setTimeout(() => {
			isText(formContact, 'username', 2, '이름은 2글자 이상 입력하세요.');
			isText(formContact, 'message', 5, '문의사항은 5글자 이상 입력하세요.');
			isEmail(formContact, 'email');
		}, 300);
	});

	const btnSend = formContact.querySelector('input[type=submit]');
	btnSend.addEventListener('click', (e) => {
		if (!isText(formContact, 'username', 2, '이름은 2글자 이상 입력하세요.')) e.preventDefault();
		if (!isText(formContact, 'message', 5, '문의사항은 5글자 이상 입력하세요.')) e.preventDefault();
		if (!isEmail(formContact, 'email')) e.preventDefault();
	});
}

// Signup Form
const formSignup = document.querySelector('#formSignup');
formSignup && signupValidate();

function signupValidate() {
	// Input Event - Debouncing (유효성 검사)
	let eventBlocker = null;
	formSignup.addEventListener('input', () => {
		clearTimeout(eventBlocker);
		eventBlocker = setTimeout(() => {
			isEmail(formSignup, 'email');
			isPassword(formSignup, 'pwd1', 5);
			isRePassword(formSignup, 'pwd1', 'pwd2');
			isSelect(formSignup, 'library');
			isCheck(formSignup, 'gender');
			isCheck(formSignup, 'genre');
			isText(formSignup, 'memo', 5, '메모는 5글자 이상 입력하세요.');
		}, 300);
	});

	const btnSend = formSignup.querySelector('input[type=submit]');
	btnSend.addEventListener('click', (e) => {
		if (!isEmail(formSignup, 'email')) e.preventDefault();
		if (!isPassword(formSignup, 'pwd1', 5)) e.preventDefault();
		if (!isRePassword(formSignup, 'pwd1', 'pwd2')) e.preventDefault();
		if (!isSelect(formSignup, 'library')) e.preventDefault();
		if (!isCheck(formSignup, 'gender')) e.preventDefault();
		if (!isCheck(formSignup, 'genre')) e.preventDefault();
		if (!isText(formSignup, 'memo', 5, '메모는 5글자 이상 입력하세요.')) e.preventDefault();
	});
}

// Signin Form
const formSignin = document.querySelector('#formSignin');
formSignin && signinValidate();

function signinValidate() {
	// Input Event - Debouncing (유효성 검사)
	let eventBlocker = null;
	formSignin.addEventListener('input', () => {
		clearTimeout(eventBlocker);
		eventBlocker = setTimeout(() => {
			isEmail(formSignin, 'email');
			isPassword(formSignin, 'pwd', 5);
		}, 300);
	});

	const btnSend = formSignin.querySelector('input[type=submit]');
	btnSend.addEventListener('click', (e) => {
		if (!isEmail(formSignin, 'email')) e.preventDefault();
		if (!isPassword(formSignin, 'pwd', 5)) e.preventDefault();
	});
}

// Community input Form
const formCommunityInput = document.querySelector('#formCommunityInput');
formCommunityInput && communityInputValidate();

function communityInputValidate() {
	// Input Event - Debouncing (유효성 검사)
	let eventBlocker = null;
	formCommunityInput.addEventListener('input', () => {
		clearTimeout(eventBlocker);
		eventBlocker = setTimeout(() => {
			isText(formCommunityInput, 'bookname', 1, '도서명을 입력하세요.');
			isText(formCommunityInput, 'content', 1, '도서에 관련된 내용을 자유롭게 작성하세요.');
		}, 300);
	});

	const btnSend = formCommunityInput.querySelector('input[type=submit]');
	btnSend.addEventListener('click', (e) => {
		e.validate = true;

		if (!isText(formCommunityInput, 'bookname', 1, '도서명을 입력하세요.')) {
			e.preventDefault();
			e.validate = false;
		}
		if (!isText(formCommunityInput, 'content', 1, '도서에 관련된 내용을 자유롭게 작성하세요.')) {
			e.preventDefault();
			e.validate = false;
		}
	});
}

// Community update Form
document.body.addEventListener('click', (e) => {
	if (e.target.className === 'btn-review-update') communityUpdateValidate(e);
});

function communityUpdateValidate(e) {
	const formCommunityUpdate = document.querySelector('.form-community-update');
	e.validate = true;

	if (!isText(formCommunityUpdate, 'booknameUpdate', 1, '도서명을 입력하세요.')) {
		e.preventDefault();
		e.validate = false;
	}
	if (!isText(formCommunityUpdate, 'contentUpdate', 1, '도서에 관련된 내용을 자유롭게 작성하세요.')) {
		e.preventDefault();
		e.validate = false;
	}
}

// [Text Validation]
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

// [Email Validation]
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

// [Password Validation]
function isPassword(form, pwd1, length) {
	const pwdElement1 = form.querySelector(`[name=${pwd1}]`);
	const pwdValue1 = form.querySelector(`[name=${pwd1}]`).value;

	const number = /[0-9]/;
	const english = /[a-zA-Z]/;
	const special = /[!@#$%^&*()_+]/;

	resetError(pwdElement1);

	if (pwdValue1.length < length || !number.test(pwdValue1) || !english.test(pwdValue1) || !special.test(pwdValue1)) {
		createError(pwdElement1, `비밀번호는 ${length}글자 이상, 특수문자, 영문, 숫자를 모두 포함하세요.`);
		return false;
	}

	return true;
}

function isRePassword(form, pwd1, pwd2) {
	const pwdElement2 = form.querySelector(`[name=${pwd2}]`);
	const pwdValue1 = form.querySelector(`[name=${pwd1}]`).value;
	const pwdValue2 = form.querySelector(`[name=${pwd2}]`).value;
	resetError(pwdElement2);

	if (pwdValue1 !== pwdValue2 || !pwdValue2) {
		createError(pwdElement2, '두개의 비밀번호를 동일하게 입력하세요.');
		return false;
	}

	return true;
}

// [Selectbox Validation]
function isSelect(form, name) {
	const input = form.querySelector(`[name=${name}]`);
	const selectedIdx = input.options.selectedIndex;
	const value = input.options[selectedIdx].value;
	resetError(input);

	if (!value) {
		createError(input, '해당 요소 중 하나를 선택해주세요.');
		return false;
	}

	return true;
}

// [Radiobox, Checkbox Validation]
function isCheck(form, name) {
	const inputs = form.querySelectorAll(`[name=${name}]`);
	let isChecked = false;

	for (const input of inputs) input.checked && (isChecked = true);
	resetError(inputs);

	if (!isChecked) {
		createError(inputs[0], '해당 선택사항을 하나 이상 선택하세요.');
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
