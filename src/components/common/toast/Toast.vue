<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>
<script>
export default {
  name: "Toast",
  props:{
    // message:{
    //   type:String,
    //   default:''
    // }
  },
  data () {
    return {
      isShow:false,
      message:''
    };
  },
  methods: {
    show(message='默认值', duration=2000) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = ''
      },duration)
    }
  }
}
</script>
<style scoped>
.toast {
  position:fixed;
  left:50%;
  top:50%;
  /* margin-left:-90px;
  margin-top:-18px; */
  transform: translate(-50%,-50%);
  width:180px;
  height:36px;
  line-height:36px;
  text-align: center;
  color:#fff;
  background-color:red;
  border-radius: 5px;
  z-index:1000;
}
</style>