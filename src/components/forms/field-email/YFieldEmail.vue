<script lang="ts">
   /**
    * Used for asking user email address
    */

   import { Component, Mixins, Prop } from 'vue-property-decorator';
   import YBaseInputField from '../YBaseInputField';
   import { QInput } from 'quasar';
   import { emailCharRegex, emailRegex } from '../../../utils/regex';
   import Utils from '../../../utils';


   @Component({
      components: { QInput },
   })
   export default class YFieldEmail extends Mixins(YBaseInputField) {

      /** Content props */
      @Prop({ default: '' }) public value!: string;

      /** Compute validation rules */
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (this.isRequired) {
            rules.push((value: string) => (!!value || this.$locale.all.requiredField));
         }

         // add email rule
         rules.push((value: string) => {
            if (value) {
               return (emailRegex.test(value) || this.$locale.fieldEmail.maskError);
            }
            return true;
         });

         return rules;
      }

      /** Block invalid characters on key down */
      public onKeyDown(event: KeyboardEvent) {
         // check if special key
         if (Utils.isSpecialKey(event)) {
            return;
         }
         // check if key is allowed
         if (!emailCharRegex.test(event.key)) {
            event.preventDefault();
         }
      }

   }
</script>


<template>
   <QInput
      @input="$emit('input', $event)"
      @keydown="onKeyDown"
      :value="value"
      :label="finalLabel"
      :hint="hint"
      :placeholder="placeholder"
      :bg-color="bgColor"
      :error-message="error"
      :error="error !== ''"
      :rules="finalRules"
      :readonly="isReadonly"
      :disable="isDisabled"
      :class="{ 'y-field-email': true, 'y-input-spacing': hasSpacing }"
      type="email"
      ref="qField"
      outlined
      lazy-rules
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
