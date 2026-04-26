document.addEventListener('DOMContentLoaded', () => {
  if (window.location.protocol === 'file:') {
    alert('Warning: You are opening this file directly. The data will not load because it requires a running backend server. Please visit http://localhost:3000 instead.');
    return;
  }

  fetch('/api/teams')
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      console.log('Received teams data:', data);
      const tableBody = document.querySelector('#teams-table tbody');
      if (!tableBody) return;
      
      if (!data || data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7">No data found.</td></tr>';
        return;
      }

      // Sort teams by points (desc) then NRR (desc)
      const sortedTeams = data.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        return parseFloat(b.nrr) - parseFloat(a.nrr);
      });

      tableBody.innerHTML = sortedTeams.map((team, index) => `
        <tr>
          <td>${index + 1}</td>
          <td><strong>${team.name}</strong> (${team.shortName})</td>
          <td>${team.played}</td>
          <td>${team.won}</td>
          <td>${team.lost}</td>
          <td>${team.nrr}</td>
          <td><strong>${team.points}</strong></td>
        </tr>
      `).join('');
    })
    .catch(err => {
      console.error('Error fetching teams:', err);
      const tableBody = document.querySelector('#teams-table tbody');
      if (tableBody) {
        tableBody.innerHTML = `<tr><td colspan="7">Error loading data: ${err.message}. Make sure the backend server is running on port 3000.</td></tr>`;
      }
    });
});
