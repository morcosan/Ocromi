<script lang="ts">
   /**
    * Used when user needs to choose one value from a spectrum.
    */

   import { Component, Mixins, Prop } from 'vue-property-decorator';
   import YBaseFormSlider from '../../mixins/YBaseFormSlider';
   import { QSlider } from 'quasar';


   @Component({
      components: { QSlider },
   })
   export default class YSlider extends Mixins(YBaseFormSlider) {

      /** Content props */
      @Prop({ default: 0 }) public value!: number;

      /** Limit the decimals when no steps */
      public onInput(value: number) {
         // limit decimals
         if (this.valueStep === 0 && this.stepDecimals > 0) {
            const tens = 10 ** this.stepDecimals;
            value = Math.round(value * tens) / tens;
         }

         // update
         this.$emit('input', value);

         // mark as dirty and without error
         this.isDirty = true;
         this.innerError = '';
      }

   }
</script>


<template>
   <div :class="{
		'y-form-box y-slider-base y-slider': true,
		'y-form-box--required': isRequired,
		'y-form-control-spacing': hasSpacing,
		'text-negative': innerError,
	}">
      <div :class="{
			['y-form-box__fieldset bg-' + bgColor]: true,
			'y-form-box__fieldset--with-error': innerError,
			'y-form-box__fieldset--labeled': !!label,
			'y-form-box__fieldset--disabled': isDisabled,
			'y-form-box__fieldset--readonly': isReadonly,
		}">
         <div v-if="!!label" :class="{ ['y-form-box__label text-subtitle1 bg-' + bgColor]: true }">
            {{ isRequired ? (label + ' *') : label }}
         </div>

         <div class="y-slider__min-max text-caption">
            <div class="y-slider__min">{{ minValue }}</div>
            <div class="y-slider__max">{{ maxValue }}</div>
         </div>

         <QSlider
            @input="onInput"
            :value="value"
            :min="minValue"
            :max="maxValue"
            :step="valueStep"
            :label="!!label"
            :label-value="value + thumbSuffix"
            :markers="hasMarkers"
            :readonly="isReadonly"
            :disable="isDisabled"
            :label-always="isDirty || isDisabled || isReadonly"
            ref="qSlider"
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
