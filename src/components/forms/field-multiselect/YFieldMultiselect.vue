<script lang="ts">
   import { Component, Override, Prop } from '../../../core/decorators';
   import YBaseInputSelect, { Option } from '../YBaseInputSelect';
   import YTemplateInput from '../YTemplateInput.vue';
   import { QCheckbox, QChip, QItem, QItemSection, QSelect, QIcon } from 'quasar';


   @Component({
      components: { YTemplateInput, QCheckbox, QChip, QItem, QItemSection, QSelect, QIcon },
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
            rules.push((value: Option[]) => (value.length > 0 || this.YLocale.all.requiredError));
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
            const previous = this.value.find((e: Option) => (e.value === newValue));

            if (!previous) {
               // add to selection
               doneFn({
                  label: inputValue,
                  value: newValue,
                  isNew: true,
               });
            }
         }
      }


      public isOptionChecked(optionValue: string) {
         return this.value.some((e: Option) => (e.value === optionValue));
      }

   }
</script>


<template>
   <YTemplateInput
      :class="{ 'y-base-select y-field-multiselect': true, 'is-menu-active': isMenuActive }"
      :is-mini="isMiniComputed"
      :is-disabled="isDisabledComputed"
      :side-label-width="sideLabelWidthComputed"
      :label="labelComputed"
      :error="errorComputed"
      :input-id="inputId"
   >
      <QSelect
         :value="value"
         :options="currOptions"
         :label="(isMiniComputed ? labelComputed : undefined)"
         :readonly="isReadonly"
         :disable="isDisabledComputed"
         :error="Boolean(errorComputed)"
         :bg-color="bgColor"
         :new-value-mode="canAddNew ? 'add-unique' : undefined"
         :for="inputId"
         input-debounce="0"
         lazy-rules
         clearable
         multiple
         use-chips
         use-input
         outlined
         hide-bottom-space
         hide-dropdown-icon
         @input="onInput"
         @blur="onBlur"
         @filter="onFilterInput"
         @new-value="onNewOption"
         @popup-show="isMenuActive = true"
         @popup-hide="isMenuActive = false"
         ref="inputRef"
      >
         <template v-slot:option="scope">
            <QItem
               v-bind="scope.itemProps"
               v-on="scope.itemEvents"
            >
               <QCheckbox
                  :value="isOptionChecked(scope.opt.value)"
                  class="no-pointer-events"
                  dense
               >
                  {{ scope.opt.label }}
               </QCheckbox>
            </QItem>
         </template>


         <template v-slot:selected-item="scope">
            <QChip
               :color="(scope && scope.opt.isNew) ? 'primary' : undefined"
               :tabindex="scope ? scope.tabindex : -1"
               :removable="!isReadonly"
               :outline="scope && !scope.opt.isNew"
               :dark="scope && scope.opt.isNew"
               square
               dense
               @remove="scope.removeAtIndex(scope.index)"
            >
               {{ scope ? scope.opt.label : '' }}
            </QChip>
         </template>


         <template v-slot:append>
            <QIcon class="y-base-select__icon" name="arrow_drop_down"/>
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
