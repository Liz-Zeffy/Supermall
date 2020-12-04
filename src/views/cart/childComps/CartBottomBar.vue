<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      去结算({{checkLength}})
    </div>
  </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return this.$store.getters.cartList.filter(item => {
        return item.checked
      }).reduce((PreValue,item) => {
        return PreValue + item.price * item.count
      },0).toFixed(2)
    },

    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },

    isSelectAll() {
      if (this.$store.state.cartList.length !== 0){
       return !this.$store.state.cartList.find(item => !item.checked)
      }
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {
         this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  }
}
</script>
<style scoped>
.bottom-bar {
  height:40px;
  background-color:#eee;
  display:flex;
  align-items: center;
  justify-content:space-between;
}

.check-content {
  height: 40px;
  display: flex;
  align-items: center;
}

.check-button {
  width:22px;
  height:22px;
  margin:0 5px
}

.calculate {
  width:80px;
  line-height:40px;
  color:#fff;
  text-align: center;
  background-color:var(--color-tint)
}

</style>