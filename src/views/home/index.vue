<template>
      <el-container >
          <el-aside :style="{width:collapse?'60px':'230px'}" style="transition:all 0.2s;background-color:#353b4e;min-height:100vh;width:230px">
              <layout-aside :collapse="collapse"></layout-aside>
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
import eventBus from '../../utils/eventBus'
// import layoutAside from '../../components/home/layout-aside'
// import layoutHeader from '../../components/home/layout-header'
export default {
  data () {
    return {
      collapse: false
    }
  },
  components: {
    // 'layout-aside': layoutAside,
    // 'layout-header': layoutHeader
  },
  created () {
    // 监听这个折叠事件
    eventBus.$on('changeCollapse', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style>

</style>
