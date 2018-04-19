<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <div class="title">{{seller.name}}</div>
        <div class="desc border-1px">
          <div class="star-wrapper">
            <star :size="36" :score="seller.score"></star>
          </div>
          <div class="text">({{seller.ratingCount}})</div>
          <div class="text">月售{{seller.sellCount}}单</div>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
           <div class="content">
             <span class="stress">{{seller.minPrice}}</span>元
           </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavourite">
          <span class="icon-favorite" :class="{active:favourite}"></span>
          <div class="text">{{favourieText}}</div>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <div class="title">公告和活动</div>
        <div class="content-wrapper border-1px">{{seller.bulletin}}</div>
        <ul class="supports" v-if="seller.supports">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <div class="title">商家实景</div>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic,index) in seller.pics">
              <img :src="pic" height="90" width="120">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <div class="title border-1px">商家信息</div>
        <ul>
          <li class="info-item border-1px" v-for="(item,index) in seller.infos">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import  star from 'components/star/star';
  import split from 'components/split/split';
  import BScroll from 'better-scroll';
  import {saveToLocal,loadFromLocal} from '../../common/js/store';
  export default {
    props:['seller'],
    data () {
      return {
        favourite:loadFromLocal(this.seller.id,'favourite',false),
      }
    },
    computed:{
      favourieText (){
        return this.favourite?"已收藏":"收藏";
      }
    },
    methods:{
      _initPics (){
        if (this.seller.pics){
          let width = 120;
          let marginRight = 6;
          let wholeWidth = (width + marginRight) * this.seller.pics.length - 6;
          this.$refs.picList.style.width = wholeWidth + "px";
        }
        this.$nextTick(() =>{
          if(!this.picScroll){
            this.picScroll = new BScroll(this.$refs.picWrapper,{
              scrollX:true,
              eventPassthrough:"vertical"
            })
          } else {
            this.picScroll.refresh();
          }
        })
      },
      toggleFavourite (e){
        if(!e._constructed){
          return;
        }
        this.favourite = !this.favourite;
        saveToLocal(this.seller.id,'favourite',this.favourite);
      }
    },
    watch:{
      seller(){
        this.$nextTick(() =>{
          if(!this.scroll){
            this.scroll = new BScroll(this.$refs.seller,{
              click:true
            })
          }else{
            this.scroll.refresh();
          }
        });
        this._initPics();
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    mounted (){
      this._initPics();
      this.$nextTick(() =>{
        if(!this.scroll){
          this.scroll = new BScroll(this.$refs.seller,{
            click:true
          })
        }else{
          this.scroll.refresh();
        }
      });
    },
    components:{
      star,
      split
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import '../../common/less/mixin';
  .seller{
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 0;
    overflow: hidden;
    background: #fff;
    .overview{
      position: relative;
      padding:18px 18px 0 18px;
      .title{
        margin-bottom:8px;
        font-size: 14px;
        line-height: 14px;
        color:rgb(7,17,27);
      }
      .desc{
        font-size: 0;
        padding-bottom: 18px;
        .border-1px(rgba(7,17,27,0.1));
        .star-wrapper{
          display: inline-block;
          vertical-align: top;
        }
        .text{
          display: inline-block;
          vertical-align: top;
          margin-right:12px;
          font-size: 10px;
          color:rgb(77,85,93);
          line-height: 16px;
        }
      }
      .remark{
        display: flex;
        padding:18px 0;
        .block{
          flex:1;
          text-align: center;
          border-right:1px solid rgba(7,17,27,0.1);
          &:last-child{
            border-right:none;
          }
          h2{
            font-size: 10px;
            line-height: 10px;
            color: rgb(147,152,159);
            margin-bottom:4px;
          }
          .content{
            font-size: 10px;
            line-height: 24px;
            color:rgb(7,17,27);
            .stress{
              font-size: 24px;
            }
          }
        }
      }
      .favorite{
        position: absolute;
        width:50px;
        top:18px;
        right:11px;
        text-align: center;
        .icon-favorite{
          display: block;
          font-size: 24px;
          line-height: 24px;
          margin-bottom: 4px;
          color:#d4d6d9;
          &.active{
            color:rgb(240,20,20);
          }
        }
        .text{
          font-size: 10px;
          line-height: 10px;
          color:rgb(77,85,93);
        }
      }
    }
    .bulletin{
      padding:18px 18px 0 18px;
      .title{
        margin-bottom:8px;
        font-size: 14px;
        line-height: 14px;
        color:rgb(7,17,27);
      }
      .content-wrapper{
        padding:0 12px 16px 12px;
        font-size: 12px;
        line-height: 24px;
        color:rgb(249,20,20);
        .border-1px(rgba(7,17,27,0.1));
      }
      .supports {
        margin: 0 auto;
        font-size: 0px;
        .support-item {
          padding: 16px 12px;
          .border-1px(rgba(7,17,27,0.1));
          &:last-child{
            .border-none;
          }
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 16px;
            height: 16px;
            background-size: 16px;
            background-repeat: no-repeat;
            margin-right: 6px;
            &.decrease {
              .bg-image('decrease_4')
            }
            &.discount {
              .bg-image('discount_4')
            }
            &.guarantee {
              .bg-image('guarantee_4')
            }
            &.invoice {
              .bg-image('invoice_4')
            }
            &.special {
              .bg-image('special_4')
            }
          }
          .text {
            font-size: 12px;
            line-height: 16px;
          }
        }
      }
    }
    .pics{
      padding:18px;
      .title{
        margin-bottom:8px;
        font-size: 14px;
        line-height: 14px;
        color:rgb(7,17,27);
      }
      .pic-wrapper{
        width:100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list{
          font-size: 0;
          .pic-item{
            display: inline-block;
            vertical-align: top;
            margin-right: 6px;
            width:120px;
            height:90px;
            &:last-child{
              margin-right:0;
            }
          }
        }
      }
    }
    .info{
      padding:18px 18px 0 18px;
      .title{
        padding-bottom:8px;
        font-size: 14px;
        line-height: 14px;
        color:rgb(7,17,27);
        .border-1px(rgba(7,17,27,0.1));
      }
      .info-item{
        padding:16px 12px;
        .border-1px(rgba(7,17,27,0.1));
        font-size: 12px;
        line-height: 16px;
        color:rgb(7,17,27);
      }
    }
  }
</style>
