<script lang="ts">
   import { Component, Mixins, Prop } from 'vue-property-decorator';
   import YBaseInputField from '../YBaseInputField';
   import { QInput, QTooltip } from 'quasar';
   import Regex from '../../../utils/regex';
   import Utils from '../../../utils';


   @Component({
      components: { QInput, QTooltip },
   })
   export default class YFieldNumber extends Mixins(YBaseInputField) {

      @Prop({ default: '' }) public value!: number | string;
      @Prop({ default: false, type: Boolean }) public hasDecimals!: boolean;
      @Prop({ default: '' }) public minValue!: number | null;
      @Prop({ default: '' }) public maxValue!: number | null;
      @Prop({ default: 1 }) public valueStep!: number;
      @Prop({ default: -1 }) public decimals!: number;


      public get decimalsHint() {
         return (this.decimals > 0 ? `Decimals: #.${ '0'.repeat(this.decimals) }` : '');
      }


      // Override
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (this.isRequired) {
            rules.push((value: string | number) => (value !== '' || this.$locale.all.requiredField));
         }

         // add min/max rule
         rules.push((value: string | number) => {
            if (value !== '') {
               const valueNum = Number(value);

               if (this.minValue && this.maxValue) {
                  const isOutsideLimits = (valueNum < this.minValue || valueNum > this.maxValue);
                  if (isOutsideLimits) {
                     const error = this.$locale.fieldNumber.minMax;
                     return error.replace('${1}', String(this.minValue)).replace('${2}', String(this.maxValue));
                  }
               }
               else if (this.minValue && valueNum < this.minValue) {
                  const error = this.$locale.fieldNumber.min;
                  return error.replace('${1}', String(this.minValue));
               }
               else if (this.maxValue && valueNum > this.maxValue) {
                  const error = this.$locale.fieldNumber.max;
                  return error.replace('${1}', String(this.maxValue));
               }
            }

            return true;
         });

         return rules;
      }


      public onClickArrow(direction: number) {
         if (!this.isReadonly) {
            this.changeValueByDirection(direction);
         }
      }


      /**
       * Use input type=text to avoid label displacement bug.
       * Block invalid characters on key down
       */
      public onKeyDown(event: KeyboardEvent) {
         // check decimals
         if (event.key === '.' && this.decimals === 0) {
            event.preventDefault();
            return;
         }

         // increment by arrow
         if (event.key === 'ArrowUp') {
            this.changeValueByDirection(1);
            event.preventDefault();
            return;
         }
         // decrement by arrow
         if (event.key === 'ArrowDown') {
            this.changeValueByDirection(-1);
            event.preventDefault();
            return;
         }

         if (!Utils.isSpecialKey(event)) {
            // @ts-ignore
            const pos = event.target.selectionStart;
            let newValue = Utils.insertSubstrInString(event.key, String(this.value), pos);
            // it must end with 0 to validate
            if (event.key === '.') {
               newValue += '0';
            }
            // check if new value is a number
            if (!Regex.isNumber(newValue)) {
               event.preventDefault();
            }
         }
      }


      public onKeyUp() {
         // ignore if string
         if (typeof this.value === 'string') {
            const isValueValid = (this.value === '' || this.value === '-' || this.value.slice(-1) === '.');
            if (isValueValid) {
               return;
            }
         }

         // check paste event
         const value = Number(this.value);
         if (isNaN(value)) {
            this.updateValueProp(0);
         }
         else {
            if (this.decimals > -1) {
               // limit number of decimals
               const tens = 10 ** this.decimals;
               const newValue = Math.floor(Number(this.value) * tens) / tens;

               this.updateValueProp(newValue);
            }
         }
      }


      public onBlur() {
         if (typeof this.value === 'string') {
            if (this.value === '-') {
               // remove empty minus
               this.updateValueProp('');
            }
            else if (this.value.slice(-1) === '.') {
               // remove trailing dot
               this.updateValueProp(Number(this.value));
            }
         }
      }


      private changeValueByDirection(direction: number) {
         // increment or decrement on click arrow buttons
         const newValue = Number(this.value) + direction * this.valueStep;
         this.updateValueProp(newValue);
      }

   }
</script>


<template>
   <QInput
      @input="updateValueProp($event)"
      @keydown="onKeyDown"
      @keyup="onKeyUp"
      @blur="onBlur"
      :value="value"
      :label="finalLabel"
      :hint="hint"
      :placeholder="placeholder"
      :readonly="isReadonly"
      :bg-color="bgColor"
      :error-message="error"
      :error="error !== ''"
      :rules="finalRules"
      :disable="isDisabled"
      :class="{ 'y-field-number': true, 'y-input-spacing': hasSpacing }"
      :step="valueStep"
      :bottom-slots="decimals > 0"
      type="text"
      ref="qField"
      outlined
      lazy-rules
   >
      <template v-slot:append>
         <div class="y-field-number__control">
            <button
               @click="onClickArrow(1)"
               :class="['y-field-number__up', (isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')]"
               tabindex="-1"
            >
               <QIcon name="keyboard_arrow_up" color="grey-8"/>
               <QTooltip v-if="!isReadonly">+ {{ valueStep }}</QTooltip>
            </button>

            <button
               @click="onClickArrow(-1)"
               :class="['y-field-number__down', (isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')]"
               tabindex="-1"
            >
               <QIcon name="keyboard_arrow_down" color="grey-8"/>
               <QTooltip v-if="!isReadonly">- {{ valueStep }}</QTooltip>
            </button>
         </div>
      </template>

      <template v-if="decimals > -1" v-slot:counter>
         {{ decimalsHint }}
      </template>
   </QInput>
</template>


<style scoped lang="scss">
   @import '../../../css/variables';

   .y-field-number__control {
      height: 100%;
      box-sizing: border-box;
      margin-right: -6px;
      display: flex;
      flex-direction: column;
      text-align: center;

      .y-field-number__down,
      .y-field-number__up {
         position: relative;
         width: 24px;
         height: 50%;
         box-sizing: border-box;
         overflow: hidden;
         outline: none;

         &.cursor-pointer:hover {
            background-color: $grey-3;
         }

         & > * {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
         }
      }
   }
</style>
