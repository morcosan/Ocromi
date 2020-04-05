import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import YBaseFormControl from './YBaseFormControl';


export interface Option {
   value: string;
   label: string;
   isNew: boolean;
}


@Component
export default class YBaseFormSelect extends Mixins(YBaseFormControl) {

   @Prop({ default: '' }) public hint!: string;
   @Prop({ default: () => [] }) public options!: Option[];
   @Prop({ default: '' }) public error!: string;
   @Prop({ default: () => [] }) public rules!: Function[];


   public currOptions: Option[] = [];


   @Watch('options')
   public onChangeOptions() {
      this.currOptions = this.options;
   }


   public get finalLabel() {
      return (this.isRequired ? (this.label + ' *') : this.label);
   }

   // Override
   public get finalRules() {
      return this.rules;
   }


   // Override
   public validate() {
      // @ts-ignore
      return this.$refs.qSelect.validate();
   }


   // Override
   public focus() {
      // @ts-ignore
      this.$refs.qSelect.focus();
   }


   // Override
   public created() {
      // set current options
      this.currOptions = this.options;
   }


   public onFilterInput(value: string, updateFn: Function) {
      // autocomplete functionality
      updateFn(() => {
         if (value === '') {
            this.currOptions = this.options;
         }
         else {
            const needle = value.toLowerCase();
            this.currOptions = this.options.filter(
               (e: Option) => e.value.toLowerCase().includes(needle),
            );
         }
      });
   }

}
