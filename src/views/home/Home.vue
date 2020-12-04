<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        v-if="banners != ''"
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBack" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import {debounce} from 'common/utils'
import { itemListenerMixin,backTopMixin} from "common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      // isShowBack: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    let refresh = debounce(this.$refs.scroll.refresh, 300);
    this.itemImgListener = () => {
      refresh();
    };
    //监听item中图片加载完成
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },

  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },

  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    // console.log('home created');
  },

  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh,100)
    // //监听item中图片加载完成
    // this.$bus.$on('homeItemImageLoad',() => {
    // refresh()
    // })
  },

  methods: {
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    loadMore() {
      console.log("loading");
      this.getHomeGoods(this.currentType);
    },

    contentScroll(position) {
      this.listenShowBackTop(position);
      //决定tabControl是否吸顶（position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0);
    // },

    //事件监听相关
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    //网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position:fixed;
  left:0;
  right:0;
  top:0; 
  z-index: 100;*/
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  border: 2px solid red;
  overflow: hidden;
}

.tab-control {
  position: relative;
  z-index: 9;
}

/* .content {
  height:calc(100% - 93px);
  overflow: hidden;
  border:2px solid red;
  margin-top:44px;
} */
</style>
