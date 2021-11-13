log = console.log;
const postContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limitNumber = 3;
let pageNumber = 1;

// ! Fetch post from API
async function getPost() {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts?_limit=${limitNumber}&_page${pageNumber}`
	);
	const data = await res.json();
	return data;
}

// ! Show post in DOM
async function showPosts() {
	const posts = await getPost();

	// Get post one by one
	posts.forEach((post) => {
		// ! Create post container from api
		const postEl = document.createElement('div');
		postEl.classList.add('post');
		postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>`;

		// ! Add the post data in to the post container
		postContainer.appendChild(postEl);
	});
}

// Show initial posts
showPosts();

window.addEventListener('scroll', () => {});
