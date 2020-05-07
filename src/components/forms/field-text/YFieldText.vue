<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import YTemplateInput from '../YTemplateInput.vue';
   import { QInput } from 'quasar';


   @Component({
      components: { QInput, YTemplateInput },
   })
   export default class YFieldText extends YBaseInputField {

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

         return rules;
      }


      @Override
      public created() {
         this.initialValue = this.value;
      }

   }
</script>


<template>
   <YTemplateInput
      class="y-field-text"
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
         :readonly="isReadonly"
         :disable="isDisabledComputed"
         :bg-color="bgColor"
         :error="Boolean(errorComputed)"
         type="text"
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
