var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();
app.use(express.static(__dirname));


app.use('/fcg_v8_toplist_cp.fcg', proxy({
  target: 'https://c.y.qq.com/v8/fcg-bin/',
  changeOrigin: true
}));
app.use('/api/lyric', proxy({
  target: 'http://ustbhuangyi.com/music/',
  changeOrigin: true
}))
app.listen(3000);