<script lang="ts">
   /**
    * Used when user needs to select one option from no more than 5.
    * If more than 5 options are required, use a select field instead.
    */

   import { Component, Mixins, Prop } from 'vue-property-decorator';
   import { QOptionGroup } from 'quasar';
   import YBaseInputGroup from '../YBaseInputGroup';


   @Component({
      components: { QOptionGroup },
   })
   export default class YGroupRadio extends Mixins(YBaseInputGroup) {

      /** Content props */
      @Prop({ default: null }) public value!: string | null;

      /** Handle value change */
      public onInput(value: string) {
         // check if required
         if (this.isRequired) {
            this.innerError = (value ? '' : this.$locale.all.required);
         }

         this.updateValueProp(value);
      }

      /** Check value and update error */
      public validate() {
         // check if required
         if (this.isRequired) {
            this.innerError = (this.value ? '' : this.$locale.all.required);
         }
         return !this.innerError;
      }

   }
</script>


<template>
   <div :class="{
		'y-input-box y-group-radio': true,
		'y-input-box--required': isRequired,
		'y-input-spacing': hasSpacing,
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

         <QOptionGroup
            @input="onInput"
            @keydown="onKeyDown"
            :value="value"
            :options="options"
            :disable="isDisabled"
            :color="innerError ? 'negative' : undefined"
            :keep-color="!!innerError"
            ref="qOptionGroup"
            type="radio"
         />
      </div>

      <div :class="{ 'y-form-box__error text-caption': true, 'y-form-box__error--visible': innerError }">
         {{ innerError }}
      </div>
   </div>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   .y-group-radio .y-form-box__label {
      left: -4px;
   }
</style>
