<template>
    <div class="cartcontrol">
      <transition name="fade">
        <div class="cart-decrease" @click.stop.prevent="decreaseCart($event)" v-show="food.count>0">
          <span class="inner icon-remove_circle_outline" ></span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
    </div>
</template>
<!--type="text/ecmascript-6"识别es6-->
<script type="text/ecmascript-6">
    export default {
      props:["food"],
      methods:{
        addCart (e){
          if(!e._constructed){
            return;
          }
          if(!this.food.count){
           this.$set(this.food,'count',1);
          } else {
            this.food.count++;
          }
          this.$emit("add",e.target);
        },
        decreaseCart (e){
          if(!e._constructed){
            return;
          }
          this.food.count--;
        }
      },
      computed:{

      }
    }
</script>

<!--scoped作用于当前模块，lang="less" rel="stylesheet/less"识别less-->
<style scoped lang="less" rel="stylesheet/less">
  .cartcontrol{
    font-size: 0;
    .cart-decrease{
      display: inline-block;
      padding:6px;
      transition: all 0.5s ease;
      .inner{
        display: inline-block;
        font-size:24px;
        color:rgb(0,160,220);
        line-height: 24px;
        transition: all 0.5s ease;
      }
      &.fade-enter-active, &.fade-leave-active{
        opacity: 1;
        transform: translate3d(0,0,0);
        .inner{
          transform: rotate(0);
        }
      }
      &.fade-enter, &.fade-leave-to{
        opacity: 0;
        transform: translate3d(24px,0,0);
        .inner{
          transform: rotate(180deg);
        }
      }
    }
    .cart-count{
      display: inline-block;
      vertical-align: top;
      color:rgb(147,153,159);
      font-size: 10px;
      line-height: 24px;
      padding:6px;
      text-align: center;
    }
    .cart-add{
      display: inline-block;
      font-size:24px;
      color:rgb(0,160,220);
      line-height: 24px;
      padding:6px;
    }
  }
</style>
