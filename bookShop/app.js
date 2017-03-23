var koa = require('koa');
var controller = require('koa-route');
var app = new koa();
var koa_static = require('koa-static-server');
var views = require('co-views');
var service = require('./service/webService');
var render = views('./view', {  //链接view文件夹下的文件
  map: {html: 'ejs'}
});

app.use(koa_static({ //使用中间件
  rootDir: './static/', //本地文件夹路径
  rootPath: '/static/', //浏览器路径
  maxage: 0  //缓存过期时间
}));

//测试api

app.use(controller.get('/route_test', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = 'lllla';
}));
//测试ejs模板
app.use(controller.get('/ejs_test', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = yield render('test', {title: 'ejs测试文字'});
}));
app.use(controller.get('/api_test', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = service.get_test_data();
}));
//本地mock数据
//任务区域代码
app.use(controller.get('/ajax/index', function*() {
  this.set('Cache-Control', 'no-cache');
  let content = service.get_index_data();
  this.body = yield render('index', {title: content});
}));
app.use(controller.get('/ajax/bookcase', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = service.get_bookcase_data();
}));
app.use(controller.get('/ajax/category', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = service.get_category_data();
}));
app.use(controller.get('/ajax/female', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = service.get_female_data();
}));
app.use(controller.get('/ajax/male', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = service.get_male_data();
}));
app.use(controller.get('/ajax/free', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = service.get_free_data();
}));
app.use(controller.get('/ajax/rank', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = service.get_rank_data();
}));
app.use(controller.get('/ajax/detail', function*() {
  this.set('Cache-Control', 'no-cache');
  var qs = require('querystring');
  var params = qs.parse(this.req._parsedUrl.query);
  var id = params.id;
  if (!id) { //当没有传入id时，默认为空
    id = '';
  }
  this.body = service.get_detail_data(id);
}));

//线上数据  nodeJs：请求转发/接口转发
app.use(controller.get('/ajax/search', function*() {
  this.set('Cache-Control', 'no-cache');
  var qs = require('querystring');
  var params = qs.parse(this.req._parsedUrl.query);
  var start = params.start;
  var end = params.end;
  var keyword = params.keyword;
  this.body = yield service.get_search_data(start, end, keyword);
}));
app.listen(3000);
console.log('已经启动app.js');