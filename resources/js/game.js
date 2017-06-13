var board = {
	planet:"Earth 2017", //i dont actually know what this is:
	tableCity:"", //the currentCity in Play
	tableCard:{}, //the Current card in Play
	controls:{}, //global variables to keep track of that dont fall into another category
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
	currentInfectionLevel: 0,
	iRate:[2,2,2,3,3,4,4],	//infection rate
	cures: {     			//Cure Tracker
			redCureStatus:"Active",
			blueCureStatus:"Active",
			yellowCureStatus:"Active",
			blackCureStatus: "Active"
		},
	bluePool: 24,
	redPool: 24,
	yellowPool: 24,
	blackPool: 24,
	events:["Airlift", "Commercial Travel Ban", "Government Interferance", "Remote Treatment", "New Assignment"]
	};
	
board.controls.actions = 4; //how many actions per turn
board.controls.sequence = 0; //tracks who's turn it is.



function findCity(city){
	            return city.name == board.tableCity;
};

//Drawing the board over a picture of the world.
 function draw() {
      var canvas = document.getElementById('map');
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
		//Build the Travel Lines
		ctx.lineWidth="2";
		ctx.strokeStyle="white";
		ctx.fillStyle = "white";
		ctx.font = '1em  Montserrat';
		for (var i = 0; i<board.cities.length; i++){
			for (var j=0; j<board.cities[i].linkedCities.length; j++){	
				board.tableCity = board.cities[i].linkedCities[j];
				var target =  board.cities.findIndex(findCity);
				ctx.beginPath();
				ctx.moveTo(board.cities[i].cityX+7, board.cities[i].cityY+7);
				var ferryText = ("Ferry to " + board.cities[target].name);
				//special case lines
				if (board.cities[i].name === "Sydney" && board.cities[target].name === "Los Angeles") {
					ctx.lineTo(4000, 1100);
					ctx.fillText(ferryText,3760,1331);
				}else if (board.cities[i].name === "Los Angeles" && board.cities[target].name === "Sydney"){
					ctx.lineTo(0, 1040);
					ctx.fillText(ferryText,400,830);
				}else if (board.cities[i].name === "San Francisco" && board.cities[target].name === "Tokyo"){
					ctx.lineTo(0, 529);
					ctx.fillText(ferryText,200,529);
				}else if (board.cities[i].name === "Tokyo" && board.cities[target].name === "San Francisco") {
					ctx.lineTo(4000, 529)
					ctx.fillText(ferryText,3720,550);
				}else if (board.cities[i].name === "Manila" && board.cities[target].name === "San Francisco"){
					ctx.lineTo(4000, 800);
					ctx.fillText(ferryText,3700,950);
				}else if (board.cities[i].name === "San Francisco" && board.cities[target].name === "Manila"){
					ctx.lineTo(0, 800);
					ctx.fillText(ferryText,270,710);
				}else{
				ctx.lineTo(board.cities[target].cityX+7,  board.cities[target].cityY+7);
				
				};
				ctx.stroke();
			};
		}; //end of cities loop

		//Place cities OVER the lines, choosing right color for each one
		for (var i = 0; i<board.cities.length; i++){
			//choosing the right colour
		if (board.cities[i].researchStation){
			ctx.fillStyle = "rgb(255,255,255)";
			}else if (board.cities[i].color === "Blue") {
			ctx.fillStyle = "rgb(0, 0, 200 )";
	  		} else if (board.cities[i].color === "Red"){
			ctx.fillStyle = "rgb(200, 0, 0)";
			} else if (board.cities[i].color === "Yellow"){
			ctx.fillStyle = "rgb(200, 200, 0)";
			} else if (board.cities[i].color === "Black"){
			ctx.fillStyle = "rgb(0, 0, 0)";
			};
			ctx.fillRect(board.cities[i].cityX, board.cities[i].cityY, 15, 15);
			ctx.fillText(board.cities[i].name, board.cities[i].cityX + 25, board.cities[i].cityY+13);
		//Add infection level if disease exists
			if (board.cities[i].blue > 0){
				ctx.fillStyle = "rgb(0, 0, 200)";
				ctx.fillText(board.cities[i].blue, board.cities[i].cityX + 25, board.cities[i].cityY+30);
				} else if (board.cities[i].red > 0){
					ctx.fillStyle = "rgb(200, 0, 0)";
					ctx.fillText(board.cities[i].red, board.cities[i].cityX + 30, board.cities[i].cityY+30)
				} else if (board.cities[i].yellow > 0){
					ctx.fillStyle = "rgb(200, 200, 0)";
					ctx.fillText(board.cities[i].yellow, board.cities[i].cityX + 35, board.cities[i].cityY+30)
				} else if (board.cities[i].black > 0){
					ctx.fillStyle = "rgb(0, 0, 0)";
					ctx.fillText(board.cities[i].black, board.cities[i].cityX + 40, board.cities[i].cityY+30)
				};
			};

		//add players in thier location

		for (var i=0; i<board.players.length;i++){
			console.log(board.players[i].role);
			board.tableCity = board.players[i].location;
			if (board.players[i].role === "Scientist"){
				ctx.fillStyle= "rgb(200, 200,200)";	
			}else if (board.players[i].role === "Researcher"){
				ctx.fillStyle= "rgb(70, 70,70)";	
			}else if (board.players[i].role === "Generalist"){
				ctx.fillStyle= "rgb(150, 150,150)";	
			}else if (board.players[i].role === "Medic"){
				ctx.fillStyle= "rgb(200, 100,0)";	
			};
			var l =  board.cities.findIndex(findCity);
			console.log(l);
			ctx.fillRect(board.cities[l].cityX - 20 + (i*10), board.cities[l].cityY - 22, 20, 20);
		};
	}; //canvas context

