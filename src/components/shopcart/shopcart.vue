<template>
    <div>
        <div class="shopcart">
          <div class="content" @click="toggleList">
            <div class="content-left">
              <div class="logo-wrapper">
                <div class="logo" :class="{lighthight:totalPrice>0}">
                  <i class="icon-shopping_cart" :class="{lighthight:totalPrice>0}"></i>
                </div>
                <div class="num" v-show="totalCount>0">{{totalCount}}</div>
              </div>
              <div class="price">￥{{totalPrice}}</div>
              <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" :class="{enough:totalPrice > minPrice}">
              <div class="pay" @click.stop.prevent="goPay">
                {{payDesc}}
              </div>
            </div>
          </div>
          <div class="ball-container">
            <div v-for="(ball,index) in balls">
              <transition name="drop" @before-enter="brforeEnter" @enter="enter" @after-enter="afterEnter">
                <div class="ball" v-show="ball.show">
                  <div class="inner"></div>
                </div>
              </transition>
            </div>
          </div>
          <transition name="fold">
            <div class="shopcart-list" v-show="isFold" >
              <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty" @click="clear">清空</span>
              </div>
              <div class="list-content" ref="listContent">
                <ul>
                  <li class="food" v-for="(food,index) in selectFoods">
                    <span class="name">{{food.name}}</span>
                    <div class="price">￥{{food.price * food.count}}</div>
                    <div class="cartcontrol-wrapper">
                      <cartcontrol :food="food"></cartcontrol>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
      <transition name="mask">
        <div class="list-mask" @click="hideList" v-show="isFold"></div>
      </transition>
    </div>
</template>
<!--type="text/ecmascript-6"识别es6-->
<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';
    export default {
      props:{
        deliveryPrice:{},
        minPrice:{},
        selectFoods:{
        }
      },
      data () {
          return {
            balls:[
              {
                show:false
              },
              {
                show:false
              },
              {
                show:false
              },
              {
                show:false
              },
              {
                show:false
              },
            ],
            dropBalls:[],
            isFold:false
          }
      },
      computed:{
        totalPrice (){
          let total = 0;
          this.selectFoods.forEach((food) => {
            total += food.price * food.count;
          });
          return total;
        },
        totalCount (){
          let count = 0;
          this.selectFoods.forEach((food) => {
            count += food.count;
          })
          return count;
        },
        payDesc (){
          let text;
          if (this.totalPrice === 0) {
            text = `￥${this.minPrice}元起送`;
          }else if (this.totalPrice<this.minPrice) {
            let diff = this.minPrice - this.totalPrice
            text = `还差￥${diff}元送`;
          }else{
            text = "去结算";
          }
          return text;
        }
      },
      watch:{
        totalPrice (newValue) {
          if(newValue === 0){
            this.isFold = false;
          }
        }
      },
      methods:{
        drop (el){
          for (let i=0;i<this.balls.length;i++){
            if(!this.balls[i].show){
              this.balls[i].show=true;
              this.balls[i].el=el;
              this.dropBalls.push(this.balls[i]);
              break;
            }
          }
        },
        brforeEnter (el){
          for(let i=0;i<this.balls.length;i++){
            if(this.balls[i].show){
              let element = this.balls[i].el;
              let  rect = element.getBoundingClientRect();
              let x = rect.left - 32;
              let y = window.innerHeight - 22 - rect.top;
              el.style.webkitTransform = `translate3d(0,-${y}px,0)`;
              el.style.transform = `translate3d(0,-${y},0)`;
              let inner = el.querySelector('.inner');
              inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
              inner.style.transform = `translate3d(${x}px,0,0)`;
            }
          }
        },
        enter (el,done){
          let rf = el.offsetHeight;
          this.$nextTick(() =>{
            el.style.webkitTransform = `translate3d(0,0,0)`;
            el.style.transform = `translate3d(0,0,0)`;
            let inner = el.querySelector('.inner');
            inner.style.webkitTransform = `translate3d(0,0,0)`;
            inner.style.transform = `translate3d($0,0,0)`;
            el.addEventListener('transitionend',done);
          })
        },
        afterEnter (el){
          let ball = this.dropBalls.shift();
          if(ball){
            ball.show = false;
            el.style.display = 'none';
          }
        },
        toggleList (){
          if( this.totalPrice && !this.isFold ){
            this.isFold = true;
            this.$nextTick(() => {
              if(!this.listScroll){
                this.listScroll = new BScroll(this.$refs.listContent,{
                  click:true
                });
              }else{
                this.listScroll.refresh();
              }
            })
          }
        },
        clear (){
          for (let i = 0;i<this.selectFoods.length;i++){
            this.selectFoods[i].count = 0;
          }
        },
        hideList (){
          this.isFold = false;
        },
        goPay (){
          return;
        }
      },
      components:{
        cartcontrol
      }
    }
