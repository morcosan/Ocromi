<script lang="ts">
   /**
    * This is the general input field.
    * Used when user needs to enter random text.
    */

   import { Component, Mixins, Prop } from 'vue-property-decorator';
   import YBaseFormField from '../../mixins/YBaseFormField';
   import { QInput } from 'quasar';


   @Component({
      components: { QInput },
   })
   export default class YFieldText extends Mixins(YBaseFormField) {

      /** Content props */
      @Prop({ default: '' }) public value!: string;

      /** Compute validation rules */
      public get finalRules() {
         const rules = [...this.rules];
         // add required rule
         if (this.isRequired) {
            rules.push((value: string) => (!!value || this.$locale.all.requiredField));
         }
         return rules;
      }

   }
</script>


<template>
   <QInput
      @input="$emit('input', $event)"
      :value="value"
      :label="finalLabel"
      :hint="hint"
      :placeholder="placeholder"
      :error="!!error"
      :error-message="error"
      :rules="finalRules"
      :readonly="isReadonly"
      :disable="isDisabled"
      :bg-color="bgColor"
      :class="{ 'y-field-text': true, 'y-form-control-spacing': hasSpacing }"
      type="text"
      ref="qField"
      outlined
      lazy-rules
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
