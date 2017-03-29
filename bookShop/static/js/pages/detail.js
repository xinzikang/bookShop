/**
 * Created by xzk on 2017/3/26.
 */
  $.ajax({
    url: '/ajax/detail',
    dataType: 'json',
    data:{
      id:localStorage.getItem('bookId')
    },
    success: function (data) {
      new Vue({
        el: '#detail-root',
        data() {
          return{
            item: data.item,
            author_books: data.author_books,
            related :data.related,
            isFold: true
          }
        },
        methods: {
          fold() {
            this.isFold = ! this.isFold;
            if(this.isFold) {
              this.$refs.foldDOM.className = 'book-detail-fold';
            } else{
              this.$refs.foldDOM.className = 'book-detail-unfold';
            }
          },
          gotoReader() {
            location.href = '/reader';
          },
          gotoIndex() {
            location.href = '/index';
          }
        }
      })
    }
  });
