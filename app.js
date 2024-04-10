const HOME_TEAM = "Pirate Penguins United";

const standings = [
    { name: "Flying Unicorns FC", points: 24, previousPosition: 3 },
    { name: "Galactic Gummy Bears United", points: 23, previousPosition: 1 },
    { name: "Zombie Sharks FC", points: 19, previousPosition: 2 },
    { name: "Flamingo Ninjas FC", points: 17, previousPosition: 4 },
    { name: "Disco Llamas United", points: 17, previousPosition: 6 },
    { name: "Space Kangaroos FC", points: 15, previousPosition: 5 },
    { name: "Pirate Penguins United", points: 13, previousPosition: 7 }
];

const betterMatches = [
	  {
    	vs: "Flying Unicorns FC",
    	result: "3:4"
    },
    {
    	vs: "Space Kangaroos FC",
    	result: "1:0"
    },
    {
    	vs: "Disco Llamas United",
    	result: "1:2"
    },
    {
    	vs: "Space Kangaroos FC",
    	result: "0:3"
    },
    {
    	vs: "Flamingo Ninjas FC",
    	result: "2:1"
    },
    {
    	vs: "Zombie Sharks FC",
    	result: "2:1"
    },
    {
    	vs: "Galactic Gummy Bears United",
    	result: "1:5"
    }
];

const calculateMatchesResults = (matches, standings) => {
	const results = {};
  
  standings.forEach(team => results[team.name] = { win: 0, tie: 0, lose: 0 	});
  
  
  matches.forEach(match => {
  	const result = match.result.split(':').map(points => parseInt(points));

      if (result[0] > result[1]) {
        results[HOME_TEAM].win++;
        results[match.vs].lose++;
      } else if (result[0] === result[1]) {
        results[HOME_TEAM].tie++;
        results[match.vs].tie++;
      } else {
        results[HOME_TEAM].lose++;
        results[match.vs].win++;
      }
  });
  
  return results;
}

const results = calculateMatchesResults(betterMatches, standings);

const calculateTotalPoints = (games) => {
	let total = 0;
  total += games.win * 3;
  total += games.tie * 1;
  
  return total;
}

const getTotalPoints = (results) => {
	const updatedResults = {...results};
  
  for(const team in results) {
  	updatedResults[team].total = calculateTotalPoints(results[team]);
  }
  
  return updatedResults;  
}

const updatedPoints = getTotalPoints(results);

const updateStandings = (standings, points) => {
  return standings.map((team,index) => {

    team.points += points[team.name].total;
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
}

console.log(updateStandings(standings, updatedPoints));
