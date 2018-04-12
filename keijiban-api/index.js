const http = require('http');
const url = require('url');
const fs = require('fs');
const list = require('./list');
var dateformat = require('dateformat');
var server = http.createServer(getinfo);
server.listen(8000);
console.log('Server Start');

//createServerの処理
function getinfo(request,response){
  var url_parts = url.parse(request.url,true);
  switch (url_parts.pathname){
    case '/contribution':
    response_contribution(request,response);
    break;
    default:
      response.writeHead(200,{'Content-Type':'text/html',"Access-Control-Allow-Origin":"*"});
      response.
      response.end('no page...');
      break;
  }
}
function response_contribution(request,response){
  if (request.method=="GET"){
    var content = [];
    list.findAll({
      order: [
        ['id', 'DESC']
    ]
    }).then((list)=>{
      list.forEach(list =>{
      var createdAt = dateformat(list.createdAt, 'yyyy-mm-ddTHH:MM:ss');
      var item = {id:list.id,contributor:list.contributor,body:list.body,createdAt:createdAt};
      var result = content.push(item);
     console.log(content);
    });
      console.info('データ取得されました');
      response.writeHead(200,{'Content-Type': 'application/json',"Access-Control-Allow-Origin":"*"});
      response.write(JSON.stringify(content));
      response.end();
    });
  }else if(request.method=="POST"){
    let body = [];
    request.on('data', (chunk) => {
    body.push(chunk);
      }).on('end', () => {
        var createdAt = new Date();
        body = Buffer.concat(body).toString();
        var item =JSON.parse(body);
        list.create({
          contributor: item.contributor,
          body: item.body,
          createdAt:createdAt
        });
      });
    console.info('投稿されました');
    var content = [];
    list.findAll({
      order: [
        ['id', 'DESC']
    ]
    }).then((list)=>{
      list.forEach(list =>{
      var createdAt = dateformat(list.createdAt, 'yyyy-mm-ddTHH:MM:ss');
      var item = {id:list.id,contributor:list.contributor,body:list.body,createdAt:createdAt};
      var result = content.push(item);
    });
      console.info('データ取得されました');
      response.writeHead(200,{'Content-Type': 'application/json'});
      response.write(JSON.stringify(content));
      response.end();
    });
  }
}
