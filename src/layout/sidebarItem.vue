<template>
  <fragment>
    <el-menu-item
      v-if="route.alwaysShow"
      :index="basePath"
    >
      <i
        v-if="route.meta.icon"
        :class="route.meta.icon"
      />
      <span slot="title">{{ route.label }}</span>
    </el-menu-item>
    <el-menu-item
      v-else-if="!route.children"
      :index="basePath"
    >
      <i
        v-if="route.meta.icon"
        :class="route.meta.icon"
      />
      <span slot="title">{{ route.label }}</span>
    </el-menu-item>
    <el-submenu
      v-else
      :index="basePath"
      popper-append-to-body
    >
      <template slot="title">
        <i
          v-if="route.meta.icon"
          :class="route.meta.icon"
        />
        <span slot="title">{{ route.label }}</span>
      </template>
      <sidebar-item
        v-for="child in route.children"
        :key="child.name"
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
