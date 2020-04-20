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
      public get valueComputed() {
         return this.value;
      }


      @Override
      public get rulesComputed() {
         const rules = [...this.rules];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: string) => (!!value || this.YLocale.all.requiredError));
         }

         // add mask validation rule
         const hasMask = (this.inputMask !== '' && this.numCharsRequired > 0);
         if (hasMask) {
            const error = this.YLocale.fieldCipher.maskError.replace('${1}', String(this.numCharsRequired));
            rules.push((value: string) => {
               if (value !== '') {
                  return (value.length === this.numCharsRequired || error);
               }
               return true;
            });
         }

         return rules;
      }


      @Override
      public created() {
         this.initialValue = this.value;
         this.prepareValidation();
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
      :is-mini="isMiniComputed"
      :is-disabled="isDisabledComputed"
      :side-label-width="sideLabelWidthComputed"
      :label="labelComputed"
      :error="errorComputed"
   >
      <QInput
         :value="value"
         :mask="inputMask"
         :label="(isMiniComputed ? labelComputed : undefined)"
         :placeholder="finalPlaceholder"
         :readonly="isReadonly"
         :disable="isDisabledComputed"
         :bg-color="bgColor"
         :error="!!errorComputed"
         type="text"
         unmasked-value
         outlined
         lazy-rules
         hide-bottom-space
         @input="updateValueProp($event)"
         @blur="onBlur"
         ref="inputRef"
      />


      <template v-slot:bottom-left>
         <div v-if="!errorComputed && hint">{{ hint }}</div>
      </template>

   </YTemplateInput>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
