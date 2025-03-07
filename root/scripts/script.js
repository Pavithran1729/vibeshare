// DOM Elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const selectedSongsList = document.getElementById('selectedSongs');
const playlistCounter = document.getElementById('playlistCounter');
const shareButton = document.getElementById('shareButton');
const shareDialog = document.getElementById('shareDialog');
const closeDialog = document.getElementById('closeDialog');
const downloadButton = document.getElementById('downloadButton');
const playlistPreview = document.getElementById('playlistPreview');

//
async function searchSongs(query) {
    try {
        const response = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error searching iTunes:', error);
        searchResults.innerHTML = '<li>Failed to search songs. Please try again.</li>';
        return [];
    }
}

// Add this event listener
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = "anirudh"; // Test query
    const results = await searchSongs(query);
    
    // Display results in the UI
    searchResults.innerHTML = results.map(song => `
        <li class="song-item">
            <img src="${song.artworkUrl100}" alt="${song.trackName}" class="song-artwork">
            <div class="song-info">
                <div class="song-title">${song.trackName}</div>
                <div class="song-artist">${song.artistName}</div>
            </div>
            <button class="add-button">Add</button>
        </li>
    `).join('');
});