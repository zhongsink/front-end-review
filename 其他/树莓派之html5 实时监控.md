# 树莓派 html5实时监控
原理：
- stearm -> ffmpeg -> nodejs -> websocket -> html5

### 环境

- 树莓派 / 摄像头
- ffmpeg
- nodejs 嵌入式平台使用nodejs 兼容性比我想象的好的多
- [jsmepeg](https://github.com/phoboslab/jsmpeg)

### 安装nodejs (arm 版)

nodejs 官网已经提供了 armv7 平台的安装包。
```
wget https://npm.taobao.org/mirrors/node/v6.9.0/node-v6.9.0-linux-armv7l.tar.gz
tar zxvf node-v6.9.0-linux-armv7l.tar.gz
mv node-v6.9.0-linux-armv7l.tar.gz /usr/local
```
将node的bin目录添加至环境变量，方便起见，直接将这句话加到 /etc/profile 里面。
```
export PATH="/usr/local/node-v6.9.0-linux-armv7l/bin:$PATH"
```
自己 node 一下试试

node -v

### 安装ffmepeg

```
wget https://www.ffmpeg.org/releases/ffmpeg-3.2.2.tar.gz
tar zxvf ffmpeg-3.2.2.tar.gz
cd ffmpeg-3.2.2
./configure --enable-shared --disable-yasm --prefix=/usr/local/ffmpeg
make && make install
```
### 安装 jsmpeg
```
git clone https://github.com/phoboslab/jsmpeg
```
安装依赖 npm install -g ws

## 搭建：
```
cd jsmepeg
node websocket-relay.js supersecret
```

 ```
cd /usr/local/ffmpeg/bin

sudo ./ffmpeg -f v4l2 -framerate 25 -video_size 640x480 -i /dev/video0 -f mpegts -codec:v mpeg1video -s 640x480 -b:v 1000k -bf 0 -codec:a mp2 -b:a 128k -muxdelay 0.001 http://localhost:8081/supersecret
 ```
 -s 设定分辨率大小， -f 指定格式， -i 指定接口， -b 指定视频流比特率， -r 指定帧率，后面的 url 填上在 websocket-relay.js 设置好的格式。

由于 jsmpeg 中没有写静态服务

- 可以直接 利用 fs 模块 response.setHeader('Content-Type','text/html;charset=utf-8');response.send(fs.readfile("./view-stream.html")); 同时也要写一个简单的静态服务
```
var streamServer = http.createServer( function(request, response) {
	var params = request.url.substr(1).split('/');

	if (params[0] !== STREAM_SECRET) {
		console.log(
			'Failed Stream Connection: '+ request.socket.remoteAddress + ':' +
			request.socket.remotePort + ' - wrong secret.'
		);
		response.end();
	}

	if(params[0]==="" || params[0]==="view-stream.html" ){
        response.setHeader('Content-Type','text/html;charset=utf-8');
        response.send(fs.readfile("./view-stream.html"),function(err){
            console.log(err);
        });
    }

	if(params[0]==="jsmpeg.min.js"){
        response.setHeader('Content-Type','text/javascript;charset=utf-8');
        response.send(fs.readfile("./jsmpeg.min.js"),function(err){
            console.log(err);
        });
    }

	response.connection.setTimeout(0);
	console.log(
		'Stream Connected: ' + 
		request.socket.remoteAddress + ':' +
		request.socket.remotePort
	);
	request.on('data', function(data){
		socketServer.broadcast(data);
		if (request.socket.recording) {
			request.socket.recording.write(data);
		}
	});
	request.on('end',function(){
		console.log('close');
		if (request.socket.recording) {
			request.socket.recording.close();
		}
	});

	// Record the stream to a local file?
	if (RECORD_STREAM) {
		var path = 'recordings/' + Date.now() + '.ts';
		request.socket.recording = fs.createWriteStream(path);
	}
}).listen(STREAM_PORT);

接下来就可以直接访问 http://localhost:8081/supersecret 获取实时的视频了，同局域网也可访问
```

- 也可以直接使用 静态服务器。 http-server 
```
npm install -g http-server
http-server ./jsmepeg

接下来就可以直接访问 http://localhost:8080/view-stream.html 获取实时的视频了,同局域网也可访问

``` 

对此 我添加了对实时视频的一点简单处理， 可以获取到视频的截图
修改 view-stream.html

```

<head>
	<title>实时监控</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<style type="text/css">
		html, body {
			background-color: #686868;
			text-align: center;
		}
		@media screen and (min-width: 600px) {
			canvas{
				width:600px;
				height: 480px;
			}
		}
		@media screen and (max-width: 600px) {
    		canvas{
				width:320px;
				height: 240px;
			}
		}
	</style>
	
</head>
```
```
<body>
	<canvas id="video-canvas"></canvas>
	<div>
		 <button onclick="saveAsLocalImage()">截图</button>
	</div>
	<script type="text/javascript" src="jsmpeg.min.js"></script>
	<script type="text/javascript">
		var canvas = document.getElementById('video-canvas');
		var url = 'ws://'+document.location.hostname+':8082/';
		var player = new JSMpeg.Player(url, {canvas: canvas});
		
		function saveAsLocalImage () {   
                // var image = myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream;Content-Disposition: attachment;filename=download.png");  
				var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  
				console.log(image);
				var saveFile = function(data, filename){
    					var save_link = document.createElement('a');
    					save_link.href = data;
    					save_link.download = filename;
   
    					var event = document.createEvent('MouseEvents');
    					event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    					save_link.dispatchEvent(event);
					};
   
					// 下载后的文件名
					var filename = 'download' + (new Date()).getTime() + '.png';
					saveFile(image,filename); 
                // window.location.href=image; 

            }  
	</script>
</body>

```

参考

- [http://www.cnblogs.com/fsjohnhuang/p/4147810.html](http://www.cnblogs.com/fsjohnhuang/p/4147810.html)
- [https://github.com/phoboslab/jsmpeg](https://github.com/phoboslab/jsmpeg)








