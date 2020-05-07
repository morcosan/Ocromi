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
      public get valueComputed() {
         return this.value;
      }


      @Override
      public get rulesComputed() {
         const rules = [...this.rules];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: string) => (Boolean(value) || this.YLocale.all.requiredError));
         }

         // add email rule
         rules.push((value: string) => {
            if (value) {
               return (Regex.isEmail(value) || this.YLocale.fieldEmail.maskError);
            }
            return true;
         });

         return rules;
      }


      @Override
      public created() {
         this.initialValue = this.value;
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
      :is-mini="isMiniComputed"
      :is-disabled="isDisabledComputed"
      :side-label-width="sideLabelWidthComputed"
      :label="labelComputed"
      :error="errorComputed"
   >
      <QInput
         :value="value"
         :label="(isMiniComputed ? labelComputed : undefined)"
         :placeholder="finalPlaceholder"
         :bg-color="bgColor"
         :readonly="isReadonly"
         :disable="isDisabledComputed"
         :error="Boolean(errorComputed)"
         type="email"
         outlined
         lazy-rules
         hide-bottom-space
         @input="updateValueProp($event)"
         @keydown="onKeyDown"
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
