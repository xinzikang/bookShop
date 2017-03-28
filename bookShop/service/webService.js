/**
 * Created by xzk on 2017/3/21.
 */
var fs = require('fs');
//测试读取本地mock文件
exports.get_test_data = function () {
  var content = fs.readFileSync('./mock/test.json','utf-8');
  return content;
};
//任务代码
exports.get_index_data = function () {
  var content = fs.readFileSync('./mock/index.json','utf-8');
  return content;
};
exports.get_bookcase_data = function () {
  var content = fs.readFileSync('./mock/book/bookcase.json','utf-8');
  return content;
};
exports.get_category_data = function () {
  var content = fs.readFileSync('./mock/channel/category.json','utf-8');
  return content;
};
exports.get_female_data = function () {
  var content = fs.readFileSync('./mock/channel/female.json','utf-8');
  return content;
};
exports.get_rank_data = function () {
  var content = fs.readFileSync('./mock/channel/rank.json','utf-8');
  return content;
};
exports.get_male_data = function () {
  var content = fs.readFileSync('./mock/channel/male.json','utf-8');
  return content;
};
exports.get_free_data = function () {
  var content = fs.readFileSync('./mock/channel/free.json','utf-8');
  return content;
};
//得到某一本书的具体详细信息，注意此时需要传递书籍的id,需要给传递的id做容错处理
exports.get_detail_data = function (id) {
  //此处id需要容错，如果没有传入i或者id不合法，则给id一个默认值
  if(!id){
    id = 352876;
  }
  let content = null;
  if(fs.existsSync('./mock/detail/'+ id +'.json')) { //如果存在文件夹
    content = fs.readFileSync('./mock/detail/'+ id +'.json','utf-8');
  } else{
    content = fs.readFileSync('./mock/detail/352876.json','utf-8');
  }
  return content;
};

exports.get_chapter_data = function () {
  let content = fs.readFileSync('./mock/reader/chapter.json','utf-8');
  return content;
};
exports.get_reader_content = function (chapterId) {
  //此处id需要容错，如果没有传入i或者id不合法，则给id一个默认值
  if(!chapterId){
    chapterId = 1;
  }
  let content = fs.readFileSync('./mock/reader/data'+ chapterId +'.json','utf-8');
  return content;
};

exports.get_search_data =function (start,end,keyword) { //获取线上接口
  return function (cb) { //返回的是一个异步函数
    var http = require('http');
    var qs = require('querystring');
    var data = {
      start: start,
      end: end,
      s: keyword
    };
    var content = qs.stringify(data); //将data字符串化
    var http_request = {
      hostname: 'dushu.xiaomi.com', //主机地址
      port: 80,
      path: '/store/v0/lib/query/onebox?' + content
    };
    //发送请求
    req_obj = http.request(http_request,function (_res) {
      var content = '';
      _res.setEncoding('utf8');
      _res.on('data',function (chunk) { //返回数据块
        content += chunk;
      });
      _res.on('end',function () {
        cb(null,content); //第一个为错误代码
      });

    });

    req_obj.on('error',function () {

    });
    req_obj.end(); //发送请求之后，回到回调函数并执行

  };
};
