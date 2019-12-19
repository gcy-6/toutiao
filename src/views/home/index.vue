<template>
      <el-container >
          <el-aside style="background-color:#353b4e;height:100vh;width:230px">
              <layout-aside></layout-aside>
          </el-aside>
          <el-container>
            <el-header>头部</el-header>
            <el-main>主要区域</el-main>
          </el-container>

      </el-container>

</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>

</style>
