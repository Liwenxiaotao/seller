<template>
  <div class="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!--<keep-alive>缓存路由-->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>

  </div>
</template>

<!--type="text/ecmascript-6"识别es6-->
<script type="text/ecmascript-6">
  import header from "./components/header/header.vue";
  import {urlParse} from './common/js/util';
  const ERR_OK = 0;
  export default {
    data () {
      return {
        seller:{
          id:(() =>{
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      }
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
        const body = response.body;
        if(body.errno === ERR_OK){
          this.seller = Object.assign({},this.seller,body.data);
        }
      })
    },
    components:{
     "v-header":header
    }
  }
</script>

<!--scoped作用于当前模块，lang="less" rel="stylesheet/less"识别less-->
<style scoped lang="less" rel="stylesheet/less">
  @import './common/less/mixin.less';

  .app{
    .tab{
      display: flex;
      height:40px;
      line-height: 40px;
      text-align: center;
      width:100%;
      background: #fff;
      .border-1px(rgba(7,17,27,0.1));
      .tab-item{
        flex:1;
        &>a{
          display: block;
          font-size: 14px;
          color: #778593;
          &.active{
            color: rgb(240,20,20);
          }
        }
      }
    }
  }
</style>
