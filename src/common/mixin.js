import {debounce} from 'common/utils'
import BackTop from "components/content/backTop/BackTop";


export const itemListenerMixin = {
  mounted() {
    
    let refresh = debounce(this.$refs.scroll.refresh,300);
    this.itemImgListener = () => {
      refresh();
    };
    //监听item中图片加载完成
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    
  }
}

export const backTopMixin = {
  data(){
    return {
      isShowBack:false
    }
  },
  components:{
    BackTop,
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenShowBackTop(position){
      this.isShowBack = -position.y > 1000;
    },
  }
}

