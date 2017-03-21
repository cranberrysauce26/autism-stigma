<?php
require 'oauth.php';

// Include library
require "twitteroauth-master/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;

function search(array $query)
{
  $toa = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
  return $toa->get('search/tweets', $query);
}
 
$query = array(
	"q" => "retarded OR retard OR aspy",
	"count" => 10,
	"result_type" => "recent",
  "lang" => "en",
  "truncated" => false
);
  
$results = search($query);
$statuses = $results->statuses;

$data = array();

function profile_image_url($screen_name) {
   return "https:/twitter.com/".$screen_name."/profile_image?size=original";
}

function tweet_url($screen_name, $id) {
  return "https://twitter.com/".$screen_name."/status/".$id;
}

function formatTime($created_at) {
  $parts = explode(" ", $created_at);
  $year = $parts[5];
  $month = $parts[1];
  $day = $parts[2];
  $clock = $parts[3];
  return $month . " " . $day . ", " . $year . " " . $clock;
}

foreach ($statuses as $result) {
  $temp = array();
  $temp['text'] = $result->text;
  $temp['author'] = $result->user->screen_name;
  $temp['created'] = $result->created_at; 
  $temp['tweetUrl'] = tweet_url($temp['author'], $result->id);
  $temp['imageUrl'] = profile_image_url($result->user->screen_name);
  array_push($data, $temp);
}

echo json_encode($data);


/*
  The time format is 
  Sat Mar 18 02:56:28 +0000 2017
  so do an explode

*/