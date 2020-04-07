import { Component, Mixins, Override, Prop, Watch } from '../../core/decorators';
import YBaseInput from './YBaseInput';


@Component
export default class YBaseInputField extends Mixins(YBaseInput) {

   @Prop({ default: '' }) public placeholder!: string;
   @Prop({ default: '' }) public hint!: string;
   @Prop({ default: '' }) public error!: string;
   @Prop({ default: () => [] }) public rules!: Function[];


   @Watch('isRequired')
   public onChange_isRequired() {
      if (!this.isRequired) {
         // @ts-ignore
         this.$refs.qField.resetValidation();
      }
   }


   public get finalLabel() {
      return (this.isRequired ? (this.label + ' *') : this.label);
   }


   @Override
   public validate() {
      // @ts-ignore
      return this.$refs.qField.validate();
   }


   @Override
   public focus() {
      // @ts-ignore
      this.$refs.qField.focus();
   }


   /**
    * Compute validation rules
    * Override this getter to add additional rules
    */
   public get finalRules() {
      return this.rules;
   }

}
