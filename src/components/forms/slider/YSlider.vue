<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import YBaseInputSlider from '../YBaseInputSlider';
   import YTemplateInputSlider from '../YTemplateInputSlider.vue';
   import { QSlider } from 'quasar';


   @Component({
      components: { QSlider, YTemplateInputSlider },
   })
   export default class YSlider extends YBaseInputSlider {

      @Prop({ default: 0 }) public value!: number;


      @Override
      public created() {
         this.initialValue = this.value;
      }


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
      class="y-slider"
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
      <QSlider
         :value="value"
         :min="minValue"
         :max="maxValue"
         :step="valueStep"
         :label-value="value + thumbSuffix"
         :label-always="isDirty || isReadonly"
         :markers="hasMarkers"
         :readonly="isReadonly"
         :disable="isDisabledComputed"
         :id="inputId"
         @input="onInput"
         ref="inputRef"
      />
   </YTemplateInputSlider>
</template>


<style scoped lang="scss">
   //@import '../../../css/variables';
</style>
