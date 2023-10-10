<template>
    <div>
        <div> 菜单1 </div>
        <br />
        <!-- <div v-permission="['manager']"> -->
            <div v-if="checkPermission(['manager'])">
            权限显示块 permission : manager
        </div>
        <br />
        <div v-permission="['employee']">
            权限显示块 permission : employee
        </div>
    </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数 

export default {
    directives: { permission },
    name:"menu1",
    methods:{
        checkPermission
    }
}

</script>

<style lang="scss" scoped></style>