<script lang="ts">
   import { Component, Mixins, Override, Prop } from '../../../core/decorators';
   import YMixinInputSelect, { Option } from '../YMixinInputSelect';
   import YTemplateInput from '../YTemplateInput.vue';
   import { QSelect } from 'quasar';


   @Component({
      components: { QSelect, YTemplateInput },
   })
   export default class YFieldSelect extends Mixins(YMixinInputSelect) {

      @Prop({ default: null }) public value!: Option | null;


      @Override
      public get finalValue() {
         return this.value;
      }


      @Override
      public get finalRules() {
         const rules = [];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: Option | null) => (!!value || this.$locale.all.requiredError));
         }

         return rules;
      }


      public onInput(value: Option) {
         this.isDirty = true;
         this.updateValueProp(value);
      }

   }
</script>


<template>
   <YTemplateInput
      class="y-field-select"
      :is-mini="isMini"
      :side-label-width="sideLabelWidth"
      :final-label="finalLabel"
      :final-error="finalError"
   >
      <QSelect
         :value="value"
         :options="currOptions"
         :label="(isMini ? finalLabel : undefined)"
         :readonly="isReadonly"
         :disable="isDisabled"
         :error="!!finalError"
         :bg-color="bgColor"
         input-debounce="0"
         outlined
         lazy-rules
         clearable
         use-input
         hide-bottom-space
         @input="onInput"
         @filter="onFilterInput"
         @blur="onBlur"
         ref="qSelect"
      />


      <template v-slot:bottom-left>
         <div v-if="!finalError && hint">{{ hint }}</div>
      </template>

   </YTemplateInput>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
