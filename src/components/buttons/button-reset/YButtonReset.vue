<script lang="ts">
   import { Component } from '../../../core/decorators';
   import YBaseButtonReset from '../YBaseButtonReset';
   import YTemplateButton from '../YTemplateButton.vue';


   @Component({
      components: { YTemplateButton },
   })
   export default class YButtonSubmit extends YBaseButtonReset {}
</script>


<template>
   <YTemplateButton
      class="y-button-reset"
      :label="label"
      :is-disabled="isDisabledComputed"
      type="reset"
      is-text-only
      @click="$emit('click')"
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   .y-button-reset {
      margin: 0 12px;
   }
</style>
