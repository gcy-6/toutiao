<template>
      <el-container >
          <el-aside style="background-color:#353b4e;min-height:100vh;width:230px">
              <layout-aside></layout-aside>
          </el-aside>
          <el-container>
            <el-header>
                <layout-header></layout-header>
            </el-header>
            <el-main style="padding:0">
              <!-- 主要区域 -->
              <router-view></router-view>
              </el-main>

          </el-container>

      </el-container>

</template>

<script>
// import layoutAside from '../../components/home/layout-aside'
// import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    // 'layout-aside': layoutAside,
    // 'layout-header': layoutHeader
  }
}
</script>

<style>

</style>
