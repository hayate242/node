var port = 3000;
var http = require('http');
var fs = require('fs');

var server = http.createServer();
server.on('request', doRequest);
server.listen(port);
console.log('Server running!');
var cnt_access = 0;

// リクエストの処理
function doRequest(req, res) {
    var number = Math.floor(Math.random() * 3);
    fs.readFile('./html/hello.html', 'UTF-8',
        function(err, data) {
            var title = ["ページA", "ページB", "ページC"];
            var content = ["※これはサンプルで作ったものです。",
                "もう一つのコンテンツです。",
                "最後に用意したコンテンツですよ。"];
            var data2 = data.
                replace(/@title/g, title[number]).
                replace(/@content/g, content[number]+cnt_access);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data2);
            res.end();
        });
        cnt_access++;
}
