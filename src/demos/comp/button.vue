<script lang="ts" setup>
import AppCard from '~~/app/components/app-card.vue';
import VButton from '~~/vinicunca/v-button.vue';

const buttons = [
  {
    title: 'Default',
    types: [
      { text: 'Default', class: 'vin-button' },
      { text: 'Primary', class: 'vin-button--[brand-primary]' },
      { text: 'Secondary', class: 'vin-button--[brand-secondary]' },
      { text: 'Error', class: 'vin-button--[brand-error]' },
      { text: 'Warning', class: 'vin-button--[brand-warning]' },
      { text: 'Success', class: 'vin-button--[brand-success]' },
      { text: 'Default', class: 'vin-button', disabled: true },
      { text: 'Primary', class: 'vin-button--[brand-primary]', disabled: true },
    ],
  },
  {
    title: 'Outline',
    types: [
      { text: 'Default', class: 'vin-button--[outline]' },
      { text: 'Primary', class: 'vin-button--[brand-primary outline]' },
      { text: 'Secondary', class: 'vin-button--[brand-secondary outline]' },
      { text: 'Error', class: 'vin-button--[brand-error outline]' },
      { text: 'Warning', class: 'vin-button--[brand-warning outline]' },
      { text: 'Success', class: 'vin-button--[brand-success outline]' },
      { text: 'Default', class: 'vin-button--[outline]', disabled: true },
      { text: 'Primary', class: 'vin-button--[brand-primary outline]', disabled: true },
    ],
  },
  {
    title: 'Text',
    types: [
      { text: 'Default', class: 'vin-button--[text]' },
      { text: 'Primary', class: 'vin-button--[brand-primary text]' },
      { text: 'Secondary', class: 'vin-button--[brand-secondary text]' },
      { text: 'Error', class: 'vin-button--[brand-error text]' },
      { text: 'Warning', class: 'vin-button--[brand-warning text]' },
      { text: 'Success', class: 'vin-button--[brand-success text]' },
      { text: 'Default', class: 'vin-button--[text]', disabled: true },
      { text: 'Primary', class: 'vin-button--[brand-primary text]', disabled: true },
    ],
  },
  {
    title: 'Block',
    types: [
      { text: 'Default', class: 'vin-button w-full' },
      { text: 'Success', class: 'vin-button w-full' },
    ],
  },
  {
    title: 'Sizes',
    types: [
      { text: 'Primary', class: 'vin-button--[brand-primary x-small]' },
      { text: 'Secondary', class: 'vin-button--[brand-secondary small]' },
      { text: 'Error', class: 'vin-button--[brand-error]' },
      { text: 'Warning', class: 'vin-button--[brand-warning large]' },
      { text: 'Success', class: 'vin-button--[brand-success x-large]' },
    ],
  },
];
</script>

<template>
  <div class="vin-grid p-8">
    <div v-for="button in buttons" :key="button.title" class="g-col-12 lg:g-col-6">
      <AppCard :title="button.title">
        <div class="flex flex-wrap gap-2 items-center">
          <VButton
            v-for="btn in button.types"
            :key="btn.text"
            :class="btn.class"
            :disabled="btn.disabled"
          >
            {{ btn.text }}
          </VButton>
        </div>
      </AppCard>
    </div>

    <div class="g-col-12 lg:g-col-6">
      <AppCard title="Icons">
        <div class="flex flex-wrap gap-2 items-center">
          <VButton circle class="vin-button">
            <span name="i-carbon:settings" class="i-carbon:settings text-2xl" />
          </VButton>

          <VButton circle class="vin-button--[brand-primary outline]">
            <span name="i-carbon:workspace" class="i-carbon:workspace text-2xl" />
          </VButton>
        </div>
      </AppCard>
    </div>
  </div>
</template>
