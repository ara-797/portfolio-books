const userId = '116867808673658431449';
const shelf = '1001';
const listUrl = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelf}/volumes`;

// 도서 목록 조회 (Books API)
fetchListData(listUrl);

async function fetchListData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		console.log('list data : ', data.items);
	} catch (err) {
		console.err('error : ', err);
	}
}
