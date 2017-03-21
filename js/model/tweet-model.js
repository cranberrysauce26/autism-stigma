function Tweet(data) {
	if (
		data.text === undefined ||
		data.author === undefined ||
		data.created === undefined ||
		data.tweetUrl === undefined ||
		data.imageUrl === undefined 
	) {
		console.log("ERROR: data sent to Tweet constructor is not valid");
		return;
	}

	this.text = data.text;
	this.author = data.author;
	this.created = data.created;
	this.tweetUrl = data.tweetUrl;
	this.imageUrl = data.imageUrl;
	this.formattedTime;
	this.number;
	this.id;

	

}

Tweet.prototype.equals = function(tweet2) {
	return (this.tweetUrl === tweet2.tweetUrl);
}

Tweet.prototype.setNumber = function (num) {
	this.number = num;
	this.id = "tweet-"+num;
}

Tweet.prototype.formatTime = function () {
		var tweetedAt = new Date(this.created);
		var hour = tweetedAt.getHours();
		var x = " am";
		if (hour===0) hour = 12;
		else if (hour > 12) {
			hour -= 12;
			x = " pm";
		}

		var minutes = tweetedAt.getMinutes() > 9 ? tweetedAt.getMinutes().toString() : "0"+tweetedAt.getMinutes().toString();

		this.formattedTime = hour+":"+minutes+x;
}
