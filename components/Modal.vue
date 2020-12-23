<template>
  <transition name="modal">
    <div :class="$style['modal-mask']">
      <div :class="$style['modal-wrapper']">
        <div :class="$style['modal-container']">

          <div :class="$style['modal-header']">
            <slot name="header">
              <div :class="$style['cart-header']">
                Корзина
              </div>
              <div :class="$style['cart-header__btn']">
                <button :class="$style['cart-header__closebtn']" @click="$emit('close')">
                  ✖
                </button>
              </div>
            </slot>
          </div>
          <div :class="$style['modal-body']">
            <slot name="body">
              <div v-if="formSent">
                <div :class="$style['form-sent__image']">
                  <img src="~/assets/images/ok-hand.png">
                </div>
                <div :class="$style['form-sent__header']">
                  Заявка успешно отправлена
                </div>
                <div :class="$style['form-sent__body']">
                  Вскоре наш менеджер свяжется с Вами
                </div>
              </div>
              <div v-if="getCartItems.length > 0" :class="$style.cart">
                <div :class="$style['cart-description']">Товары в корзине</div>
                <div :class="$style['cart-item']" v-for="item in getCartItems" :key="item.id">
                  <div :class="$style['cart-item__image']">
                    <img width="71px" height="71px" :src="`https://frontend-test.idaproject.com${item.photo}`" alt="">
                  </div>
                  <div :class="$style['cart-details']">
                    <div :class="$style['cart-details__name']">
                      {{item.name}}
                    </div>
                    <div :class="$style['cart-details__price']">
                      {{priceRubles(item.price)}}
                    </div>
                    <div :class="$style['cart-item__rating']">
                      <div :class="$style['item-visual__rating']" :style="`--r: ${item.rating};`">
                      </div>
                      <div :class="$style['item-visual__value']">
                        {{item.rating}}
                      </div>
                    </div>
                  </div>
                  <div :class="$style['cart-item__delete']">
                    <img src="~/assets/images/delete.png" @click.prevent="deleteHandler(item.id)" alt="Delete Item">
                  </div>
                </div>
                <div :class="$style['cart-form']">
                  <div :class="$style['cart-form__header']">
                    Оформить заказ
                  </div>
                  <div :class="$style['cart-form__elements']">
                    <form @submit.prevent="submitHandler">
                      <input type="text" name="name" id="name" placeholder="Ваше имя"  required>
                      <label for="name"></label>
                      <br/>
                      <input type="tel" id="phone" name="phone" placeholder="+7 (999) 99 99 999" required>
                      <label for="phone"></label>
                      <br/>
                      <input type="text" name="address" id="address" placeholder="Адрес"  required>
                      <label for="address"></label>
                      <input type="submit" name="submit" value="Отправить">
                    </form>
                  </div>
                </div>
              </div>
              <div :class="$style['cart-empty']" v-else-if="!formSent && getCartItems.length === 0">
                <div :class="$style['cart-empty__text']">
                  Пока что вы ничего не добавили в корзину
                </div>
                <div :class="$style['cart-empty__button']">
                  <button :class="$style['modal-default-button']" @click="$emit('close')">
                    Перейти к выбору
                  </button>
                </div>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import $ from 'jquery'
  export default {
    name: "Modal",
    computed: {
      getCartItems() {
        return this.$store.getters['items/cartItems']
      },
    },
    data: () => ({
      formSent: false
    }),
    mounted() {
      $(document).ready(function() {
        $("#phone").mask("+7 (999) 999-99-99");
      });
    },
    methods: {
      submitHandler() {
        this.formSent = true
        this.$store.dispatch('items/setItems', [])
      },
      deleteHandler(id) {
        this.$store.dispatch('items/deleteCartItem', id)
      },
      priceRubles: function (price) {
        return price.toString().replace(/(\d{3})/g, '$1 ').replace(/(^\s+|\s+$)/, '').concat(' ₽')
      },
    }
  }
</script>

<style scoped lang="scss" module>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
  }

  .modal-container {
    width: 460px;
    height: 100vh;
    position: absolute;
    right: 0px;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }

  .modal-header {
    margin-top: 0;
    position: relative;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    background: #1F1F1F;
    border-radius: 8px;
    color: white;
    width: 364px;
    height: 50px;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .cart-header {
    font-size: 32px;
    line-height: 41px;
    color: #000000;
    margin-left: 8px;
  }

  .cart-header__btn {
    position: absolute;
    top: 8px;
    right: 11px;
    font-size: 30px;
  }

  .cart-header__closebtn {
    font-size: 22px;
    background-color: white;
  }

  .cart-description {
    font-size: 18px;
    line-height: 23px;
    color: #59606D;
    margin-bottom: 16px;
    margin-left: 8px;
  }

  .cart-item {
    display: flex;
    margin-left: 8px;
    width: 364px;
    height: 120px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    position: relative;
  }

  .cart-item__image {
    margin: 15px 0 15px 25px;
  }

  .cart-item__delete {
    position: absolute;
    top: 49px;
    right: 22px;
  }

  .cart-details {
    margin: 12px 0 0 34px;
  }

  .cart-details__name {
    font-size: 14px;
    line-height: 18px;
    color: #59606D;
  }

  .cart-details__price {
    font-size: 14px;
    line-height: 18px;
    margin-top: 6px;
    font-weight: 700;
  }

  .cart-details__rating {
    margin-top: 20px;
  }

  .cart-item__rating{
    margin-top: 34px;
    display: flex;

  }

  input {
    width: 364px;
    height: 50px;
    background: #F8F8F8;
    border-radius: 8px;
    margin-bottom: 16px;
    border-color: white;
  }

  .cart-form {
    margin-left: 8px;
  }

  .cart-form__header {
    font-size: 18px;
    line-height: 23px;
    margin-top: 32px;
    color: #59606D;
  }

  .cart-form__elements {
    margin: 16px auto;
  }

  .item-visual__rating {
    width: 14px;
    height: 14px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="-40 -40 80 80"><path fill="transparent"  stroke="%23F2C94C" stroke-width="2"  d="M 0.000 20.000 L 23.511 32.361 L 19.021 6.180 L 38.042 -12.361 L 11.756 -16.180 L 0.000 -40.000 L -11.756 -16.180 L -38.042 -12.361 L -19.021 6.180 L -23.511 32.361 L 0.000 20.000"/></svg>');
    position: relative;
  }

  .item-visual__rating:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: calc((14px * var(--r)) / 5);
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="-40 -40 80 80"><path fill="%23F2C94C" stroke="%23F2C94C" stroke-width="2"  d="M 0.000 20.000 L 23.511 32.361 L 19.021 6.180 L 38.042 -12.361 L 11.756 -16.180 L 0.000 -40.000 L -11.756 -16.180 L -38.042 -12.361 L -19.021 6.180 L -23.511 32.361 L 0.000 20.000"/></svg>');
  }

  .item-visual__value {
    color: #F2C94C;
    font-weight: 700;
    margin-left: 2px;
  }

  input[type="submit"] {
    background: #1F1F1F;
    border-radius: 8px;
    color: white;
  }

  .cart-empty{
    margin-left: 8px;
  }

  .cart-empty__text {
    font-size: 22px;
    line-height: 28px;
    color: #000000;
  }

  .cart-empty__button {
    margin-top: 24px;
  }

  .form-sent__image {
    margin-top: 459px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-sent__header {
    margin-top: 24px;
    font-size: 24px;
    line-height: 31px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-sent__body {
    margin: 2px auto;
    font-size: 16px;
    line-height: 21px;
    color: #59606D;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
