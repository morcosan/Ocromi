<script lang="ts">
   import { Component, Mixins, Override, Prop } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import { QInput } from 'quasar';


   @Component({
      components: { QInput },
   })
   export default class YFieldText extends Mixins(YBaseInputField) {

      @Prop({ default: '' }) public value!: string;


      @Override
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: string) => (!!value || this.$locale.all.requiredField));
         }

         return rules;
      }

   }
</script>


<template>
   <QInput
      :value="value"
      :label="finalLabel"
      :hint="hint"
      :placeholder="finalPlaceholder"
      :error="!!error"
      :error-message="error"
      :rules="finalRules"
      :readonly="isReadonly"
      :disable="isDisabled"
      :bg-color="bgColor"
      :class="{ 'y-field-text': true, 'y-input-spacing': hasSpacing }"
      type="text"
      outlined
      lazy-rules
      @input="updateValueProp($event)"
      ref="qField"
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
