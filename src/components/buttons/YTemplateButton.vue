<script lang="ts">
   import { Component, Prop, Vue } from '../../core/decorators';
   import {
      QBtn,
      QSpinner,
      QSpinnerBars,
      QSpinnerCube,
      QSpinnerDots,
      QSpinnerFacebook,
      QSpinnerGrid,
      QSpinnerHourglass,
      QSpinnerIos,
      QSpinnerOval,
      QSpinnerPie,
      QSpinnerRadio,
   } from 'quasar';
   import { Settings, Spinner } from '../../core/settings';


   @Component({
      components: {
         QBtn,
         QSpinner,
         QSpinnerBars,
         QSpinnerCube,
         QSpinnerDots,
         QSpinnerFacebook,
         QSpinnerGrid,
         QSpinnerHourglass,
         QSpinnerIos,
         QSpinnerOval,
         QSpinnerPie,
         QSpinnerRadio,
      },
   })
   export default class YTemplateButton extends Vue {

      @Prop({ default: '' }) public label!: string;
      @Prop({ default: 'md' }) public size!: string;
      @Prop({ default: 0 }) public percentage!: number;
      @Prop({ default: 'button' }) public type!: string;
      @Prop({ default: 'primary' }) public color!: string;
      @Prop({ default: '' }) public icon!: string;
      @Prop({ default: () => {} }) public settings!: Settings;
      @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
      @Prop({ default: false, type: Boolean }) public isLoading!: boolean;
      @Prop({ default: false, type: Boolean }) public isSecondary!: boolean;


      public get button() {
         if (this.settings.button) {
            return this.settings.button;
         }
         return {};
      }

   }
</script>


<template>
   <QBtn
      :class="{ 'y-base-button': true, 'is-loading': isLoading }"
      :label="label"
      :disable="isDisabled || isLoading"
      :loading="isLoading"
      :percentage="percentage"
      :type="type"
      :color="(isDisabled ? 'grey-6' : color)"
      :size="size"
      :icon="(icon ? icon : undefined)"
      :flat="(isSecondary && button.duoStyle === YDuoStyle.FilledText)"
      :outline="(isSecondary && button.duoStyle === YDuoStyle.FilledOutlined)"
      :no-caps="!button.isUppercase"
      :rounded="button.isRounded"
      :unelevated="settings.design === YDesign.Flat"
      :ripple="settings.design === YDesign.Material"
      @click="$emit('click')"
   >
      <template v-slot:loading>
         <QSpinner v-if="button.spinner === YSpinner.Default"/>
         <QSpinnerBars v-if="button.spinner === YSpinner.Bars"/>
         <QSpinnerCube v-if="button.spinner === YSpinner.Cube"/>
         <QSpinnerDots v-if="button.spinner === YSpinner.Dots"/>
         <QSpinnerFacebook v-if="button.spinner === YSpinner.Facebook"/>
         <QSpinnerGrid v-if="button.spinner === YSpinner.Grid"/>
         <QSpinnerHourglass v-if="button.spinner === YSpinner.Hourglass"/>
         <QSpinnerIos v-if="button.spinner === YSpinner.IOS"/>
         <QSpinnerOval v-if="button.spinner === YSpinner.Circle"/>
         <QSpinnerPie v-if="button.spinner === YSpinner.Pie"/>
         <QSpinnerRadio v-if="button.spinner === YSpinner.Radio"/>
      </template>
   </QBtn>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   // when loading, button should look normal
   .y-base-button.is-loading {
      opacity: 1 !important;
   }
</style>
