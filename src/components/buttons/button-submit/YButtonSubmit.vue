<script lang="ts">
   import { Component } from '../../../core/decorators';
   import YBaseButtonSubmit from '../YBaseButtonSubmit';
   import YTemplateButton from '../YTemplateButton.vue';


   @Component({
      components: { YTemplateButton },
   })
   export default class YButtonSubmit extends YBaseButtonSubmit {}
</script>


<template>
   <YTemplateButton
      class="y-button-submit"
      :label="label"
      :is-disabled="isDisabledComputed"
      :is-loading="isLoading"
      :percentage="percentage"
      type="submit"
      :settings="settingsComputed"
      @click="$emit('click')"
   />
</template>


<style scoped lang="scss">
   .y-button-submit {
      min-width: 80px;
   }
</style>
