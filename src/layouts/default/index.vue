<script lang="ts" setup>
import VDrawer from '~~/vinicunca/v-drawer.vue';
</script>

<template>
  <VinApp
    class="vin-theme-light"
    root-class="flex text-black [--vin-scrollbar-offset:0px]"
    wrap-class="flex flex-col flex-auto max-w-full min-h-screen relative backface-hidden"
    layout-class="flex flex-auto h-full"
  >
    <VinAppHeader
      root-class="bg-red-500 flex-none flex items-start flex-col justify-between max-w-full overflow-hidden relative"
      content-class="flex items-center relative w-full flex-[0_0_auto]"
      order="1"
    >
    </VinAppHeader>

    <VDrawer class="vin-elevation-10">
    </VDrawer>

    <VinMain
      root-class="flex-[1_0_auto] max-w-full pl-$vin-layout-left pr-$vin-layout-right pt-$vin-layout-top pb-$vin-layout-bottom"
    >
      <router-view></router-view>
    </VinMain>
  </VinApp>
</template>
