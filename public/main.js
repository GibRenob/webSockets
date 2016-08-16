// creating socket connections on the FRONT-END
var socket = io();  // this essentially does something like socket.emit('connection')
                    // now the backend and the frontend are connected with an open socket

angular.module('sockets', [])
    .controller('TweetController', TweetController)
    .controller('NumberController', NumberController)

function TweetController($scope) {
    var tweeter = this;

    tweeter.incomingTweets = [];

    // listen to events from the BACK-END, but becareful when using ui-router!

    // socket.on('incomingTweet', function(tweet){
    //     // inside this call, we lost angular scope, because it is a 3rd-party library.
    //     console.log(tweet);
    //     // document.body.innerText += tweet.text +'\n';
    //     tweeter.incomingTweets.push(tweet);
    //     $scope.$apply();
    // });
}

function NumberController($scope) {
    var nCtrl = this;

    nCtrl.numbers = []

    setInterval(function(){
        socket.emit('randomNumber', Math.random());
    }, 2000);

    socket.on('newNumber', function(number){ // absorb the newNumber from the server
        nCtrl.numbers.push(number);
        $scope.$apply();
    });
}
