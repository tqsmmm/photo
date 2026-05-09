<template>
    <AppMenu />
    <div class="page-header">
        <div class="title-with-action">
            <h2 class="page-title">随机发现</h2>
            <el-button @click="fetchPhotos('')" circle class="refresh-btn" :loading="loading">
                <el-icon v-if="!loading"><Refresh /></el-icon>
            </el-button>
        </div>
        <p class="page-desc">遇见意想不到的视觉惊喜</p>
    </div>
    <AppTag @change="handleTagChange" />
    <PicList :list="list" :loading="loading" @click-photo="handlePhotoClick" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Refresh } from '@element-plus/icons-vue';
import NProgress from 'nprogress';
import AppMenu from '../components/AppMenu.vue';
import AppTag from '../components/AppTag.vue';
import PicList from '../components/PicList.vue';

const list = ref<any[]>([]);
const loading = ref(false);

const fetchPhotos = async (query = '') => {
    loading.value = true;
    NProgress.start();
    try {
        const url = new URL('http://localhost:3000/api/photos');
        url.searchParams.append('sorting', 'random');
        if (query) url.searchParams.append('q', query);
        
        const res = await fetch(url.toString());
        const data = await res.json();
        list.value = data;
    } catch (err) {
        console.error('Failed to fetch photos:', err);
    } finally {
        loading.value = false;
        NProgress.done();
    }
};

const handleTagChange = (tag: string) => {
    fetchPhotos(tag);
};

const handlePhotoClick = async (id: string) => {
    try {
        await fetch(`http://localhost:3000/api/photos/${id}/click`, {
            method: 'POST'
        });
        const photo = list.value.find(p => p.id === id);
        if (photo) photo.views++;
    } catch (err) {
        console.error('Failed to record click:', err);
    }
};

onMounted(() => {
    fetchPhotos();
});
</script>

<style scoped lang="less">
.page-header {
    max-width: 1400px;
    margin: 40px auto 20px;
    padding: 0 40px;
    
    .title-with-action {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .page-title {
        font-size: 2rem;
        font-weight: 800;
        color: #1e293b;
    }
    
    .refresh-btn {
        border: none;
        background: #f1f5f9;
        color: #64748b;
        &:hover {
            background: #e2e8f0;
            color: #1e293b;
            transform: rotate(180deg);
            transition: all 0.5s ease;
        }
    }

    .page-desc {
        color: #64748b;
        margin-top: 8px;
    }
}
@media (max-width: 768px) {
    .page-header {
        padding: 0 20px;
        margin-top: 24px;
    }
}
</style>