</script>

<!--scoped作用于当前模块，lang="less" rel="stylesheet/less"识别less-->
<style scoped lang="less" rel="stylesheet/less">
  @import '../../common/less/mixin';
  .shopcart{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    height:48px;
    z-index:50;
    .content{
      display: flex;
      height:100%;
      width:100%;
      background: #14172d;
      font-size: 0;
      color: rgba(255, 255, 255, 0.4);
      .content-left{
        flex:1;
        .logo-wrapper{
          display: inline-block;
          position:relative;
          top:-10px;
          width:56px;
          height:56px;
          vertical-align: top;
          margin:0 12px;
          padding:6px;
          background: #14172d;
          border-radius: 50%;
          box-sizing: border-box;
          .logo{
            background:  #2b343c;
            height:100%;
            width:100%;
            border-radius: 50%;
            text-align: center;
            &.lighthight{
              background: rgb(0, 160, 220);
            }
            .icon-shopping_cart{
              font-size: 24px;
              color: rgba(255, 255, 255, 0.4);
              line-height: 44px;
              &.lighthight{
                color: #fff;
              }
            }
          }
          .num{
            position:absolute;
            top:0;
            right:0;
            font-size: 14px;
            line-height: 16px;
            padding:0 6px;
            background: rgb(240,20,20);
            color:#fff;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
            box-sizing: border-box;
            text-align: center;
            font-weight: bold;
            border-radius: 16px;
          }
        }
        .price{
          display: inline-block;
          font-size: 16px;
          font-weight: 700;
          line-height: 24px;
          margin-top:10px;
          padding-right:12px;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .desc{
          display: inline-block;
          font-size: 14px;
          line-height: 24px;
          margin:10px 0 0 12px;
        }
      }
      .content-right{
        flex:0 0 90px;
        width:90px;
        background: #2b333b;
        line-height: 44px;
        font-size: 12px;
        text-align: center;
        font-weight: bold;
        &.enough{
          background: #00b43c;
          color: #fff;
        }
      }
    }
    .ball-container{
      .ball{
        position: fixed;
        left:32px;
        bottom:22px;
        transition: all 0.5s cubic-bezier(.18,-0.24,.85,.37);
        z-index: 200;
        .inner{
          width:16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.5s ease;
        }
      }
    }
    .shopcart-list{
      position:absolute;
      top:0;
      left:0;
      width:100%;
      z-index: -1;
      transform: translateY(-100%);
      &.fold-enter-active, &.fold-leave-active{
        transition: all 0.5s ease;
      }
      &.fold-enter,&.fold-leave-to{
        transform: translateY(0);
      }
      .list-header{
        width:100%;
        background: #f3f5f7;
        height:40px;
        border:1px solid rgba(7,17,27,0.1);
        .title{
          float:left;
          font-size:14px;
          color:rgb(7,17,27);
          line-height: 40px;
          margin-left:18px;
        }
        .empty{
          float:right;
          margin-right:18px;
          font-size:12px;
          line-height: 40px;
          color: rgb(0,160,220);
        }
      }
      .list-content{
        padding:0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;
        .food{
          position:relative;
          padding:12px 0;
          box-sizing: border-box;
          .border-1px(rgba(7,17,27,0.1));
          .name{
            font-size: 14px;
            color:rbg(7,17,27);
            line-height: 24px;
          }
          .price{
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper{
            position: absolute;
            right:0;
            bottom: 6px;
          }
        }
      }
    }
  }
  .list-mask{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:40;
    background: rgba(7,17,27,0.6);
    transition: all 0.5s ease;
    &.mask-enter-active, &.mask-leave-active{
      background: rgba(7,17,27,0.6);
    }
    &.mask-enter,&.mask-leave-to{
      background: rgba(7,17,27,0);
    }
  }
</style>
