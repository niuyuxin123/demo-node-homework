
const http=require('http'),
fs=require('fs'),
qs=require('querystring'),
path=require('path'),
log=console.log;

http.createServer((req,res)=>{
log(`\n\n${req.method} ${req.url} ${req.httpVersion}`);
log(req.headers);
log();
log(__dirname);
switch(req.method){
    case 'GET':
        show(req,res);
        break;
    case 'POST':

        break;
    default:
        err(res);
}

}).listen(8083);

function err(res) {
var msg = 'Not found';
res.writeHead(404, {
  'Content-Length': msg.length,
  'Content-Type': 'text/plain'
});
res.end(msg);
}

function show(req,res){
switch(req.url){
    case '/login':
        var html=fs.readFileSync('./login.html').toString('utf8');
        res.writeHead(200,{
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(html),
            'Access-Control-Allow-Origin': '*'
        });
        res.end(html);
        break;
        
    case '/listmanager':
        var html=fs.readFileSync('./list.html').toString('utf8');
        res.writeHead(200,{
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(html),
            'Access-Control-Allow-Origin.': '*'
        });
        res.end(html);
        break;
    case '/addChapter':
        var html=fs.readFileSync('./addChapter.html').toString('utf8');
        res.writeHead(200,{
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(html),
            'Access-Control-Allow-Origin.': '*'
        });
        res.end(html);
        break;
    case '/list':
        var html=fs.readFileSync('./chapterList.html').toString('utf8');
        res.writeHead(200,{
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(html),
            'Access-Control-Allow-Origin': '*'
        });
        res.end(html);
        break;
    default:
        Search(req,res);
        break;
    // case '/images':
    //     var img=fs.readFileSync(req.url);
    //     res.writeHead(200,{
    //         'Content-Type': 'text/images',
    //         'Content-Length': Buffer.byteLength(html),
    //         'Access-Control-Allow-Origin': '*'
    //     })
    
    
}
}
function Search(req,res){
    if(req.url.indexOf('jpg')!=-1){
        var img=fs.readFileSync(path.join(__dirname,req.url));
        res.writeHead(200,{
            'Content-Type': 'image/jpeg',
            'Content-Length': Buffer.byteLength(img),
            'Access-Control-Allow-Origin': '*'
        })
        
        res.end(img);
    }
    if(req.url.indexOf('jpeg')!=-1){
        var img=fs.readFileSync(path.join(__dirname,req.url));
        res.writeHead(200,{
            'Content-Type': 'image/jpeg',
            'Content-Length': Buffer.byteLength(img),
            'Access-Control-Allow-Origin': '*'
        })
        
        res.end(img);
    }
    if(req.url.indexOf('png')!=-1){
        var img=fs.readFileSync(path.join(__dirname,req.url));
        res.writeHead(200,{
            'Content-Type': 'application/x-png',
            'Content-Length': Buffer.byteLength(img),
            'Access-Control-Allow-Origin': '*'
        })
        
        res.end(img);
    }
    if(req.url.indexOf('css')!=-1){
        var css=fs.readFileSync(path.join(__dirname,req.url));
        res.writeHead(200,{
            'Content-Type': 'text/css',
            'Content-Length': Buffer.byteLength(css),
            'Access-Control-Allow-Origin': '*'
        })
        res.end(css);
    }
    if(req.url.indexOf('js')!=-1){
        var js=fs.readFileSync(path.join(__dirname,req.url));
        res.writeHead(200,{
            'Content-Type': 'application/x-javascript',
            'Content-Length': Buffer.byteLength(js),
            'Access-Control-Allow-Origin': '*'
        })
        res.end(js);
    }
}