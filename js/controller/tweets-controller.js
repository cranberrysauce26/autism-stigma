
var tweetsController = ( function () {

	var refreshTime = 10*1000;

	var tweetsModel = new TweetsModel ();

	var tweetsView = new TweetsView ();

	function begin () {
		
		tweetsModel.refreshData();
		tweetsView.startPage(function () {
			
			updateView();
			stream();
		});
	}

	function updateView () {
		
		tweetsView.pushTweets(tweetsModel.getNewTweets());
		tweetsModel.clearNewTweets();
	}

	function stream() {
		
		setInterval( function () {
			
			tweetsModel.refreshData(updateView);
		}, refreshTime);
	}

	return {
		refreshTime: refreshTime,
		tweetsModel: tweetsModel,
		tweetsView: tweetsView,
		begin: begin,
		updateView: updateView,
		stream: stream
	};
})();

$(document).ready(function () {
	tweetsController.begin();
});


