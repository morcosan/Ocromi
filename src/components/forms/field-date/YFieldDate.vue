<script lang="ts">
   import { Component, Debounce, Override, Prop, Watch } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import YTemplateInput from '../YTemplateInput.vue';
   import { QDate, QIcon, QInput, QPopupProxy, QTooltip } from 'quasar';
   import { DateTime } from 'luxon';


   @Component({
      components: { QInput, QIcon, QDate, QPopupProxy, QTooltip, YTemplateInput },
   })
   export default class YFieldDate extends YBaseInputField {

      @Prop({ default: '' }) public value!: string;
      @Prop({ default: null }) public customDatesFn!: Function | null;


      public inputValue: string = '';
      public dateFormatISO: string = 'yyyy-MM-dd';
      public dateFormatQuasarISO: string = 'YYYY-MM-DD';
      public dateFormatInput: string = 'ddMMMyyyy';
      public inputMask: string = '## - Aaa - ####';
      public hasFocus: boolean = false;


      @Override
      @Watch('value')
      public onChange_value() {
         this.updateInputValue(this.value);

         if (this.isDirty) {
            this.validate();
         }
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
            rules.push((value: string) => (Boolean(value) || this.YLocale.all.requiredError));
         }

         // add custom dates rule
         rules.push(() => {
            if (this.customDatesFn) {
               return (this.customDatesFn(this.value) || this.YLocale.fieldDate.customDatesError);
            }
            return true;
         });

         // add date validation rule
         rules.push(() => {
            if (this.inputValue !== '') {
               const date = DateTime.fromFormat(this.inputValue, this.dateFormatInput);
               return (date.isValid || this.YLocale.fieldDate.maskError);
            }
            return true;
         });

         return rules;
      }


      @Override
      public created() {
         this.initialValue = this.value;
         this.updateInputValue(this.value);
      }


      public onInput(value: string) {
         const date = DateTime.fromFormat(value, this.dateFormatInput);
         if (date.isValid) {
            // update calendar date
            this.updateValueProp(date.toFormat(this.dateFormatISO));
         }
      }


      private updateInputValue(value: string) {
         // convert ISO format to input format
         const date = DateTime.fromFormat(value, this.dateFormatISO);
         if (date.isValid) {
            this.inputValue = date.toFormat(this.dateFormatInput);
         }
         else {
            // when value is not valid, reset value
            this.inputValue = '';
            this.updateValueProp('');
         }
      }


      public onDateSelect(value: string) {
         this.updateValueProp(value);
         this.closeCalendar();
      }


      public customDatesAdapter(value: string) {
         if (this.customDatesFn) {
            // convert Quasar format to ISO for custom dates
            return this.customDatesFn(value.replace(/\//g, '-'));
         }
         return true;
      }


      public onShowCalendar() {
         // fix accessibility for date picker: remove tabindex from calendar title and subtitle
         // @ts-ignore
         this.$refs.qDate.$el.querySelector('.q-date__header-title-label').removeAttribute('tabindex');
         // @ts-ignore
         this.$refs.qDate.$el.querySelector('.q-date__header-subtitle').removeAttribute('tabindex');
      }


      public onKeyDownIcon(event: KeyboardEvent) {
         if (!this.isReadonly) {
            // activate button with space or enter
            if (event.key === ' ' || event.key === 'Enter') {
               event.preventDefault();
               (this.$refs.qPopupProxy as QPopupProxy).show();
            }
         }
      }


      public onClickDateIcon() {
         if (this.isReadonly) {
            // for whatever Quasar reason, calling show() actually blocks the popup event
            (this.$refs.qPopupProxy as QPopupProxy).show();
         }
      }


      public onBlur() {
         this.hasFocus = false;
         this.isDirty = true;
         this.validate();
      }


      @Debounce(800)
      private closeCalendar() {
         (this.$refs.qPopupProxy as QPopupProxy).hide();
      }

   }
</script>


<template>
   <YTemplateInput
      class="y-field-date"
      :is-mini="isMiniComputed"
      :is-disabled="isDisabledComputed"
      :side-label-width="sideLabelWidthComputed"
      :label="labelComputed"
      :error="errorComputed"
   >
      <QInput
         v-model="inputValue"
         :label="(isMiniComputed ? labelComputed : undefined)"
         :bg-color="bgColor"
         :error="Boolean(errorComputed)"
         :disable="isDisabledComputed"
         :readonly="isReadonly"
         :mask="(inputValue || hasFocus ? inputMask : '')"
         fill-mask="_"
         type="text"
         unmasked-value
         outlined
         lazy-rules
         hide-bottom-space
         @input="onInput"
         @focus="() => (hasFocus = true)"
         @blur="onBlur"
         ref="inputRef"
      >
         <template v-slot:append>
            <QIcon
               :class="(isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')"
               :tabindex="(isReadonly || isDisabledComputed) ? -1 : 0"
               name="event"
               @click="onClickDateIcon"
               @keydown="onKeyDownIcon"
            >
               <QPopupProxy
                  transition-show="scale"
                  transition-hide="scale"
                  @show="onShowCalendar"
                  ref="qPopupProxy"
               >
                  <QDate
                     :value="value"
                     :mask="dateFormatQuasarISO"
                     :options="customDatesAdapter"
                     :locale="YLocale.fieldDate.config"
                     today-btn
                     @input="onDateSelect"
                     ref="qDate"
                  />
               </QPopupProxy>

               <QTooltip v-if="!isReadonly">{{ YLocale.fieldDate.tooltip }}</QTooltip>
            </QIcon>
         </template>
      </QInput>


      <template v-slot:bottom-left>
         <div v-if="!errorComputed">{{ YLocale.fieldDate.hint }}</div>
      </template>

   </YTemplateInput>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   // place the error icon before the date icon
   .y-field-date /deep/ .q-field .q-field__append.q-anchor--skip {
      position: absolute;
      right: 34px;
      padding-right: 0;
   }
</style>
