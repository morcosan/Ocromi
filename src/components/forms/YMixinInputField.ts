import { Component, Mixins, Override, Prop } from '../../core/decorators';
import YMixinInput from './YMixinInput';


@Component
export default class YMixinInputField extends Mixins(YMixinInput) {

   @Prop({ default: '' }) public placeholder!: string;
   @Prop({ default: '' }) public hint!: string;


   public get finalPlaceholder() {
      return (this.placeholder ? this.$locale.all.placeholder.replace('${1}', this.placeholder) : '');
   }


   @Override
   public focus() {
      // @ts-ignore
      this.$refs.qField.focus();
   }


   public onBlur() {
      this.isDirty = true;
      this.validate();
   }

}
