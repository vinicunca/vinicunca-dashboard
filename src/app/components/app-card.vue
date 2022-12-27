<script lang="ts" setup>
defineProps({
  title: String,
});
</script>

<template>
  <div class="w-full rounded-5 vin-elevation-2 overflow-hidden relative">
    <div class="h-16 flex items-center px-4 text-lg font-500 border-b border-black/12">
      {{ title }}
    </div>

    <div class="pa-5">
      <slot />
    </div>
  </div>
</template>
