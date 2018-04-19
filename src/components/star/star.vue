<template>
    <div class="star" :class="starType">
      <span class="star-item" v-for="(itemClass,index) in itemClasses" :key="itemClass.id" :class="itemClass"></span>
    </div>
</template>
<!--type="text/ecmascript-6"识别es6-->
<script type="text/ecmascript-6">
    const LENGTH = 5;
    const CLS_ON = "on";
    const CLS_HARF = "half";
    const CLS_OFF = "off";
    export default {
        props : ["size","score"],
        data () {
            return {}
        },
        computed : {
          starType () {
            return "star-" + this.size;
          },
          itemClasses () {
            let result = [];
            let score = Math.floor(this.score * 2)/2;
            let hasDecimal = score % 1 !== 0;
            let int = Math.floor(score);
            for (let i = 0;i < int;i++){
              result.push(CLS_ON);
            }
            if (hasDecimal){
              result.push(CLS_HARF);
            }
            while (result.length < LENGTH){
              result.push(CLS_OFF);
            }

            return result;
          }
        }
    }
</script>

<!--scoped作用于当前模块，lang="less" rel="stylesheet/less"识别less-->
<style scoped lang="less" rel="stylesheet/less">
  @import '../../common/less/mixin';
  .star{
    font-size: 0;
    .star-item{
      display:inline-block;
      background-repeat: no-repeat;
      &:last-child{
        margin-right:0;
      }
    }
    &.star-48{
      .star-item{
        width:20px;
        height:20px;
        margin-right:22px;
        background-size: 20px 20px;
        &.on{
          .bg-image("star48_on")
        }
        &.half{
          .bg-image("star48_half")
        }
        &.off{
          .bg-image("star48_off")
        }
      }
    }
    &.star-36{
      .star-item{
        width:15px;
        height:15px;
        margin-right:6px;
        background-size: 15px 15px;
        &.on{
          .bg-image("star36_on")
        }
        &.half{
          .bg-image("star36_half")
        }
        &.off{
          .bg-image("star36_off")
        }
      }
    }
    &.star-24{
      .star-item{
        width:10px;
        height:10px;
        margin-right:3px;
        background-size: 10px 10px;
        &.on{
          .bg-image("star24_on")
        }
        &.half{
          .bg-image("star24_half")
        }
        &.off{
          .bg-image("star24_off")
        }
      }
    }
  }
</style>
