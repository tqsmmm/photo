<template>
    <AppMenu />
    <AppSearch />
    <AppTag />
    <PicList :list="list" />
</template>

<script setup lang="ts">
import AppMenu from '../components/AppMenu.vue';
import AppSearch from '../components/AppSearch.vue';
import AppTag from '../components/AppTag.vue';
import PicList from '../components/PicList.vue';

const list = [
    { file: '/images/wallhaven-6dqemx.jpg' },
    { file: '/images/wallhaven-kx9jpq.jpg' },
    { file: '/images/wallhaven-m3pvy8.jpg' },
    { file: '/images/wallhaven-p92mj3.jpg' },
    { file: '/images/wallhaven-x6128o.jpg' },
    { file: '/images/wallhaven-yxj2el.png' },
    { file: '/images/wallhaven-zyx9lw.jpg' },
    { file: '/images/wallhaven-zyxvqy.jpg' },
];
</script>

<style scoped lang="less"></style>
