<script lang="ts">
   import { Component, Mixins, Override, Prop, Watch } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import { QInput } from 'quasar';


   @Component({
      components: { QInput },
   })
   export default class YFieldText extends Mixins(YBaseInputField) {

      @Prop({ default: '' }) public value!: string;


      public isDirty: boolean = false;
      public innerError: string = '';


      @Watch('value')
      public onChange_value() {
         if (this.isDirty) {
            this.validate();
         }
      }


      @Override
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: string) => (value || this.$locale.all.requiredError));
         }

         return rules;
      }


      public get hasError() {
         return !!(this.error || this.innerError);
      }


      @Override
      public validate() {
         this.isDirty = true;

         for (let i = 0; i < this.finalRules.length; i++) {
            const result: (boolean | string) = this.finalRules[i](this.value);
            if (result === true) {
               this.innerError = '';
            }
            else {
               this.innerError = (result as string);
               break;
            }
         }

         return !this.innerError;
      }


      @Override
      public resetValidation() {
         this.isDirty = false;
         this.innerError = '';
      }

   }
</script>


<template>
   <label
      :class="{
         'y-base-input y-field-text': true,
         'y-base-input--side-labeled': sideLabelWidth,
         'y-base-input--with-error': hasError,
      }"
   >
      <span
         v-if="!isMini"
         :style="(!isMini ? `width: ${ sideLabelWidth }` : undefined)"
         class="y-base-input__label text-body1"
      >
         {{ finalLabel }}
      </span>

      <span class="y-base-input__control-box">
         <QInput
            :value="value"
            :label="isMini ? finalLabel : undefined"
            :placeholder="finalPlaceholder"
            :readonly="isReadonly"
            :disable="isDisabled"
            :bg-color="bgColor"
            :error="hasError"
            type="text"
            outlined
            lazy-rules
            hide-bottom-space
            @input="updateValueProp($event)"
            @blur="validate"
            ref="qField"
         />

         <span v-if="!hasError && hint" class="y-base-input__hint text-caption text-grey-6">
            {{ hint }}
         </span>

         <span :class="{ 'y-base-input__error text-caption': true, 'y-base-input__error--visible': hasError }">
            {{ error || innerError }}
         </span>
      </span>
   </label>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   .y-base-input /deep/ .q-field__bottom {
      display: none;
   }
</style>
