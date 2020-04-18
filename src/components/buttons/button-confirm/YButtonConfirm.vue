<script lang="ts">
   import { Component } from '../../../core/decorators';
   import YBaseButtonLoading from '../YBaseButtonLoading';
   import YTemplateButton from '../YTemplateButton.vue';


   @Component({
      components: { YTemplateButton },
   })
   export default class YButtonConfirm extends YBaseButtonLoading {}
</script>


<template>
   <YTemplateButton
      class="y-button-confirm"
      :label="label"
      :is-disabled="isDisabledComputed"
      :is-loading="isLoading"
      :percentage="percentage"
      :spinner="spinner"
      @click="onClick"
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
