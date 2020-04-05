<script lang="ts">
   /**
    * Used when there are 5 or more options for the user to choose from.
    */

   import { Component, Mixins, Prop } from 'vue-property-decorator';
   import YBaseInputSelect, { Option } from '../YBaseInputSelect';
   import { QSelect } from 'quasar';


   @Component({
      components: { QSelect },
   })
   export default class YFieldSelect extends Mixins(YBaseInputSelect) {

      /** Content props */
      @Prop({ default: null }) public value!: Option | null;

      /** Compute validation rules */
      public get finalRules() {
         const rules = [];
         // add required rule
         if (this.isRequired) {
            rules.push((value: Option | null) => (!!value || this.$locale.all.requiredField));
         }
         return rules;
      }

   }
</script>


<template>
   <QSelect
      @input="updateValueProp($event)"
      @filter="onFilterInput"
      :value="value"
      :options="currOptions"
      :label="finalLabel"
      :hint="hint"
      :readonly="isReadonly"
      :disable="isDisabled"
      :error-message="error"
      :error="error !== ''"
      :rules="finalRules"
      :bg-color="bgColor"
      :class="{ 'y-field-select': true, 'y-input-spacing': hasSpacing }"
      input-debounce="0"
      ref="qSelect"
      outlined
      lazy-rules
      clearable
      use-input
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
