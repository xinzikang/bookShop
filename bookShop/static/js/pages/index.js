$.ajax({
  url: '/ajax/index',
  dataType: 'json',
  success:function (d) {
    let window_width = $(window).width();
    if(window_width < 320) {
      window_width = 320;
    };
    new Vue({
      el:'#root',
      data:{
        window_width: window_width,
        double_width:'width:'+window_width*2+'px',
        top: d.items[0],
        hot: d.items[1],
        recommend: d.items[2],
        female: d.items[3],
        male: d.items[4],
        free: d.items[5],
        bookcase: []
      },
      mounted() {
        let that = this;
        let oBody = $('body');
        let oBookCase = $('#book-case');
        let oIndexWarpper = $('.index-warpper');
        let iBookCaseHei = oBookCase.height();
        let iIndexHei = oIndexWarpper.height();
        let mySwiper = new Swiper ('.swiper-container', {
          direction: 'horizontal',
          loop: false,
          onSlideChangeEnd(){
            oBody.scrollTop(0);
            if(oBookCase[0].style.display === 'none'){ //用于第一次显示bookcase层
              $.ajax({
                url:'/ajax/bookcase',
                dataType:'json',
                success: function (d) {
                  that.bookcase = d.items;
                }
              });
              oBookCase.show();
            }
            if(mySwiper.activeIndex === 1){ //当前活动块的索引为0表示bookcase展示
             console.log('书架也')
             oIndexWarpper.height(iBookCaseHei);
             } else{
             console.log('index也');
             oIndexWarpper.height(iIndexHei);
             }
          }
        });
      },
      methods: {
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
        },
        gotoSearch(){
          location.href = '/search';
        }
      }
    });
  }
});