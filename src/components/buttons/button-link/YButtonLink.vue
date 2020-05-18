<script lang="ts">
   import { Component, Prop } from '../../../core/decorators';
   import YBaseButtonLoading from '../YBaseButtonLoading';
   import YTemplateButton from '../YTemplateButton.vue';
   import { ButtonStyle } from '../../../core/enums';


   @Component({
      components: { YTemplateButton },
   })
   export default class YButtonLink extends YBaseButtonLoading {

      @Prop({ default: '' }) public url!: string;
      @Prop({ default: ButtonStyle.Filled }) public buttonStyle!: ButtonStyle;

   }
</script>


<template>
   <YTemplateButton
      class="y-button-link"
      :label="label"
      :is-disabled="isDisabledComputed"
      icon-on-right="open_in_new"
      :button-style="buttonStyle"
      :href="url"
      type="a"
      rel="noopener"
      target="_blank"
      :settings="settingsComputed"
      @click="onClick"
   />
</template>


<style scoped lang="scss">
   // make it fit with text
   .y-button-link.q-btn--flat /deep/ .q-btn__wrapper {
      padding: 4px 8px;
   }
</style>
