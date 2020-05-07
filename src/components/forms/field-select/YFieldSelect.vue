<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import YBaseInputSelect, { Option } from '../YBaseInputSelect';
   import YTemplateInput from '../YTemplateInput.vue';
   import { QSelect } from 'quasar';


   @Component({
      components: { QSelect, YTemplateInput },
   })
   export default class YFieldSelect extends YBaseInputSelect {

      @Prop({ default: null }) public value!: Option | null;


      @Override
      public get valueComputed() {
         return this.value;
      }


      @Override
      public get rulesComputed() {
         const rules = [];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: Option | null) => (Boolean(value) || this.YLocale.all.requiredError));
         }

         return rules;
      }


      @Override
      public created() {
         this.initialValue = this.value;
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
      :is-mini="isMiniComputed"
      :is-disabled="isDisabledComputed"
      :side-label-width="sideLabelWidthComputed"
      :label="labelComputed"
      :error="errorComputed"
   >
      <QSelect
         :value="value"
         :options="currOptions"
         :label="(isMiniComputed ? labelComputed : undefined)"
         :readonly="isReadonly"
         :disable="isDisabledComputed"
         :error="Boolean(errorComputed)"
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
