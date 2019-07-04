<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  body {
    padding: 0;
    margin: 0;
  }

  body, html {
    height: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }

  .color-recyclable {
    color: #004883;
  }

  .color-recyclable-bg {
    background: #004883;
    color: #ffffff;
    padding: 0 5px;
  }

  .color-wet {
    color: #653f36;
  }

  .color-kitchen {
    color: #53c968;
  }

  .color-kitchen-bg {
    background: #53c968;
    color: #ffffff;
    padding: 0 5px;
  }

  .color-harmful {
    color: #e53420;
  }

  .color-harmful-bg {
    background: #e53420;
    color: #ffffff;
    padding: 0 5px;
  }

  .color-other {
    color: #2c2b27;
  }

  .color-other-bg {
    background: #2c2b27;
    color: #ffffff;
    padding: 0 5px;
  }

  .color-other1 {
    color: #ffe837;
  }

  .color-other1-bg {
    background: #ffe837;
    color: #ffffff;
    padding: 0 5px;
  }
</style>
