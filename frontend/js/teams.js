document.addEventListener('DOMContentLoaded', async () => {
  if (window.location.protocol === 'file:') {
    alert('Warning: You are opening this file directly. The data will not load because it requires a running backend server. Please visit http://localhost:3000 instead.');
    return;
  }

  try {
    const res = await fetchWithAuth('/api/teams');
    if (!res) return; // fetchWithAuth might redirect
    
    const data = await res.json();
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
        <td>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 28px; height: 28px; background: transparent; overflow: hidden; flex-shrink: 0;">
              <img src="${team.logo}" alt="${team.shortName}" style="width: 100%; height: 100%; object-fit: contain;" onerror="this.style.display='none'">
            </div>
            <span><strong>${team.name}</strong> (${team.shortName})</span>
          </div>
        </td>
        <td>${team.played}</td>
        <td>${team.won}</td>
        <td>${team.lost}</td>
        <td>${team.nrr}</td>
        <td><strong>${team.points}</strong></td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Error fetching teams:', err);
    const tableBody = document.querySelector('#teams-table tbody');
    if (tableBody) {
      tableBody.innerHTML = `<tr><td colspan="7">Error loading data: ${err.message}. Make sure the backend server is running on port 3000.</td></tr>`;
    }
  }
});
