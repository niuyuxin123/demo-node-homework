
const http=require('http'),
fs=require('fs'),
qs=require('querystring'),
path=require('path'),
log=console.log;

var arr=JSON.parse(fs.readFileSync('./js/node.js','utf8'));


http.createServer((req,res)=>{
log(`\n\n${req.method} ${req.url} ${req.httpVersion}`);
log(req.headers);
log();
switch(req.method){
    case 'GET':
        show(req,res);
        break;
    case 'POST':
        add(req,res);
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
    if(req.url.indexOf('/login')!=-1&&req.url.indexOf('login_')==-1){
        var html=fs.readFileSync('./login.html').toString('utf8');
        res.writeHead(200,{
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(html),
            'Access-Control-Allow-Origin': '*'
        });
        res.end(html);
    }
        
    else if(req.url.indexOf('/listmanager')!=-1) {
        var html=fs.readFileSync('./list.html').toString('utf8');
        res.writeHead(200,{
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(html),
            'Access-Control-Allow-Origin.': '*'
        });
        res.end(html);
    }
    else if(req.url.indexOf('/addChapter')!=-1) {
        var html=fs.readFileSync('./addChapter.html').toString('utf8');
        res.writeHead(200,{
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(html),
            'Access-Control-Allow-Origin.': '*'
        });
        res.end(html);
    }
    else if(req.url.indexOf('/list')!=-1) {
        var html=fs.readFileSync('./chapterList.html').toString('utf8');
        res.writeHead(200,{
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(html),
            'Access-Control-Allow-Origin': '*'
        });
        res.end(html);
    }
    else{
        Search(req,res);
        
    }
}
function Search(req,res){
    if(req.url.indexOf('.jpg')!=-1){
        var img=fs.readFileSync(path.join(__dirname,req.url));
        res.writeHead(200,{
            'Content-Type': 'image/jpeg',
            'Content-Length': Buffer.byteLength(img),
            'Access-Control-Allow-Origin': '*'
        })
        
        res.end(img);
    }
    if(req.url.indexOf('.jpeg')!=-1){
        var img=fs.readFileSync(path.join(__dirname,req.url));
        res.writeHead(200,{
            'Content-Type': 'image/jpeg',
            'Content-Length': Buffer.byteLength(img),
            'Access-Control-Allow-Origin': '*'
        })
        
        res.end(img);
    }
    if(req.url.indexOf('.png')!=-1){
        var img=fs.readFileSync(path.join(__dirname,req.url));
        res.writeHead(200,{
            'Content-Type': 'application/x-png',
            'Content-Length': Buffer.byteLength(img),
            'Access-Control-Allow-Origin': '*'
        })
        
        res.end(img);
    }
    if(req.url.indexOf('.css')!=-1){
        var css=fs.readFileSync(path.join(__dirname,req.url));
        res.writeHead(200,{
            'Content-Type': 'text/css',
            'Content-Length': Buffer.byteLength(css),
            'Access-Control-Allow-Origin': '*'
        })
        res.end(css);
    }
    if(req.url.indexOf('.js')!=-1){
        var js=fs.readFileSync(path.join(__dirname,req.url));
        res.writeHead(200,{
            'Content-Type': 'application/x-javascript',
            'Content-Length': Buffer.byteLength(js),
            'Access-Control-Allow-Origin': '*'
        })
        res.end(js);
    }
    if(req.url.indexOf('detail?chapterId')!=-1){
        var html=fs.readFileSync('./chapter.html').toString('utf8');
        res.writeHead(200,{
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(html),
            'Access-Control-Allow-Origin': '*'
        });
        res.end(html);
    }
    if(req.url.indexOf('/arr')!=-1){
        res.writeHead(200,{
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(arr));
    }
}
http.createServer((req,res)=>{
    log(`\n\n${req.method} ${req.url} ${req.httpVersion}`);
    log(req.headers);
    log();
    if(req.url.indexOf('getDetail?chapterId=')!=-1){
        var num=req.url.indexOf('=')+1;
        console.log(num);
        var id=req.url.charAt(num);
        var obj;
        // var arr=JSON.parse(fs.readFileSync('./js/node.js','utf8'));
        for(var i=0;i<arr.length;i++){
            if(arr[i].chapterId-1==id){
                obj=arr[i];
                console.log(obj);
                break;
            }
        }
        res.writeHead(200,{
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(obj));
    }
    
}).listen(8084);

function add(req,res){
    switch(req.url){
        case '/login':
            var user='';
            
            req.on('data',(data)=>{
                console.log(data);
                user+=data;
                
            });
            console.log('---',user);
            req.on('end',()=>{
                var account = JSON.parse(user);
                console.log('****',account);
                if(account.user == 'admin' && account.password =='admin') {
                    console.log('user: %s, password: %s', account.user, account.password);
                    res.end('OK');
                } else {
                   res.end('ERROR');
                }
            })
            break;
        case '/add':
            var msg='';
            req.on('data',(data)=>{
                msg+=data;
            })
            req.on('end',()=>{
                // console.log('++++++',msg);
                // var i=msg.indexOf('=')+1;
                // var j=msg.lastIndexOf('=')+1;
                // var k=msg.indexOf('&');
                // var mes={
                //     'title':msg.substring(i,k),
                //     'content':msg.substring(j)
                // }
                var mes = JSON.parse(msg);
                console.log(mes);
                
                var date=new Date().toLocaleDateString();
                var date1=date.replace('/','-');
                var add={
                    "chapterId": arr.length+1,
                    "chapterName": mes.title||'',
                    "imgPath": mes.imgPath||'',
                    'chapterDes':mes.chapterDes||'',
                    "chapterContent":mes.content||'',
                    "publishTimer": mes.publishTimer||date1,
                    "author": mes.author||'2017011948-牛玉欣',
                    "views": mes.views||0
                }
                arr.push(add);
                console.log(arr);
                fs.writeFileSync('./js/node.js',JSON.stringify(arr));
                res.end('OK');
            })
        default:
            break;
    }
}