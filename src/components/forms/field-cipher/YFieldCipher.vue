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
            rules.push((value: string) => (!!value || this.$locale.all.requiredField));
         }

         // add mask validation rule
         if (this.inputMask !== '') {
            const error = this.$locale.fieldCipher.maskError.replace('${1}', String(this.numCharsRequired));
            rules.push((value: string) => (value.length === this.numCharsRequired || error));
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
      :error="error !== ''"
      :rules="finalRules"
      :disable="isDisabled"
      class="y-base-input y-field-cipher"
      type="text"
      unmasked-value
      lazy-rules
      outlined
      @input="updateValueProp($event)"
      ref="qField"
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
