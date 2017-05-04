var board = {
	planet:"Earth 2017", //i dont actually know what this is:
	players:[], //Name of player/class/hand
	cities:[],    //all the cities
	difficulty:[], //probably object that contains name/epi cards.
	iDeck:[],	//infectiondeck
	iPile:[],	//infection discardpile
	pDeck:[],	//playerdeck
	pPile:[],	//player discard pile
	sDeck:[],   //deck for event cards
	eDeck:[], //deck of event cards
	outbreaks:0,	//outbreak counter
	iRate:[2,2,2,3,3,4,4],	//infection rate
	cures: {     			//Cure Tracker
			redLevel:0,
			blueLevel:0,
			yellowLevel:0,
			blackLevel: 0
			},
	events:["Airlift", "Commercial Travel Ban", "Government Interferance", "Remote Treatment", "New Assignment"]
	};


//City Model
function City(name, color, population, linkedCities) {
	this.name = name,
	this.color = color,
	this.population = population,
	this.linkedCities = linkedCities,
	this.red = 0,
	this.black = 0,
	this.blue = 0,
	this.yellow = 0,
	this.researchStation = false;
};
function ICard(name, color){
	this.name = name,
	this.color = color
};
function CCard(name, color){
	this.name = name,
	this.color = color,
	type = "city"
};
function ECard(name){
	this.name = name
};
function EpiCard(name){
	this.name = "Epidemic!"
};
function Player(name, role,hand){
	this.name = name,
	this.role = role,
	this.hand = [];
};
function Difficulty(name, epiCards){
	this.name = name
	this.epiCards = epiCards;
}

//build cities
var cityBuild = function worldBuilder(){
	board.cities.push(new City("London", "Blue", "8000000", ["New York", "Paris"]));
	board.cities.push(new City("New York", "Blue", "9000000", ["Chicago", "Miami"]));
	board.cities.push(new City("Miami", "Yellow", "5000000", ["New York", "Mexico City"]));
	board.cities.push(new City("Mexico City", "Yellow", "12000000", ["Los Angeles", "Miami", "Bogata"]));
};
//build deck
var deckBuild = function(iCardNumber){
	for (var i = 0; i < board.cities.length; i++){
		var newCardName = board.cities[i].name;
		var newCardColor = board.cities[i].color;
		board.iDeck.push(new ICard(newCardName,newCardColor));
		board.pDeck.push(new CCard(newCardName,newCardColor));
	};
};
//build eventcards and place into pDeck
var eBuild = function(iCardNumber){
	for (var i = 0; i < board.players.length; i++){
		var newCardName = board.events[i];
		board.pDeck.push(new ECard(newCardName));
	};
};

//shuffle cards
var shuffle=function(deck){
	for (i=deck.length-1; i >0; i-=1){
		var j = Math.floor(Math.random()*(i + 1))
		var temp = deck[i];
		deck[i]=deck[j];
		deck[j]=temp
	};
};

var epiBuild=function(cards){
	for (i = 0; i < cards; i++){
		board.pDeck.push(new EpiCard);
	}
}


var playerBuild = function(){
	board.difficulty.push(new Difficulty("Standard", 4)); //fixed difficulty for now
	var players=4; //choose number of players, 4 for now.
	//build an array of players. Fixed names and roles for now
	for(var i = 0; i<players; i++){ //for each player choose name and role
		var name = ["Tom","Jane","Mike","Sam"];
		var role = ["Medic","Generalist","Scientist","Researcher"];
		board.players.push(new Player(name[i],role[i]));
	};
};



//SETUP
	cityBuild(); //build cities
	deckBuild(); //make player and infection decks
	playerBuild()//decide number of players,classes,difficulty
	shuffle(board.iDeck); //shuffle iDeck
	shuffle(board.events); //shuffle events
	eBuild();  //take right amoung of event cards into pDeck
	shuffle(board.pDeck); //shuffle pdeck
	epiBuild(board.difficulty[0].epiCards);
	//build and insert epiCards
	//dealPCards; //deal 2 pdeck cards to each player
	//insertEpiCards(difficulty);
	///infect();
	//placePlayers; //put players into right location

//END SETUP

//MAINLOOP
	//chooseplayer
	//choices x 4
	//dealPcards
	//infect()
//ENDMAINLOOP

//SPECIAL
	//epidemic
	//outbreak
	//eventCard
	//classEffect
	//gameOver
//EndSpecial

console.log(board);