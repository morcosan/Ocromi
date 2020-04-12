<script lang="ts">
   import { Component, Mixins, Override, Prop, Watch } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import { QIcon, QInput, QTooltip } from 'quasar';
   import Regex from '../../../utils/regex';
   import Utils from '../../../utils';


   @Component({
      components: { QInput, QIcon, QTooltip },
   })
   export default class YFieldLink extends Mixins(YBaseInputField) {

      @Prop({ default: '' }) public value!: string;


      public nativeInput!: HTMLElement;
      public isDirty: boolean = false;
      public innerError: string = '';
      public prefix: string = 'https://';
      public finalURL: string = '';


      @Watch('value')
      public onChange_value() {
         if (this.isDirty) {
            this.validate();
         }
      }


      @Override
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: string) => (value || this.$locale.all.requiredError));
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
         this.isDirty = true;

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


      public onKeyDown(event: KeyboardEvent) {
         // block space character on key down
         if (event.key === ' ') {
            event.preventDefault();
         }
      }


      public onPaste(event: ClipboardEvent) {
         // get pasted url
         const url = (event.clipboardData || (globalThis as any).clipboardData).getData('text');

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


      public onKeyDownButton(event: KeyboardEvent) {
         // activate button with space or enter
         if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();

            this.openURL();
         }
      }


      public openURL() {
         if (!this.isReadonly) {
            Utils.openURL(this.finalURL);
         }
      }


      public updateFinalURL() {
         const httpOptions = ['localhost', '127.0.0.1'];

         let isHttp = false;
         for (let i = 0; i < httpOptions.length; i++) {
            if (this.value.includes(httpOptions[i])) {
               isHttp = true;
               break;
            }
         }

         this.prefix = (isHttp ? 'http://' : 'https://');
         this.finalURL = this.prefix + this.value;
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
      :error="!!error || !!innerError"
      :error-message="error || innerError"
      :disable="isDisabled"
      :prefix="prefix"
      class="y-base-input y-field-link"
      type="text"
      input-class="js-native-input"
      outlined
      @input="updateValueProp($event)"
      @keydown="onKeyDown"
      @keyup="updateFinalURL"
      @blur="validate"
      ref="qField"
   >
      <template v-if="!error && !innerError && value" v-slot:append>
         <a
            :href="finalURL"
            :tabindex="isReadonly ? -1 : 0"
            class="y-field-link__anchor"
            @click="openURL"
            @keydown="onKeyDownButton"
         >
            <QIcon
               :class="(isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')"
               name="open_in_new"
            >
               <QTooltip v-if="!isReadonly">{{ $locale.fieldLink.tooltip }}</QTooltip>
            </QIcon>
         </a>
      </template>
   </QInput>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   .y-field-link__anchor {
      display: flex;
      height: fit-content;
      width: fit-content;
   }
</style>
