//Initial Variable Setup
var endGame = false; 
//var Players

var players = [	
	{
	id : 0,
	title: "One",
	location: "London",
	class: "Civilian",
	actions: 4,
	hand: []
    },{
    id : 1,
	title: "Two",
	location: "London",
	class: "Civilian",
	actions: 4,
	hand: []
    },{
    id: 2,
	title: "Three",
	location: "London",
	class: "Civilian",
	actions: 4,
	hand: []
    },{
    id : 3,
	title: "Four",
	location: "London",
	class: "Civilian",
	actions: 4,
	hand: []
    }
];

var cities = [
	{
		title:"London",
		isP1Here: false,
		canMoveto: ["Paris", "New York"]
	},{
		title:"Paris",
		isP1Here: false,
		canMoveto: ["London"]
	},{
		title:"New York",
		isP1Here: true,
		canMoveto: ["London"]
	}
];



// Functions for all the actiosn that can be taken

//move
function playerMove(player){
	//find move optionss
	var currentCity = player.location;
	var moveLocations = cities[getLocation(currentCity)].canMoveto;
	console.log("You are in " + currentCity);
	console.log("You can move to " + moveLocations);
//ask for new location
	moveChoice = prompt ("You are in " + currentCity +". You can move to " + moveLocations + " Where do you want to go?");
	//match movechoice ot the array
	player.location = moveChoice;
return
};

function getNewLocation(newLocation){
	for(var i=0; i<cities.length; i++){
		if(cities[i].title === newLocation) return i;
	};
};

function playerTreat(){
	console.log("Treat not Ready!");
};

function playerCure(){
	console.log("Cure not Ready!");
};

function playerTrade(){
	console.log("Trade not Ready!");
};

function playerPass(turnActions){
//console.log("Passing turn - You had" + turnActions + "left");
var turnActions = -1
return turnActions
//	console.log(turnActions); //Is -1 but Doesnt pass this to Parent Function!?
};

function getLocation(currentCity){
	for(var i=0; i<cities.length; i++){
		console.log[i];
		if(cities[i].title === currentCity) return i;
	};
};

function initTurn(player,turnActions){
	var turnActions = player.actions;
	while (turnActions > 0){
		console.log("You are in " + player.location);
		console.log("You can move to: " + cities[getLocation(player.location)].canMoveto);
		console.log("You have " + turnActions+ " actions left");
		userInput(player,turnActions);
		turnActions--;
	};
	endTurn();
};

function userInput(player, turnActions){
	console.log ("Number of Actions left " + turnActions);
		var action = prompt("you are Player " + player.id + "What would you like to do? 1-Move 2-Treat 3-Cure 4-Trade 5-Pass" );
			if (action == "1") { 
				playerMove(player);
			} else if (action == "2") {
				playerTreat(player);
			} else if(action == "3") {
				playerCure(player);
			} else if(action == "4") {
				playerTrade(player);
			} else if(action == "5") {
				console.log("Passing");
				//var turnActions = playerPass();
				var turnActions = -1
				return;
			} else userInput(player);
		console.log ("after UserInput: " + turnActions); //
		return;
};

function endTurn(){
	console.log("Turn has ended!");
	console.log("Player deck Stuff not functioning yet") //where playerhand function should go.
	console.log("Infection Deck Stuff not happening yet") //where infection function should go.

	//what happens after the turn?
};
function endgame(){
	console.log("Game has has ended!");
	console.log("Player deck Stuff not functioning yet") //where playerhand function should go.
	console.log("Infection Deck Stuff not happening yet") //where infection function should go.

	//what happens after the turn?
};

// ***Player GAME LOOP ***

function playerLoop(){
	for (var i=0;i<4;i++){
	var player = players[i];
	console.log(player);
	console.log(player.id);
	initTurn(player);

	};
};

// Start
playerLoop();
endGame();