const http = require('http');
const url = require('url');
const fs = require('fs'); 
const list = require('./list');
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
      response.writeHead(200,{'Content-Type':'text/html',"Access-Control-Allow-Origin":"*"});
      response.
      response.end('no page...');
      break;
  }
}
function response_index(request,response){
  if (request.method=="GET"){
    var content = [];
    list.findAll({
      order: [
        ['id', 'DESC']
    ]
    }).then((list)=>{
      list.forEach(list =>{
      var item = {id:list.id,contributor:list.contributor,body:list.body};
     var result = content.push(item);
     console.log(content);
    });
      console.info('データ取得されました');
      response.writeHead(200,{'Content-Type': 'application/json',"Access-Control-Allow-Origin":"*"});
      response.write(JSON.stringify(content));  
      response.end();
    });
  }else if(request.method=="POST"){
    list.create({
          contributor: 'はらの',
          body: 'テストメッセージ２'
        });
    console.info('投稿されました');
  }
}