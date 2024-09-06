// Scroll Event - Throttling
let eventBlocker = null;
let speed = 200;

window.addEventListener('scroll', () => {
	if (eventBlocker) return;

	eventBlocker = setTimeout(() => {
		headerScrollActive();
		eventBlocker = null;
	}, speed);
});

// Header Scroll
const header = document.querySelector('#header');

function headerScrollActive() {
	const scroll = window.scrollY;
	const limit = 0;
	if (scroll > limit) header.classList.add('scroll');
	else header.classList.remove('scroll');
}

// 이벤트 위임 - Mobile Menu
document.body.addEventListener('click', (e) => {
	if (e.target.closest('.btn-menu')) {
		document.querySelector('.mobile-menu').classList.add('on');
	}
	if (e.target.closest('.menu-close')) {
		document.querySelector('.mobile-menu').classList.remove('on');
	}
});
