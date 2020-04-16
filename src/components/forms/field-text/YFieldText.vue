<script lang="ts">
   import { Component, Mixins, Override, Prop } from '../../../core/decorators';
   import YMixinInputField from '../YMixinInputField';
   import YTemplateInput from '../YTemplateInput.vue';
   import { QInput } from 'quasar';


   @Component({
      components: { QInput, YTemplateInput },
   })
   export default class YFieldText extends Mixins(YMixinInputField) {

      @Prop({ default: '' }) public value!: string;


      @Override
      public get finalValue() {
         return this.value;
      }


      @Override
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: string) => (!!value || this.$locale.all.requiredError));
         }

         return rules;
      }

   }
</script>


<template>
   <YTemplateInput
      class="y-field-text"
      :is-mini="isMini"
      :side-label-width="sideLabelWidth"
      :final-label="finalLabel"
      :final-error="finalError"
   >
      <QInput
         :value="value"
         :label="(isMini ? finalLabel : undefined)"
         :placeholder="finalPlaceholder"
         :readonly="isReadonly"
         :disable="isDisabled"
         :bg-color="bgColor"
         :error="!!finalError"
         type="text"
         outlined
         lazy-rules
         hide-bottom-space
         @input="updateValueProp($event)"
         @blur="onBlur"
         ref="qField"
      />


      <template v-slot:bottom-left>
         <div v-if="!finalError && hint">{{ hint }}</div>
      </template>

   </YTemplateInput>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
