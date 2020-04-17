<script lang="ts">
   import { Component } from '../../../core/decorators';
   import YBaseButton from '../YBaseButton';
   import YTemplateButton from '../YTemplateButton.vue';


   @Component({
      components: { YTemplateButton },
   })
   export default class YButtonConfirm extends YBaseButton {}
</script>


<template>
   <YTemplateButton
      class="y-button-confirm"
      :label="label"
      :is-disabled="isDisabledComputed"
      :is-loading="isLoadingComputed"
      :percentage="percentage"
      :spinner="spinner"
      @click="$emit('click')"
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
