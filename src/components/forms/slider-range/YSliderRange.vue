<script lang="ts">
   import { Component, Mixins, Override, Prop } from '../../../core/decorators';
   import YBaseInputSlider, { Range } from '../YBaseInputSlider';
   import { QRange } from 'quasar';


   @Component({
      components: { QRange },
   })
   export default class YSliderRange extends Mixins(YBaseInputSlider) {

      @Prop({ default: () => ({ min: 0, max: 0 }) }) public value!: Range;
      @Prop({ default: false, type: Boolean }) public isFixed!: number;


      public labelElems: HTMLElement[] = []; // bug: Range labels are different from model


      @Override
      public mounted() {
         if (this.$refs.qRange) {
            // @ts-ignore
            if (this.$refs.qRange.$el.querySelectorAll) {
               // @ts-ignore
               this.labelElems = this.$refs.qRange.$el.querySelectorAll('.q-slider__pin-text');
            }
         }
      }


      public onInput(value: Range) {
         // limit decimals when no steps
         if (this.valueStep === 0 && this.stepDecimals > 0) {
            const tens = 10 ** this.stepDecimals;
            value.min = Math.round(value.min * tens) / tens;
            value.max = Math.round(value.max * tens) / tens;

            // bug fix: update text manually, fail gracefully
            if (this.labelElems.length === 2) {
               this.labelElems[0].innerHTML = String(value.min);
               this.labelElems[1].innerHTML = String(value.max);
            }
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
         'y-input-box y-slider-base y-slider-range': true,
         'y-input-box--required': !isOptional,
         'y-input-spacing': hasSpacing,
         'text-negative': innerError,
      }"
   >
      <div
         :class="{
            ['y-form-box__fieldset bg-' + bgColor]: true,
            'y-form-box__fieldset--with-error': innerError,
            'y-form-box__fieldset--labeled': !!label,
            'y-form-box__fieldset--disabled': isDisabled,
            'y-form-box__fieldset--readonly': isReadonly,
         }"
      >
         <div v-if="!!label" :class="{ ['y-form-box__label text-subtitle1 bg-' + bgColor]: true }">
            {{ finalLabel }}
         </div>

         <div class="y-slider__min-max text-caption">
            <div class="y-slider__min">{{ minValue }}</div>
            <div class="y-slider__max">{{ maxValue }}</div>
         </div>

         <QRange
            :value="value"
            :min="minValue"
            :max="maxValue"
            :step="valueStep"
            :label="!!label"
            :left-label-value="value.min + thumbSuffix"
            :right-label-value="value.max + thumbSuffix"
            :markers="hasMarkers"
            :readonly="isReadonly"
            :disable="isDisabled"
            :label-always="isDirty || isDisabled || isReadonly"
            :drag-only-range="isFixed"
            drag-range
            @input="onInput"
            ref="qRange"
         />
      </div>

      <div :class="{ 'y-form-box__error text-caption': true, 'y-form-box__error--visible': innerError }">
         {{ innerError }}
      </div>
   </div>
</template>


<style scoped lang="scss">
   //@import '../../../css/variables';
</style>
