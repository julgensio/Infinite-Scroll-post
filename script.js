const postContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limitNumber = 5;
let pageNumber = 1;

// ! Fetch post from API
async function getPosts() {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts?_limit=${limitNumber}&_page=${pageNumber}`
	);
	const data = await res.json();
	return data;
}

// ! Show post in DOM
async function showPosts() {
	const posts = await getPosts();

	// Get post one by one
	posts.forEach((post) => {
		// ! Create post container from api
		const postEl = document.createElement('div');
		postEl.classList.add('post');
		postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>`;

		// ! Add the post data in to the post container
		postContainer.appendChild(postEl);
	});
}

// Show loader % fetch more posts
function showLoader() {
	loading.classList.add('show');

	setTimeout(() => {
		loading.classList.remove('show');

		setTimeout(() => {
			pageNumber++;
			showPosts();
		}, 200);
	}, 1000);
}

// Filter title and body post by input
function filterPosts(e) {
	// Get input of the search box
	const term = e.target.value.toUpperCase();

	const posts = document.querySelectorAll('.post');
	// console.log(posts);

	// Get each post by element
	posts.forEach((post) => {
		console.log(post);
		const title = post.querySelector('.post-title').innerText.toUpperCase();
		const body = post.querySelector('.post-body').innerText.toUpperCase();

		// Check if the input is found in the current posts
		if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
			// Show post(s) if the term matches
			post.style.display = 'flex';
		} else {
			// Remove posts if term does not match
			post.style.display = 'none';
		}
	});
}

// Show initial posts
showPosts();

window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

	// ! If user is at the bottom of the page the loader the show loader function will be called
	if (scrollTop + clientHeight >= scrollHeight - 5) {
		// log(4);

		showLoader();
	}
});

filter.addEventListener('input', filterPosts);
