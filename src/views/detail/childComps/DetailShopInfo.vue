<template>
  <div class="shopInfo">
    <div class="shop">
      <div class="shopLogo"><img :src="shopGoods.logo" alt=""/></div>
      <div class="shopName">{{shopGoods.name}}</div>
    </div>
    <div class="sellInfo">
      <div class="sell">
        <div class="sells">{{allSell}}</div>
        <p>总销量</p>
      </div>
      <div class="goodsInfo">
        <div class="goods">{{shopGoods.goods}}件</div>
        <p>全部宝贝</p>
      </div>
      <div class="score">
        <div class="scoreItem" 
             v-for="(item, index) in shopGoods.score"
             :key="index">
          <span>{{item.name}}</span>
          <span :class="{'score-better': item.isBetter}">{{item.score}}</span>
          <span :class="{'score-better': item.isBetter}">{{item.isBetter ? '高':'低'}}</span>
        </div>
      </div>
    </div>
    <div class="come">
      <a :href="shopGoods.home">进店逛逛</a>
    </div>
  </div>
</template>

<script>
  export default {
    name:"DetailShopInfo",
    props:{
      shopGoods:{
        type:Object,
        default() {
          return {}
        }
      }
    },
    computed:{
      allSell(){
        return (this.shopGoods.sells / 10000).toFixed(1) + "万" 
      }
    }
  }
</script>

<style scoped>
  .shopInfo {
    padding:0 0.5rem;
    font-size:0.9rem;
    color:#333;
    border-bottom: 3px solid #dedede;

  }
  .shop {
    display:flex;
    align-items:center;
    padding:1.2rem 0 0.2rem 0;
  }
  .shopLogo img {
    width:3.5rem;
    border:1px solid #ddd;
    border-radius: 50%;
    margin-right:0.5rem;
  }

  .sellInfo{
    display:flex;
    justify-content: space-around;
    align-items:center;
  }

  .sell, .goodsInfo {
    text-align:center;

  }
  .sells, .goods {
    font-size:1.2rem;
  }

  .goodsInfo {
    border-right:1px solid #ddd;
    padding-right:1.9rem;
  }

  .scoreItem {
    display:flex;
    justify-content: space-between;
    align-items:center
  }
  .scoreItem span {
    margin:0.1rem 0.5rem
  }
  .scoreItem .score-better:nth-of-type(2) {
    color:green;
  }
  .scoreItem .score-better:nth-of-type(3){
    background:green
  }
  .scoreItem span:nth-of-type(2) {
    color:red;
  }
  .scoreItem span:nth-of-type(3) {
    color:#fff;
    background:red;
  }

  .come {
    text-align:center;
    width:11rem;
    line-height:1.8rem;
    background:rgb(241, 241, 241);
    border-radius: 0.4rem;
    margin:0.8rem auto;
  }

</style>