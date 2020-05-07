<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import YTemplateInput from '../YTemplateInput.vue';
   import { QIcon, QInput, QLinearProgress, QTooltip } from 'quasar';
   import zxcvbn from 'zxcvbn';


   enum StrengthLevel {
      None = 0,
      Weak,
      Good,
      Strong,
      Secure,
   }


   @Component({
      components: { QInput, QTooltip, QIcon, QLinearProgress, YTemplateInput },
   })
   export default class YFieldPassword extends YBaseInputField {

      @Prop({ default: '' }) public value!: string;
      @Prop({ default: false, type: Boolean }) public hasMeter!: boolean;


      public showsPassword: boolean = false;
      public strength: StrengthLevel = StrengthLevel.None;


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


      public get strengthView() {
         switch (this.strength) {
            case StrengthLevel.Weak:
               return {
                  text: this.YLocale.fieldPassword.strength.weak,
                  progress: 0.25,
                  color: 'red-13',
               };

            case StrengthLevel.Good:
               return {
                  text: this.YLocale.fieldPassword.strength.good,
                  progress: 0.5,
                  color: 'amber-14',
               };

            case StrengthLevel.Strong:
               return {
                  text: this.YLocale.fieldPassword.strength.strong,
                  progress: 0.75,
                  color: 'light-green-14',
               };

            case StrengthLevel.Secure:
               return {
                  text: this.YLocale.fieldPassword.strength.secure,
                  progress: 1,
                  color: 'green-14',
               };
         }

         return {
            text: this.YLocale.fieldPassword.strength.none,
            progress: 0,
            color: 'red-13',
         };
      }


      @Override
      public created() {
         this.initialValue = this.value;
      }


      @Override
      public mounted() {
         this.updateStrength();
      }


      public onKeyDownIcon(event: KeyboardEvent) {
         // activate button with space or enter
         if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            this.showsPassword = !this.showsPassword;
         }
      }


      public onClickEyeIcon() {
         if (!this.isReadonly) {
            this.showsPassword = !this.showsPassword;
         }
      }


      public updateStrength() {
         // test password
         const performanceCap = 40;
         const result = zxcvbn(this.value.substr(0, performanceCap));
         this.strength = result.score;
      }

   }
</script>


<template>
   <YTemplateInput
      :class="'y-field-password ' + (hasMeter ? 'has-meter' : '')"
      :is-mini="isMiniComputed"
      :is-disabled="isDisabledComputed"
      :side-label-width="sideLabelWidthComputed"
      :label="labelComputed"
      :error="errorComputed"
   >
      <QInput
         :value="value"
         :label="(isMiniComputed ? labelComputed : undefined)"
         :placeholder="finalPlaceholder"
         :readonly="isReadonly"
         :disable="isDisabledComputed"
         :bg-color="bgColor"
         :error="Boolean(errorComputed)"
         :type="(showsPassword ? 'text' : 'password')"
         outlined
         lazy-rules
         hide-bottom-space
         @input="updateValueProp($event)"
         @keyup="updateStrength"
         @blur="onBlur"
         ref="inputRef"
      >
         <template v-slot:append>
            <QIcon
               :name="showsPassword ? 'visibility' : 'visibility_off'"
               :class="(isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')"
               :tabindex="isReadonly ? -1 : 0"
               @click="onClickEyeIcon"
               @keydown="onKeyDownIcon"
            >
               <QTooltip v-if="!isReadonly">{{ YLocale.fieldPassword.tooltip }}</QTooltip>
            </QIcon>
         </template>


         <template v-slot:hint>
            <div>{{ hint }}</div>
            <div class="y-strength-meter">
               <QLinearProgress
                  :value="strengthView.progress"
                  :color="strengthView.color"
                  class="y-strength-meter__progress"
                  size="md"
                  stripe
               />
               <div :class="['y-strength-meter__level', 'text-' + strengthView.color]">
                  {{ strengthView.text }}
               </div>
            </div>
         </template>

      </QInput>


      <template v-slot:bottom-left>
         <div v-if="!errorComputed && hint">{{ hint }}</div>

         <div v-if="!errorComputed && hasMeter" class="y-strength-meter">
            <QLinearProgress
               :value="strengthView.progress"
               :color="strengthView.color"
               class="y-strength-meter__progress"
               size="md"
               stripe
            />
            <div :class="['y-strength-meter__level', ('text-' + strengthView.color)]">
               {{ strengthView.text }}
            </div>
         </div>
      </template>

   </YTemplateInput>
</template>


<style scoped lang="scss">
   //@import '../../../css/variables';

   .y-strength-meter {
      display: flex;
      margin-top: -2px;
      align-items: flex-end;

      .y-strength-meter__progress {
         flex: 1;
      }

      .y-strength-meter__level {
         padding-left: 10px;
         text-align: right;
         font-weight: bold;
      }
   }

   .y-field-password.has-meter {
      padding-top: 10px;
      margin-bottom: 30px;
   }

   // place the error icon before the date icon
   .y-field-password.q-field /deep/ .q-field__append.q-anchor--skip {
      position: absolute;
      right: 36px;
      padding-right: 0;
   }
</style>
