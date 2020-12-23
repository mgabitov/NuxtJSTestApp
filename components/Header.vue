<template>
  <div :class="$style['header']">
    <div :class="$style['header__content']">
      TestList
    </div>
    <div :class="$style['header__cart']">
      <a href="#" @click="showModal = true"><img src="~/assets/images/cart_big.png"></a>
      <div :class="$style['header__cart__element']" v-if="getCartItems > 0">
      <div :class="$style['header-cart__number']">
        {{getCartItems}}
      </div>
      </div>
      <modal v-if="showModal" @close="showModal = false">
      </modal>
    </div>
  </div>
</template>

<script>
  import Modal from "~/components/Modal";

  export default {
    name: "Header",
    components: {
      Modal
    },
    data() {
      return {
        showModal: false
      }
    },
    computed: {
      getCartItems() {
        return this.$store.getters['items/cartItems'].length || 0
      }
    }
  }
</script>

<style lang="scss" module>

  .header {
    max-width: 1440px;
    height: 66px;
    background: #FFFFFF;
    display: flex;
    position: relative;

  }

  .header__content {
    margin: 18px 0 20px 88px;
    font-weight: 700;
    font-size: 22px;
    line-height: 28px;
    color: #59606D;
  }

  .header__cart {
    position: absolute;
    top: 20px;
    right: 108px;
    display: flex;
  }
  .header__cart__element{
    height: 12px;
    width: 12px;
    background: #959DAD;
    border-radius: 50%;
    margin-left: -7px;
    margin-top: -4px;
  }

  .header-cart__number{
    font-size: 8px;
    line-height: 10px;
    color: white;
    font-weight: 700;
    margin-left: 4px;
    margin-top: 1px;
  }

</style>
