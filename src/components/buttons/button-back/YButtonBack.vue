<script lang="ts">
   import { Component, Prop } from '../../../core/decorators';
   import YBaseButtonLoading from '../YBaseButtonLoading';
   import YTemplateButton from '../YTemplateButton.vue';
   import { BackIcon, ButtonStyle } from '../../../core/enums';


   @Component({
      components: { YTemplateButton },
   })
   export default class YButtonBack extends YBaseButtonLoading {

      @Prop({ default: BackIcon.Android }) public backIcon!: BackIcon;
      @Prop({ default: ButtonStyle.Filled }) public buttonStyle!: ButtonStyle;
      @Prop({ default: false, type: Boolean }) public isSmall!: boolean;


      public get YBackIcon(): typeof BackIcon {
         return BackIcon;
      }


      public get classComputed() {
         return {
            'y-button-back': true,
            'is-ios': (this.backIcon === BackIcon.IOS),
            'is-small': this.isSmall,
         };
      }

   }
</script>


<template>
   <YTemplateButton
      :class="classComputed"
      :label="(backIcon === YBackIcon.IOS ? YLocale.buttonBack.label : undefined)"
      :is-round="(backIcon !== YBackIcon.IOS)"
      :is-disabled="isDisabledComputed"
      :icon="backIcon"
      :size="(isSmall ? 'sm' : 'md')"
      :button-style="buttonStyle"
      color="white"
      text-color="dark"
      :settings="settingsComputed"
      @click="onClick"
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   .y-button-back {
      /deep/ .q-icon {
         margin-right: 0;
      }

      &.is-ios {
         /deep/ .q-icon {
            margin-right: -0.3em;
         }

         &.is-small /deep/ .q-btn__wrapper {
            padding: 4px 8px;
         }
      }
   }
</style>
