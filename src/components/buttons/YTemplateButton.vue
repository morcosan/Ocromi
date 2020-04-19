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
   import { Spinner } from './YBaseButtonLoading';


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
      @Prop({ default: Spinner.Default }) public spinner!: Spinner;
      @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
      @Prop({ default: false, type: Boolean }) public isLoading!: boolean;
      @Prop({ default: false, type: Boolean }) public isOutlined!: boolean;
      @Prop({ default: false, type: Boolean }) public isTextOnly!: boolean;

      created() {
         console.log(this.YSettings);
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
      :flat="isTextOnly"
      :outline="isOutlined"
      @click="$emit('click')"
   >
      <template v-slot:loading>
         <QSpinner v-if="spinner === 'DEFAULT'"/>
         <QSpinnerBars v-if="spinner === 'BARS'"/>
         <QSpinnerCube v-if="spinner === 'CUBE'"/>
         <QSpinnerDots v-if="spinner === 'DOTS'"/>
         <QSpinnerFacebook v-if="spinner === 'FACEBOOK'"/>
         <QSpinnerGrid v-if="spinner === 'GRID'"/>
         <QSpinnerHourglass v-if="spinner === 'HOURGLASS'"/>
         <QSpinnerIos v-if="spinner === 'IOS'"/>
         <QSpinnerOval v-if="spinner === 'CIRCLE'"/>
         <QSpinnerPie v-if="spinner === 'PIE'"/>
         <QSpinnerRadio v-if="spinner === 'RADIO'"/>
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
