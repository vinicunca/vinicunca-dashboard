<script lang="ts" setup>
const DRAWER_POSITION: Record<string, string> = {
  bottom: 'left-0',
  left: 'top-0 left-0 right-auto',
  right: 'top-0 right-0 left-auto',
};

function getRootClass(_, context) {
  let classPosition = '';
  let classSticky = 'h-full transition-box-shadow,transform,visibility,width,left,right,top,bottom';

  if (context.position) {
    classPosition = DRAWER_POSITION[context.position as string];
  }

  if (context.sticky) {
    classSticky = 'h-auto transition-box-shadow,transform,visibility,width,height,left,right';
  }

  return `flex flex-col max-w-full pointer-events-auto absolute duration-200 will-change-transform border-black ${classSticky} ${classPosition}`;
}
</script>

<template>
  <VinDrawer
    :root-class="getRootClass"
    content-class="flex-[0_1_auto] h-full max-w-full overflow-x-hidden overflow-y-auto"
    scrim-class="absolute w-full h-full bg-black opacity-20 transition-opacity-200 z-1"
    temporary-class="vin-elevation-16"
  >
    <template v-for="(_, slot) of $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope || {}" />
    </template>
  </VinDrawer>
</template>
