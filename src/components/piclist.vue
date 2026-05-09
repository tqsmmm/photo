<template>
    <div class="pic-container" ref="containerRef">
        <div 
            v-for="(item, index) in layoutItems" 
            :key="item.file"
            class="pic-item"
            :style="{ 
                height: item.height + 'px', 
                top: item.top + 'px', 
                left: item.left + 'px',
                opacity: item.ready ? 1 : 0,
                transform: `translateY(${item.ready ? 0 : '20px'})`
            }"
        >
            <el-image 
                :src="item.file" 
                :zoom-rate="1.2" 
                :preview-src-list="previewList" 
                :initial-index="index"
                loading="lazy"
                @load="onImageLoad(index)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, watch, computed } from 'vue';

interface PicItem {
    file: string;
    width: number;
    height: number;
    top: number;
    left: number;
    ready: boolean;
}

const props = defineProps<{
    list: { file: string }[];
}>();

const containerRef = ref<HTMLElement | null>(null);
const layoutItems = ref<PicItem[]>([]);
const previewList = computed(() => props.list.map(i => i.file));

const COLUMN_WIDTH = 300;
const GUTTER = 15;

const initLayout = async () => {
    if (!containerRef.value) return;
    
    const containerWidth = containerRef.value.clientWidth;
    const columns = Math.max(1, Math.floor(containerWidth / (COLUMN_WIDTH + GUTTER)));
    const offset = (containerWidth - (columns * (COLUMN_WIDTH + GUTTER) - GUTTER)) / 2;
    
    const heights = new Array(columns).fill(0);
    
    // Initialize or update layout items
    const newItems: PicItem[] = [];
    
    for (let i = 0; i < props.list.length; i++) {
        const file = props.list[i].file;
        const existing = layoutItems.value.find(item => item.file === file);
        
        // We need the actual image dimensions. 
        // If we don't have them, we must wait for load.
        let imgHeight = 200; // Placeholder
        let imgWidth = COLUMN_WIDTH;

        if (existing && existing.ready) {
            imgHeight = existing.height;
            imgWidth = COLUMN_WIDTH;
        } else {
            // Measure image
            const img = new Image();
            img.src = file;
            await new Promise((resolve) => {
                img.onload = () => {
                    imgHeight = Math.floor(img.height / (img.width / COLUMN_WIDTH));
                    resolve(null);
                };
                img.onerror = resolve; // Continue on error
            });
        }

        const minHeight = Math.min(...heights);
        const columnIndex = heights.indexOf(minHeight);
        
        const top = minHeight;
        const left = offset + columnIndex * (COLUMN_WIDTH + GUTTER);
        
        newItems.push({
            file,
            width: COLUMN_WIDTH,
            height: imgHeight,
            top,
            left,
            ready: true
        });
        
        heights[columnIndex] += imgHeight + GUTTER;
    }
    
    layoutItems.value = newItems;
    
    // Update container height
    if (containerRef.value) {
        containerRef.value.style.height = Math.max(...heights) + 'px';
    }
};

const onImageLoad = (index: number) => {
    // Optional: could trigger individual item "ready" state here
};

let resizeTimer: any = null;
const handleResize = () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        initLayout();
    }, 200);
};

onMounted(() => {
    initLayout();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

watch(() => props.list, () => {
    initLayout();
}, { deep: true });

</script>

<style scoped lang="less">
.pic-container {
    position: relative;
    width: 100%;
    margin-top: 20px;
    transition: height 0.3s ease;
}

.pic-item {
    position: absolute;
    width: 300px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        z-index: 10;
    }

    .el-image {
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>
