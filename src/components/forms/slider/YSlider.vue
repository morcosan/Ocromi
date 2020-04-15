<script lang="ts">
   import { Component, Mixins, Prop } from '../../../core/decorators';
   import YMixinInputSlider from '../YMixinInputSlider';
   import YTemplateInputSlider from '../YTemplateInputSlider.vue';
   import { QSlider } from 'quasar';


   @Component({
      components: { QSlider, YTemplateInputSlider },
   })
   export default class YSlider extends Mixins(YMixinInputSlider) {

      @Prop({ default: 0 }) public value!: number;


      public onInput(value: number) {
         // limit decimals when no steps
         if (this.valueStep === 0 && this.stepDecimals > 0) {
            const tens = 10 ** this.stepDecimals;
            value = Math.round(value * tens) / tens;
         }

         this.isDirty = true;
         this.innerError = '';
         this.updateValueProp(value);
      }

   }
</script>


<template>
   <YTemplateInputSlider
      class-name="y-slider"
      :is-mini="isMini"
      :side-label-width="sideLabelWidth"
      :final-label="finalLabel"
      :final-error="finalError"
      :is-disabled="isDisabled"
      :is-readonly="isReadonly"
      :min-value="minValue"
      :max-value="maxValue"
      :bg-color="bgColor"
   >
      <QSlider
         :value="value"
         :min="minValue"
         :max="maxValue"
         :step="valueStep"
         :label-value="value + thumbSuffix"
         :label-always="isDirty || isDisabled || isReadonly"
         :markers="hasMarkers"
         :readonly="isReadonly"
         :disable="isDisabled"
         @input="onInput"
         ref="qSlider"
      />
   </YTemplateInputSlider>
</template>


<style scoped lang="scss">
   //@import '../../../css/variables';
</style>
