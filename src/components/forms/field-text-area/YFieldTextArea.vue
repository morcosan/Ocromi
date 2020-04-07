<script lang="ts">
   import { Component, Mixins, Override, Prop } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import { QInput } from 'quasar';


   @Component({
      components: { QInput },
   })
   export default class YFieldTextArea extends Mixins(YBaseInputField) {

      @Prop({ default: '' }) public value!: string;
      @Prop({ default: false, type: Boolean }) public isDynamic!: boolean;


      public hasScrollbar: boolean = false;
      public nativeElem: (HTMLElement | null) = null;


      @Override
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (this.isRequired) {
            rules.push((value: string) => (!!value || this.$locale.all.requiredField));
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
   <QInput
      :value="value"
      :label="finalLabel"
      :hint="hint"
      :placeholder="finalPlaceholder"
      :readonly="isReadonly"
      :bg-color="bgColor"
      :error-message="error"
      :error="error !== ''"
      :rules="finalRules"
      :autogrow="isDynamic"
      :class="{
         'y-field-text-area': true,
         'y-field-text-area--has-scrollbar': hasScrollbar,
         'y-input-spacing': hasSpacing
      }"
      :disable="isDisabled"
      type="textarea"
      outlined
      lazy-rules
      @input="onInput"
      @focus="onFocus"
      ref="qField"
   />
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
