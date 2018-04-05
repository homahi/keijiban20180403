const http = require('http');
const url = require('url');
const fs = require('fs');
var server = http.createServer(getinfo);
server.listen(8000);
console.log('Server Start');

//createServerの処理
function getinfo(request,response){
  var url_parts = url.parse(request.url,true);
  switch (url_parts.pathname){
    case '/index':
    response_index(request,response);
    break;
    default:
      response.writeHead(200,{'Content-Type':'text/html'});
      response.end('no page...');
      break;
  }
}

function response_index(request,response){
  if (request.method=="GET"){
    var content = [{id:1,contributor:"前川みく",body:"テストメッセージ１",},
    {id:2,contributor:"ほまひ",body:"テストメッセージ２",},
    {id:3,contributor:"ippei",body:"テストメッセージ３",},
    {id:4,contributor:"かずま",body:"テストメッセージ４",},
    {id:5,contributor:"tak",body:"テストメッセージ５",}  
  ];
    response.writeHead(200,{'Content-Type': 'application/json'});
    response.write(JSON.stringify(content));
    response.end();
  }
}