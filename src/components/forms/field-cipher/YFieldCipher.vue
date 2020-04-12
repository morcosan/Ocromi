<script lang="ts">
   import { Component, Mixins, Override, Prop, Watch } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import { QInput } from 'quasar';
   import Utils from '../../../utils';


   @Component({
      components: { QInput },
   })
   export default class YFieldCipher extends Mixins(YBaseInputField) {

      @Prop({ default: '' }) public value!: string;
      @Prop({ default: '' }) public inputMask!: string;


      public numCharsRequired: number = 0;


      @Watch('inputMask')
      public onChange_inputMask() {
         this.prepareValidation();
      }


      @Override
      public created() {
         this.prepareValidation();
      }


      @Override
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: string) => (!!value || this.$locale.all.requiredError));
         }

         // add mask validation rule
         const hasMask = (this.inputMask !== '' && this.numCharsRequired > 0);
         if (hasMask) {
            const error = this.$locale.fieldCipher.maskError.replace('${1}', String(this.numCharsRequired));
            rules.push((value: string) => {
               if (value !== '') {
                  return (value.length === this.numCharsRequired || error);
               }
               return true;
            });
         }

         return rules;
      }


      private prepareValidation() {
         const maskOptions = ['#', 'S', 'A', 'a', 'N', 'X', 'x'];
         this.numCharsRequired = 0;

         if (this.inputMask !== '') {
            for (const char of maskOptions) {
               this.numCharsRequired += Utils.countSubstrInString(char, this.inputMask);
            }
         }
      }

   }
</script>


<template>
   <QInput
      :value="value"
      :mask="inputMask"
      :label="finalLabel"
      :hint="hint"
      :placeholder="finalPlaceholder"
      :readonly="isReadonly"
      :bg-color="bgColor"
      :error-message="error"
      :error="error"
      :rules="finalRules"
      :disable="isDisabled"
      class="y-base-input y-field-cipher"
      type="text"
      unmasked-value
      lazy-rules
      outlined
      @input="updateValueProp($event)"
      @blur="validate"
      ref="qField"
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
