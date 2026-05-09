<template>
    <AppMenu />
    <AppSearch @search="handleSearch" />
    <AppTag @filter-change="handleFilterChange" />
    <PicList :list="list" :loading="loading" @click-photo="handlePhotoClick" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NProgress from 'nprogress';
import AppMenu from '../components/AppMenu.vue';
import AppSearch from '../components/AppSearch.vue';
import AppTag from '../components/AppTag.vue';
import PicList from '../components/PicList.vue';

const list = ref<any[]>([]);
const loading = ref(false);
const currentFilters = ref({
    categories: '111',
    q: ''
});

const fetchPhotos = async (filters = currentFilters.value) => {
    loading.value = true;
    NProgress.start();
    try {
        const url = new URL('http://localhost:3000/api/photos');
        // If searching or filtering, use relevance, otherwise toplist
        const isFiltering = filters.q || filters.categories !== '111';
        url.searchParams.append('sorting', isFiltering ? 'relevance' : 'toplist');
        
        if (filters.q) url.searchParams.append('q', filters.q);
        url.searchParams.append('categories', filters.categories);
        
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

const handleSearch = (query: string) => {
    currentFilters.value.q = query;
    fetchPhotos();
};

const handleFilterChange = (filters: { categories: string, q: string }) => {
    currentFilters.value = { ...currentFilters.value, ...filters };
    fetchPhotos();
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

<style scoped lang="less"></style>
