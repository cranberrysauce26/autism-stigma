function TweetsModel (){
	var tweets = [];
	var newTweets = [];
	var currentIndex = 0;
	this.refreshData = function (callback) {
		callback = (callback === undefined) ? function() {} : callback;
		// Perform an ajax request and update tweets.
		$.ajax({
			type: 'POST',
			url: 'php/get-tweets.php'
		})
		.done(function (response) {
			// update tweets and new tweets
			
			var responseTweets = JSON.parse(response);
			for (i = 0; i < responseTweets.length; i++) {
				
				var data = responseTweets[i];
				
				var responseTweet = new Tweet(data);
		
				var isDuplicate = false;
				for (j = 0; j < tweets.length; j++) {
					
					if ( tweets[j].equals(responseTweet) ) {
						isDuplicate = true;
						break;
					}
				}
				
				if (!isDuplicate) {
					responseTweet.setNumber(currentIndex);
					responseTweet.formatTime();
					newTweets.push(responseTweet);
					tweets.push(responseTweet);
					currentIndex++;
				} 
			}
			callback();
		});
	}
	this.clearNewTweets = function () {
		newTweets = [];
	}
	this.getNewTweets = function () {
		return newTweets;
	}
}