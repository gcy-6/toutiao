<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">素材管理</template>
      </bread-crumb>
      <el-tabs v-model="activeName">
          <el-tab-pane label="全部" name='all'>122</el-tab-pane>
          <el-tab-pane label="收藏" name='collect'>123</el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'collect'
    }
  },
  methods: {

  }

}
</script>

<style>

</style>
