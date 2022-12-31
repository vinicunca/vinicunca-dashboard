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
  {
    title: 'Icon',
    types: [
      { text: 'Default', class: 'vin-button w-full' },
      { text: 'Success', class: 'vin-button w-full' },
    ],
  },
];
</script>

<template>
  <div class="vin-grid p-8">
    <div v-for="button in buttons" :key="button.title" class="g-col-12 lg:g-col-6">
      <AppCard :title="button.title">
        <div class="flex flex-wrap gap-2 items-center">
          <VButton v-for="btn in button.types" :key="btn.text" :class="btn.class">
            {{ btn.text }}
          </VButton>
        </div>
      </AppCard>
    </div>
  </div>
</template>
