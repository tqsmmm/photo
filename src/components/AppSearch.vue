<template>
    <div class="hero-section">
        <div class="hero-bg">
            <div class="overlay"></div>
            <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2000" alt="hero background" />
        </div>
        
        <div class="hero-content">
            <h1 class="hero-title">发现极致视觉之美</h1>
            <p class="hero-subtitle">超过 3,000,000+ 张高画质壁纸与摄影作品，由全球社区分享</p>
            
            <div class="search-container">
                <el-input 
                    class="main-search" 
                    v-model="search" 
                    placeholder="搜索你想要的精美壁纸..." 
                    size="large"
                    @keyup.enter="triggerSearch"
                >
                    <template #prefix>
                        <el-icon class="search-icon" @click="triggerSearch"><Search /></el-icon>
                    </template>
                </el-input>
                <div class="search-suggestions">
                    <span>热门搜索：</span>
                    <a href="#" @click.prevent="suggestSearch('赛博朋克')">赛博朋克</a>
                    <a href="#" @click.prevent="suggestSearch('极简主义')">极简主义</a>
                    <a href="#" @click.prevent="suggestSearch('大自然')">大自然</a>
                    <a href="#" @click.prevent="suggestSearch('4K壁纸')">4K壁纸</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

const search = ref('');
const emit = defineEmits(['search']);

const triggerSearch = () => {
    emit('search', search.value);
};

const suggestSearch = (keyword: string) => {
    search.value = keyword;
    triggerSearch();
};
</script>

<style scoped lang="less">
.hero-section {
    position: relative;
    height: 480px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-bottom: 40px;
}

.hero-bg {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 1;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .overlay {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%);
        z-index: 2;
    }
}

.hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    color: white;
    width: 100%;
    max-width: 800px;
    padding: 0 20px;

    .hero-title {
        font-size: 3.5rem;
        font-weight: 800;
        margin-bottom: 16px;
        letter-spacing: -1px;
        text-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .hero-subtitle {
        font-size: 1.15rem;
        font-weight: 400;
        opacity: 0.9;
        margin-bottom: 40px;
    }

    .search-container {
        width: 100%;
        
        .main-search {
            :deep(.el-input__wrapper) {
                border-radius: 12px;
                height: 64px;
                padding: 0 24px;
                font-size: 1.1rem;
                border: none;
                box-shadow: 0 20px 40px rgba(0,0,0,0.25);
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                
                &:hover, &.is-focus {
                    background: #fff;
                }
            }

            .search-icon {
                font-size: 1.4rem;
                color: #64748b;
                cursor: pointer;
                &:hover {
                    color: #1e293b;
                }
            }
        }

        .search-suggestions {
            margin-top: 16px;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            gap: 12px;

            a {
                color: white;
                text-decoration: none;
                border-bottom: 1px solid rgba(255, 255, 255, 0.3);
                transition: all 0.2s;
                
                &:hover {
                    border-bottom-color: white;
                    opacity: 1;
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .hero-section {
        height: 400px;
    }
    .hero-title {
        font-size: 2.2rem;
    }
}
</style>
