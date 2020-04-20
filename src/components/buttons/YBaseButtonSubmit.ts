import { Component, Override, Prop } from '../../core/decorators';
import YBaseButtonLoading from './YBaseButtonLoading';
import YBaseForm from '../forms/YBaseForm';


@Component
export default class YBaseButtonSubmit extends YBaseButtonLoading {

   @Prop({ default: false, type: Boolean }) public willBeEnabled!: boolean;


   public isEnabled: boolean = false;


   @Override
   public get isDisabledComputed() {
      if (this.willBeEnabled) {
         return (!this.isEnabled && !this.isLoading);
      }
      return (this.isDisabled && !this.isLoading);
   }


   @Override
   public created() {
      const form: (YBaseForm | null) = this.getParentForm();
      if (form) {
         form.registerSubmitButton(this);
      }
   }


   private getParentForm() {
      let parent = this.$parent;
      while (parent) {
         if (parent instanceof YBaseForm) {
            return parent;
         }

         parent = parent.$parent;
      }

      return null;
   }


   public enable() {
      this.isEnabled = true;
   }


   public disable() {
      this.isEnabled = false;
   }


   public reset() {
      this.stopLoading();
      this.isEnabled = false;
   }

}
