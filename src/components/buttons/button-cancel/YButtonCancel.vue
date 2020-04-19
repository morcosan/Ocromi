<script lang="ts">
   import { Component } from '../../../core/decorators';
   import YBaseButton from '../YBaseButton';
   import YTemplateButton from '../YTemplateButton.vue';


   @Component({
      components: { YTemplateButton },
   })
   export default class YButtonCancel extends YBaseButton {}
</script>


<template>
   <YTemplateButton
      class="y-button-cancel"
      :label="label"
      is-text-only
      :settings="settingsComputed"
      @click="$emit('click')"
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
