<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import YTemplateInput from '../YTemplateInput.vue';
   import { QInput } from 'quasar';
   import Regex from '../../../utils/regex';
   import Utils from '../../../utils';


   @Component({
      components: { QInput, YTemplateInput },
   })
   export default class YFieldEmail extends YBaseInputField {

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
   <YTemplateInput
      class="y-field-email"
      :is-mini="isMini"
      :side-label-width="sideLabelWidth"
      :final-label="finalLabel"
      :final-error="finalError"
   >
      <QInput
         :value="value"
         :label="(isMini ? finalLabel : undefined)"
         :placeholder="finalPlaceholder"
         :bg-color="bgColor"
         :readonly="isReadonly"
         :disable="isDisabled"
         :error="!!finalError"
         type="email"
         outlined
         lazy-rules
         hide-bottom-space
         @input="updateValueProp($event)"
         @keydown="onKeyDown"
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
