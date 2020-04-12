import { Component, Mixins, Override, Prop, Watch } from '../../core/decorators';
import YBaseInput from './YBaseInput';


@Component
export default class YBaseInputField extends Mixins(YBaseInput) {

   @Prop({ default: '' }) public placeholder!: string;
   @Prop({ default: '' }) public hint!: string;
   @Prop({ default: () => [] }) public rules!: Function[];


   @Watch('isOptional')
   public onChange_isOptional() {
      if (this.isOptional) {
         this.resetValidation();
      }
   }


   public get finalPlaceholder() {
      return (this.placeholder ? this.$locale.all.placeholder.replace('${1}', this.placeholder) : '');
   }


   /**
    * Compute validation rules
    * Override this getter to add additional rules
    */
   public get finalRules() {
      return this.rules;
   }


   @Override
   public validate() {
      this.isDirty = true;

      for (let i = 0; i < this.finalRules.length; i++) {
         const result: (boolean | string) = this.finalRules[i](this.finalValue);
         if (result === true) {
            this.innerError = '';
         }
         else {
            this.innerError = (result as string);
            break;
         }
      }

      return !this.innerError;
   }


   @Override
   public focus() {
      // @ts-ignore
      this.$refs.qField.focus();
   }

}
