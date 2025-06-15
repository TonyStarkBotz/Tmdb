
document.addEventListener('DOMContentLoaded', () => {
    fetchList('movie', 'movies');
    fetchList('tv', 'series');

    document.getElementById('searchForm').addEventListener('submit', async e => {
        e.preventDefault();
        const query = document.getElementById('searchInput').value;
        if (!query) return;
        const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log('Search results:', data);
        alert('Search result console-logged. Implement redirection to result.html if needed.');
    });
});

async function fetchList(type, containerId) {
    const url = `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url);
    const data = await res.json();
    const container = document.getElementById(containerId);
    data.results.forEach(item => {
        const el = document.createElement('div');
        el.className = 'card';
        el.innerHTML = `
            <img src="${IMG_URL + item.poster_path}" alt="${item.title||item.name}">
            <div class="info">
                <h3>${item.title || item.name}</h3>
                <span>⭐ ${item.vote_average.toFixed(1)}</span>
            </div>`;
        el.onclick = () => window.location.href = `detail.html?id=${item.id}&type=${type}`;
        container.append(el);
    });
}
