<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="scss" scoped>
#app {
  @include flex-row-wrap(nowrap);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  padding: 60px 24px 20px;

  @include tablet {
    padding: 60px;
  }
}
</style>