<script lang="ts" setup>
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';
import { useStyleStore } from '@/stores/style.store';
import { useToolStore } from '@/tools/tools.store';
import type { ToolCategory } from '@/tools/tools.types';

import { Home2, Menu2 } from '@vicons/tabler';
import { NIcon, useThemeVars } from 'naive-ui';

import { storeToRefs } from 'pinia';
import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';

const themeVars = useThemeVars();
const styleStore = useStyleStore();

const { t } = useI18n();

const toolStore = useToolStore();
const { favoriteTools, toolsByCategory } = storeToRefs(toolStore);

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0
    ? [{ name: t('tools.categories.favorite-tools'), components: favoriteTools.value }]
    : []),
  ...toolsByCategory.value,
]);
</script>

<template>
  <MenuLayout :class="{ isSmallScreen: styleStore.isSmallScreen }" class="menu-layout">

    <template #sider>
            <RouterLink to="/" class="hero-wrapper">
              <HeroGradient class="gradient" />
              <div class="text-wrapper">
                <div class="title">IT - TOOLS</div>
                <div class="divider" />
                <div class="subtitle">
                  {{ $t('home.subtitle') }}
                </div>
              </div>
            </RouterLink>

      <div class="sider-content">
        <div v-if="styleStore.isSmallScreen" flex flex-col items-center>
          <locale-selector w="90%" />

          <div flex justify-center>
            <NavbarButtons />
          </div>
        </div>

        <CollapsibleToolMenu :tools-by-category="tools" />
      </div>
    </template>

    <template #content>
      <div flex gap-2 items-center justify-center style="padding: 26px">
        <c-button
          :aria-label="$t('home.toggleMenu')"
          circle
          variant="text"
          @click="styleStore.isMenuCollapsed = !styleStore.isMenuCollapsed"
        >
          <NIcon :component="Menu2" size="25" />
        </c-button>

        <c-tooltip :tooltip="$t('home.home')" position="bottom">
          <c-button :aria-label="$t('home.home')" circle to="/" variant="text">
            <NIcon :component="Home2" size="25" />
          </c-button>
        </c-tooltip>

        <command-palette />

        <locale-selector v-if="!styleStore.isSmallScreen" />

        <div>
          <NavbarButtons v-if="!styleStore.isSmallScreen" />
        </div>
      </div>
      <slot />
    </template>
  </MenuLayout>
</template>

<style lang="less">
//::v-deep(.n-layout-scroll-container) {
//    @percent: 4%;
//    @position: 25px;
//    @size: 50px;
//    @color: #eeeeee25;
//    background-image: radial-gradient(@color @percent, transparent @percent),
//        radial-gradient(@color @percent, transparent @percent);
//    background-position: 0 0, @position @position;
//    background-size: @size @size;
//}

.support-button {
  background: rgb(37, 99, 108);
  background: linear-gradient(48deg, rgba(37, 99, 108, 1) 0%, rgba(59, 149, 111, 1) 60%, rgba(20, 160, 88, 1) 100%);
  color: #fff !important;
  transition: padding ease 0.2s !important;

  &:hover {
    color: #fff;
    padding-left: 30px;
    padding-right: 30px;
  }
}

.footer {
  text-align: center;
  color: #838587;
  margin-top: 20px;
  padding: 20px 0;
}

.hero-wrapper {
  position: absolute;
  display: block;
  left: 0;
  width: 100%;
  z-index: 10;
  overflow: hidden;

  .gradient {
    margin-top: -65px;
  }

  .text-wrapper {
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    top: 16px;
    color: #fff;

    .title {
      font-size: 25px;
      font-weight: 600;
    }

    .divider {
      width: 50px;
      height: 2px;
      border-radius: 4px;
      background-color: v-bind('themeVars.primaryColor');
      margin: 0 auto 5px;
    }

    .subtitle {
      font-size: 16px;
    }
  }
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar:horizontal {
  height: 6px;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #0003;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
}
::-webkit-scrollbar-thumb:hover {
  cursor: pointer;
  background-color: #0000004d;
}
.dark ::-webkit-scrollbar-thumb {
  background-color: #fff3;
}
.dark ::-webkit-scrollbar-thumb:hover {
  background-color: #fff6;
}
</style>
