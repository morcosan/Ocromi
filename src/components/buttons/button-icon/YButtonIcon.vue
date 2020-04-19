<script lang="ts">
   import { Component, Prop } from '../../../core/decorators';
   import YBaseButtonLoading from '../YBaseButtonLoading';
   import YTemplateButton from '../YTemplateButton.vue';
   import { ButtonStyle, IconSize } from '../../../core/enums';


   @Component({
      components: { YTemplateButton },
   })
   export default class YButtonIcon extends YBaseButtonLoading {

      @Prop({ default: 'favorite' }) public iconId!: string;
      @Prop({ default: IconSize.Medium }) public iconSize!: IconSize;
      @Prop({ default: ButtonStyle.Filled }) public buttonStyle!: ButtonStyle;

   }
</script>


<template>
   <YTemplateButton
      class="y-button-confirm"
      :is-disabled="isDisabledComputed"
      :is-loading="isLoading"
      :percentage="percentage"
      :icon="iconId"
      :size="iconSize"
      :button-style="buttonStyle"
      is-round
      :settings="settingsComputed"
      @click="onClick"
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
