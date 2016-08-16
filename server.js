var port = process.env.PORT || 1337,
    express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    app = express(),
    io = require('socket.io'),
    nodeTweetStream = require('node-tweet-stream');

// app.use(express.static(__dirname+'/public'))
app.use(logger('common')); // normally dev, but look, there's more logging formats!
app.use(express.static(path.join(__dirname,'public')));

// setting up twitter stram API
var twitterStream = nodeTweetStream({
    consumer_key: 'sJneuy1u9qyoYkGpKDmcAKxws',
    consumer_secret: 'IPctD7mhqfCcKHlI1hTSUxdN2lnvW7RabcVaCP6CwEznJ7hrxa',
    token: '224448389-ozbTHIvxFBe4AgkPs4PxpvzaHUFhkN5cXjApqLrL',
    token_secret: 'zsVke8fi2gAVnXgnGJFSh9mU5c7LMXR4WhS9Zb7tOTBfp'
});

// going to track TRUMP tweets! (ugh)
twitterStream.track('trump');

// app.listen returns a reference to the (HTTP) server it creates!
var server = app.listen(port, () => {
    console.log('Server up!', port);
});

// mounts socket.io into our server
var socketServer = io(server);

// socketServer emits a connection event (the event when somebody new goes to your site)
socketServer.on('connection', (socket) => {
    // here, socket is the object representing the actual connection on someone using your site.
    // twitterStream.on('tweet', (tweetData) => {
    //     socket.emit('incomingTweet', tweetData); // private socket connection
    // });

    socket.on('randomNumber', (data) => {
        console.log('Data:', data);
        var newNum = data * 100; // manipulating the random number we got from the client

        socketServer.emit('newNumber', newNum); // public socket connection
        // broadcasting a newNumber to (ALL) clients connected via socket
    })
});
