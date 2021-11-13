const postContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limitNumber = 3;
let pageNumber = 1;

async function getPost() {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts?_limit=${limitNumber}&_page${pageNumber}`
	);
	const data = await res.json();
	return data;
}
