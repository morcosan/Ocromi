<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import YBaseInputSlider, { Range } from '../YBaseInputSlider';
   import YTemplateInputSlider from '../YTemplateInputSlider.vue';
   import { QRange } from 'quasar';


   @Component({
      components: { QRange, YTemplateInputSlider },
   })
   export default class YSliderRange extends YBaseInputSlider {

      @Prop({ default: () => ({ min: 0, max: 0 }) }) public value!: Range;
      @Prop({ default: false, type: Boolean }) public isFixed!: number;


      public labelElements: HTMLElement[] = []; // bug: Range labels are different from model


      @Override
      public created() {
         this.initialValue = this.value;
      }


      @Override
      public mounted() {
         if (this.$refs.inputRef) {
            // @ts-ignore
            if (this.$refs.inputRef.$el.querySelectorAll) {
               // @ts-ignore
               this.labelElements = this.$refs.inputRef.$el.querySelectorAll('.q-slider__pin-text');
            }
         }
      }


      @Override
      public focus() {
         // @ts-ignore
         this.$refs.inputRef.$el.querySelector('[tabindex]').focus();
      }


      public onInput(value: Range) {
         // limit decimals when no steps
         if (this.valueStep === 0 && this.stepDecimals > 0) {
            const tens = 10 ** this.stepDecimals;
            value.min = Math.round(value.min * tens) / tens;
            value.max = Math.round(value.max * tens) / tens;

            // bug fix: update text manually, fail gracefully
            if (this.labelElements.length === 2) {
               this.labelElements[0].innerHTML = String(value.min);
               this.labelElements[1].innerHTML = String(value.max);
            }
         }

         this.isDirty = true;
         this.innerError = '';
         this.updateValueProp(value);
      }

   }
</script>


<template>
   <YTemplateInputSlider
      class="y-slider-range"
      :is-mini="isMiniComputed"
      :side-label-width="sideLabelWidthComputed"
      :label="labelComputed"
      :error="errorComputed"
      :is-disabled="isDisabledComputed"
      :is-readonly="isReadonly"
      :min-value="minValue"
      :max-value="maxValue"
      :bg-color="bgColor"
      :input-id="inputId"
   >
      <QRange
         :value="value"
         :min="minValue"
         :max="maxValue"
         :step="valueStep"
         :left-label-value="value.min + thumbSuffix"
         :right-label-value="value.max + thumbSuffix"
         :markers="hasMarkers"
         :readonly="isReadonly"
         :disable="isDisabledComputed"
         :label-always="isDirty || isReadonly"
         :drag-only-range="isFixed"
         drag-range
         :id="inputId"
         @input="onInput"
         ref="inputRef"
      />
   </YTemplateInputSlider>
</template>


<style scoped lang="scss">
   // no css yet
</style>
