<script lang="ts">
   /**
    * Used when user needs to select multiple options, no more than 5.
    * If more than 5 options are required, use a multiselect field instead.
    */

   import { Component, Mixins, Prop } from 'vue-property-decorator';
   import { QOptionGroup } from 'quasar';
   import YBaseFormGroup from '../../mixins/YBaseFormGroup';


   @Component({
      components: { QOptionGroup },
   })
   export default class YGroupCheckbox extends Mixins(YBaseFormGroup) {

      /** Content props */
      @Prop({ default: () => [] }) public value!: string[];

      /** Handle value change */
      public onInput(value: string[]) {
         // check if required
         if (this.isRequired) {
            this.innerError = (value.length > 0 ? '' : this.$locale.all.required);
         }
         // change value
         this.$emit('input', value);
      }

      /** Check value and update error */
      public validate() {
         // check if required
         if (this.isRequired) {
            this.innerError = (this.value.length > 0 ? '' : this.$locale.all.required);
         }
         return !this.innerError;
      }

   }
</script>


<template>
   <div :class="{
		'y-form-box y-group-checkbox': true,
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

         <QOptionGroup
            @input="onInput"
            @keydown="onKeyDown"
            :value="value"
            :options="options"
            :disable="isDisabled"
            :color="innerError ? 'negative' : undefined"
            :keep-color="!!innerError"
            ref="qOptionGroup"
            type="checkbox"
         />
      </div>

      <div :class="{ 'y-form-box__error text-caption': true, 'y-form-box__error--visible': innerError }">
         {{ innerError }}
      </div>
   </div>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   .y-group-checkbox .y-form-box__label {
      left: -8px;
   }
</style>
