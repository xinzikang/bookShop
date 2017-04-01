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
        single_width:window_width+'px',
        banner_height:window_width*0.36+'px',
        top: d.items[0],
        hot: d.items[1],
        recommend: d.items[2],
        recommend_show:[],
        recommend_min:0,
        recommend_max:5,
        female: d.items[3],
        male: d.items[4],
        free: d.items[5],
        bookcase: []
      },
      watch:{
        recommend_min(){
          this.showChange()
        }
      },
      created(){
        this.showChange()
      },
      mounted() {
        let that = this;
        let oBody = $('body');
        let oBookCase = $('#book-case');
        let oIndexWarpper = $('.index-warpper');
        let oTabBar = $('#tab_bar')[0];
        let oTabIndex = $('#index_header')[0];
        let oTabBookCase = $('#bookcase_header')[0];
        let iBookCaseHei = oBookCase.height();
        let iIndexHei = oIndexWarpper.height();
        let oBannerUl = $('.top-home').find('.swiper-wrapper');
        let oBannerLi = oBannerUl.find('li');
        oBannerUl.width(oBannerLi.length*this.window_width);
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
             console.log('书架也');
              oTabBar.style.left = '66%';
              oTabIndex.className = '';
              oTabBookCase.className = 'active';
             oIndexWarpper.height(iBookCaseHei);

             } else{
             console.log('index也');
              oTabBar.style.left = '26%';
              oTabIndex.className = 'active';
              oTabBookCase.className = '';
             oIndexWarpper.height(iIndexHei);
             }
          },
          onSlideChangeStart(){
            if(mySwiper.activeIndex === 1){ //当前活动块的索引为0表示bookcase展示
              oTabBar.style.left = '64%';
              oTabIndex.className = '';
              oTabBookCase.className = 'active';

            } else{
              oTabBar.style.left = '26%';
              oTabIndex.className = 'active';
              oTabBookCase.className = '';
            }
          }
        });
        let bannerSwiper = new Swiper('.banner-swiper-container',{
          direction: 'horizontal',
          loop: false,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          centeredSlides: true,
          autoplay: 2500,
          autoplayDisableOnInteraction: false
        })
      },
      methods: {
        showChange(){
          this.recommend_show = this.recommend.data.data.slice(this.recommend_min,this.recommend_max);
        },
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
        },
        tabToMale() {
          this.recommend_min=0;
          this.recommend_max=5;
          this.$refs.maleBtn.className = 'active';
          this.$refs.femaleBtn.className = '';
        },
        tabToFemale() {
          this.recommend_min=15;
          this.recommend_max=20;
          this.$refs.maleBtn.className = '';
          this.$refs.femaleBtn.className = 'active';
        }
      }
    });
  }
});