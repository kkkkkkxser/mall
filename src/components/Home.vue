<template>
    <div>
        <!-- 头部组件 -->
        <nav-header></nav-header>
        <router-view></router-view>
        <!-- 尾部组件 -->
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import NavHeader from './NavHeader'
import NavFooter from './NavFooter'
export default {
    components:{
        NavHeader,
        NavFooter
    }
}
</script>
<style scoped>

</style>