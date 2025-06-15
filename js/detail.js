
document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const type = params.get('type');
    const url = `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=credits`;
    const res = await fetch(url);
    const data = await res.json();

    const container = document.getElementById('details');
    container.innerHTML = `
        <h1>${data.title || data.name}</h1>
        <img src="${IMG_URL + data.poster_path}" alt="${data.title || data.name}" />
        <p>${data.overview}</p>
        <p>⭐ Rating: ${data.vote_average.toFixed(1)}</p>
    `;
});
