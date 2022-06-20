// JavaScript Document
const StatusEnum = Object.freeze({
	Win:1,
	Lose:2,
	Draw:3,
	Reset:-1,
});

function win() {
	setBattleHistory(StatusEnum.Win);
	display();
}

function lose() {
	setBattleHistory(StatusEnum.Lose);
	display();
}

function draw() {
	setBattleHistory(StatusEnum.Draw);
	display();
}

function reset() {
	setBattleHistory(StatusEnum.Reset);
	display();
}

function undo() {
	undoBattleHistory();
	display();
}

function display() {

	var battleHistory = getBattleHistory();

	var winCount = 0;
	var loseCount = 0;
	var drawCount = 0;

	for(var idx = battleHistory.length - 1; idx >= 0; idx--) {

		if(battleHistory[idx].Status == StatusEnum.Reset) {
			break;
		}

		switch(battleHistory[idx].Status) {
			case StatusEnum.Win:
				winCount++;
				break;
			case StatusEnum.Lose:
				loseCount++;
				break;
			case StatusEnum.Draw:
				drawCount++;
				break;
		}
	}


	var lastStatus = battleHistory.length > 0 ? battleHistory[battleHistory.length - 1].Status : null;
	var consecutiveCount = 0;

	if(lastStatus === StatusEnum.Win || lastStatus === StatusEnum.Lose) {

		for(var idx = battleHistory.length - 1; idx >= 0; idx--) {

			if(battleHistory[idx].Status === lastStatus) {
				consecutiveCount++;
			} else {
				break;
			}

		}
	}

	var winRate = Math.floor(winCount / (winCount + loseCount) * 1000) / 10;

	$("#win-count").text(winCount);
	$("#lose-count").text(loseCount);
	$("#draw-count").text(drawCount);

	if(isNaN(winRate)) {
		$("#win-rate").text("-----");
	} else {
		$("#win-rate").text(winRate);
	}

	$("#consecutive-count").text(consecutiveCount);

	if(lastStatus === StatusEnum.Lose) {
		$("#win-consecutive").hide();
		$("#lose-consecutive").show();
	} else {
		$("#win-consecutive").show();
		$("#lose-consecutive").hide();
	}
}

function undoBattleHistory() {
	var battleHistory = getBattleHistory();
	battleHistory.pop();
	localStorage.setItem("battle-history", JSON.stringify(battleHistory, undefined, 1));
}

function getBattleHistory() {
	var json = localStorage.getItem("battle-history");
	return (json === null) ? [] : JSON.parse(json);
}

function setBattleHistory(status) {

	var battleHistory = getBattleHistory();

	var newItem = new Object();
	newItem.Status = status;
	battleHistory.push(newItem);

	localStorage.setItem("battle-history", JSON.stringify(battleHistory, undefined, 1));
}
