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


      public get buttonSettings() {
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
      :flat="(isSecondary && buttonSettings.duoStyle === 'FILLED_TEXT')"
      :outline="(isSecondary && buttonSettings.duoStyle === 'FILLED_OUTLINED')"
      :no-caps="!buttonSettings.isUppercase"
      :rounded="buttonSettings.isRounded"
      :unelevated="settings.design === 'FLAT'"
      :ripple="settings.design !== 'FLAT'"
      @click="$emit('click')"
   >
      <template v-slot:loading>
         <QSpinner v-if="buttonSettings.spinner === 'DEFAULT'"/>
         <QSpinnerBars v-if="buttonSettings.spinner === 'BARS'"/>
         <QSpinnerCube v-if="buttonSettings.spinner === 'CUBE'"/>
         <QSpinnerDots v-if="buttonSettings.spinner === 'DOTS'"/>
         <QSpinnerFacebook v-if="buttonSettings.spinner === 'FACEBOOK'"/>
         <QSpinnerGrid v-if="buttonSettings.spinner === 'GRID'"/>
         <QSpinnerHourglass v-if="buttonSettings.spinner === 'HOURGLASS'"/>
         <QSpinnerIos v-if="buttonSettings.spinner === 'IOS'"/>
         <QSpinnerOval v-if="buttonSettings.spinner === 'CIRCLE'"/>
         <QSpinnerPie v-if="buttonSettings.spinner === 'PIE'"/>
         <QSpinnerRadio v-if="buttonSettings.spinner === 'RADIO'"/>
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
