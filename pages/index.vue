<template>
  <div :class="$style.wrapper">
    <div :class="$style['main-block']">
      <div :class="$style.sidebar">
        <div :class="$style['sidebar-header']">
          <div :class="$style['sidebar-header__name']">
            Каталог
          </div>
        </div>
        <div :class="$style['sidebar-categories']">
          <div :class="$style['sidebar-categories__item']">
            <ul>
              <li v-for="category in categories" :key="category.id">
                <nuxt-link :to="'/'+ category.id">{{category.name}}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div :class="$style.content">
        <div :class="$style['content-dropdown']">
          <div :class="$style['content-dropdown-block']">
            <div :class="$style['content-dropdown__text']">
              Сортировать по: <a href="" @click.prevent="clicked=!clicked" :class="$style['content-dropdown__link']">цене</a>
            </div>
          </div>
          <div :class="$style['content-dropdown__dropdown']" v-if="clicked">
            <div :class="$style['content-dropdown__item']">
              По цене
            </div>
            <div :class="$style['content-dropdown__item']">
              По популярности
            </div>
          </div>
        </div>
        <div :class="$style['block__items']">
          <NuxtChild :key="$route.params.id"/>
        </div>
      </div>
    </div>
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
        categories: [],
        clicked: false
      }
    },
    async asyncData({$axios}) {
      const config = {
        headers: {
          Accept: "application/json"
        }
      }
      try {
        const categories = await $axios.$get('https://frontend-test.idaproject.com/api/product-category', config)
        return {categories}
      } catch (e) {
        console.log(e)
      }
    }
  }
</script>

<style lang="scss" module>
  .wrapper {
    -moz-box-shadow: inset 0 7px 9px -7px #beb4b4;
    -webkit-box-shadow: inset 0 7px 9px -7px #beb4b4;
    box-shadow: inset 0 7px 9px -7px #beb4b4;
    max-width: 1440px;
  }

  .main-block {
    display: inline-flex;
  }

  .sidebar {
    width: 248px;
    display: flex;
    flex-direction: column;
  }

  .sidebar-header {
    margin-left: 88px;
    margin-top: 32px;
  }

  .sidebar-header__name {
    font-size: 32px;
    line-height: 41px;
    font-weight: 700;
    color: #1F1F1F;
  }

  .sidebar-categories {
    margin-left: 87px;
    margin-top: 24px;
  }

  .sidebar-categories__item {
    font-size: 16px;
    line-height: 21px;
  }

  .content {
    position: relative;
    flex: 1 0 auto;
    display: flex;
    max-width: calc(100vw - 248px);
    flex-direction: column;
  }

  .content-dropdown {
    position: absolute;
    right: 100px;
    display: flex;
    flex-direction: column;
    margin-top: 42px;
  }

  .content-dropdown__dropdown {
    width: 160px;
    height: 68px;
    background: #FFFFFF;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    z-index: 2;
  }

  .content-dropdown__text {
    font-size: 16px;
    line-height: 21px;
  }

  .content-dropdown__item {
    margin-top: 8px;
    font-size: 14px;
    line-height: 18px;
  }

  .content-dropdown-block {
    z-index: 2;
  }

  .block__items{
    margin-top: 42px;
  }
</style>
