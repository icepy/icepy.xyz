var http = require('http');
var url = require('url');
var path = require('path');
var querystring = require('querystring');

var server = http.createServer(function(request,response){
	var clientURL = request.url;
	var method = request.method;
	switch(method){
		case 'OPTIONS':
			var searchHeaders = request.headers;
			var corsorigin = searchHeaders['origin'];
			var corsMethod = searchHeaders['access-control-request-method'];
			if (corsMethod === 'GET') {
				response.writeHeader(200,{
					'Access-Control-Allow-Origin':'*',
					'Access-Control-Allow-Methods':'GET,POST',
					'Content-Type':'application/json'
				});
				response.end();
			};
			break;
		case 'GET':
			var search = clientURL.split('?')[1];
			var searchQuery = querystring.parse(search);
			console.log('request --- > url'+searchQuery.id);
			var searchHeaders = request.headers;
			console.log('set headers'+searchHeaders['session-control-key']);
			response.writeHeader(200,{
				'Access-Control-Allow-Origin':'*',
				'Content-Type':'application/json'
			});
			if (searchQuery.id) {
				response.end(JSON.stringify({
					id:searchQuery.id,
					session:searchQuery.session,
					response:[],
					type:'GET'
				}))
				return true;
			};
			response.end(JSON.stringify({
				'data':[],
				'pageIndex': 0,
				'pageSize': 0,
				'total': 12,
				'count': 1,
				'type':'GET'
			}));
			break;
		case 'POST':
			var searchHeaders = request.headers;
			console.log(searchHeaders['session-control-key'])
			var body = '';
			request.on('data',function(data){
				body += data;
			});
			request.on('end',function(){
				console.log(body);
				response.writeHeader(200,{
					'Access-Control-Allow-Origin':'*',
					'Content-Type':'application/json'
				});
				response.end(JSON.stringify({
					'pageIndex': 0,
					'pageSize': 0,
					'total': 12,
					'count': 1,
					'type':'POST'
				}));
			});
			break;
		default:

			break;
	}
});

server.listen(8900,'127.0.0.1');
console.log('http://127.0.0.1:8900');