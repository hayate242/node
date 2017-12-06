var http = require('http');
var fs = require('fs');
var ejs = require('ejs');
var url = require('url');
 
var template = fs.readFileSync('./template.ejs', 'utf8');
var content1 = fs.readFileSync('./content1.ejs', 'utf8');
var content2 = fs.readFileSync('./content2.ejs', 'utf8');
 
var routes = {
    "/":{
        "title":"Main Page",
        "message":"これはサンプルのページですよ。",
        "content":content1},
    "/index":{
        "title":"Main Page",
        "message":"これはサンプルのページですよ。",
        "content":content1},
    "/other":{
        "title":"Other Page",
        "message":"別のページを表示していますよ。",
        "content":content2}
};
 
var server = http.createServer();
server.on('request', doRequest);
server.listen(3000);
console.log('Server running!');
 
// リクエストの処理
function doRequest(request, response) {
    var url_parts = url.parse(request.url);
    // console.log(url_parts);  
    // route check
    if (routes[url_parts.pathname] == null){
        console.log("NOT FOUND PAGE:" + request.url);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end("<html><body><h1>NOT FOUND PAGE:" + 
            request.url + "</h1></body></html>");
        return;
    }
    // page render 
    var content = ejs.render( template,
        {
            title: routes[url_parts.pathname].title,
            content: ejs.render(
                routes[url_parts.pathname].content,
                {
                    message: routes[url_parts.pathname].message
                }
            )
        }
    );
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(content);
    response.end();
}