<template>
    <div class="app-search">
        <el-input 
            class="search-input" 
            v-model="search" 
            placeholder="搜索优质图片..." 
            size="large"
        >
            <template #prefix>
                <el-icon><Search /></el-icon>
            </template>
            <template #suffix>
                <el-button text :icon="Camera" />
            </template>
        </el-input>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search, Camera } from '@element-plus/icons-vue';

const search = ref('');
</script>

<style scoped lang="less">
.app-search {
    margin: 40px 0 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .search-input {
        width: 100%;
        max-width: 800px;
        
        :deep(.el-input__wrapper) {
            border-radius: 30px;
            padding: 5px 20px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            
            &.is-focus {
                box-shadow: 0 4px 25px rgba(64, 158, 255, 0.15);
            }
        }
    }
}
</style>
