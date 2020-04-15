<script lang="ts">
   import { Component, Mixins, Prop } from '../../../core/decorators';
   import YMixinInputSlider from '../YMixinInputSlider';
   import { QSlider } from 'quasar';


   @Component({
      components: { QSlider },
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
   <div
      :class="{
         'y-base-input y-base-slider y-slider': true,
         'y-base-input--required': !isOptional,
         'text-negative': innerError,
      }"
   >
      <div
         :class="{
            ['y-base-input__fieldset bg-' + bgColor]: true,
            'has-error': innerError,
            'has-label': label,
            'is-disabled': isDisabled,
            'is-readonly': isReadonly,
         }"
      >
         <div v-if="label" :class="{ ['y-base-input__fieldset-label text-subtitle1 bg-' + bgColor]: true }">
            {{ finalLabel }}
         </div>

         <div class="y-slider__min-max text-caption">
            <div class="y-slider__min">{{ minValue }}</div>
            <div class="y-slider__max">{{ maxValue }}</div>
         </div>

         <QSlider
            :value="value"
            :min="minValue"
            :max="maxValue"
            :step="valueStep"
            :label="label"
            :label-value="value + thumbSuffix"
            :markers="hasMarkers"
            :readonly="isReadonly"
            :disable="isDisabled"
            :label-always="isDirty || isDisabled || isReadonly"
            @input="onInput"
            ref="qSlider"
         />
      </div>

      <div :class="{ 'y-base-input__error text-caption': true, 'is-visible': innerError }">
         {{ innerError }}
      </div>
   </div>
</template>


<style scoped lang="scss">
   //@import '../../../css/variables';
</style>