//status bar
document.getElementById("cureStatus").innerHTML = "Cure Progress: " + "<span class=red>" + board.cures.redCureStatus + "</span>" + "<span class=blue>" + "    " + board.cures.blueCureStatus + "</span>"+ "<span class=yellow>" + " " + board.cures.yellowCureStatus + "</span>"+ "<span class=black>"+ "    " + board.cures.blackCureStatus+ "</span>"; 
document.getElementById("cubesLeft").innerHTML = "Disease Cubes Left: " + "<span class=red>" + board.redPool + "</span> " + "<span class=blue>" + board.bluePool + "</span>" + "<span class=yellow>" + " " + board.yellowPool + "</span>" + "<span class=black>" + " " + board.blackPool + "</span>"
document.getElementById("cardsLeft").innerHTML = "Player Cards Left: " + board.pDeck.length;
document.getElementById("infectionRate").innerHTML = "Infection Rate: "+ board.iRate[board.currentInfectionLevel];
document.getElementById("outbreaks").innerHTML = "Outbreaks: " + board.outbreaks;
//actions
console.log("end of drawing");
}; //draw end


var reDraw= function(){  //Redraws the canvas
	//something to clear canvas
	draw();
}

function City(name, color, population, linkedCities, cityX, cityY, researchStation) { //builds the City models.
	this.name = name,
	this.color = color,
	this.cityX = cityX,
	this.cityY = cityY,
	this.population = population,
	this.linkedCities = linkedCities,
	this.researchStation = researchStation,
	this.red = 0,
	this.black = 0,
	this.blue = 0,
	this.yellow = 0;
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
	this.color = "Green"
};
function EpiCard(name){
	this.name = "Epidemic!"
};
function Player(name, role,hand, location){
	this.name = name,
	this.role = role,
	this.hand = [];
	this.location = "Atlanta" 
};
function Difficulty(name, epiCards){
	this.name = name
	this.epiCards = epiCards;
}

