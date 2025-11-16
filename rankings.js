// rankings.js
let currentRankings = [];

// Function to fetch and display rankings
async function fetchRankings() {
    try {
        // For now, we'll simulate data
        const mockRankings = [
            { id: 1, title: 'Change (In the House of Flies)', album: 'White Pony', elo_rating: 1250, vote_count: 42 },
            { id: 2, title: 'Digital Bath', album: 'White Pony', elo_rating: 1220, vote_count: 38 },
            { id: 3, title: 'My Own Summer (Shove It)', album: 'Around the Fur', elo_rating: 1200, vote_count: 35 },
            { id: 4, title: 'Be Quiet and Drive (Far Away)', album: 'Around the Fur', elo_rating: 1180, vote_count: 32 },
            { id: 5, title: 'Passenger', album: 'White Pony', elo_rating: 1150, vote_count: 30 }
        ];
        
        updateRankingsUI(mockRankings);
        currentRankings = mockRankings;
    } catch (error) {
        console.error('Error fetching rankings:', error);
        const rankingsList = document.getElementById('rankings-list');
        if (rankingsList) {
            rankingsList.innerHTML = '<div class="text-red-400">Error loading rankings</div>';
        }
    }
}

// Function to update the rankings UI
function updateRankingsUI(rankings) {
    const rankingsList = document.getElementById('rankings-list');
    if (!rankingsList) {
        console.error('Rankings list element not found');
        return;
    }

    rankingsList.innerHTML = rankings.map((song, index) => {
        const rankChange = getRankChange(song.id, index + 1);
        const changeIndicator = rankChange ? 
            (rankChange > 0 ? `↑${rankChange}` : `↓${Math.abs(rankChange)}`) : 
            '•';
        
        return `
            <div class="rank-item flex items-center space-x-3" data-song-id="${song.id}">
                <div class="rank-number">${index + 1}</div>
                <div class="flex-1 min-w-0">
                    <div class="rank-song">${song.title}</div>
                    <div class="rank-album">${song.album}</div>
                </div>
                <div class="rank-elo">
                    ${Math.round(song.elo_rating)}
                    <div class="text-xs text-gray-500">${changeIndicator}</div>
                </div>
            </div>
        `;
    }).join('');

    // Add animation to updated items
    document.querySelectorAll('.rank-item').forEach(item => {
        item.classList.add('rank-updated');
        setTimeout(() => item.classList.remove('rank-updated'), 1500);
    });
}

// Track rank changes
function getRankChange(songId, newRank) {
    const previousRanking = currentRankings.findIndex(song => song.id === songId) + 1;
    return previousRanking ? previousRanking - newRank : 0;
}

// Toggle rankings sidebar
function setupRankingsUI() {
    const sidebar = document.getElementById('rankings-sidebar');
    const showButton = document.getElementById('show-rankings');
    const closeButton = document.getElementById('close-rankings');

    if (!sidebar || !showButton || !closeButton) {
        console.error('Missing required elements for rankings UI');
        return;
    }

    showButton.addEventListener('click', () => {
        console.log('Show rankings clicked');
        sidebar.classList.remove('translate-x-full');
        showButton.classList.add('hidden');
    });

    closeButton.addEventListener('click', () => {
        console.log('Close rankings clicked');
        sidebar.classList.add('translate-x-full');
        showButton.classList.remove('hidden');
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing rankings...');
    setupRankingsUI();
    fetchRankings();
    
    // Simulate updates every 10 seconds
    setInterval(() => {
        console.log('Updating rankings...');
        fetchRankings();
    }, 10000);
});