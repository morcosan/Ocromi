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
      :is-mini="isMiniComputed"
      :is-disabled="isDisabledComputed"
      :side-label-width="sideLabelWidthComputed"
      :label="labelComputed"
      :error="errorComputed"
      :input-id="inputId"
   >
      <QInput
         :value="value"
         :label="(isMiniComputed ? labelComputed : undefined)"
         :placeholder="finalPlaceholder"
         :readonly="isReadonly"
         :disable="isDisabledComputed"
         :autogrow="isDynamic"
         :bg-color="bgColor"
         :error="Boolean(errorComputed)"
         :for="inputId"
         type="textarea"
         outlined
         lazy-rules
         hide-bottom-space
         @input="onInput"
         @focus="onFocus"
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

   // place the icon with javascript
   .y-field-text-area.has-scrollbar /deep/ .q-field__append {
      right: 12px;
   }
</style>
