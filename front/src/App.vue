<template>
  <Header />
  <router-view/>
</template>

<script>
import Header from './components/header/Header.vue';

export default {
  components: {
    Header,
  }
}
</script>

<style>
@import url('@/assets/css/main.css');
@import url('@/assets/css/grid.css');
@import url('@/assets/css/input.css');
</style>