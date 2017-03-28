var koa = require('koa');
var controller = require('koa-route');
var app = new koa();
var koa_static = require('koa-static-server');
var views = require('co-views');
var service = require('./service/webService');
var render = views('./view', {  //链接view文件夹下的文件
  map: {html: 'ejs'}
});

var qs = require('querystring');

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
/*页面ejs交互*/
app.use(controller.get('/index', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = yield render('index', {title: '书城首页'});
}));
app.use(controller.get('/search', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = yield render('search');
}));
app.use(controller.get('/detail', function*() {
  this.set('Cache-Control', 'no-cache');
  let params = qs.parse(this.req._parsedUrl.query);
  let bookId = params.id;
  this.body = yield render('detail', {bookId: bookId});
}));
app.use(controller.get('/reader', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = yield render('reader');
}));
app.use(controller.get('/bookcase', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = yield render('bookcase', {title: '书架'});
}));
app.use(controller.get('/category', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = yield render('category', {title: '分类'});
}));
app.use(controller.get('/female', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = yield render('female', {title: '女生'});
}));
app.use(controller.get('/male', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = yield render('male', {title: '男生'});
}));
app.use(controller.get('/free', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = yield render('free', {title: '免费'});
}));
app.use(controller.get('/rank', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = yield render('rank', {title: '排名'});
}));
/*前后端交互数据*/
app.use(controller.get('/ajax/index', function*() {
  this.set('Cache-Control', 'no-cache');
  let content = service.get_index_data();
  this.body = content;
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
  let params = qs.parse(this.req._parsedUrl.query);
  let id = params.id;
  if (!id) { //当没有传入id时，默认为空
    id = '';
  }
  this.body = service.get_detail_data(id);
}));

app.use(controller.get('/ajax/chapter', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = service.get_chapter_data();
}));
app.use(controller.get('/ajax/reader', function*() {
  this.set('Cache-Control', 'no-cache');
  let params = qs.parse(this.req._parsedUrl.query);
  let id = params.id;
  if (!id) { //当没有传入id时，默认为空
    id = 1;
  }
  this.body = service.get_reader_content(id);
}));
//线上数据  nodeJs：请求转发/接口转发
app.use(controller.get('/ajax/search', function*() {
  this.set('Cache-Control', 'no-cache');
  let qs = require('querystring');
  let params = qs.parse(this.req._parsedUrl.query);
  let start = params.start;
  let end = params.end;
  let keyword = params.keyword;
  this.body = yield service.get_search_data(start, end, keyword);
}));
app.listen(3000);
console.log('已经启动app.js');