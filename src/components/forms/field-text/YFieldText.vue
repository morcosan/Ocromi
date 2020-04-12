<script lang="ts">
   import { Component, Mixins, Override, Prop } from '../../../core/decorators';
   import YBaseInputField from '../YBaseInputField';
   import { QInput } from 'quasar';


   @Component({
      components: { QInput },
   })
   export default class YFieldText extends Mixins(YBaseInputField) {

      @Prop({ default: '' }) public value!: string;


      @Override
      public get finalRules() {
         const rules = [...this.rules];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: string) => (!!value || this.$locale.all.requiredError));
         }

         return rules;
      }

   }
</script>


<template>
   <label
      :class="{
         'y-base-input y-field-text': true,
         'y-base-input--side-labeled': !!sideLabelWidth
      }"
   >
      <div
         v-if="!isMini"
         :style="(!isMini ? `width: ${ sideLabelWidth }` : undefined)"
         class="y-base-input__label text-body1"
      >
         {{ finalLabel }}
      </div>

      <QInput
         :value="value"
         :label="isMini ? finalLabel : undefined"
         :hint="hint"
         :placeholder="finalPlaceholder"
         :error="!!error"
         :error-message="error"
         :rules="finalRules"
         :readonly="isReadonly"
         :disable="isDisabled"
         :bg-color="bgColor"
         class="y-base-input__control"
         type="text"
         outlined
         lazy-rules
         @input="updateValueProp($event)"
         @blur="validate"
         ref="qField"
      />
   </label>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';
</style>
