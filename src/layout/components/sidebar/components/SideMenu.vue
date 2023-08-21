<template>
  <n-menu
    ref="menu"
    class="side-menu"
    accordion
    :indent="18"
    :collapsed-icon-size="22"
    :collapsed-width="64"
    :options="menuOptions"
    :value="activeKey"
    @update:value="handleMenuSelect"
  />
</template>

<script setup>
import { usePermissionStore } from '@/store'
import { renderCustomIcon, renderIcon, isExternal } from '@/utils'
// import { prefix } from 'naive-ui/es/_utils/cssr'

const router = useRouter()
const curRoute = useRoute()
const permissionStore = usePermissionStore()

// 当前选中的菜单项的key为路由信息名
const activeKey = computed(() => curRoute.meta?.activeMenu || curRoute.name)

// 遍历权限路由信息转换为菜单展示配置
const menuOptions = computed(() => {
  console.log(permissionStore.menus)
  return permissionStore.menus.map((item) => getMenuItem(item)).sort((a, b) => a.order - b.order)
})

const menu = ref(null)
watch(curRoute, async () => {
  await nextTick()
  menu.value?.showOption()
})

// 解析路径，将相对路径转换为绝对路径
function resolvePath(basePath, path) {
  if (isExternal(path)) return path // 如果是外部链接，则直接返回路径
  return (
    '/' +
    [basePath, path]
      .filter((path) => !!path && path !== '/') // 过滤空路径和根路径
      .map((path) => path.replace(/(^\/)|(\/$)/g, '')) // 去除路径前后的斜杠
      .join('/')
  )
}

// 构建菜单项
function getMenuItem(route, basePath = '') {
  let menuItem = {
    label: (route.meta && route.meta.title) || route.name, // 菜单项显示的文本标题
    key: route.name, // 菜单项的唯一标识
    path: resolvePath(basePath, route.path), // 菜单项对应的路径
    icon: getIcon(route.meta), // 菜单项的图标
    order: route.meta?.order || 0, // 菜单项的排序值，默认为0
  }

  const visibleChildren = route.children
    ? route.children.filter((item) => item.name && !item.isHidden)
    : []

  if (!visibleChildren.length) return menuItem

  if (visibleChildren.length === 1) {
    // 单个子路由处理
    const singleRoute = visibleChildren[0]
    menuItem = {
      ...menuItem,
      label: singleRoute.meta?.title || singleRoute.name,
      key: singleRoute.name,
      path: resolvePath(menuItem.path, singleRoute.path),
      icon: getIcon(singleRoute.meta),
    }
    const visibleItems = singleRoute.children
      ? singleRoute.children.filter((item) => item.name && !item.isHidden)
      : []

    if (visibleItems.length === 1) {
      menuItem = getMenuItem(visibleItems[0], menuItem.path)
    } else if (visibleItems.length > 1) {
      menuItem.children = visibleItems
        .map((item) => getMenuItem(item, menuItem.path))
        .sort((a, b) => a.order - b.order)
    }
  } else {
    menuItem.children = visibleChildren
      .map((item) => getMenuItem(item, menuItem.path))
      .sort((a, b) => a.order - b.order)
  }
  return menuItem
}

function getIcon(meta) {
  if (meta?.customIcon) return renderCustomIcon(meta.customIcon, { size: 18 })
  if (meta?.icon) return renderIcon(meta.icon, { size: 18 })
  return null
}

function handleMenuSelect(key, item) {
  if (isExternal(item.path)) {
    window.open(item.path)
  } else {
    router.push(item.path)
  }
}
</script>

<style lang="scss">
.side-menu:not(.n-menu--collapsed) {
  .n-menu-item-content {
    &::before {
      left: 5px;
      right: 5px;
    }
    &.n-menu-item-content--selected,
    &:hover {
      &::before {
        border-left: 4px solid var(--primary-color);
      }
    }
  }
}
</style>
