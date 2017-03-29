/**
 * Created by xzk on 2017/3/27.
 */

new Vue({
  el:"#search-root",
  data: {
    search_text: '',
    search_result:[],
    li_val:['如果蜗牛有爱情','择天记','一夜弃妃','诛仙','豪门小老婆','异能小农民','武动乾坤','别那么骄傲']
  },
  methods: {
    doSearch(dd) {
      if(dd !== ''){
        var keyword = dd;
      } else{
        var keyword = this.search_text;
      }
      let that = this;
      if(!keyword){ // 如果搜索框没有内容,置空
        this.search_result = [];
        return;
      }
      $.ajax({
        url: '/ajax/search',
        dataType: 'json',
        data:{
          keyword : keyword
        },
        success: function (d) {
          that.search_text = '';
          that.search_result = d.items;
          console.log(that.search_result);
        },
        error: function (d) {
          console.log(d)
        }
      })
    },
    /*doLiSearch(liValue) { // bug:传参与不传参的问题：不传参的时候这个参数是ev，所以不传参的时候需要传入一个空字符串
      let keyword = liValue;
      let that = this;
      console.log(11,keyword,22);
      $.ajax({
        url: '/ajax/search',
        dataType: 'json',
        data:{
          keyword : keyword
        },
        success: function (d) {
          that.search_result = d.items;
          console.log(that.search_result);
        },
        error: function (d) {
          console.log(d)
        }
      })
    },*/
    gotoDetail(id) {
      location.href = '/detail';
      $.ajax({
        url:'/ajax/detail',
        data:{
          "id":id
        },
        dataType: 'json',
        success: function (d) {
          console.log(d,'请求成功');
          localStorage.setItem('bookId',id);
        },
        error: function (d) {
          console.log(d,'请求失败');
        }
      })
    }

  }
})
