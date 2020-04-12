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
         if (!this.isOptional) {
            this.innerError = (this.value.length > 0 ? '' : this.$locale.groupCheckbox.requiredError);
         }

         return !this.innerError;
      }


      public onInput(value: string[]) {
         if (!this.isOptional) {
            this.innerError = (value.length > 0 ? '' : this.$locale.groupCheckbox.requiredError);
         }

         this.updateValueProp(value);
      }

   }
</script>


<template>
   <div
      :class="{
         'y-base-input y-group-checkbox': true,
         'y-base-input--required': !isOptional,
         'text-negative': innerError,
      }"
   >
      <div
         :class="{
            ['y-base-input__fieldset bg-' + bgColor]: true,
            'y-base-input__fieldset--with-error': innerError,
            'y-base-input__fieldset--labeled': label,
            'y-base-input__fieldset--disabled': isDisabled,
            'y-base-input__fieldset--readonly': isReadonly,
         }"
      >
         <div v-if="label" :class="{ ['y-base-input__fieldset-label text-subtitle1 bg-' + bgColor]: true }">
            {{ finalLabel }}
         </div>

         <QOptionGroup
            :value="value"
            :options="options"
            :disable="isDisabled"
            :color="innerError ? 'negative' : undefined"
            :keep-color="innerError"
            type="checkbox"
            @input="onInput"
            @keydown="onKeyDown"
            ref="qOptionGroup"
         />
      </div>

      <div :class="{ 'y-base-input__error text-caption': true, 'y-base-input__error--visible': innerError }">
         {{ innerError }}
      </div>
   </div>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   .y-group-checkbox .y-base-input__fieldset-label {
      left: -8px;
   }
</style>
