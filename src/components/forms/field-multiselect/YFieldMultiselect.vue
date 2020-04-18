<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import YBaseInputSelect, { Option } from '../YBaseInputSelect';
   import YTemplateInput from '../YTemplateInput.vue';
   import { QChip, QSelect } from 'quasar';


   @Component({
      components: { QSelect, QChip, YTemplateInput },
   })
   export default class YFieldMultiselect extends YBaseInputSelect {

      @Prop({ default: () => [] }) public value!: Option[];
      @Prop({ default: 0 }) public selectionLimit!: number;
      @Prop({ default: false, type: Boolean }) public canAddNew!: boolean;


      @Override
      public get valueComputed() {
         return this.value;
      }


      @Override
      public get rulesComputed() {
         const rules = [];

         // add required rule
         if (!this.isOptional) {
            rules.push((value: Option[]) => (value.length > 0 || this.$locale.all.requiredError));
         }

         return rules;
      }


      @Override
      public created() {
         this.initialValue = this.value;
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

         this.isDirty = true;
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
   <YTemplateInput
      class="y-field-multiselect"
      :is-mini="isMiniComputed"
      :is-disabled="isDisabledComputed"
      :side-label-width="sideLabelWidthComputed"
      :label="labelComputed"
      :error="errorComputed"
   >
      <QSelect
         :value="value"
         :options="currOptions"
         :label="(isMiniComputed ? labelComputed : undefined)"
         :readonly="isReadonly"
         :disable="isDisabledComputed"
         :error="!!errorComputed"
         :bg-color="bgColor"
         :new-value-mode="canAddNew ? 'add-unique' : undefined"
         input-debounce="0"
         lazy-rules
         clearable
         multiple
         use-chips
         use-input
         outlined
         hide-bottom-space
         @input="onInput"
         @filter="onFilterInput"
         @new-value="onNewOption"
         @blur="onBlur"
         ref="inputRef"
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


      <template v-slot:bottom-left>
         <div v-if="!errorComputed && hint">{{ hint }}</div>
      </template>

   </YTemplateInput>
</template>


<style scoped lang="scss">
   // @import '../../../css/variables';

   // align chips with label
   .y-field-multiselect /deep/ .q-field__native {
      margin-left: -4px;
   }
</style>
