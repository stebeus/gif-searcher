const searchBar = document.querySelector('.search-bar');

const initialGifPath = '/sonic-waiting.gif';

const isQueryEmpty = (query) => query.trim() === '';

function renderGif(gifTitle = 'Waiting for your query...', gifUrl = initialGifPath) {
	const title = document.querySelector('.title');
	const img = document.querySelector('img');

	title.textContent = gifTitle;
	img.src = gifUrl;
}

async function fetchGif(gif) {
	const apiKey = '6OXtOEb9inKrHI7HYhBObJYoDTLSpfN139Gm6AXrX4l96Tb4IbPJ6vIczCDg6PRp';
	const url = `https://api.klipy.com/api/v1/${apiKey}/gifs/search?per_page=8&q=${gif}`;

	try {
		const response = await fetch(url);
		const {
			data: { data },
		} = await response.json();

		return data[0];
	} catch (error) {
		console.error(error);
	}
}

async function handleQuery(event) {
	event.preventDefault();

	const query = document.querySelector('#query').value;

	searchBar.reset();

	if (isQueryEmpty(query)) {
		renderGif();
		return;
	}

	const loaderGifPath = '/sonic-ring.gif';
	renderGif('Loading...', loaderGifPath);

	const {
		title,
		file: {
			hd: {
				gif: { url },
			},
		},
	} = await fetchGif(query);
	renderGif(title, url);
}

searchBar.addEventListener('submit', handleQuery);
renderGif();
