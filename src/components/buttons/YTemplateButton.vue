<script lang="ts">
   import { Component, Prop, Vue } from '../../core/decorators';
   import {
      QBtn,
      QSpinner,
      QSpinnerBall,
      QSpinnerBars,
      QSpinnerCube,
      QSpinnerDots,
      QSpinnerFacebook,
      QSpinnerGears,
      QSpinnerGrid,
      QSpinnerHourglass,
      QSpinnerIos,
      QSpinnerOval,
      QSpinnerPie,
      QSpinnerRadio,
   } from 'quasar';
   import { Spinner } from './YBaseButton';


   @Component({
      components: {
         QBtn,
         QSpinner,
         QSpinnerBall,
         QSpinnerBars,
         QSpinnerCube,
         QSpinnerDots,
         QSpinnerFacebook,
         QSpinnerGears,
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
      @Prop({ default: 'button' }) public type!: string;
      @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
      @Prop({ default: false, type: Boolean }) public isLoading!: boolean;
      @Prop({ default: 0 }) public percentage!: number;
      @Prop({ default: 'primary' }) public color!: string;
      @Prop({ default: 'md' }) public size!: string;
      @Prop({ default: Spinner.Default }) public spinner!: Spinner;

   }
</script>


<template>
   <QBtn
      :label="label"
      :disable="isDisabled || isLoading"
      :loading="isLoading"
      :percentage="percentage"
      :type="type"
      :color="color"
      :size="size"
      :class="{ 'y-base-button': true, 'is-loading': isLoading }"
   >
      <template v-slot:loading>
         <QSpinner v-if="spinner === 'DEFAULT'"/>
         <QSpinnerHourglass v-if="spinner === 'HOURGLASS'"/>
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
