<template>
    <AppMenu />
    <div class="page-header">
        <h2 class="page-title">热门榜单</h2>
        <p class="page-desc">根据全站浏览量评选出的佳作</p>
    </div>
    <AppTag />
    <PicList :list="list" @click-photo="handlePhotoClick" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AppMenu from '../components/AppMenu.vue';
import AppTag from '../components/AppTag.vue';
import PicList from '../components/PicList.vue';

const list = ref<any[]>([]);

const fetchPhotos = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/photos?sorting=views');
        const data = await res.json();
        list.value = data;
    } catch (err) {
        console.error('Failed to fetch photos:', err);
    }
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
    
    .page-title {
        font-size: 2rem;
        font-weight: 800;
        color: #1e293b;
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
