<script lang="ts">
   import { Component, Mixins, Override, Prop } from '../../../core/decorators';
   import YBaseInputSelect, { Option } from '../YBaseInputSelect';
   import { QSelect } from 'quasar';


   @Component({
      components: { QSelect },
   })
   export default class YFieldSelect extends Mixins(YBaseInputSelect) {

      @Prop({ default: null }) public value!: Option | null;


      @Override
      public get finalRules() {
         const rules = [];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: Option | null) => (!!value || this.$locale.all.requiredField));
         }

         return rules;
      }

   }
</script>


<template>
   <QSelect
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
      outlined
      lazy-rules
      clearable
      use-input
      @input="updateValueProp($event)"
      @filter="onFilterInput"
      ref="qSelect"
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
