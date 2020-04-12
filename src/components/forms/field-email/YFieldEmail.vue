<script lang="ts">
   import { Component, Mixins, Override, Prop } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import { QInput } from 'quasar';
   import Regex from '../../../utils/regex';
   import Utils from '../../../utils';


   @Component({
      components: { QInput },
   })
   export default class YFieldEmail extends Mixins(YBaseInputField) {

      @Prop({ default: '' }) public value!: string;


      @Override
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: string) => (value || this.$locale.all.requiredError));
         }

         // add email rule
         rules.push((value: string) => {
            if (value) {
               return (Regex.isEmail(value) || this.$locale.fieldEmail.maskError);
            }
            return true;
         });

         return rules;
      }


      public onKeyDown(event: KeyboardEvent) {
         if (Utils.isSpecialKey(event)) {
            return;
         }

         // check if character is allowed for email
         if (!Regex.isAllowedInEmail(event.key)) {
            event.preventDefault();
         }
      }

   }
</script>


<template>
   <QInput
      :value="value"
      :label="finalLabel"
      :hint="hint"
      :placeholder="finalPlaceholder"
      :bg-color="bgColor"
      :error-message="error"
      :error="error"
      :rules="finalRules"
      :readonly="isReadonly"
      :disable="isDisabled"
      class="y-base-input y-field-email"
      type="email"
      outlined
      lazy-rules
      @input="updateValueProp($event)"
      @keydown="onKeyDown"
      @blur="validate"
      ref="qField"
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
