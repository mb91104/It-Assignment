const teams = [
  { id: 1, name: "Punjab Kings", shortName: "PBKS", played: 8, won: 6, lost: 1, points: 13, nrr: "+1.043" },
  { id: 2, name: "Royal Challengers Bengaluru", shortName: "RCB", played: 9, won: 6, lost: 3, points: 12, nrr: "+1.420" },
  { id: 3, name: "Sunrisers Hyderabad", shortName: "SRH", played: 9, won: 6, lost: 3, points: 12, nrr: "+0.832" },
  { id: 4, name: "Rajasthan Royals", shortName: "RR", played: 10, won: 6, lost: 4, points: 12, nrr: "+0.510" },
  { id: 5, name: "Gujarat Titans", shortName: "GT", played: 9, won: 5, lost: 4, points: 10, nrr: "-0.192" },
  { id: 6, name: "Chennai Super Kings", shortName: "CSK", played: 9, won: 4, lost: 5, points: 8, nrr: "+0.005" },
  { id: 7, name: "Delhi Capitals", shortName: "DC", played: 9, won: 4, lost: 5, points: 8, nrr: "-0.895" },
  { id: 8, name: "Kolkata Knight Riders", shortName: "KKR", played: 8, won: 2, lost: 5, points: 5, nrr: "-0.751" },
  { id: 9, name: "Mumbai Indians", shortName: "MI", played: 9, won: 2, lost: 7, points: 4, nrr: "-0.803" },
  { id: 10, name: "Lucknow Super Giants", shortName: "LSG", played: 8, won: 2, lost: 6, points: 4, nrr: "-1.106" }
];

const players = [
  { id: 1, name: "KL Rahul", team: "DC", runs: 433, wickets: 0, matches: 9 },
  { id: 2, name: "Abhishek Sharma", team: "SRH", runs: 425, wickets: 0, matches: 9 },
  { id: 3, name: "Heinrich Klaasen", team: "SRH", runs: 414, wickets: 0, matches: 9 },
  { id: 4, name: "Vaibhav Sooryavanshi", team: "RR", runs: 404, wickets: 0, matches: 10 },
  { id: 5, name: "Virat Kohli", team: "RCB", runs: 379, wickets: 0, matches: 9 },
  { id: 6, name: "Bhuvneshwar Kumar", team: "RCB", runs: 10, wickets: 17, matches: 9 },
  { id: 7, name: "Eshan Malinga", team: "SRH", runs: 5, wickets: 15, matches: 9 },
  { id: 8, name: "Jofra Archer", team: "RR", runs: 20, wickets: 14, matches: 10 },
  { id: 9, name: "Anshul Kamboj", team: "CSK", runs: 15, wickets: 14, matches: 9 },
  { id: 10, name: "Kagiso Rabada", team: "GT", runs: 30, wickets: 14, matches: 9 }
];

const matches = [
  { id: 24, team1: "MI", team2: "PBKS", date: "2026-04-16", venue: "Wankhede Stadium", result: "Kings won by 7 wickets" },
  { id: 25, team1: "GT", team2: "KKR", date: "2026-04-17", venue: "Narendra Modi Stadium", result: "Titans won by 5 wickets" },
  { id: 26, team1: "RCB", team2: "DC", date: "2026-04-18", venue: "Chinnaswamy Stadium", result: "Capitals won by 6 wickets" },
  { id: 27, team1: "SRH", team2: "CSK", date: "2026-04-18", venue: "Rajiv Gandhi Stadium", result: "Sunrisers won by 10 runs" },
  { id: 28, team1: "KKR", team2: "RR", date: "2026-04-19", venue: "Eden Gardens", result: "Knight Riders won by 4 wickets" },
  { id: 29, team1: "PBKS", team2: "LSG", date: "2026-04-19", venue: "Mullanpur", result: "Kings won by 54 runs" },
  { id: 30, team1: "GT", team2: "MI", date: "2026-04-20", venue: "Narendra Modi Stadium", result: "Indians won by 99 runs" },
  { id: 31, team1: "SRH", team2: "DC", date: "2026-04-21", venue: "Rajiv Gandhi Stadium", result: "Sunrisers won by 47 runs" },
  { id: 32, team1: "LSG", team2: "RR", date: "2026-04-22", venue: "Ekana Stadium", result: "Royals won by 40 runs" },
  { id: 33, team1: "MI", team2: "CSK", date: "2026-04-23", venue: "Wankhede Stadium", result: "Super Kings won by 103 runs" },
  { id: 34, team1: "RCB", team2: "GT", date: "2026-04-24", venue: "Chinnaswamy Stadium", result: "Royal Challengers won by 5 wickets" },
  { id: 35, team1: "DC", team2: "PBKS", date: "2026-04-25", venue: "Arun Jaitley Stadium", result: "Kings won by 6 wickets" },
  { id: 36, team1: "RR", team2: "SRH", date: "2026-04-25", venue: "Sawai Mansingh Stadium", result: "Sunrisers won by 5 wickets" },
  { id: 37, team1: "CSK", team2: "GT", date: "2026-04-26", venue: "Chepauk Stadium", result: "Titans won by 8 wickets" },
  { id: 38, team1: "LSG", team2: "KKR", date: "2026-04-26", venue: "Ekana Stadium", result: "Knight Riders won the Super Over" },
  { id: 39, team1: "DC", team2: "RCB", date: "2026-04-27", venue: "Arun Jaitley Stadium", result: "Royal Challengers won by 9 wickets" },
  { id: 40, team1: "PBKS", team2: "RR", date: "2026-04-28", venue: "Mullanpur", result: "Royals won by 6 wickets" },
  { id: 41, team1: "MI", team2: "SRH", date: "2026-04-29", venue: "Wankhede Stadium", result: "Sunrisers won by 6 wickets" },
  { id: 42, team1: "GT", team2: "RCB", date: "2026-04-30", venue: "Narendra Modi Stadium", result: "Titans won by 4 wickets" },
  { id: 43, team1: "RR", team2: "DC", date: "2026-05-01", venue: "Sawai Mansingh Stadium", result: "Capitals won by 7 wickets" },
  { id: 44, team1: "CSK", team2: "MI", date: "2026-05-02", venue: "Chepauk Stadium", result: "Super Kings won by 8 wickets" }
];

module.exports = { teams, players, matches };
