<script lang="ts">
   import { Component, Mixins, Override, Prop } from '../../../core/decorators';
   import YMixinInputSelect, { Option } from '../YMixinInputSelect';
   import { QChip, QSelect } from 'quasar';


   @Component({
      components: {
         QSelect,
         QChip,
      },
   })
   export default class YFieldMultiselect extends Mixins(YMixinInputSelect) {

      @Prop({ default: () => [] }) public value!: Option[];
      @Prop({ default: 0 }) public selectionLimit!: number;
      @Prop({ default: false, type: Boolean }) public canAddNew!: boolean;


      @Override
      public get finalRules() {
         const rules = [];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: Option[]) => (value.length > 0 || this.$locale.all.requiredError));
         }

         return rules;
      }


      public onInput(value: Option[] | null) {
         // Quasar sets null on clear
         if (value === null) {
            value = [];
         }

         const isWithinLimits = (this.selectionLimit > 0 && this.selectionLimit < value.length);
         if (isWithinLimits) {
            value = value.slice(0, this.selectionLimit);
         }

         this.updateValueProp(value);
      }


      public onNewOption(inputValue: string, doneFn: Function) {
         const isFull = (this.selectionLimit > 0 && this.selectionLimit <= this.value.length);
         if (this.canAddNew && !isFull) {
            // validate
            const newValue = inputValue.toLowerCase();
            const exists = !!this.value.find((e: Option) => (e.value === newValue));

            if (!exists) {
               // add to selection
               doneFn({
                  label: inputValue,
                  value: newValue,
                  isNew: true,
               });
            }
         }
      }

   }
</script>


<template>
   <QSelect
      :value="value"
      :options="currOptions"
      :label="finalLabel"
      :hint="hint"
      :readonly="isReadonly"
      :disable="isDisabled"
      :error-message="error"
      :error="error"
      :rules="finalRules"
      :bg-color="bgColor"
      :new-value-mode="canAddNew ? 'add-unique' : undefined"
      class="y-field-multiselect y-base-input"
      input-debounce="0"
      lazy-rules
      clearable
      multiple
      use-chips
      use-input
      outlined
      @input="onInput"
      @filter="onFilterInput"
      @new-value="onNewOption"
      @blur="validate"
      ref="qSelect"
   >
      <template v-slot:selected-item="scope">
         <QChip
            :color="(scope && scope.opt.isNew) ? 'primary' : undefined"
            :tabindex="scope ? scope.tabindex : -1"
            :removable="!isReadonly"
            outline
            square
            dense
            @remove="scope.removeAtIndex(scope.index)"
         >
            {{ scope ? scope.opt.label : '' }}
         </QChip>
      </template>

      <template v-if="selectionLimit > 0" v-slot:counter>
         <div :class="{ 'text-weight-bold': (value.length >= selectionLimit) }">
            {{ value.length }} / {{ selectionLimit }}
         </div>
      </template>
   </QSelect>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   // align chips with label
   .y-field-multiselect /deep/ .q-field__native {
      margin-left: -4px;
   }
</style>
