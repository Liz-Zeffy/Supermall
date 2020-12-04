<template>
  <div class="wrapper" ref="wrapper">
    <div class="content"><slot></slot></div>
  </div>
</template>

<script>
import Bscroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

Bscroll.use(Pullup)

 export default {
    name:"Scroll",
    props:{
      probeType:{
        type:Number,
        default:1
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        bscroll:null
      }
    },
    mounted (){
        //创建
      this.bscroll = new Bscroll(this.$refs.wrapper,{
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,
        click:true

      })


      //监听滚动
      if (this.probeType === 2 || this.probeType === 3){
        this.bscroll.on('scroll',(position) => {
          this.$emit('scroll',position);  
      })
      }


      //监听滚动到底部
      if (this.pullUpLoad){
        this.bscroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }

    },

    methods:{
      scrollTo(x,y,time=300) {
        this.bscroll.scrollTo(x,y,time);
      },

      refresh(){
        this.bscroll && this.bscroll.refresh()
      },

      finishPullUp(){
        this.bscroll.finishPullUp()
      },

      getScrollY(){
        return this.bscroll ? this.bscroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>