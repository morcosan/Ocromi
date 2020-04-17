<script lang="ts">
   import { Component, Override, Prop, Watch } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import YTemplateInput from '../YTemplateInput.vue';
   import { QInput } from 'quasar';
   import Utils from '../../../utils';


   @Component({
      components: { QInput, YTemplateInput },
   })
   export default class YFieldCipher extends YBaseInputField {

      @Prop({ default: '' }) public value!: string;
      @Prop({ default: '' }) public inputMask!: string;


      public numCharsRequired: number = 0;


      @Watch('inputMask')
      public onChange_inputMask() {
         this.prepareValidation();
      }


      @Override
      public get finalValue() {
         return this.value;
      }


      @Override
      public created() {
         this.prepareValidation();
      }


      @Override
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: string) => (!!value || this.$locale.all.requiredError));
         }

         // add mask validation rule
         const hasMask = (this.inputMask !== '' && this.numCharsRequired > 0);
         if (hasMask) {
            const error = this.$locale.fieldCipher.maskError.replace('${1}', String(this.numCharsRequired));
            rules.push((value: string) => {
               if (value !== '') {
                  return (value.length === this.numCharsRequired || error);
               }
               return true;
            });
         }

         return rules;
      }


      private prepareValidation() {
         const maskOptions = ['#', 'S', 'A', 'a', 'N', 'X', 'x'];
         this.numCharsRequired = 0;

         if (this.inputMask !== '') {
            for (const char of maskOptions) {
               this.numCharsRequired += Utils.countSubstrInString(char, this.inputMask);
            }
         }
      }

   }
</script>


<template>
   <YTemplateInput
      class="y-field-cipher"
      :is-mini="isMini"
      :side-label-width="sideLabelWidth"
      :final-label="finalLabel"
      :final-error="finalError"
   >
      <QInput
         :value="value"
         :mask="inputMask"
         :label="(isMini ? finalLabel : undefined)"
         :placeholder="finalPlaceholder"
         :readonly="isReadonly"
         :disable="isDisabled"
         :bg-color="bgColor"
         :error="!!finalError"
         type="text"
         unmasked-value
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
