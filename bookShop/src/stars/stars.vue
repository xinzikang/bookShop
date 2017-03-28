<template>
    <div class="star" :class="starType">
      <span v-for="(value,index) in itemClasses" class="star-item" :class="value"></span>
    </div>
</template>


<script type="text/ecmascript-6">
  const LENGHT = 5;
  const ClaOn = 'on';
  const ClaOff = 'off';
  const ClaHalf = 'half';

  export default {
    props: {
      size: {
          type: Number
      },
      score: {
          type: Number
      }
    },
    computed: {
      starType() {
          return 'star-' + this.size;
      },
      itemClasses() {
          let result = [];
          let score = Math.floor(this.score * 2) / 2;
          let hasDecimal = score % 2 !== 0;
          let intNum = Math.floor(score);
          for (let i = 0; i < intNum; i++) {
              result.push(ClaOn);
          }
          if (hasDecimal) {
              result.push(ClaHalf);
          }
          while (result.length < LENGHT) {
              result.push(ClaOff);
          }
          return result;
      }
    }
};
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../static/css/mixin.styl"
/*有两种状态：星星的大小尺寸，starTpye -> star-24/36/48
            星星的颜色状态,itemClasses -> [on/off/half]
*/
  .star
    display: inline-block
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-24
      .star-item
        height: 10px
        width: 10px
        margin-right: 3px
        background-size: 10px 10px
        &.last-chlid
          margin-right: 0px
        &.on
          bg-img('star24_on')
        &.off
          bg-img('star24_off')
        &.half
          bg-img('star24_half')
    &.star-36
      .star-item
        height: 15px
        width: 15px
        margin-right: 6px
        background-size: 15px 15px
        &.last-chlid
          margin-right: 0px
        &.on
          bg-img('star36_on')
        &.off
          bg-img('star36_off')
        &.half
          bg-img('star36_half')
    &.star-48
      .star-item
        height: 20px
        width: 20px
        margin-right: 22px
        background-size: 20px 20px
        &.last-chlid
          margin-right: 0px
        &.on
          bg-img('star48_on')
        &.off
          bg-img('star48_off')
        &.half
          bg-img('star48_half')
</style>
