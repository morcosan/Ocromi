<script lang="ts">
   /**
    * Used when user needs to enter a URL.
    */

   import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
   import YBaseFormField from '../../mixins/YBaseFormField';
   import { QIcon, QInput, QTooltip } from 'quasar';
   import { hyperlinkRegex } from 'src/utils/regex';


   @Component({
      components: { QInput, QIcon, QTooltip },
   })
   export default class YFieldHyperlink extends Mixins(YBaseFormField) {

      /** Content props */
      @Prop({ default: '' }) public value!: string;

      /** States */
      public nativeInput!: HTMLElement;
      public canShowError: boolean = false;
      public innerError: string = '';

      /** Validate when value changes */
      @Watch('value')
      public onChangeValue() {
         // validate
         if (this.canShowError) {
            this.validate();
         }
      }

      /** Compute validation rules */
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (this.isRequired) {
            rules.push((value: string) => (!!value || this.$locale.all.requiredField));
         }

         // add URL rule
         rules.push((value: string) => {
            if (value) {
               return (hyperlinkRegex.test(value) || this.$locale.fieldHyperlink.maskError);
            }
            return true;
         });

         return rules;
      }

      /** Validate field (also overwrites method) */
      public validate() {
         // validate
         for (let i = 0; i < this.finalRules.length; i++) {
            const result: boolean | string = this.finalRules[i](this.value);
            if (result === true) {
               this.innerError = '';
            }
            else {
               this.innerError = (result as string);
               break;
            }
         }

         // update flag
         this.canShowError = true;

         return !this.innerError;
      }

      /** Validate value on blur */
      public onBlur() {
         this.validate();
      }

      /** Block space character on key down */
      public onKeyDown(event: KeyboardEvent) {
         // check if key is allowed
         if (event.key === ' ') {
            event.preventDefault();
         }
      }

      /** Remove HTTP:// on paste event */
      public onPaste(event: ClipboardEvent) {
         // get pasted url
         // @ts-ignore
         const url = (event.clipboardData || globalThis.clipboardData).getData('text');

         // remove http or https
         const http = 'http://';
         const https = 'https://';
         const httpIndex = url.indexOf(http);
         const httpsIndex = url.indexOf(https);
         let value;
         if (httpIndex > -1) {
            value = url.substr(http.length);
         }
         else if (httpsIndex > -1) {
            value = url.substr(https.length);
         }

         // update value
         this.$emit('input', value);
         // stop paste event
         event.preventDefault();
      }

      /** Accessibility for password visibility */
      public onKeyDownIcon(event: KeyboardEvent) {
         // activate button with space or enter
         if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            // open url
            this.openURL();
         }
      }

      /** Open URL in new tab */
      public openURL() {
         if (!this.isReadonly) {
            const url = 'http://' + this.value;
            globalThis.open(url, '_blank');
         }
      }

      /** Lifecycle hook */
      public mounted() {
         // get native input element
         // @ts-ignore
         this.nativeInput = this.$refs.qField.$el.querySelector('.js-native-input');
         // add paste listener
         if (this.nativeInput) {
            this.nativeInput.addEventListener('paste', this.onPaste);
         }
      }

      /** Lifecycle hook */
      public destroyed() {
         // remove paste listener
         if (this.nativeInput) {
            this.nativeInput.removeEventListener('paste', this.onPaste);
         }
      }

   }
</script>


<template>
   <QInput
      @input="$emit('input', $event)"
      @keydown="onKeyDown"
      @blur="onBlur"
      :value="value"
      :label="finalLabel"
      :hint="hint"
      :placeholder="placeholder"
      :readonly="isReadonly"
      :bg-color="bgColor"
      :error="!!error || !!innerError"
      :error-message="error || innerError"
      :disable="isDisabled"
      :class="{ 'y-form-control-spacing': hasSpacing }"
      prefix="http://"
      type="text"
      ref="qField"
      input-class="js-native-input"
      outlined
   >
      <template v-if="!error && !innerError && value" v-slot:append>
         <QIcon
            @click="openURL"
            @keydown="onKeyDownIcon"
            :class="(isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')"
            :tabindex="isReadonly ? -1 : 0"
            name="open_in_new"
         >
            <QTooltip v-if="!isReadonly">{{ $locale.fieldHyperlink.tooltip }}</QTooltip>
         </QIcon>
      </template>
   </QInput>
</template>


<style scoped lang="scss">
   // @import 'src/css/variables';
</style>
