<script lang="ts" setup>
import AppCard from '~~/app/components/app-card.vue';
import VButton from '~~/vinicunca/v-button.vue';
</script>

<template>
  <div class="vin-grid p-8">
    <div class="g-col-12 lg:g-col-6">
      <AppCard title="Default">
        <div class="flex flex-wrap gap-2">
          <VButton class="vin-button">
            Default
          </VButton>
          <VButton class="vin-button-brand-primary">
            Primary
          </VButton>
          <VButton class="vin-button-brand-secondary">
            Secondary
          </VButton>
          <VButton class="vin-button-brand-error">
            Error
          </VButton>
          <VButton class="vin-button-brand-warning">
            Warning
          </VButton>
          <VButton class="vin-button-brand-success">
            Success
          </VButton>
          <VButton class="vin-button-brand-primary" disabled>
            Disabled
          </VButton>
        </div>
      </AppCard>
    </div>

    <div class="g-col-12 lg:g-col-6">
      <AppCard title="Outline">
        <div class="flex flex-wrap gap-2">
          <VButton class="vin-button-outline-brand-primary">
            Primary
          </VButton>
          <VButton class="vin-button-outline-brand-secondary">
            Secondary
          </VButton>
          <VButton class="vin-button-outline-brand-error">
            Error
          </VButton>
          <VButton class="vin-button-outline-brand-warning">
            Warning
          </VButton>
          <VButton class="vin-button-outline-brand-success">
            Success
          </VButton>
          <VButton class="vin-button-outline-brand-primary" disabled>
            Disabled
          </VButton>
        </div>
      </AppCard>
    </div>

    <div class="g-col-12 lg:g-col-6">
      <AppCard title="Block">
        <div class="flex flex-wrap gap-2">
          <VButton class="w-full">
            Success
          </VButton>
          <VButton class="w-full" disabled>
            Disabled
          </VButton>
        </div>
      </AppCard>
    </div>

    <div class="g-col-12 lg:g-col-6">
      <AppCard title="Sizes">
        <div class="flex flex-wrap items-center gap-2">
          <VButton class="vin-button-brand-primary vin-button--x-small">
            Primary
          </VButton>
          <VButton class="vin-button-brand-secondary vin-button--small">
            Secondary
          </VButton>
          <VButton class="vin-button-brand-error">
            Error
          </VButton>
          <VButton class="vin-button-brand-warning vin-button--large">
            Warning
          </VButton>
          <VButton class="vin-button-brand-success vin-button--x-large">
            Success
          </VButton>
        </div>
      </AppCard>
    </div>

    <div class="g-col-12 lg:g-col-6">
      <AppCard title="Icon">
        <div class="flex flex-wrap items-center gap-2">
          <VButton icon class="vin-button-brand-primary">
            <VinIcon name="i-carbon:settings" class="text-2xl" />
          </VButton>
          <VButton icon color="#1976D2">
            <VinIcon name="i-carbon:workspace" class="text-2xl" />
          </VButton>
        </div>
      </AppCard>
    </div>
  </div>
</template>
