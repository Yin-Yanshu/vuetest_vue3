<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
}

.router-enter-active,
.router-leave-active {
  /*          过度哪些元素；过度时间；过度样式，如匀速，加速过度等；延迟启动时间  */
  transition: all 2s ease;
}

.router-enter,
.router-leave-to {
  transform: translateX(-20px);
  /* opacity定义透明度 */
  opacity: 0;
}
</style>
