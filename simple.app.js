const matches = [
    "3:4",
    "1:0",
    "2:2",
    "0:3",
    "2:1",
    "4:5",
    "1:5"
];

console.log(matches);

const results = matches.reduce( (total, game) => {
	const result = game.split(':').map(points => parseInt(points));
  
  if (result[0] > result[1]) {
  	total.win++;
  } else if (result[0] === result[1]) {
  	total.tie++;
  } else {
  	total.lose++;
  }
  
  return total;
}, { win: 0, tie: 0, lose: 0 });

console.log(results);

const calculateTotalPoints = (games) => {
	let total = 0;
  total += games.win * 3;
  total += games.tie * 1;
  
  return total;
}

console.log(calculateTotalPoints(results));

const standings = [
    { name: "Flying Unicorns FC", points: 24, previousPosition: 3 },
    { name: "Galactic Gummy Bears United", points: 23, previousPosition: 1 },
    { name: "Zombie Sharks FC", points: 21, previousPosition: 2 },
    { name: "Flamingo Ninjas FC", points: 17, previousPosition: 4 },
    { name: "Disco Llamas United", points: 17, previousPosition: 6 },
    { name: "Space Kangaroos FC", points: 15, previousPosition: 5 },
    { name: "Pirate Penguins United", points: 13, previousPosition: 7 }
];

const updatedStandings = standings.map((team,index) => {
	if(team.name === "Pirate Penguins United") {
  	team.points += calculateTotalPoints(results);
  }
  team.previousPosition = index + 1;
  return team;
})
.toSorted((a,b) => b.points - a.points)
.map((team, index) => {
	let steps = (index + 1) - team.previousPosition;
  
  if (steps < 0) {
  	steps = `+${Math.abs(steps)}`;
  } else if (steps > 0) {
  	steps = `-${steps}`;
  } else {
  	steps = `${steps}`;
  }
  
  team.changes = steps;
  return team;
});

console.log(updatedStandings);
