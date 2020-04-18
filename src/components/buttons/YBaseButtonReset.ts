import { Component, Override } from '../../core/decorators';
import YBaseButton from './YBaseButton';
import YBaseForm from '../forms/YBaseForm';


@Component
export default class YBaseButtonReset extends YBaseButton {

   public isEnabled: boolean = true;


   @Override
   public get isDisabledComputed() {
      return (!this.isEnabled || this.isDisabled);
   }


   @Override
   public created() {
      const form: (YBaseForm | null) = this.getParentForm();
      if (form) {
         form.registerResetButton(this);
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

}
