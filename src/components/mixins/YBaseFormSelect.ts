/**
 * Used as the base for all select fields
 */

import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import YBaseFormControl from './YBaseFormControl';


export interface Option {
   value: string;
   label: string;
   isNew: boolean;
}

@Component
export default class YBaseFormSelect extends Mixins(YBaseFormControl) {

   /** Content props */
   @Prop({ default: '' }) public hint!: string;
   @Prop({ default: () => [] }) public options!: Option[];

   /** Feedback props */
   @Prop({ default: '' }) public error!: string;
   @Prop({ default: () => [] }) public rules!: Function[];

   /** States */
   public currOptions: Option[] = [];

   @Watch('options')
   public onChangeOptions(value: Option[], oldValue: Option[]) {
      // set current options
      this.currOptions = this.options;
   }

   /** Compute field label */
   public get finalLabel() {
      return (this.isRequired ? (this.label + ' *') : this.label);
   }

   /**
    * Compute validation rules
    * Overwrite this getter to add additional rules
    */
   public get finalRules() {
      return this.rules;
   }

   /** Autocomplete functionality */
   public onFilterInput(value: string, updateFn: Function) {
      updateFn(() => {
         if (value === '') {
            this.currOptions = this.options;
         }
         else {
            const needle = value.toLowerCase();
            this.currOptions = this.options.filter((e: Option) => e.value.toLowerCase().includes(needle));
         }
      });
   }

   /** Validate the field */
   public validate() {
      // @ts-ignore
      return this.$refs.qSelect.validate();
   }

   /** Focus this control */
   public focus() {
      // @ts-ignore
      this.$refs.qSelect.focus();
   }

   /** Lifecycle hook */
   public created() {
      // set current options
      this.currOptions = this.options;
   }

}
