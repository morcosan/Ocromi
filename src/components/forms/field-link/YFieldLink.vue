<script lang="ts">
   import { Component, Mixins, Override, Prop, Watch } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import { QIcon, QInput, QTooltip } from 'quasar';
   import Regex from '../../../utils/regex';


   @Component({
      components: { QInput, QIcon, QTooltip },
   })
   export default class YFieldLink extends Mixins(YBaseInputField) {

      @Prop({ default: '' }) public value!: string;


      public nativeInput!: HTMLElement;
      public canShowError: boolean = false;
      public innerError: string = '';


      @Watch('value')
      public onChange_value() {
         if (this.canShowError) {
            this.validate();
         }
      }


      @Override
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (this.isRequired) {
            rules.push((value: string) => (!!value || this.$locale.all.requiredField));
         }

         // add URL rule
         rules.push((value: string) => {
            if (value) {
               return (Regex.isSimpleLink(value) || this.$locale.fieldLink.maskError);
            }
            return true;
         });

         return rules;
      }


      @Override
      public validate() {
         this.canShowError = true;

         for (let i = 0; i < this.finalRules.length; i++) {
            const result: (boolean | string) = this.finalRules[i](this.value);
            if (result === true) {
               this.innerError = '';
            }
            else {
               this.innerError = (result as string);
               break;
            }
         }

         return !this.innerError;
      }


      @Override
      public mounted() {
         // @ts-ignore
         this.nativeInput = this.$refs.qField.$el.querySelector('.js-native-input');
         if (this.nativeInput) {
            this.nativeInput.addEventListener('paste', this.onPaste);
         }
      }


      @Override
      public destroyed() {
         if (this.nativeInput) {
            this.nativeInput.removeEventListener('paste', this.onPaste);
         }
      }


      public onBlur() {
         this.validate();
      }


      public onKeyDown(event: KeyboardEvent) {
         // block space character on key down
         if (event.key === ' ') {
            event.preventDefault();
         }
      }


      public onPaste(event: ClipboardEvent) {
         // get pasted url
         // @ts-ignore
         const url = (event.clipboardData || globalThis.clipboardData).getData('text');

         // remove http or https
         const http = 'http://';
         const https = 'https://';
         const httpIndex = url.indexOf(http);
         const httpsIndex = url.indexOf(https);
         let value = '';
         if (httpIndex > -1) {
            value = url.substr(http.length);
         }
         else if (httpsIndex > -1) {
            value = url.substr(https.length);
         }

         this.updateValueProp(value);

         // stop paste event
         event.preventDefault();
      }


      public onKeyDownIcon(event: KeyboardEvent) {
         // activate button with space or enter
         if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();

            this.openURL();
         }
      }


      public openURL() {
         if (!this.isReadonly) {
            const url = 'http://' + this.value;
            // open URL in new tab
            globalThis.open(url, '_blank');
         }
      }

   }
</script>


<template>
   <QInput
      :value="value"
      :label="finalLabel"
      :hint="hint"
      :placeholder="placeholder"
      :readonly="isReadonly"
      :bg-color="bgColor"
      :error="!!error || !!innerError"
      :error-message="error || innerError"
      :disable="isDisabled"
      :class="{ 'y-field-link': true, 'y-input-spacing': hasSpacing }"
      prefix="http://"
      type="text"
      input-class="js-native-input"
      outlined
      @input="updateValueProp($event)"
      @keydown="onKeyDown"
      @blur="onBlur"
      ref="qField"
   >
      <template v-if="!error && !innerError && value" v-slot:append>
         <QIcon
            :class="(isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')"
            :tabindex="isReadonly ? -1 : 0"
            name="open_in_new"
            @click="openURL"
            @keydown="onKeyDownIcon"
         >
            <QTooltip v-if="!isReadonly">{{ $locale.fieldLink.tooltip }}</QTooltip>
         </QIcon>
      </template>
   </QInput>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
