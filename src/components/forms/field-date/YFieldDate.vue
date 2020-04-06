<script lang="ts">
   import { Component, Mixins, Override, Prop, Watch } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import { QDate, QIcon, QInput, QPopupProxy, QTooltip } from 'quasar';
   import { DateTime } from 'luxon';


   @Component({
      components: { QInput, QIcon, QDate, QPopupProxy, QTooltip },
   })
   export default class YFieldDate extends Mixins(YBaseInputField) {

      @Prop({ default: '' }) public value!: string;
      @Prop({ default: undefined }) public customDatesFn!: Function | undefined;


      public inputValue: string = '';
      public dateFormatISO: string = 'yyyy-MM-dd';
      public dateFormatQuasarISO: string = 'YYYY-MM-DD';
      public dateFormatInput: string = 'ddMMMyyyy';
      public inputMask: string = '## - Aaa - ####';
      public hasFocus: boolean = false;


      @Watch('value')
      public onChange_value(value: string) {
         this.updateInputValue(value);
      }


      @Override
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (this.isRequired) {
            rules.push((value: string) => (!!value || this.$locale.all.requiredField));
         }

         // add custom dates rule
         if (this.customDatesFn) {
            rules.push((value: string) => {
               if (value) {
                  const date = DateTime.fromFormat(value, this.dateFormatInput);
                  if (date.isValid) {
                     const valueISO = date.toFormat(this.dateFormatISO);
                     // @ts-ignore
                     return (this.customDatesFn(valueISO) || this.$locale.fieldDate.customDatesError);
                  }
                  return false;
               }
               return true;
            });
         }

         // add date validation rule
         rules.push((value: string) => {
            if (value) {
               const date = DateTime.fromFormat(value, this.dateFormatInput);
               return (date.isValid || this.$locale.fieldDate.maskError);
            }
            return true;
         });

         return rules;
      }


      @Override
      public created() {
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

               // open popup
               // @ts-ignore
               this.$refs.qPopupProxy.show();
            }
         }
      }


      public onClickDateIcon() {
         if (this.isReadonly) {
            // for whatever Quasar reason, calling show() actually blocks the popup event
            // @ts-ignore
            this.$refs.qPopupProxy.show();
         }
      }

   }
</script>


<template>
   <QInput
      v-model="inputValue"
      :label="finalLabel"
      :hint="(isDisabled || isReadonly) ? '' : $locale.fieldDate.hint"
      :bg-color="bgColor"
      :error-message="error"
      :error="error !== ''"
      :rules="finalRules"
      :disable="isDisabled"
      :readonly="isReadonly"
      :class="{ 'y-field-date': true, 'y-input-spacing': hasSpacing }"
      :mask="!!inputValue || hasFocus ? inputMask : ''"
      fill-mask="_"
      type="text"
      unmasked-value
      hide-hint
      lazy-rules
      outlined
      @input="onInput"
      @focus="() => (hasFocus = true)"
      @blur="() => (hasFocus = false)"
      ref="qField"
   >
      <template v-slot:append>
         <QIcon
            :class="(isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')"
            :tabindex="isReadonly ? -1 : 0"
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
                  :locale="$locale.fieldDate.config"
                  today-btn
                  @input="onDateSelect"
                  ref="qDate"
               />
            </QPopupProxy>

            <QTooltip v-if="!isReadonly">{{ $locale.fieldDate.tooltip }}</QTooltip>
         </QIcon>
      </template>
   </QInput>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
