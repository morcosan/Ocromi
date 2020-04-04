<script lang="ts">
   /**
    * Used when the user needs to choose multiple options from a list.
    */

   import { Component, Mixins, Prop } from 'vue-property-decorator';
   import YBaseFormSelect, { Option } from '../../mixins/YBaseFormSelect';
   import { QChip, QSelect } from 'quasar';


   @Component({
      components: {
         QSelect,
         QChip,
      },
   })
   export default class YFieldMultiselect extends Mixins(YBaseFormSelect) {

      /** Content props */
      @Prop({ default: () => [] }) public value!: Option[];

      /** Config props */
      @Prop({ default: 0 }) public selectionLimit!: number;
      @Prop({ default: false, type: Boolean }) public canAddNew!: boolean;

      /** Compute validation rules */
      public get finalRules() {
         const rules = [];
         // add required rule
         if (this.isRequired) {
            rules.push((value: Option[]) => (value.length > 0 || this.$locale.all.requiredField));
         }
         return rules;
      }

      /** Handle value changes */
      public onInput(value: Option[] | null) {
         // check for null (stupid)
         if (value === null) {
            value = [];
         }

         // check selection limit
         if (this.selectionLimit > 0 && value.length > this.selectionLimit) {
            // remove the rest
            value = value.slice(0, this.selectionLimit);
         }

         // emit input event
         this.$emit('input', value);
      }

      /** Create new options */
      public onNewOption(inputValue: string, doneFn: Function) {
         // check selection limit
         let canAdd = true;
         if (this.selectionLimit > 0 && this.value.length >= this.selectionLimit) {
            canAdd = false;
         }

         // check if option is enabled
         if (this.canAddNew && canAdd) {
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
      @input="onInput"
      @filter="onFilterInput"
      @new-value="onNewOption"
      :value="value"
      :options="currOptions"
      :label="finalLabel"
      :hint="hint"
      :readonly="isReadonly"
      :disable="isDisabled"
      :error-message="error"
      :error="error !== ''"
      :rules="finalRules"
      :bg-color="bgColor"
      :new-value-mode="canAddNew ? 'add-unique' : undefined"
      :class="{ 'y-field-multiselect': true, 'y-form-control-spacing': hasSpacing }"
      input-debounce="0"
      ref="qSelect"
      lazy-rules
      clearable
      multiple
      use-chips
      use-input
      outlined
   >
      <template v-slot:selected-item="scope">
         <QChip
            @remove="scope.removeAtIndex(scope.index)"
            :color="(scope && scope.opt.isNew) ? 'primary' : undefined"
            :tabindex="scope ? scope.tabindex : -1"
            removable
            outline
            square
            dense
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
   // @import 'src/css/variables';
</style>
