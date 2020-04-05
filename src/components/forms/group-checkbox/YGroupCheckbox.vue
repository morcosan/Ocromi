<script lang="ts">
   import { Component, Mixins, Override, Prop } from '../../../core/decorators';
   import { QOptionGroup } from 'quasar';
   import YBaseInputGroup from '../YBaseInputGroup';


   @Component({
      components: { QOptionGroup },
   })
   export default class YGroupCheckbox extends Mixins(YBaseInputGroup) {

      @Prop({ default: () => [] }) public value!: string[];


      @Override
      public validate() {
         if (this.isRequired) {
            this.innerError = (this.value.length > 0 ? '' : this.$locale.all.required);
         }

         return !this.innerError;
      }


      public onInput(value: string[]) {
         if (this.isRequired) {
            this.innerError = (value.length > 0 ? '' : this.$locale.all.required);
         }

         this.updateValueProp(value);
      }

   }
</script>


<template>
   <div :class="{
		'y-input-box y-group-checkbox': true,
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
