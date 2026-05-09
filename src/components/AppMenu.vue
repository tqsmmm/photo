<template>
    <div class="app-menu">
        <el-menu 
            style="width: 100%" 
            :default-active="route.path" 
            mode="horizontal" 
            router 
            :ellipsis="false"
            @select="handleSelect"
        >
            <el-menu-item index="/" class="logo">
                <span class="logo-text">图片市场</span>
            </el-menu-item>
            <div class="flex-grow"></div>
            <el-menu-item index="/latest">最新</el-menu-item>
            <el-menu-item index="/toplist">榜单</el-menu-item>
            <el-menu-item index="/random">随机</el-menu-item>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
</script>

<style scoped lang="less">
.flex-grow {
    flex-grow: 1;
}

.app-menu {
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    
    .logo {
        .logo-text {
            font-weight: bold;
            font-size: 1.2rem;
            background: linear-gradient(45deg, #409EFF, #67C23A);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }

    :deep(.el-menu) {
        border-bottom: none;
        padding: 0 20px;
    }
}
</style>
