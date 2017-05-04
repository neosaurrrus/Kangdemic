var turnActions = 3; //3 actions per turn.
while (turnActions > 0){ //Main loop
		console.log("At the start of the loop we have " + turnActions + " actions left"); 
		var turnActions= passTurn();
		passTurn(turnActions);
		console.log("After running the function turnActions = : " + turnActions);  //Should be -1
		turnActions--; 
	};

if (turnActions < 0) console.log("Turn is passed") //Test to see if the function worked to set turnActions to -1
	else console.log("No passing occured!");

function passTurn(turnActions){  //function is supposed to set turnActions to -1
	console.log(turnActions + " actions at start of the passTurn function");
	var turnActions = -1;
	console.log(turnActions + " actions at the end of the passTurn function");
	return turnActions;
};




















var turnActions = 3; //3 actions per turn.

while (turnActions > 0){ //Main loop
		console.log("At the start of the loop we have " + turnActions + " actions left"); 
		passTurn(turnActions);
		console.log("After running the function you have the following turns left: " + turnActions);  //Should be -1
		turnActions--; 
	};

if (turnActions === -1) console.log("Turn is passed") //Test to see if the function worked to set turnActions to -1
	else console.log("No passing occured!");

function passTurn(turnActions){  //function is supposed to set turnActions to -1
	console.log(turnActions + " actions at start of the passTurn function");
	var turnActions = -1;
	console.log(turnActions + " actions at the end of the passTurn function");
	return turnActions;
};