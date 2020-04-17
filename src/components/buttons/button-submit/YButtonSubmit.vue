<script lang="ts">
   import { Component } from '../../../core/decorators';
   import YBaseButton from '../YBaseButton';
   import YTemplateButton from '../YTemplateButton.vue';


   @Component({
      components: { YTemplateButton },
   })
   export default class YButtonSubmit extends YBaseButton {}
</script>


<template>
   <YTemplateButton
      class="y-button-submit"
      :label="label"
      :is-disabled="isDisabled"
      :is-loading="isLoading"
      :percentage="percentage"
      :spinner="spinner"
      type="submit"
      @click="$emit('click')"
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
