<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(item,index) in goods" :class="{current:currentIndex === index}"
              @click="selectMenu(index,$event)">
            <span class="text border-1px"><span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="foods-list">
            <h1 class="title">
              {{item.name}}
            </h1>
            <ul>
              <li class="food-item border-1px" v-for="(foodItem,index1) in item.foods"
                  @click.stop.prevent="selectFood(foodItem,$event)">
                <div class="icon">
                  <img :src="foodItem.icon" height="57" width="57" alt="foodAvatar">
                </div>
                <div class="content">
                  <div class="name">{{foodItem.name}}</div>
                  <div class="desc">{{foodItem.description}}</div>
                  <div class="extra">
                    <span class="count">月售{{foodItem.sellCount}}份</span>
                    <span class="rating">好评率{{foodItem.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now"><span class="currency">￥</span>{{foodItem.price}}</span>
                    <span class="old" v-show="foodItem.oldPrice">￥{{foodItem.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol @add="addFood" :food="foodItem"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
                :minPrice="seller.minPrice"></shopcart>
    </div>
    <food @add="addFood" :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import food from 'components/food/food';
  const ERR_OK = 0;
  export default {
    props: ['seller'],
    data () {
      return {
        goods: [],
        heightList: [],
        scrollY: 0,
        selectedFood: {},
      }
    },
    computed: {
      currentIndex: {
        get (){
          for (let i = 0; i < this.heightList.length; i++) {
            let height1 = this.heightList[i];
            let height2 = this.heightList[i + 1];
            if (this.scrollY >= height1 && this.scrollY < height2) {
              return i;
            }
          }
          return 0;
        },
        set (){

        }
      },
      selectFoods (){
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          })
        });
        return foods;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get("/api/goods").then((response)=> {
        let body = response.body;
        if (body.errno === ERR_OK) {
          this.goods = body.data;
          this.$nextTick(() => {
            this._initScroll();
            this.caculateHeight();
          })
        }
      })
    },
    methods: {
      _initScroll (){
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true,
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3,
        });
        this.foodsScroll.on("scroll", (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      caculateHeight (){
        let lists = document.querySelectorAll(".foods-list");
        let height = 0;
        this.heightList.push(height);
        for (let i = 0; i < lists.length; i++) {
          height += lists[i].clientHeight;
          this.heightList.push(height);
        }
      },
      selectMenu (index, e){
        if (!e._constructed) {
          return;
        }
        let lists = document.querySelectorAll(".foods-list");
        //this.currentIndex = index;
        this.foodsScroll.scrollToElement(lists[index], 3);
      },
      addFood (target){
        this.$refs.shopcart.drop(target);
      },
      selectFood (food, e){
        if(!e._constructed){
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },
    components: {
      shopcart, cartcontrol, food
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import '../../common/less/mixin';

  .goods {
    display: flex;
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      ul {
        .menu-item {
          display: table;
          height: 54px;
          width: 56px;
          line-height: 12px;
          padding: 0 12px;
          &.current {
            background: #fff;
            font-weight: bold;
            margin-top: -1px;
            .text {
              .border-none;
            }
          }
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 2px;
            background-repeat: no-repeat;
            background-size: 12px 12px;
            &.decrease {
              .bg-image('decrease_3')
            }
            &.discount {
              .bg-image('discount_3')
            }
            &.guarantee {
              .bg-image('guarantee_3')
            }
            &.invoice {
              .bg-image('invoice_3')
            }
            &.special {
              .bg-image('special_3')
            }
          }
          .text {
            display: table-cell;
            width: 56px;
            font-size: 12px;
            vertical-align: middle;
            .border-1px(rgba(7, 17, 27, 0.1));
          }
        }
      }

    }
    .foods-wrapper {
      flex: 1;
      .title {
        height: 26px;
        font-size: 12px;
        line-height: 26px;
        color: rgb(147, 153, 159);
        border-left: 2px solid #d9dde1;
        background: #f3f5f7;
        padding-left: 14px;
      }
      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        .border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          margin-bottom: 0;
          .border-none();
        }
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content {
        margin-top: 2px;
        .name {
          font-size: 14px;
          line-height: 14px;
          color: rba(7, 17, 27);
          margin-bottom: 8px;
        }
        .desc, .extra {
          font-size: 10px;
          line-height: 12px;
          color: rgb(147, 153, 159);
          margin-bottom: 4px;
        }
        .extra {
          margin-bottom: 0;
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
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }

    }
  }
</style>
