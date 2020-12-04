<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon"/>
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name:"DetailBaseInfo",
    props:{
      goods:{
        type:Object,
        defalut (){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .info-title{
    font-size:1.1rem;
    font-weight:bold;
    color:333;
    margin:0.8rem 0;
    text-align: justify;
    line-height: 1.2;
    padding:0 0.5rem

  }
  
  .info-price {
    margin-bottom: 0.8rem;
    font-size:0.7rem;
   padding:0 0.5rem

  }

   .info-price .n-price {
    color:var(--color-high-text);
    font-size:1.4rem
  }
  .info-price .o-price {
    margin:0 0.3rem;
    text-decoration: line-through;
    font-size:0.9rem

  }
  .discount {
    background:var(--color-high-text);
    padding:0.1rem 0.4rem;
    border-radius:0.4rem;
    color:#fff;
    position:relative;
    bottom:0.7rem
  }

  .info-other {
    display:flex;
    justify-content: space-between;
    font-size:0.9rem;
    color:#999;
    padding:0 0.5rem 0.3rem;
    border-bottom: 1px solid #dedede;

  }

  .info-service {
    display:flex;
    justify-content: space-between;
    color:#666;
    font-weight: bold;
    padding-bottom: 0.3rem;
    border-bottom: 3px solid #dedede;
    padding:0.9rem 0.5rem;
    font-size:0.85rem;
  }

  .info-service-item img {
    width:1rem;
    height:1rem;
    position:relative;
    top:0.2rem;
    right:0.1rem;
  }
</style>