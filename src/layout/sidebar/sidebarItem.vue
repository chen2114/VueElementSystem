<template>
  <fragment>
    <el-menu-item
      v-if="!route.meta"
      :index="basePath"
    >
      <ch-svg
        class="m-r5"
        :size="14"
        :icon-class="route.children[0].meta.icon"
      />
      <span slot="title">
        {{ route.children[0].meta.label }}
      </span>
    </el-menu-item>
    <el-menu-item
      v-else-if="!route.children"
      :index="basePath"
    >
      <ch-svg
        v-if="route.meta.icon"
        class="m-r5"
        :size="14"
        :icon-class="route.meta.icon"
      />
      <span slot="title">{{ route.meta.label }}</span>
    </el-menu-item>
    <el-submenu
      v-else
      :index="basePath"
      popper-append-to-body
    >
      <template slot="title">
        <ch-svg
          v-if="route.meta.icon"
          class="m-r5"
          :size="14"
          :icon-class="route.meta.icon"
        />
        <span slot="title">{{ route.meta.label }}</span>
      </template>
      <sidebar-item
        v-for="child in route.children"
        :key="child.path"
        :route="child"
        :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </fragment>
</template>
<script>
import path from 'path'

export default {
  name: 'SidebarItem',
  props: {
    route: {
      type: Object,
      required: true,
      default: () => {}
    },
    basePath: {
      type: String,
      required: true,
      default: ''
    }
  },
  methods: {
    resolvePath (routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
