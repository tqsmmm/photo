<template>
    <div class="filter-section">
        <!-- Categories (Wallhaven Style) -->
        <div class="category-group">
            <span class="group-label">分类:</span>
            <div class="pill-group">
                <span 
                    v-for="cat in categories" 
                    :key="cat.value"
                    class="pill"
                    :class="{ active: currentCategory === cat.value }"
                    @click="selectCategory(cat.value)"
                >
                    {{ cat.label }}
                </span>
            </div>
        </div>

        <!-- Tags (Wallhaven Topics) -->
        <div class="tag-group">
            <span class="group-label">热门标签:</span>
            <div class="pill-group">
                <span 
                    v-for="tag in tags" 
                    :key="tag.label"
                    class="pill secondary" 
                    :class="{ active: currentTag === tag.value }"
                    @click="selectTag(tag.value)"
                >
                    {{ tag.label }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const categories = [
    { label: '全部', value: '111' },
    { label: '常规', value: '100' },
    { label: '二次元', value: '010' },
    { label: '人物', value: '001' },
];

const tags = [
    { label: '全部', value: '' },
    { label: 'Landscape', value: 'landscape' },
    { label: 'Cyberpunk', value: 'cyberpunk' },
    { label: 'Minimalism', value: 'minimalism' },
    { label: 'Portrait', value: 'portrait' },
    { label: 'Macro', value: 'macro' },
    { label: 'Space', value: 'space' },
    { label: 'Digital Art', value: 'digital art' },
    { label: 'Cars', value: 'cars' },
    { label: 'Abstract', value: 'abstract' },
    { label: '4K', value: '4k' },
];

const currentCategory = ref('111');
const currentTag = ref('');

const emit = defineEmits(['filter-change']);

const selectCategory = (val: string) => {
    currentCategory.value = val;
    emitChange();
};

const selectTag = (val: string) => {
    currentTag.value = val;
    emitChange();
};

const emitChange = () => {
    emit('filter-change', {
        categories: currentCategory.value,
        q: currentTag.value
    });
};
</script>

<style scoped lang="less">
.filter-section {
    max-width: 1400px;
    margin: 0 auto 30px;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.category-group, .tag-group {
    display: flex;
    align-items: center;
    gap: 16px;

    .group-label {
        font-size: 0.9rem;
        font-weight: 700;
        color: #1e293b;
        min-width: 60px;
    }
}

.pill-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.pill {
    padding: 6px 16px;
    background: #f1f5f9;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #e2e8f0;
        color: #1e293b;
    }

    &.active {
        background: #1e293b;
        color: white;
    }

    &.secondary {
        background: transparent;
        border: 1px solid #e2e8f0;
        
        &.active {
            background: #3b82f6;
            border-color: #3b82f6;
            color: white;
        }
        
        &:hover:not(.active) {
            border-color: #3b82f6;
            color: #3b82f6;
        }
    }
}

@media (max-width: 768px) {
    .filter-section {
        padding: 0 20px;
    }
    .category-group, .tag-group {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
}
</style>
