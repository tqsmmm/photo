<template>
    <div class="app-menu-wrapper">
        <div class="app-menu">
            <div class="logo-section" @click="$router.push('/')">
                <div class="logo-icon"></div>
                <span class="logo-text">图片市场</span>
            </div>
            
            <div class="menu-items">
                <router-link to="/" class="menu-item" active-class="active">首页</router-link>
                <router-link to="/latest" class="menu-item" active-class="active">最新</router-link>
                <router-link to="/toplist" class="menu-item" active-class="active">榜单</router-link>
                <router-link to="/random" class="menu-item" active-class="active">随机</router-link>
            </div>
            
            <div class="user-actions">
                <el-button type="primary" round class="upload-btn">上传作品</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style scoped lang="less">
.app-menu-wrapper {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.app-menu {
    max-width: 1400px;
    margin: 0 auto;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;

    .logo-section {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;

        .logo-icon {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
            border-radius: 8px;
            position: relative;
            
            &::after {
                content: '';
                position: absolute;
                top: 20%; left: 20%;
                width: 60%; height: 60%;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
            }
        }

        .logo-text {
            font-size: 1.25rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            background: linear-gradient(to right, #1e293b, #475569);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }

    .menu-items {
        display: flex;
        gap: 32px;

        .menu-item {
            text-decoration: none;
            color: #64748b;
            font-size: 0.95rem;
            font-weight: 500;
            transition: all 0.2s ease;
            position: relative;
            padding: 8px 0;

            &:hover {
                color: #1e293b;
            }

            &.active {
                color: #6366f1;
                
                &::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 4px;
                    height: 4px;
                    background: #6366f1;
                    border-radius: 50%;
                }
            }
        }
    }

    .upload-btn {
        font-weight: 600;
        padding: 10px 24px;
        background: #1e293b;
        border: none;
        
        &:hover {
            background: #334155;
            transform: translateY(-1px);
        }
    }
}

@media (max-width: 768px) {
    .app-menu {
        padding: 0 20px;
    }
    .menu-items {
        display: none;
    }
}
</style>
