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
      :is-loading="isLoadingComputed"
      :percentage="percentage"
      :spinner="spinner"
      type="submit"
      @click="$emit('click')"
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   .y-button-submit {
      margin-top: 40px;
   }
</style>
