<template>
    <div class="pic-wrapper">
        <div class="pic-container" ref="containerRef">
            <div 
                v-for="(item, index) in layoutItems" 
                :key="item.id || item.file"
                class="pic-item"
                :style="{ 
                    height: item.height + 'px', 
                    top: item.top + 'px', 
                    left: item.left + 'px',
                    opacity: item.ready ? 1 : 0,
                    transform: `translateY(${item.ready ? 0 : '30px'})`
                }"
                @click="openPreview(index, item)"
            >
                <div class="image-wrapper">
                    <!-- Use thumb for list for faster loading -->
                    <el-image 
                        :src="item.thumb || item.file" 
                        loading="lazy"
                        fit="cover"
                        class="main-img"
                    />
                    <div class="overlay">
                        <div class="overlay-top">
                            <div class="stats-badge" v-if="item.views !== undefined">
                                <el-icon><View /></el-icon>
                                <span>{{ item.views || 0 }}</span>
                            </div>
                            <div class="actions" @click.stop>
                                <el-button circle class="action-btn"><el-icon><Star /></el-icon></el-button>
                            </div>
                        </div>
                        <div class="overlay-bottom">
                            <div class="info">
                                <div class="author">{{ item.title || '壁纸 #' + item.id }}</div>
                                <div class="resolution">High Quality</div>
                            </div>
                            <div class="actions" @click.stop>
                                <el-button type="primary" size="small" class="dl-btn" @click="handleDownload(item)">下载</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Manual Image Viewer with full-size images -->
        <el-image-viewer
            v-if="showViewer"
            :url-list="previewList"
            :initial-index="viewerIndex"
            @close="showViewer = false"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { Star, View } from '@element-plus/icons-vue';

interface PicItem {
    id?: string;
    file: string;   // Full size
    thumb?: string; // Thumbnail
    title?: string;
    views?: number;
    height: number;
    top: number;
    left: number;
    ready: boolean;
}

const props = defineProps<{
    list: { id?: string; file: string; thumb?: string; title?: string; views?: number }[];
}>();

const emit = defineEmits(['click-photo']);

const containerRef = ref<HTMLElement | null>(null);
const layoutItems = ref<PicItem[]>([]);
const previewList = computed(() => props.list.map(i => i.file));

// Viewer state
const showViewer = ref(false);
const viewerIndex = ref(0);

const COLUMN_WIDTH = 340;
const GUTTER = 24;

const openPreview = (index: number, item: any) => {
    viewerIndex.value = index;
    showViewer.value = true;
    if (item.id) {
        emit('click-photo', item.id);
    }
};

const handleDownload = (item: any) => {
    const link = document.createElement('a');
    link.href = item.file;
    link.target = '_blank';
    link.click();
};

const initLayout = async () => {
    if (!containerRef.value) return;
    
    const containerWidth = containerRef.value.clientWidth;
    const columns = Math.max(1, Math.floor(containerWidth / (COLUMN_WIDTH + GUTTER)));
    const offset = (containerWidth - (columns * (COLUMN_WIDTH + GUTTER) - GUTTER)) / 2;
    
    const heights = new Array(columns).fill(0);
    const newItems: PicItem[] = [];
    
    for (let i = 0; i < props.list.length; i++) {
        const item = props.list[i];
        let imgHeight = 200; 

        const img = new Image();
        img.src = item.thumb || item.file;
        await new Promise((resolve) => {
            img.onload = () => {
                imgHeight = Math.floor(img.height / (img.width / COLUMN_WIDTH));
                resolve(null);
            };
            img.onerror = resolve;
        });

        const minHeight = Math.min(...heights);
        const columnIndex = heights.indexOf(minHeight);
        
        newItems.push({
            ...item,
            height: imgHeight,
            top: minHeight,
            left: offset + columnIndex * (COLUMN_WIDTH + GUTTER),
            ready: true
        });
        
        heights[columnIndex] += imgHeight + GUTTER;
    }
    
    layoutItems.value = newItems;
    if (containerRef.value) {
        containerRef.value.style.height = Math.max(...heights) + 'px';
    }
};

let resizeTimer: any = null;
const handleResize = () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => initLayout(), 250);
};

onMounted(() => {
    initLayout();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

watch(() => props.list, () => initLayout(), { deep: true });
</script>

<style scoped lang="less">
.pic-wrapper {
    padding: 0 40px;
    margin-bottom: 80px;
}

.pic-container {
    position: relative;
    max-width: 1400px;
    margin: 0 auto;
    transition: height 0.5s ease;
}

.pic-item {
    position: absolute;
    width: 340px;
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    background: #f1f5f9;
    cursor: zoom-in;
    
    .image-wrapper {
        position: relative;
        width: 100%;
        height: 100%;

        &:hover {
            .overlay {
                opacity: 1;
                transform: translateY(0);
            }
            .main-img {
                transform: scale(1.08);
            }
        }
    }

    .main-img {
        width: 100%;
        height: 100%;
        display: block;
        transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .overlay {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 24px;
        box-sizing: border-box;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        z-index: 2;

        .overlay-top, .overlay-bottom {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .overlay-bottom {
            align-items: flex-end;
        }

        .stats-badge {
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(10px);
            color: white;
            padding: 6px 14px;
            border-radius: 10px;
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
        }

        .action-btn {
            background: rgba(255, 255, 255, 0.95);
            border: none;
            color: #1e293b;
            width: 40px;
            height: 40px;
            
            &:hover {
                background: #fff;
                transform: scale(1.1);
                color: #ef4444;
            }
        }

        .info {
            display: flex;
            flex-direction: column;
            color: white;
            padding-bottom: 4px;
            max-width: 65%;
            
            .author {
                font-size: 1.1rem;
                font-weight: 700;
                margin-bottom: 2px;
                text-shadow: 0 2px 8px rgba(0,0,0,0.4);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .resolution {
                font-size: 0.8rem;
                opacity: 0.9;
            }
        }

        .dl-btn {
            border-radius: 12px;
            font-weight: 700;
            padding: 10px 22px;
        }
    }
}

@media (max-width: 768px) {
    .pic-wrapper {
        padding: 0 16px;
    }
    .pic-item {
        width: calc(100vw - 32px);
    }
}
</style>
