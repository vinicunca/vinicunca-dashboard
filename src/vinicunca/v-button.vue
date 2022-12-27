<script lang="ts" setup>
defineProps({
  icon: Boolean,
  variant: String,
  color: String,
  size: String,
  outlined: Boolean,
});
</script>

<template>
  <VinButton
    :root-class="[
      `
        items-center
        rounded-1
        inline-grid
        grid-areas-[prepend_content_append]
        grid-cols-[max-content_auto_max-content]
        font-500
        justify-center
        tracking-button
        leading-[normal]
        max-w-full
        outline-none
        relative
        no-underline
        indent-button
        uppercase
        transition-opacity,box-shadow,transform,background-color-280
        select-none
        align-middle
        shrink-0

        [--vin-height:36px]
        text-[0.875rem]
        min-w-[64px]
        px-4

        vin-elevation-2

        h-$vin-height

        hover:(vin-elevation-4)
        active:(vin-elevation-8)

      `,
      icon ? `uno-layer-variants:(w-[calc(var(--vin-height)+12px)] h-[calc(var(--vin-height)+12px)] rounded-full px-0 text-base min-w-0)`
      : ''
    ]"
    content-class="flex items-center justify-center whitespace-nowrap"
    disabled-class="uno-layer-variants:(bg-$vin-disable-bg-color text-$vin-disable-color border-$vin-disable-border-color) cursor-not-allowed uno-layer-variants:hover:(bg-$vin-disable-bg-color text-$vin-disable-color border-$vin-disable-border-color)"
    v-bind="$attrs"
  >
    <slot />
  </VinButton>
</template>
