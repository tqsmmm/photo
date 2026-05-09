<template>
    <div class="app-tags">
        <el-tag 
            v-for="tag in tags" 
            :key="tag.text" 
            class="tag-pill" 
            round 
            effect="plain"
        >
            #{{ tag.text }}
        </el-tag>
    </div>
</template>

<script setup lang="ts">
const tags = [
    { text: '4K分辨率' },
    { text: '星空' },
    { text: '自然风光' },
    { text: '抽象艺术' },
    { text: '城市建筑' },
];
</script>

<style scoped lang="less">
.app-tags {
    margin: 10px 0 30px 0;
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;

    .tag-pill {
        cursor: pointer;
        transition: all 0.2s ease;
        padding: 0 15px;
        
        &:hover {
            background-color: #409EFF;
            color: white;
            transform: scale(1.05);
        }
    }
}
</style>
