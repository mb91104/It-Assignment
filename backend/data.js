const teams = [
  { id: 1, name: "Chennai Super Kings", shortName: "CSK", played: 14, won: 10, lost: 4, points: 20, nrr: "+0.572" },
  { id: 2, name: "Mumbai Indians", shortName: "MI", played: 14, won: 9, lost: 5, points: 18, nrr: "+0.450" },
  { id: 3, name: "Royal Challengers Bengaluru", shortName: "RCB", played: 14, won: 8, lost: 6, points: 16, nrr: "+0.120" },
  { id: 4, name: "Gujarat Titans", shortName: "GT", played: 14, won: 8, lost: 6, points: 16, nrr: "+0.010" },
  { id: 5, name: "Lucknow Super Giants", shortName: "LSG", played: 14, won: 7, lost: 7, points: 14, nrr: "-0.150" },
  { id: 6, name: "Delhi Capitals", shortName: "DC", played: 14, won: 6, lost: 8, points: 12, nrr: "-0.230" },
  { id: 7, name: "Rajasthan Royals", shortName: "RR", played: 14, won: 6, lost: 8, points: 12, nrr: "-0.310" },
  { id: 8, name: "Kolkata Knight Riders", shortName: "KKR", played: 14, won: 5, lost: 9, points: 10, nrr: "-0.420" },
  { id: 9, name: "Punjab Kings", shortName: "PBKS", played: 14, won: 5, lost: 9, points: 10, nrr: "-0.510" },
  { id: 10, name: "Sunrisers Hyderabad", shortName: "SRH", played: 14, won: 4, lost: 10, points: 8, nrr: "-0.650" }
];

const players = [
  { id: 1, name: "Virat Kohli", team: "RCB", runs: 720, wickets: 0, matches: 14 },
  { id: 2, name: "Ruturaj Gaikwad", team: "CSK", runs: 645, wickets: 0, matches: 14 },
  { id: 3, name: "Shubman Gill", team: "GT", runs: 610, wickets: 0, matches: 14 },
  { id: 4, name: "Jasprit Bumrah", team: "MI", runs: 45, wickets: 28, matches: 14 },
  { id: 5, name: "Rashid Khan", team: "GT", runs: 120, wickets: 22, matches: 14 },
  { id: 6, name: "Yuzvendra Chahal", team: "RR", runs: 10, wickets: 24, matches: 14 },
  { id: 7, name: "Suryakumar Yadav", team: "MI", runs: 580, wickets: 0, matches: 14 },
  { id: 8, name: "Mohammed Shami", team: "GT", runs: 20, wickets: 20, matches: 14 },
  { id: 9, name: "Ravindra Jadeja", team: "CSK", runs: 280, wickets: 18, matches: 14 },
  { id: 10, name: "KL Rahul", team: "LSG", runs: 520, wickets: 0, matches: 14 }
];

const matches = [
  { id: 1, team1: "CSK", team2: "MI", date: "2026-03-22", venue: "Chepauk Stadium", result: "CSK won by 15 runs" },
  { id: 2, team1: "RCB", team2: "KKR", date: "2026-03-23", venue: "Chinnaswamy Stadium", result: "RCB won by 7 wickets" },
  { id: 3, team1: "GT", team2: "LSG", date: "2026-03-24", venue: "Narendra Modi Stadium", result: "GT won by 3 wickets" },
  { id: 4, team1: "DC", team2: "RR", date: "2026-03-25", venue: "Arun Jaitley Stadium", result: "Upcoming" },
  { id: 5, team1: "SRH", team2: "PBKS", date: "2026-03-26", venue: "Rajiv Gandhi Stadium", result: "Upcoming" },
  { id: 6, team1: "CSK", team2: "RCB", date: "2026-03-28", venue: "Chepauk Stadium", result: "Upcoming" },
  { id: 7, team1: "MI", team2: "GT", date: "2026-03-29", venue: "Wankhede Stadium", result: "Upcoming" }
];

module.exports = { teams, players, matches };
