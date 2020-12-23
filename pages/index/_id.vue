<template>
  <div :class="$style['wrapper-items']">
    <Item v-for="item in items" :key="item.id" :id="item.id" :name="item.name" :price="item.price"
          :rating="item.rating"
          :photo="item.photo"/>
  </div>
</template>

<script>
  import Item from "~/components/Item";

  export default {
    components: {
      Item
    },
    data() {
      return {
        items: [],
      }
    },
    async asyncData({$axios, params}) {
      const config = {
        headers: {
          Accept: "application/json"
        }
      }
      try {
        const items = await $axios.$get(`https://frontend-test.idaproject.com/api/product?category=${params.id}`, config)
        return {items}
      } catch (e) {
        console.log(e)
      }
    },
  }
</script>

<style lang="scss" module>
  .wrapper-items{
    margin-top: 42px;
    max-width: 1192px;
  }

</style>
