// Scroll Event - Throttling
let eventBlocker = null;
let speed = 100;

window.addEventListener('scroll', () => {
	if (eventBlocker) return;

	eventBlocker = setTimeout(() => {
		activation();
		eventBlocker = null;
	}, speed);
});

// Scroll Navigation
const btns = document.querySelectorAll('.scroll-navi li');

btns.forEach((btn, idx) => {
	btn.addEventListener('click', () => {
		window.scrollTo({
			top: sections[idx].offsetTop,
			behavior: 'smooth',
		});
	});
});

// 메인 페이지 Section Scroll
const sections = document.querySelectorAll('.my-scroll');
const baseline = -window.innerHeight / 2;

function activation() {
	const scroll = window.scrollY;

	if (scroll <= 500) {
		for (const el of sections) el.classList.remove('on');
	}

	sections.forEach((_, idx) => {
		if (scroll >= sections[idx].offsetTop + baseline) {
			for (const btn of btns) btn.classList.remove('on');
			btns[idx].classList.add('on');

			sections[idx].classList.add('on');
		}
	});
}
