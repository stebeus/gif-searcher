const form = document.querySelector('form');
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

async function handleQuery(event) {
	event.preventDefault();

	const formData = new FormData();
	const query = formData.values();

	const {
		slug,
		file: {
			hd: {
				gif: { url },
			},
		},
	} = await fetchGif(query);

	img.alt = slug;
	img.src = url;
}

form.addEventListener('submit', handleQuery);
