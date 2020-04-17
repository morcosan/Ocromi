<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import YTemplateInput from '../YTemplateInput.vue';
   import { QInput } from 'quasar';


   @Component({
      components: { QInput, YTemplateInput },
   })
   export default class YFieldTextArea extends YBaseInputField {

      @Prop({ default: '' }) public value!: string;
      @Prop({ default: false, type: Boolean }) public isDynamic!: boolean;


      public hasScrollbar: boolean = false;
      public nativeElem: (HTMLElement | null) = null;


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


      public onInput(event: string) {
         if (this.nativeElem) {
            // check if scrollbar is active
            this.hasScrollbar = (this.nativeElem.clientHeight < this.nativeElem.scrollHeight);
         }

         this.updateValueProp(event);
      }


      public onFocus(event: Event) {
         this.nativeElem = (event.target as HTMLElement);
      }

   }
</script>


<template>
   <YTemplateInput
      :class="'y-field-text-area ' + (hasScrollbar ? 'has-scrollbar' : '')"
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
         :autogrow="isDynamic"
         :bg-color="bgColor"
         :error="!!finalError"
         type="textarea"
         outlined
         lazy-rules
         hide-bottom-space
         @input="onInput"
         @focus="onFocus"
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

   // place the icon with javascript
   .y-field-text-area.has-scrollbar /deep/ .q-field__append {
      right: 12px;
   }
</style>
