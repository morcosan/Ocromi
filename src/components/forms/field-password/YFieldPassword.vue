<script lang="ts">
   import { Component, Mixins, Prop } from 'vue-property-decorator';
   import YBaseInputField from '../YBaseInputField';
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
      components: { QInput, QTooltip, QIcon, QLinearProgress },
   })
   export default class YFieldPassword extends Mixins(YBaseInputField) {

      @Prop({ default: '' }) public value!: string;
      @Prop({ default: false, type: Boolean }) public hasMeter!: boolean;


      public showsPassword: boolean = false;
      public strength: StrengthLevel = StrengthLevel.None;


      public get strengthView() {
         switch (this.strength) {
            case StrengthLevel.Weak:
               return {
                  text: this.$locale.fieldPassword.strength.weak,
                  progress: 0.25,
                  color: 'red-13',
               };

            case StrengthLevel.Good:
               return {
                  text: this.$locale.fieldPassword.strength.good,
                  progress: 0.5,
                  color: 'amber-14',
               };

            case StrengthLevel.Strong:
               return {
                  text: this.$locale.fieldPassword.strength.strong,
                  progress: 0.75,
                  color: 'light-green-14',
               };

            case StrengthLevel.Secure:
               return {
                  text: this.$locale.fieldPassword.strength.secure,
                  progress: 1,
                  color: 'green-14',
               };
         }

         return {
            text: this.$locale.fieldPassword.strength.none,
            progress: 0,
            color: 'red-13',
         };
      }


      // Override
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (this.isRequired) {
            rules.push((value: string) => (!!value || this.$locale.all.requiredField));
         }

         return rules;
      }


      // Override
      public mounted() {
         this.updateStrength();
      }


      public onKeyUp() {
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


      private updateStrength() {
         // test password
         const performanceCap = 40;
         const result = zxcvbn(this.value.substr(0, performanceCap));
         this.strength = result.score;
      }

   }
</script>


<template>
   <QInput
      @input="updateValueProp($event)"
      @keyup="onKeyUp"
      :type="showsPassword ? 'text' : 'password'"
      :value="value"
      :label="finalLabel"
      :hint="hasMeter ? undefined : hint"
      :placeholder="placeholder"
      :readonly="isReadonly"
      :bg-color="bgColor"
      :error-message="error"
      :error="error !== ''"
      :rules="finalRules"
      :bottom-slots="hasMeter"
      :disable="isDisabled"
      :class="{
			'y-field-password': true,
			'y-field-password--has-meter': hasMeter,
			'y-input-spacing': hasSpacing
		}"
      ref="qField"
      outlined
      lazy-rules
   >
      <template v-slot:append>
         <QIcon
            @click="onClickEyeIcon"
            @keydown="onKeyDownIcon"
            :name="showsPassword ? 'visibility' : 'visibility_off'"
            :class="(isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')"
            :tabindex="isReadonly ? -1 : 0"
         >
            <QTooltip v-if="!isReadonly">{{ $locale.fieldPassword.tooltip }}</QTooltip>
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

   .y-field-password--has-meter {
      padding-top: 10px;
      margin-bottom: 30px;
   }
</style>
