<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" :class="{active:selectType === 2}" @click.stop.prevent="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" :class="{active:selectType === 0}" @click.stop.prevent="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" :class="{active:selectType === 1}" @click.stop.prevent="select(1,$event)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{on:onlyContent}">
      <span class="icon-check_circle" @click.stop.prevent ="toggleContent"></span>
        <span class="text">
          只看有内容的评价
        </span>
    </div>
  </div>
</template>
<!--type="text/ecmascript-6"识别es6-->
<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      'ratings':{
        type:Array,
        default() {
          return []
        }
      },
      'desc':{
        type:Object,
        default() {
          return {
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
          }
        }
      }
    },
    data () {
      return {
        selectType : ALL ,
        onlyContent : false,
      }
    },
    computed : {
      positives (){
        return this.ratings.filter((rating) =>{
          return rating.rateType === POSITIVE;
        })
      },
      negatives (){
        return this.ratings.filter((rating) =>{
          return rating.rateType === NEGATIVE;
        })
      }
    },
    methods: {
      select (type,e){
        if (!e._constructed) {
          return;
        }
        this.selectType = type;
        this.$emit("select",type)
      },
      toggleContent (e){
        if (!e._constructed) {
          return;
        }
        this.onlyContent = !this.onlyContent;
        this.$emit('toggle',this.onlyContent);
      }

    },
  }
</script>

<!--scoped作用于当前模块，lang="less" rel="stylesheet/less"识别less-->
<style scoped lang="less" rel="stylesheet/less">
  @import '../../common/less/mixin';

  .ratingselect {
    .rating-type {
      margin: 0 18px;
      padding: 18px 0;
      font-size: 0;
      .border-1px(rgba(7, 17, 27, 0.1));
      .block {
        display: inline-block;
        padding: 8px 12px;
        font-size: 12px;
        line-height: 16px;
        margin-right: 8px;
        border-radius: 2px;
        color: rgb(77, 85, 93);
        .count {
          font-size: 8px;
          margin-left: 2px;
        }
        &.positive {
          background: rgba(0, 160, 220, 0.2);
        }
        &.negative {
          background: rgba(77, 85, 93, 0.2);
        }
        &.active{
          color: #fff;
          &.positive {
            background: rgb(0, 160, 220);
          }
          &.negative {
            background: rgb(77, 85, 93);
          }
        }
      }
    }
    .switch {
      padding: 12px 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      color: rgb(147, 153, 159);
      .icon-check_circle {
        display: inline-block;
        vertical-align: top;
        font-size: 24px;
        line-height: 24px;
      }
      .text {
        font-size: 12px;
        line-height: 24px;
      }
      &.on{
        .icon-check_circle {
          color: #00c850;
        }
      }
    }
  }
</style>
