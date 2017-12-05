var http = require('http');
var fs = require('fs');
var ejs = require('ejs');

var hello = fs.readFileSync('./hello.ejs', 'utf8');
var content1 = fs.readFileSync('./content1.ejs', 'utf8');

var server = http.createServer();
server.on('request', doRequest);
server.listen(3000);
console.log('Server running!');

// リクエストの処理
function doRequest(req, res) {
    var hello2 = ejs.render(hello, {
        title: "タイトルです",
        content: ejs.render(content1, {
            data: [
                "これは最初のデータです。",
                "次のデータだよ。",
                "一番最後のデータなのだ。"
            ]
        })
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(hello2);
    res.end();
}
