<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now"><span class="currency">￥</span>{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <transition name="fade">
            <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count ===0">
              加入购物车
            </div>
          </transition>
          <div class="cartcontrol-wrapper">
            <cartcontrol @add="addFood" :food="food"></cartcontrol>
          </div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <div class="title">商品评价</div>
          <ratingselect @select="select" @toggle="toggle" :ratings="food.ratings" :desc="desc"></ratingselect>
          <div class="rating-wrapper">
            <ul v-if="food.ratings && food.ratings.length">
              <li class="rating-item" v-for="(rating,index) in food.ratings" v-show="showRating(rating.text,rating.rateType)">
                <div class="time">
                  <span>{{rating.rateTime | formatDate}}</span>
                </div>
                <div class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </div>
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" alt="avatar" height="12px" width="12px">
                </div>
              </li>
            </ul>
            <div class="no-ratings" v-else>
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<!--type="text/ecmascript-6"识别es6-->
<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import BScroll from 'better-scroll';
  import {format} from '../../common/js/date.js';
  const ALL = 2;
  export default {
    props: ['food'],
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlycontent:false,
        desc:{
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show (){
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh();
          }
        })
      },
      hide (){
        this.showFlag = false;
      },
      addFirst (e){
        if (!e._constructed) {
          return;
        }
        this.$set(this.food, "count", 1)
        this.$emit('add', e.target);
      },
      addFood (e){
        this.$emit('add', e);
      },
      select (type){
        this.selectType = type;
        this.$nextTick(() =>{
          this.scroll.refresh();
        })
      },
      toggle (type){
        this.onlycontent = type;
        this.$nextTick(() =>{
          this.scroll.refresh();
        })
      },
      showRating (text,type){
        if(this.onlycontent && !text){
          return false;
        }
        if(this.selectType === ALL){
          return true;
        }else{
          return this.selectType === type;
        }
      }
    },
    filters:{
      formatDate (value){
        let date = new Date(value);
        return format(date,"yyyy-MM-dd hh:mm");
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>

<!--scoped作用于当前模块，lang="less" rel="stylesheet/less"识别less-->
<style scoped lang="less" rel="stylesheet/less">
  @import '../../common/less/mixin';
  .food {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    width: 100%;
    z-index: 30;
    background: #fff;
    transition: all 0.5s ease;
    overflow: hidden;
    &.move-enter-active, &.move-leave-active {
      transform: translateX(0);
    }
    &.move-enter, &.move-leave-to {
      transform: translateX(100%);
    }
    .food-content {
      .image-header {
        position: relative;
        width: 100%;
        padding-top: 100%;
        height: 0;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .back {
          position: absolute;
          top: 10px;
          left: 0;
          .icon-arrow_lift {
            display: block;
            padding: 10px;
            font-size: 20px;
            color: #fff;
          }
        }
      }
      .content {
        position: relative;
        padding: 18px;
        .title {
          font-size: 14px;
          line-height: 14px;
          font-weight: bold;
          color: rgb(7, 17, 27);
          margin-bottom: 8px;
        }
        .detail {
          font-size: 10px;
          line-height: 10px;
          color: rgb(147, 153, 159);
          margin-bottom: 18px;
        }
        .price {
          .now {
            font-size: 14px;
            line-height: 24px;
            color: rgb(240, 20, 20);
            font-weight: bold;
          }
          .old {
            font-size: 10px;
            line-height: 24px;
            color: rgb(147, 153, 159);
            font-weight: bold;
            text-decoration: line-through;
          }
          .currency {
            font-size: 10px;
          }
        }
        .buy {
          position: absolute;
          bottom: 18px;
          right: 18px;
          padding: 6px 12px;
          background: rgb(0, 160, 220);
          border-radius: 12px;
          color: #fff;
          font-size: 10px;
          line-height: 12px;
          opacity: 1;
          transition: all 0.5s ease;
          &.fade-enter-active, &.fade-leave-active {
            opacity: 1;
          }
          &.fade-enter, &.fade-leave-to {
            opacity: 0;
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 12px;
          bottom: 12px;
        }
      }
      .info {
        padding: 18px;
        .title {
          font-size: 14px;
          line-height: 14px;
          color: rgb(7, 17, 27);
          margin-bottom: 6px;
        }
        .text {
          padding: 0 8px;
          font-size: 12px;
          line-height: 24px;
          color: rgb(77, 85, 93);
        }
      }
      .rating {
        padding-top: 18px;
        .title {
          margin-left: 18px;
          font-size: 14px;
          line-height: 14px;
          color: rgb(7, 17, 27);
        }
        .rating-wrapper{
          .no-ratings{
            padding:16px;
            font-size: 14px;
            line-height: 14px;
            color:rgb(147,153,159);
          }
          .rating-item{
            position:relative;
            padding:16px;
            .border-1px(rgba(7, 17, 27, 0.1));
            .user{
              position: absolute;
              top:16px;
              right:16px;
              line-height: 12px;
              .name{
                display: inline-block;
                vertical-align: top;
                font-size: 10px;
                color: rgb(147,153,159);
                margin-right:6px;
              }
              img{
                border-radius: 50%;
              }
            }
            .time{
              font-size: 10px;
              line-height: 12px;
              color:rgb(147,153,159);
              margin-bottom: 6px;
            }
            .text{
              font-size: 12px;
              line-height: 24px;
              .icon-thumb_up{
                color:rgb(0,160,220);
                margin-right:4px;
              }
              .icon-thumb_down{
                color:rgb(147,153,159);
                margin-right:4px;
              }
            }
          }
        }
      }
    }
  }
</style>