//build cities
var cityBuild = function worldBuilder(){ //Build cities based on properties. Can this be off of a json/xml file?
	board.cities.push(new City("London", "Blue", "8000000", ["New York", "Paris", "Madrid", "Essen"],1950,400));
	board.cities.push(new City("Washington", "Blue", "9000000", ["Montreal", "New York", "Miami", "Atlanta"], 1150,600));
	board.cities.push(new City("New York", "Blue", "9000000", ["Montreal", "Washington", "London"],1250,500));
	board.cities.push(new City("Chicago", "Blue", "9000000", ["Montreal", "Atlanta", "San Francisco", "Mexico City"],830,500));
	board.cities.push(new City("Atlanta", "Blue", "9000000", ["Chicago", "Miami", "Washington"], 900,630, true));
	board.cities.push(new City("Montreal", "Blue", "9000000", ["Chicago", "Washington", "New York"],1000,530));
	board.cities.push(new City("San Francisco", "Blue", "9000000", ["Chicago", "Los Angeles", "Tokyo", "Manila"],623,529));
	board.cities.push(new City("Paris", "Blue", "9000000", ["London", "Essen", "Madrid","Algiers"],2017,475));
	board.cities.push(new City("Essen", "Blue", "9000000", ["London","Paris", "St Petersburg", "Milan"],2150,420));
	board.cities.push(new City("Madrid", "Blue", "9000000", ["Sao Paulo", "London", "New York", "Algiers", "Paris"],1942,556));
	board.cities.push(new City("Milan", "Blue", "9000000", ["Istanbul", "Essen", "Paris"],2128,516));
	board.cities.push(new City("St Petersburg", "Blue", "9000000", ["Istanbul", "Moscow", "Essen"],2330,350));
	board.cities.push(new City("Miami", "Yellow", "5000000", ["Washington", "Atlanta", "Mexico City"],1104,713));
	board.cities.push(new City("Mexico City", "Yellow", "12000000", ["Lima", "Bogata","Los Angeles", "Miami", "Bogata","Chicago"],906,797));
	board.cities.push(new City("Los Angeles", "Yellow", "12000000", ["San Francisco", "Sydney", "Chicago", "Mexico City"],700,630));
	board.cities.push(new City("Bogata", "Yellow", "12000000", ["Buenos Aires", "Mexico City", "Lima", "Sao Paulo"],1204,1000));
	board.cities.push(new City("Sao Paulo", "Yellow", "12000000", ["Buenos Aires", "Bogata", "Lagos"],1450,1280));
	board.cities.push(new City("Buenos Aires", "Yellow", "12000000", ["Bogata", "Sao Paulo"],1350, 1400));
	board.cities.push(new City("Santiago", "Yellow", "12000000", ["Lima"], 1200, 1433));
	board.cities.push(new City("Lima", "Yellow", "12000000", ["Santiago","Bogata", "Mexico City"],1151,1140));
	board.cities.push(new City("Kinshasa", "Yellow", "12000000", ["Lagos", "Johannesburg", "Khartoum"],2170,1100));
	board.cities.push(new City("Lagos", "Yellow", "12000000", ["Sao Paulo", "Khartoum", "Kinshasa"],2072,938));
	board.cities.push(new City("Khartoum", "Yellow", "12000000", ["Kinshasa", "Johannesburg", "Lagos", "Cairo"],2280,950));
	board.cities.push(new City("Johannesburg", "Yellow", "12000000", ["Khartoum", "Kinshasa"],2268,1340));
	board.cities.push(new City("Cairo", "Black", "5000000", ["Algiers", "Istanbul", "Baghdad","Riyadh"],2345,650));
	board.cities.push(new City("Algiers", "Black", "12000000", ["Madrid", "Paris","Istanbul", "Cairo"],2040,600));
	board.cities.push(new City("Riyadh", "Black", "12000000", ["Cairo", "Baghdad", "Karachi"],2520,772));
	board.cities.push(new City("Karachi", "Black", "12000000", ["Delhi", "Baghdad", "Riyadh", "Mumbai"], 2740,710));
	board.cities.push(new City("Mumbai", "Black", "12000000", ["Chennai", "Delhi", "Karachi"],2810,800));
	board.cities.push(new City("Chennai", "Black", "12000000", ["Mumbai", "Delhi","Kolkata", "Bangkok", "Jakarta"],2876,872));
	board.cities.push(new City("Delhi", "Black", "12000000", ["Tehran","Karachi","Mumbai","Kolkata","Chennai"],2830,600));
	board.cities.push(new City("Kolkata", "Black", "12000000", ["Delhi","Chennai", "Bangkok", "Hong Kong"],2980,700));
	board.cities.push(new City("Baghdad", "Black", "12000000", ["Istanbul", "Cairo", "Riyadh", "Karachi", "Tehran"],2500,620));
	board.cities.push(new City("Tehran", "Black", "12000000", ["Moscow", "Baghdad", "Delhi"],2700,520));
	board.cities.push(new City("Istanbul", "Black", "12000000", ["St Petersburg", "Milan", "Algiers", "Cairo", "Riyadh", "Moscow"],2320,536));
	board.cities.push(new City("Moscow", "Black", "12000000", ["St Petersburg", "Istanbul", "Tehran"], 2550,366));
	board.cities.push(new City("Jakarta", "Red", "5000000", ["Chennai", "Bangkok", "Ho Chi Minh City", "Sydney"],3100,1000));
	board.cities.push(new City("Ho Chi Minh City", "Red", "12000000", ["Hong Kong", "Bangkok","Jakarta", "Manila"],3170,880));
	board.cities.push(new City("Manila", "Red", "12000000", ["Taipei", "Ho Chi Minh City", "Sydney", "San Francisco"],3460,1000));
	board.cities.push(new City("Sydney", "Red", "12000000", ["Jakarta", "Manila", "Los Angeles"], 3660, 1385 ));
	board.cities.push(new City("Taipei", "Red", "12000000", ["Osaka", "Shanghai", "Hong Kong", "Manila"], 3342,730));
	board.cities.push(new City("Hong Kong", "Red", "12000000", ["Shanghai", "Kolkata", "Bangkok", "Ho Chi Minh City", "Manila", "Taipei"],3180,761));
	board.cities.push(new City("Bangkok", "Red", "12000000", ["Kolkata", "Chennai", "Jakarta", "Ho Chi Minh City", "Hong Kong"], 3050,812));
	board.cities.push(new City("Shanghai", "Red", "12000000", ["Beijing","Hong Kong", "Taipei"],3220,670));
	board.cities.push(new City("Seoul", "Red", "12000000", ["Beijing", "Shanghai", "Tokyo"],  3395,560));
	board.cities.push(new City("Tokyo", "Red", "12000000", ["Seoul", "Shanghai", "Osaka", "San Francisco"], 3560, 520));
	board.cities.push(new City("Osaka", "Red", "12000000", ["Tokyo", "Taipei"],3560,630));
	board.cities.push(new City("Beijing", "Red", "12000000", ["Shanghai", "Seoul"],3180,550));

var deckBuild = function(iCardNumber){ //build deck
	for (var i = 0; i < board.cities.length; i++){
		var newCardName = board.cities[i].name;
		var newCardColor = board.cities[i].color;
		board.iDeck.push(new ICard(newCardName,newCardColor));
		board.pDeck.push(new CCard(newCardName,newCardColor));
	};
console.log("Created and built Player and Infection Decks based on the cities created")
};
var eBuild = function(iCardNumber){ //build eventcards and place into pDeck
	for (var i = 0; i < board.players.length; i++){
		var newCardName = board.events[i];
		board.pDeck.push(new ECard(newCardName));
	};
console.log("Built Event Cards and placed into player deck");
};
//shuffle cards
var shuffle=function(deck){
	for (i=deck.length-1; i >0; i-=1){
		var j = Math.floor(Math.random()*(i + 1))
		var temp = deck[i];
		deck[i]=deck[j];
		deck[j]=temp
	};
console.log("Shuffled a deck");
};

//BUILD PLAYERS
var playerBuild = function(){
	board.difficulty.push(new Difficulty("Standard", 4)); //fixed difficulty for now
	var players=4; //choose number of players, 4 for now.
	//build an array of players. Fixed names and roles for now
	for(var i = 0; i<players; i++){ //for each player choose name and role
		var name = ["Tom","Jane","Mike","Sam"];
		var role = ["Medic","Generalist","Scientist","Researcher"];
		board.players.push(new Player(name[i],role[i]));
	};
	console.log("Created Players, 4 for now...")
};

var dealPCards = function(){    //Deal initial cards to all players
	for (var i = 0; i <board.players.length; i++){
				for (var j=0; j<2;j++){
					var card = board.pDeck.pop();
					board.players[i].hand.push(card);
							//set card colour AND apply that colour to the relavent thingy. 
					 var playerHandID= "p" + i + j;
			document.getElementById(playerHandID).innerHTML = board.players[i].hand[j].name;
			document.getElementById(playerHandID).className = "Card " + board.players[i].hand[j].color;
				};
			console.log (board.players[i].name);
			console.log (board.players[i].hand);	
	};
console.log("Players dealt two player cards")
};

var epiInsert = function(cards){ //split pDeck into <dif> piles/ add EpiCard/shuffle/rejoin

var splitDeck = [];
	for (var i = 0; i < cards; i++){
		splitDeck.push([])
		splitDeck[i].push(new EpiCard);
	};
	function split(){
		for (var i = 0; i < cards; i++){
			splitDeck[i].push(board.pDeck.shift());
		};
	};
	board.pDeck.forEach(split);
	for (var i = 0; i < cards; i++){
		shuffle(splitDeck[i]);	
	};
	for (var i=0; i < cards; i++){
		var splitLength = splitDeck[i].length;
		for (var j=0; j < splitLength; j++){
			board.pDeck.push(splitDeck[i].shift());
		};
	};
	console.log(board.pDeck);
	console.log("Split the player deck into " + cards + " piles, added epidemic Cards. Put them back together" )
	};

var clickMap = function(mapx, mapY){
	clickedCity = "San Francisco";
	// for i=0 to  board.cities.length
		//if (mapX >= board.cities[i].cityX && mapX >=board.cities[i].cityX + <length>)
			//var clickedCity = board.cities[i].name
	return clickedCity;
};
function findCardCity(city){
	var cityName = board.tableCard.name
	return city.name === board.tableCard.name;
};

function findPlayerCity(city){
	var cityName = board.tableCard.name
	return city.name === board.tableCard.name;
};

var initialInfection = function(){  //initial Infection Stage
	for (var i=3; i > 0; i--){   //for each level of cubes....
		for (var j=0; j < 3;j++){  //pick 3 cities off the top of the iDeck
		board.tableCard = board.iDeck.pop();
		var target = board.cities[(board.cities.findIndex(findCardCity))];
			if (target.color === "Red") {
				target.red = i;
				board.redPool = board.redPool - i;
			} else if (target.color === "Blue") {
				target.blue = i;
				board.bluePool = board.bluePool - i;
			} else if (target.color === "Black"){
				target.black = i;
				board.blackPool = board.blackPool - i;
			} else if (target.color === "Yellow"){
				target.yellow= i;
				board.yellowPool = board.yellowPool - i;
			};
		console.log(board.tableCard.name + " gets " + i + " " + board.tableCard.color + " cube(s).");
		board.iPile.push(board.tableCard); //place into infection Pile.
		};
	};
};

//setup controls including buttons and display
var setupControls = function(){
	document.getElementById("pass").addEventListener("click", passAction);
	document.getElementById("event").addEventListener("click", eventAction);
	document.getElementById("cure").addEventListener("click", cureAction);
	document.getElementById("trade").addEventListener("click", tradeAction);
	document.getElementById("build").addEventListener("click", buildAction);
	document.getElementById("treat").addEventListener("click", treatAction);
	document.getElementById("move").addEventListener("click", moveAction);
	playerUpdate();
};

var playerUpdate = function(){
	document.getElementById("playerDisplay").innerHTML = "Player: " + board.players[board.controls.sequence].name + " - Role: " + board.players[board.controls.sequence].role
	document.getElementById("actionDisplay").innerHTML = "Actions Remaining: "  + board.controls.actions;
};
var actionUpdate = function(){
	board.controls.actions--;
	document.getElementById("actionDisplay").innerHTML = "Actions Remaining: "  + board.controls.actions;
	if (board.controls.actions===0){
	endTurn();
	};
};

//Events that occur upon hitting control buttons
var passAction = function(){            //DONE!
	console.log("you hit the PASS button yay");
	actionUpdate();
	};


var eventAction = function(){   //make them all an easy one for now..
	console.log("you hit the EVENT button yay");
	//check if any event cards are held by all players
	//if no, do nothing/end
	//if yes, show options/cancel
	//perform event function
	//DONT lose an action
};

var cureAction = function(){
	console.log("you hit the CURE button yay");
	//count the number of cards of same colourin player's hand
	//if 5 then update curestatus, 
	//need to change treatPower
	//draw, actionupdate
};
var tradeAction = function(){
	console.log("you hit the Trade button yay");
	//check if any players are nearby Else no
	//check if and cards in those are tradable else no
	//select give or take
	//show cards to be given/taken
	//select cards
	//move to relevant player hand;
	//update hand area
}; 
var buildAction = function(){
	console.log("you hit the BUILD button yay");
	//see if location matches cards in hand 
	//if not, do nothing
	//if yes build a research station, update screen and city,
	// draw/actionupdate etc
};

var treatAction = function(){
	console.log("you hit the TREAT button yay");
	//see if there is any diseases to treat, stop if not
	//if multiple then prompt which one/cancel
	//if not multiple then reduce disease in place by one
	//draw();
	//actionUpdate
};

var moveAction = function(){
	console.log("you hit the MOVE button yay");
	//define variables
	var currentLocation=[];
	var canGoTo = [];
	//find out where the player is
	var currentLocation = board.players[board.controls.sequence].location;
	//find out where he can go by car/ferry;
	var canGoTo= board.cities[board.cities.findIndex(findCity)].linkedCities;
	//find out where cards can move 
	document.getElementById("buttonsContainer").innerHTML = "You can go to: " + canGoTo
	document.getElementById("map").addEventListener("mouseup", moveActionConclusion);
};

var moveActionConclusion = function (){
	board.controls.newLocation= "Chicago";
	var rect = document.getElementById("map").getBoundingClientRect()
	mapX=event.clientX - rect.left;
	mapY=event.clientY - rect.top;
	clickMap(mapX, mapY, function(){prompt("you clicked on the map X=" + mapX + "Y=" + mapY, answer)});
	board.players[board.controls.sequence].location = answer
	//figure out where the click means!	
	//display options / cancel
	//update location to new place
	//update canvas;
	draw();
};

var endTurn = function(){
	board.controls.sequence++
	board.controls.actions = 4;   //needs to be variable for Generalist
	if (board.controls.sequence === board.players.length){
		board.controls.sequence = 0;
		};
    playerUpdate();
};



//Game SETUP
	cityBuild(); //build cities
	deckBuild(); //make player and infection decks
	playerBuild()//decide number of players,classes,difficulty
	shuffle(board.iDeck); //shuffle iDeck
	shuffle(board.events); //shuffle events
	eBuild();  //take right amount of event cards into pDeck
	shuffle(board.pDeck); //shuffle pdeck
	dealPCards(board.players.length); //deal 2 pdeck cards to each player
	epiInsert(board.difficulty[0].epiCards); //split the pDeck in the number of epidemic cards. Insert EPICard. Shuffle. Rejoin.
	initialInfection(); //infect initial cities
	draw(); //populate the board
	setupControls(); //make the buttons work
	console.log("Game Board setup is complete");

//Stage 0 - Core code - DONE
	//Setup Board objects, players, cities, cards
	//draw basic UI
	//draw board
	//one-off setup functions

//stage 1 - Mainloop (make core gameplay loop) - June
	//chooseplayer Loop 1 
	//****I AM HERE: choices :  a. move  b. treat c. cure d. build. e.skip. Y
	//deal player Cards
	//infection stage
	//choose next player
//ENDMAINLOOP

//Stage 2 - Special events July (make entire game playable)
	//epidemic
	//cured-eradicated effects
	//outbreak 
	//eventCard - all do one thing for now.
	//gameOver
	//EndSpecial

//Stage 3 - Extras - August ()
	//Class Effects
	//All Event Card effects
	//Choose players
	//choose difficulty

//Stage 4 - Prettify - September
	//Help text (instructions, tooltips)
	//general prettying of things
	//music
	//sound
	//refactor code
	
//Stage 5 - Go Public! - October
	//-Host it up somewhere

//Bonus Stage - Extras
          //more classes
		  //expansion stuff
		  //more event cards
		  //more music
		  //backend saving/scoring/stats
