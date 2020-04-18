import { Component, Override, Prop } from '../../core/decorators';
import YBaseInput from './YBaseInput';


@Component
export default class YBaseInputField extends YBaseInput {

   @Prop({ default: '' }) public placeholder!: string;
   @Prop({ default: '' }) public hint!: string;


   public get finalPlaceholder() {
      return (this.placeholder ? this.$locale.all.placeholder.replace('${1}', this.placeholder) : '');
   }


   public onBlur() {
      this.isDirty = true;
      this.validate();
   }

}
