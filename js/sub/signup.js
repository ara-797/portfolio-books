// Inner Content Motion
setTimeout(() => {
	document.querySelector('.sign-up').classList.add('on');
}, 100);

const formSignup = document.querySelector('#formSignup');
const guideListWrap = document.querySelector('.guideListWrap');
const inputArr = formSignup.querySelectorAll('.input-box input');
const textareaArr = formSignup.querySelectorAll('.input-box textarea');

// Input 입력 항목 Event
inputArr.forEach((item) => {
	item.addEventListener('focus', (e) => {
		const name = e.target.name;
		let tags = '';

		if (name === 'email') {
			tags += `
				<li>필수 입력 항목입니다.</li>
				<li>이메일 입력 항목입니다.</li>
        <li>이메일주소는 @를 포함하여 입력하세요.</li>
        <li>@ 앞쪽과 뒤쪽에 문자값을 입력하세요.</li>
        <li>@ 뒤쪽에 서비스명이 올바른지 확인하세요.</li>
			`;
			guideListWrap.innerHTML = tags;
		}

		if (name === 'pwd1' || name === 'pwd2') {
			tags += `
				<li>필수 입력 항목입니다.</li>
				<li>비밀번호 입력 항목입니다.</li>
        <li>입력 항목에 5글자 이상 입력하세요.</li>
        <li>특수문자, 영문, 숫자를 모두 포함하여 입력하세요.</li>
			`;
			guideListWrap.innerHTML = tags;
		}
	});

	item.addEventListener('focusout', () => {
		const tags = `
			<li>회원가입을 위한 입력 항목입니다.</li>
			<li>입력 항목에 커서를 올리면 안내사항이 표시됩니다.</li>
		`;
		guideListWrap.innerHTML = tags;
	});
});

// Textarea 입력 항목 Event
textareaArr.forEach((item) => {
	item.addEventListener('focus', (e) => {
		const name = e.target.name;
		let tags = '';

		if (name === 'memo') {
			tags += `
				<li>필수 입력 항목입니다.</li>
				<li>메모 입력 항목입니다.</li>
        <li>입력 항목에 5글자 이상 입력하세요.</li>
			`;
			guideListWrap.innerHTML = tags;
		}
	});

	item.addEventListener('focusout', () => {
		const tags = `
			<li>회원가입을 위한 입력 항목입니다.</li>
			<li>입력 항목에 커서를 올리면 안내사항이 표시됩니다.</li>
		`;
		guideListWrap.innerHTML = tags;
	});
});
