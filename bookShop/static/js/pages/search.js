/**
 * Created by xzk on 2017/3/27.
 */

new Vue({
  el:"#search-root",
  data: {
    search: [],
    enpty: false
  },
  methods: {
    doSearch() {
      let keyword = $('#searchText').val();
      let that = this;
      $.ajax({
        url: '/ajax/search',
        dataType: 'json',
        data:{
          keyword : keyword
        },
        success: function (d) {
          console.log(d)
        },
        error: function (d) {
          console.log(d)
        }
      })
    }

  }
})
