import { Component, Override, Prop, Watch } from '../../core/decorators';
import YBaseInput from './YBaseInput';


export type Option = {
   value: string,
   label: string,
   isNew: boolean,
}


@Component
export default class YBaseInputSelect extends YBaseInput {

   @Prop({ default: () => [] }) public options!: Option[];
   @Prop({ default: '' }) public hint!: string;


   public currOptions: Option[] = [];
   public isMenuActive: boolean = false;


   @Watch('options')
   public onChange_options() {
      this.currOptions = this.options;
   }


   @Override
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


   public onBlur() {
      this.isDirty = true;
      this.validate();
   }

}
