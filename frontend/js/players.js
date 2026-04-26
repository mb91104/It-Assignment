document.addEventListener('DOMContentLoaded', () => {
  if (window.location.protocol === 'file:') {
    return; // Alerted by teams.js if multiple files are open, but let's be safe
  }

  fetch('/api/players')
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      const grid = document.getElementById('players-grid');
      if (!grid) return;
      
      if (!data || data.length === 0) {
        grid.innerHTML = '<p>No player data found.</p>';
        return;
      }

      // Sort players by runs (desc)
      const sortedPlayers = data.sort((a, b) => b.runs - a.runs);

      grid.innerHTML = sortedPlayers.map(player => `
        <div class="card">
          <h3>${player.name}</h3>
          <p><strong>Team:</strong> ${player.team}</p>
          <p><strong>Matches:</strong> ${player.matches}</p>
          <p><strong>Runs:</strong> ${player.runs}</p>
          <p><strong>Wickets:</strong> ${player.wickets}</p>
        </div>
      `).join('');
    })
    .catch(err => {
      console.error('Error fetching players:', err);
      const grid = document.getElementById('players-grid');
      if (grid) {
        grid.innerHTML = `<p>Error loading data: ${err.message}</p>`;
      }
    });
});
