document.addEventListener('DOMContentLoaded', () => {
  if (window.location.protocol === 'file:') {
    return;
  }

  fetch('/api/matches')
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      const grid = document.getElementById('matches-grid');
      if (!grid) return;

      if (!data || data.length === 0) {
        grid.innerHTML = '<p>No match data found.</p>';
        return;
      }

      grid.innerHTML = data.map(match => `
        <div class="card">
          <h3>${match.team1} vs ${match.team2}</h3>
          <p><strong>Date:</strong> ${match.date}</p>
          <p><strong>Venue:</strong> ${match.venue}</p>
          <p class="${match.result === 'Upcoming' ? 'status-upcoming' : 'status-result'}">
            <strong>Result:</strong> ${match.result}
          </p>
        </div>
      `).join('');
    })
    .catch(err => {
      console.error('Error fetching matches:', err);
      const grid = document.getElementById('matches-grid');
      if (grid) {
        grid.innerHTML = `<p>Error loading data: ${err.message}</p>`;
      }
    });
});
