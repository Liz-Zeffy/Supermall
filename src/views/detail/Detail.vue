<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper v-if="topImages!=''" :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop-goods="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBack" />
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'


  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  // import {debounce} from 'common/utils'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'


  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'

  import {mapActions} from 'vuex'

  export default {
    name:"Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Scroll
    },
    mixins:[itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        // itemImgListener:null,
        themeTopYs:[],
        currentIndex:0
      }
    },
    created(){
      //1.保存传入的iid
      this.iid = this.$route.params.id

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
    
        const data = res.result;
        //获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages;
        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //获取店铺信息
        this.shop = new Shop (data.shopInfo);
        //获取商品详情
        this.detailInfo = data.detailInfo;
        // 获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //取出评论信息
        if(data.rate.cRate !== 0){
         this.commentInfo = data.rate.list[0]
        }


        // this.$nextTick(() => {
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.themeTopYs)
        // })

      })

      //请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list;
        // console.log(this.recommends);
      })

    },
    methods:{
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh();

          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          this.themeTopYs.push(Number.MAX_VALUE)
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },

      contentScroll(position){
        this.listenShowBackTop(position);  

        const positionY = -position.y;
        for (let i in this.themeTopYs){
          i = i * 1;
          // if(this.currentIndex !== i && ((i < this.themeTopYs.length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === this.themeTopYs.length - 1 && positionY >= this.themeTopYs[i]))){
          //   this.currentIndex = i;
          //   this.$refs.nav.currentIndex = this.currentIndex;
          // }
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
        
      },

      addToCart() {
        //1.获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.将商品添加到购物车里
        // this.$store.cartList.push(product);
        // this.$store.commit('addCart',product);
        //映射后写法
        this.addCart(product).then(res => {
          this.$toast.show(res,1000);
        })
        //没映射前的传统写法
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })
      }
    },
    mounted(){  
      // let refresh = debounce(this.$refs.scroll.refresh,100);

      // //监听item中图片加载完成
      // this.$bus.$on('detailItemImageLoad',() => {
      // refresh()
      // })
    },
    destroyed(){
      this.$bus.$off('itemImageLoad',this.itemImgListener);
    }

  }
</script>

<style scoped>
  #detail {
    position:relative;
    z-index: 10;
    background-color:#fff;
    height:100vh;
  }

  .detail-nav {
    position:relative;
    z-index:10;
    background:#fff;
  }

  .content {
    height:calc(100% - 44px - 49px);
    border:1px solid red;

  }
</style>