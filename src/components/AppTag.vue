<template>
    <div class="tags-container">
        <div class="tags-inner">
            <span class="label">热门标签:</span>
            <div class="tags-list">
                <div 
                    v-for="tag in tags" 
                    :key="tag.text" 
                    class="tag-pill"
                >
                    {{ tag.text }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const tags = [
    { text: '4K分辨率' },
    { text: '星空' },
    { text: '自然风光' },
    { text: '抽象艺术' },
    { text: '城市建筑' },
    { text: '简约' },
    { text: '动物' },
    { text: '汽车' }
];
</script>

<style scoped lang="less">
.tags-container {
    padding: 0 40px;
    margin-bottom: 32px;
}

.tags-inner {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 16px;

    .label {
        font-size: 0.9rem;
        font-weight: 600;
        color: #1e293b;
        white-space: nowrap;
    }

    .tags-list {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;

        .tag-pill {
            cursor: pointer;
            padding: 8px 20px;
            font-size: 0.85rem;
            font-weight: 500;
            color: #64748b;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 100px;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            
            &:hover {
                background: #f1f5f9;
                color: #1e293b;
                border-color: #cbd5e1;
                transform: translateY(-1px);
            }
        }
    }
}

@media (max-width: 768px) {
    .tags-container {
        padding: 0 20px;
    }
}
</style>
