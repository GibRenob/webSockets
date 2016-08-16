Warm-up

Warm up exercise: Create an express server from scratch

use npm init
install express, morgan
mount the express.static middleware
make sure you call app.listen
Be ready! ;)

// instructor's answer

var port = process.env.PORT || 1337,
    express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    app = express();

// app.use(express.static(__dirname+'/public'))
app.use(logger('common'));
app.use(express.static(path(__dirname,'public')));

app.listen(port, () => console.log('Server up!', port));
Web Sockets!

Maintain connections between a client and a server
Bi-directional (client can send/receive data, so can the server)
Sockets communicate over the TCP protocol
Real-time communication
Socket.io

Socket.io is an awesome library and it is available both on the client side and server side. There's really only two big methods from the library that we care about.

method	description
on	defines a socket event to listen to
emit	broadcasts an event (with data)
To use sockets or not use sockets? That is the question...

Does my app have a real-time requirement? (twitter stream, comment stream, on the ms analytics, chat room) Yes? Then use sockets!
Beware! With sockets, you can potentially open a hole for someone to slam your server with data (costing you a ton of $$$$$MONEY$$$$$)
Try to use as little data as possible
If you do not have a real-time requirement:

Consider using polling (alternative to sockets)
Essentially, you would send AJAX requests on an interval/timer (setInterval)
Less resource intensive! (but not truly real-time)
