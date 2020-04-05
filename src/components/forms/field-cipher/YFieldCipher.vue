<script lang="ts">
   /**
    * Used when user needs to enter a code number or similar.
    * Mask rules (from Quasar):
    *   # - Numeric
    *   S - Letter, a to z, case insensitive
    *   A - Letter, transformed to uppercase
    *   a - Letter, transformed to lowercase
    *   N - Alphanumeric, case insensitive for letters
    *   X - Alphanumeric, transformed to uppercase for letters
    *   x - Alphanumeric, transformed to lowercase for letters
    */

   import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
   import YBaseFormField from '../../mixins/YBaseFormField';
   import { QInput } from 'quasar';
   import { countChar } from '../../../utils';


   @Component({
      components: { QInput },
   })
   export default class YFieldCipher extends Mixins(YBaseFormField) {

      /** Content props */
      @Prop({ default: '' }) public value!: string;

      /** Config props */
      @Prop({ default: '' }) public inputMask!: string;

      /** States */
      public numChars: number = 0;

      /** Prop watcher */
      @Watch('inputMask')
      public onChangeInputMask(value: string, oldValue: string) {
         // prepare validation
         this.countChars();
      }

      /** Compute validation rules */
      public get finalRules() {
         const rules = [...this.rules];
         // add required rule
         if (this.isRequired) {
            rules.push((value: string) => (!!value || this.$locale.all.requiredField));
         }
         // add mask validation rule
         if (this.inputMask !== '') {
            const error = this.$locale.fieldCipher.maskError.replace('${1}', String(this.numChars));
            rules.push((value: string) => (value.length === this.numChars || error));
         }
         return rules;
      }

      /** Calculate number of required chars, used for validation later */
      private countChars() {
         this.numChars = 0;
         if (this.inputMask !== '') {
            for (const char of ['#', 'S', 'A', 'a', 'N', 'X', 'x']) {
               this.numChars += countChar(this.inputMask, char);
            }
         }
      }

      /** Lifecycle hook */
      public created() {
         // prepare validation
         this.countChars();
      }

   }
</script>


<template>
   <QInput
      @input="$emit('input', $event)"
      :value="value"
      :mask="inputMask"
      :label="finalLabel"
      :hint="hint"
      :placeholder="placeholder"
      :readonly="isReadonly"
      :bg-color="bgColor"
      :error-message="error"
      :error="error !== ''"
      :rules="finalRules"
      :disable="isDisabled"
      :class="{ 'y-field-cipher': true, 'y-form-control-spacing': hasSpacing }"
      type="text"
      ref="qField"
      unmasked-value
      lazy-rules
      outlined
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
