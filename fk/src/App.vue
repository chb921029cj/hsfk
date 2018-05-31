<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
@import "../static/css/main.css";
@import "../static/css/color-dark.css"; /*深色主题*/

/*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
.el-submenu__title,
.el-menu-item {
  font-size: 12px !important;
  height: 36px !important;
  line-height: 36px !important;
}
.el-submenu .el-menu-item {
  font-size: 12px !important;
  height: 36px !important;
  line-height: 36px !important;
  padding-left: 20px ;
  min-width: 160px !important;
}
</style>