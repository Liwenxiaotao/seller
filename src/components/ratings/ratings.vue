<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <div class="star-wrapper">
              <star :size="36" :score="seller.serviceScore"></star>
            </div>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <div class="star-wrapper">
              <star :size="36" :score="seller.foodScore"></star>
            </div>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <div class="title">送达时间</div>
            <div class="delivery">{{seller.deliveryTime}}分钟</div>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="select" @toggle="toggle" :ratings="ratings" :desc="desc"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item border-1px" v-for="(rating,index) in ratings" v-show="showRating(rating.text,rating.rateType)">
            <div class="avatar">
              <img :src="rating.avatar" alt="avatar" width="28" height="28">
            </div>
            <div class="content">
              <div class="name">{{rating.username}}</div>
              <div class="star-wrapper">
                <div class="star-inner">
                  <star :size="24" :score="rating.score"></star>
                </div>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <div class="text">{{rating.text}}</div>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <div class="item-wrapper">
                  <div class="item" v-for="(item,index) in rating.recommend">{{item}}</div>
                </div>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import  star from 'components/star/star';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import BScroll from 'better-scroll';
  import {format} from '../../common/js/date.js';

  const ERR_OK = 0;
  const ALL= 2;
  export default {
    props:['seller'],
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlycontent:false,
        ratings :[],
        desc:{
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    methods:{
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
    created(){
      this.$http.get('/api/ratings').then((res) =>{
        let body = res.body;
        if(body.errno === ERR_OK){
          this.ratings = body.data;
        }
        this.$nextTick(() =>{
          this.scroll = new BScroll(this.$refs.ratings,{
            click:true,
          })
        });
      });
    },
    filters:{
      formatDate (value){
        let date = new Date(value);
        return format(date,"yyyy-MM-dd hh:mm");
      }
    },
    components:{
      star,
      split,
      ratingselect
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import '../../common/less/mixin';
  .ratings {
    position: absolute;
    left: 0;
    top: 174px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .ratings-content{
      .overview{
        display: flex;
        padding:18px 24px 18px 0;
        .overview-left{
          flex:0 0 137px;
          text-align: center;
          border-right:1px solid rgba(7,17,27,0.1);
          @media only screen and (max-width: 320px){
            flex: 0 0 120px;
            width: 120px;
          }
          .score{
            font-size: 24px;
            line-height: 28px;
            color: rgb(255,153,0);
            margin-bottom:6px;
          }
          .title{
            font-size: 12px;
            line-height: 12px;
            color: rgb(7,17,27);
            margin-bottom:8px;
          }
          .rank{
            font-size: 10px;
            line-height: 10px;
            color:rgb(147,153,159);
            margin-bottom: 6px;
          }
        }
        .overview-right{
          flex:1;
          padding-left: 24px;
          @media only screen and (max-width: 320px){
            padding-left: 6px;
          }
          .score-wrapper{
            font-size: 0;
            margin-bottom: 8px;
            .title{
              display: inline-block;
              vertical-align: top;
              font-size: 12px;
              line-height: 18px;
              color:rgb(7,17,27);
              margin-right:12px;
            }
            .star-wrapper{
              display: inline-block;
              vertical-align: top;
            }
            .score{
              display: inline-block;
              vertical-align: top;
              font-size: 12px;
              line-height: 18px;
              color:rgb(255,153,0);
            }
          }
          .delivery-wrapper{
            font-size:0;
            .title{
              display: inline-block;
              vertical-align: top;
              font-size: 12px;
              line-height: 18px;
              color:rgb(7,17,27);
              margin-right:12px;
              margin-bottom: 8px;
            }
            .delivery{
              display: inline-block;
              vertical-align: top;
              font-size: 12px;
              line-height: 18px;
              color:rgb(147,153,159);
            }
          }
        }
      }
      .rating-wrapper{
        padding:0 18px;
        background: #fff;
        .rating-item{
          display: flex;
          padding:18px 0;
          .border-1px(rgba(7,17,27,0.1));
          .avatar{
            flex:0 0 28px;
            width:28px;
            margin-right:12px;
            img{
              border-radius: 50%;
            }
          }
          .content{
            flex:1;
            .name{
              font-size: 10px;
              line-height: 12px;
              color:rgb(7,17,27);
              margin-bottom: 4px;
            }
            .star-wrapper{
              font-size: 0;
              margin-bottom: 6px;
              .star-inner{
                display: inline-block;
                vertical-align: top;
              }
              .delivery{
                display: inline-block;
                vertical-align: top;
                font-size: 10px;
                line-height: 12px;
                color:rgb(147,153,159);
                margin-left:6px;
              }
            }
            .text{
              font-size: 12px;
              line-height: 18px;
              color:rgb(7,17,27);
              margin-bottom: 8px;
            }
            .recommend{
              display: flex;
              .icon-thumb_up{
                flex: 0 0 12px;
                width: 12px;
                font-size: 12px;
                line-height: 16px;
                color:rgb(0,160,220);
              }
              .item-wrapper{
                flex:1;
                font-size: 9px;
                line-height: 16px;
                .item{
                  display: inline-block;
                  vertical-align: top;
                  font-size: 9px;
                  color:rgb(147,153,159);
                  margin:0 0 4px 8px;
                  padding:0 6px;
                  border:1px solid rgba(7,17,27,0.1);
                }
              }

            }
            .time{
              position: absolute;
              top:18px;
              right:18px;
              font-size: 10px;
              line-height: 12px;
              color:rgb(147,153,159);
            }
          }
        }
      }
    }
  }
</style>
