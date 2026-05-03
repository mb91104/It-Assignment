document.addEventListener('DOMContentLoaded', async () => {
    let allPlayers = [];
    const radar = new PlayerComparisonRadar('radar-container', {
        width: 450,
        height: 450,
        maxValue: 100,
        levels: 5
    });

    const p1Select = document.getElementById('player1-select');
    const p2Select = document.getElementById('player2-select');

    try {
        const res = await fetchWithAuth('/api/players');
        if (!res) return;
        allPlayers = await res.json();
        
        populateDropdowns();

        p1Select.addEventListener('change', () => {
            handleSelectionChange();
            filterSecondDropdown();
        });
        
        p2Select.addEventListener('change', () => {
            handleSelectionChange();
        });

    } catch (err) {
        console.error('Error fetching players:', err);
    }

    function getPlayerType(p) {
        // Simple heuristic: if runs/wickets ratio is high, they are a batter
        return (p.runs > p.wickets * 20) ? 'Batter' : 'Bowler';
    }

    function populateDropdowns(filteredPlayers = null) {
        const playersToShow = filteredPlayers || allPlayers;
        const options = playersToShow.sort((a,b) => a.name.localeCompare(b.name)).map(p => 
            `<option value="${p.id}">${p.name} (${p.team}) - ${getPlayerType(p)}</option>`
        ).join('');

        const defaultP1 = '<option value="">Select Player 1</option>';
        const defaultP2 = '<option value="">Select Player 2</option>';

        // We only want to populate p1 once or when reset
        if (!filteredPlayers) {
            p1Select.innerHTML = defaultP1 + options;
        }
        p2Select.innerHTML = defaultP2 + options;
    }

    function filterSecondDropdown() {
        const p1Id = p1Select.value;
        if (!p1Id) {
            populateDropdowns();
            return;
        }

        const p1 = allPlayers.find(p => p.id == p1Id);
        const type = getPlayerType(p1);
        
        const filtered = allPlayers.filter(p => getPlayerType(p) === type && p.id != p1Id);
        
        // Update p2 options
        const options = filtered.sort((a,b) => a.name.localeCompare(b.name)).map(p => 
            `<option value="${p.id}">${p.name} (${p.team})</option>`
        ).join('');
        
        p2Select.innerHTML = `<option value="">Select ${type} to Compare</option>` + options;
    }

    function generateAttributes(player) {
        const runs = player.runs || 0;
        const wickets = player.wickets || 0;
        const matches = player.matches || 1;
        const type = getPlayerType(player);

        if (type === 'Batter') {
            return {
                "Power": Math.round(Math.min(60 + (runs / 8), 99)),
                "Timing": Math.round(Math.min(70 + (runs / 15), 99)),
                "Running": Math.round(Math.min(75 + (runs / 40), 99)),
                "Strike Rate": Math.round(Math.min(80 + (runs / 20), 99)),
                "Consistency": Math.round(Math.min(65 + (matches * 3), 99)),
                "Experience": Math.round(Math.min(50 + (matches * 5), 99))
            };
        } else {
            return {
                "Pace": Math.round(Math.min(70 + (wickets * 1.5), 99)),
                "Swing": Math.round(Math.min(65 + (wickets * 2), 99)),
                "Accuracy": Math.round(Math.min(75 + (wickets * 1.2), 99)),
                "Wicket Taking": Math.round(Math.min(60 + (wickets * 2.5), 99)),
                "Economy": Math.round(Math.min(70 + (wickets * 0.8), 99)),
                "Experience": Math.round(Math.min(50 + (matches * 5), 99))
            };
        }
    }

    function handleSelectionChange() {
        const p1Id = p1Select.value;
        const p2Id = p2Select.value;

        const p1 = allPlayers.find(p => p.id == p1Id);
        const p2 = allPlayers.find(p => p.id == p2Id);

        renderPlayerCard(p1, 'player1-card', p2);
        renderPlayerCard(p2, 'player2-card', p1);

        if (p1 && p2) {
            const attr1 = generateAttributes(p1);
            const attr2 = generateAttributes(p2);
            
            radar.render({
                labels: Object.keys(attr1),
                playerA: {
                    name: p1.name,
                    color: "#00FFFF",
                    data: Object.values(attr1)
                },
                playerB: {
                    name: p2.name,
                    color: "#A855F7",
                    data: Object.values(attr2)
                },
                maxValue: 100
            });
        } else {
            document.getElementById('radar-container').innerHTML = '<p style="color: var(--text-muted);">Select two players of the same type to see the radar</p>';
        }
    }

    function renderPlayerCard(player, cardId, opponent) {
        const card = document.getElementById(cardId);
        const pNum = cardId.includes('1') ? 'p1' : 'p2';
        
        if (!player) {
            card.className = 'card compare-card';
            card.innerHTML = `
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; opacity: 0.3;">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <p style="margin-top: 1rem; font-size: 0.8rem; font-weight: 600;">Awaiting selection...</p>
                </div>`;
            return;
        }

        card.className = `card compare-card active-${pNum}`;
        const isWinner = (val, oppVal) => opponent && val > oppVal ? 'winner' : '';

        card.innerHTML = `
            <div style="margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1rem;">
                <h3 style="margin-bottom: 0.25rem; font-size: 1.25rem; color: var(--text-primary);">${player.name}</h3>
                <span style="font-size: 0.7rem; background: var(--bg-primary); padding: 0.2rem 0.5rem; border-radius: 4px; color: var(--accent-blue); font-weight: 800; letter-spacing: 0.05em;">${player.team}</span>
            </div>
            
            <div class="stat-row">
                <span class="stat-label">Matches</span>
                <span class="stat-value ${isWinner(player.matches, opponent?.matches)}">${player.matches}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Runs</span>
                <span class="stat-value ${isWinner(player.runs, opponent?.runs)}">${player.runs}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Wickets</span>
                <span class="stat-value ${isWinner(player.wickets, opponent?.wickets)}">${player.wickets}</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Avg Runs</span>
                <span class="stat-value">${(player.runs / (player.matches || 1)).toFixed(1)}</span>
            </div>
        `;
    }
});
