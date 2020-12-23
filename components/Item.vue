<template>
  <div :class="$style.item">
    <div :class="$style['item-visual']">
      <div :class="$style['item-visual__rating']" :style="`--r: ${rating};`">
      </div>
      <div :class="$style['item-visual__value']">
        {{rating}}
      </div>
      <div :class="$style['item-visual__item-photo']">
        <img :class="$style['item-visual__item-photo']" :src="`https://frontend-test.idaproject.com${photo}`" alt="">
      </div>
      <div :class="$style['item-visual__add-cart']">
        <a href="#" v-if="!isInCart" @click.prevent="addToCart(id, name, rating, price, photo)"><img src="~/assets/images/cart.png"></a>
        <img v-else src="~/assets/images/cartfilled.png">
      </div>
    </div>
    <div :class="$style['item-description']">
      <div :class="$style['item-description__item-name']">
        {{name}}
      </div>
      <div :class="$style['item-description__item-price']">
        {{priceRubles}}
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Item",
    props: ["id", "name", "price", "rating", "photo"],
    data: () => ({
      cartItems: []
    }),
    computed: {
      priceRubles: function() {
       return this.price.toString().replace(/(\d{3})/g, '$1 ').replace(/(^\s+|\s+$)/,'').concat(' ₽')
      },
      isInCart() {
        return this.$store.getters['items/itemById'](this.id)
      }
    },
    methods: {
      addToCart: function (id, name, rating, price, photo) {
        const newItem =
          {
            id: id,
            name: name,
            rating: rating,
            price: price,
            photo: photo
          }
        this.$store.dispatch('items/createCartItem', newItem)
      }
    },

  }

</script>

<style lang="scss" module>
  .item {
    display: inline-block;
    flex-direction: column;
    width: 264px;
    height: 272px;
    background: #FFFFFF;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    margin-right: 16px;
    margin-bottom: 16px;
    z-index: 1;
  }

  .item-visual {
    position: relative;
    display: flex;
  }

  .item-visual__add-cart {
    position: absolute;
    right: 18px;
    top: 18px;
  }

  .item-visual__rating {
    margin-left: 19px;
    margin-top: 20px;
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
    margin-left: 1px;
    margin-top: 20px;
    color: #F2C94C;
    font-weight: 700;
  }

  .item-visual__item-photo {
    margin-top: 18px;
    margin-left: 11px;
    width: 143px;
    height: 143px;
  }

  .item-description {
    display: flex;
    flex-direction: column;
    position: relative;
    top: 53px;
    left: 16px;

  }

  .item-description__item-name {
    color: #59606D;
    font-size: 14px;
    line-height: 18px;

  }

  .item-description__item-price {
    margin-top: 6px;
    font-size: 14px;
    line-height: 18px;
    font-weight: 700;
  }

</style>
