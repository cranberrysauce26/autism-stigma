function TweetsView () {

	var that = this;

	function configure() {
		$(".header").height($(window).height()*0.3);

		if (window.matchMedia('(min-width: 768px)').matches) {
			// If it's a desktop
			console.log("adding class fa-2x");
			$(".social-icon").addClass("fa-2x");
		}
		var openClassName = 'open';
		$("#about-button").click(function () {
			// Open the about page.
			$(".about").addClass(openClassName);
		});

		$("#close-btn").click(function () {
			$(".about").removeClass(openClassName);
		});	
	}

	this.startPage = function(todo) {

		configure();

		options = {
			strings: ["help end stigma against autism."],
			typeSpeed: 50,
			callback: function () {
				// When typing is done...
				var time = 0.75;
				var header = document.getElementsByClassName("header")[0];
				header.style.animation = time+'s ease-in 0s 1 normal forwards running pushUp';
				$(".header .typed-cursor").css('display', 'none');
				
				setTimeout(
					// After the header has been pushed up...
					function () {
						// Set the header's position to be relative
						header.style.position = 'relative';
						// Make the blank canvas fade out
						var timeToFade = 1;
						document.getElementById("blank").style.animation = timeToFade+'s ease-in 0s 1 normal forwards running reveal';

						setTimeout(function () {
							// After blank has faded, delete blank
							document.getElementById("blank").style.display = 'none';
						}, timeToFade*1000);

						setTimeout(function () {
							// When blank hasn't completely faded, type the description.
							var descriptionOptions = {
								strings: ["This is my description. I better be eloquent."],
								typeSpeed: 10,
								callback: function () {
									// underline the description.
									$(".description").css("animation", "0.5s linear 0s 1 normal forwards running underline");
									todo();
								}
							};
							$(".description").typed(descriptionOptions);
							$(".typed-cursor").css('display', 'none');
							
						}, timeToFade*1000*0.25);
					}, 
					time*1000
				);
			}
		};
		$(".header-text").typed(options);

	};

	var breakPointForTweetSpeed = 5;
	var normalTweetTypeSpeed = 10;
	var fastTweetTypeSpeed = 0;

	this.pushTweets = function (tweets) {
		
		// If tweets is empty, do nothing.
		if (tweets.length===0) return;

		// Check for errors
		for (i = 0; i < tweets.length; i++) {
			var tweet = tweets[i];
			if (
				tweet.text === undefined ||
				tweet.author === undefined ||
				tweet.formattedTime === undefined ||
				tweet.tweetUrl === undefined ||
				tweet.imageUrl === undefined ||
				tweet.id === undefined
			) {
				console.log("ERROR: data sent to pushTweet in TweetsView is invalid");
				return;
			}
		}


		// Set the typing speed 
		var speed = normalTweetTypeSpeed;
		if (tweets.length >= breakPointForTweetSpeed) speed = fastTweetTypeSpeed;

		var tweet = tweets[0];
		var htmlCode = 
				"<a href = '" + tweet.tweetUrl + "' class='tweet' target='_blank' id='"+tweet.id+"'>"+
					"<img class='profile-image' src='" + tweet.imageUrl + "'>"+
					"<span class='tweet-author'>" + tweet.author + "</span>"+
					"<div class='tweet-content'>" +
						// Type the text so leave it blank for now...
					"</div>" +
					"<div class='tweet-created'>"+ tweet.formattedTime +"</div>"+
					"<i class='fa fa-twitter within-tweet-icon fa-lg'></i>" + 
				"</a>";
		var options = 
		{
			strings: [tweet.text],
			typeSpeed: speed,
			showCursor: false,
			callback: function () {
				that.pushTweets( tweets.slice(1, tweets.length) );
			}
		}

		
		$("#tweets").prepend(htmlCode);
		$("#"+tweet.id+" .tweet-content").typed(options);
			
		
	};
}


