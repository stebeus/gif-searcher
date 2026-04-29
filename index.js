const form = document.querySelector('form');
const gifTitle = document.querySelector('h2');
const img = document.querySelector('img');

const initialGif = 'sonic-waiting-1';

async function fetchGif(gif = initialGif) {
	const apiKey = '6OXtOEb9inKrHI7HYhBObJYoDTLSpfN139Gm6AXrX4l96Tb4IbPJ6vIczCDg6PRp';
	const apiUrl = `https://api.klipy.com/api/v1/${apiKey}/gifs/search?per_page=8&q=${gif}`;

	try {
		const response = await fetch(apiUrl);

		const {
			data: { data },
		} = await response.json();

		return data[0];
	} catch (error) {
		console.error(error);
	}
}

async function setGif(gifTitle, image, query) {
	const {
		title,
		file: {
			hd: {
				gif: { url },
			},
		},
	} = await fetchGif(query);

	gifTitle.textContent = title;
	image.src = url;
}

function handleQuery(event) {
	event.preventDefault();
	const query = document.querySelector('#query').value;
	setGif(gifTitle, img, query);
}

form.addEventListener('submit', handleQuery);

setGif(gifTitle, img);
