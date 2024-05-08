// Creating log file
var http = require('http');
var fs = require('fs');

var myServer = http.createServer((req, res) => {
    // Logging the request

    var path = req.url;
    switch (path) {
        case "/": {
            // Serving home page
            var homeData = fs.readFileSync("home.html", (err) => { });
            res.writeHead(200, { "content-encoding": "text/html" }); // status code and json object
            res.end(homeData)
            break;
        }
        case '/admin': {
            // Serving admin page
            res.end("Admin page")
            break;
        }
        case '/login': {
            // Serving login page
            var loginData = fs.readFileSync("login.html", (err) => { });
            res.writeHead(200, { "content-encoding": "text/html" }); // status code and json object
            res.end(loginData)
            break;
        }
        case '/user': {
            // Handling user page
            if (req.method === "GET") {
                res.end("User GET page")
            } else if (req.method === "POST") {
                res.end("User POST page")
            }
            break;
        }
        default: {
            // Handling unknown paths
            res.end("404.Server not Found.")
        }
    }
});

myServer.listen(8001, () => {
    console.log("Server started on: 8001");
});
