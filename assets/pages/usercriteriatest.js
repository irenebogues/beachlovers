const apiData = [
  {
    bike: "yes",
    path: "no",
    surfing: "yes",
    beachName: "Santa Monica"
  },
  {
    bike: "no",
    path: "no",
    surfing: "yes",
    beachName: "Manhattan Beach"
  },
  {
    bike: "yes",
    path: "yes",
    surfing: "yes",
    beachName: "Malibu Beach"
  },
  {
    bike: "yes",
    path: "no",
    surfing: "yes",
    beachName: "San Francisco"
  },
  {
    bike: "no",
    path: "no",
    surfing: "no",
    beachName: "Pelican Beach"
  }
]
const userChoice = {
  bike: "no",
  path: "no",
  surfing: "yes",
  
}
  const selectedBeaches = [];

//Filter out all apiData
for (let i=0; i<apiData.length; i++){
  //user meets criteria
  let beachMatch = true;
  for (let key in userChoice) {
    if (userChoice[key]!==apiData[i][key]){
      beachMatch = false;
    }
  }
  if (beachMatch===true) {
    selectedBeaches.push(apiData[i]);
  }
}

console.log(selectedBeaches)