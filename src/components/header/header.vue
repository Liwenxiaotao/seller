<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" alt="avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">
            {{seller.name}}
          </span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">
            {{seller.supports[0].description}}
          </span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">
          {{seller.supports.length}}个
        </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="backgroundImg" width="100%" height="100%">
    </div>
    <transition name="slide">
       <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1>{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports" v-if="seller.supports">
            <li class="support-item" v-for="(item,index) in seller.supports">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <div class="bulletin-text">{{seller.bulletin}}</div>
          </div>
        </div>
      </div>
      <div class="detail-close" >
        <i class="icon-close" @click="hideDetail"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from "components/star/star";
  const ERR_OK=0;
  export default {
    props : ['seller'],
    data () {
      return {
        detailShow : false
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components:{
      star
    },
    methods:{
      showDetail () {
        this.detailShow = true;
      },
      hideDetail () {
        this.detailShow = false;
      }
    }

  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import '../../common/less/mixin';

  .header{
    color:#fff;
    background: rgba(7,17,27,0.5);
    position:relative;
    overflow:hidden;
    .content-wrapper{
      position:relative;
      padding:24px 12px 18px 24px;
      font-size: 0;
      .avatar{
        display: inline-block;
        vertical-align: top;
        img{
          border-radius: 2px;
        }
      }
      .content{
        display:inline-block;
        vertical-align: top;
        margin-left:16px;
        font-size: 12px;
        .title{
          margin:2px 0 8px 0;
          .brand{
            display: inline-block;
            width:30px;
            height:18px;
            vertical-align: top;
            .bg-image('brand');
            background-size: 30px 18px;
          }
          .name{
            font-size: 16px;
            margin-left:3px;
            line-height: 16px;
            font-weight: bold;
          }
        }
        .description{
          margin-bottom: 10px;
          line-height: 12px;
        }
        .support{
          .icon{
            display: inline-block;
            width:12px;
            height:12px;
            background-repeat: no-repeat;
            background-size: 12px 12px;
            vertical-align: top;
            margin-right:4px;
            &.decrease{
              .bg-image('decrease_1')
            }
            &.discount{
              .bg-image('discount_1')
            }
            &.guarantee{
              .bg-image('guarantee_1')
            }
            &.invoice{
              .bg-image('invoice_1')
            }
            &.special{
              .bg-image('special_1')
            }

          }
          .text{
            font-size: 10px;
            line-height: 12px;
          }
        }
      }
      .support-count{
        position:absolute;
        right: 12px;
        bottom: 14px;
        padding:0 7px;
        height:24px;
        line-height: 24px;
        background: rgba(0,0,0,0.2);
        border-radius:14px;
        text-align: center;
        .count{
          font-size: 10px;
          line-height: 24px;
        }
        .icon-keyboard_arrow_right{
          font-size: 10px;
          margin-left: 2px;
          line-height: 24px;
        }
      }
    }
    .bulletin-wrapper{
      position:relative;
      height:28px;
      line-height: 30px;
      background: rgba(7,17,27,0.2);
      padding:0 24px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .bulletin-title{
        display: inline-block;
        height:12px;
        width:22px;
        .bg-image('bulletin');
        background-size: 22px 12px;
        background-repeat: no-repeat;
        vertical-align: top;
        margin-top:8px;
      }
      .bulletin-text{
        font-size: 10px;
        vertical-align: top;
        margin:0 4px;
      }
      .icon-keyboard_arrow_right{
        position:absolute;
        top:10px;
        right:8px;
        font-size: 10px;
      }
    }
    .background{
      background: #fff;
      position:absolute;
      top:0;
      left:0;
      height:100%;
      width:100%;
      z-index:-1;
      filter:blur(10px);
    }
    .detail{
      position:fixed;
      top:0;
      height:100%;
      width:100%;
      background:rgba(7,17,27,0.8);
      z-index:100;
      overflow: auto;
      transition: all .5s ease;
      &.slide-enter-active, &.slide-leave-active {
        right: 0;
      }
      &.slide-enter, &.slide-leave-to {
        right:-100%;
      }
      .detail-wrapper{
       width:100%;
       min-height: 100%;
        .detail-main{
          margin-top:64px;
          padding-bottom:64px;
          h1{
            font-size: 16px;
            line-height: 16px;
            text-align: center;
          }
          .star-wrapper{
            margin:16px 0 0;
            text-align: center;
          }
          .title{
            display: flex;
            width:80%;
            margin:28px auto 24px;
            .line{
              flex:1;
              position: relative;
              top:-6px;
              border-bottom: 1px solid rgba(255,255,255,0.2);
            }
            .text{
              padding:0 12px;
              font-size: 14px;
              font-weight: bold;
            }
          }
          .supports{
            width:80%;
            margin:0 auto;
            font-size: 0px;
            .support-item{
              margin-bottom:12px;
              padding:0 12px;
              .icon{
                display: inline-block;
                vertical-align: top;
                width:16px;
                height:16px;
                background-size: 16px;
                background-repeat: no-repeat;
                margin-right:6px;
                &.decrease{
                  .bg-image('decrease_2')
                }
                &.discount{
                  .bg-image('discount_2')
                }
                &.guarantee{
                  .bg-image('guarantee_2')
                }
                &.invoice{
                  .bg-image('invoice_2')
                }
                &.special{
                  .bg-image('special_2')
                }

              }
              .text{
                font-size: 12px;
                line-height: 16px;
              }
            }
          }
          .bulletin{
            width:80%;
            margin:0 auto;
            font-size: 12px;
            line-height: 24px;
            .bulletin-text{
              padding: 0 12px;
            }
          }
        }
      }
      .detail-close{
        position:relative;
        height:32px;
        width:32px;
        font-size: 32px;
        line-height: 32px;
        clear:both;
        margin:-64px auto 0;
      }

    }
  }
</style>
