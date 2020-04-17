import { Component, Override, Prop, Vue, Watch } from '../../core/decorators';
import YBaseButton from './YBaseButton';
import YBaseForm from '../forms/YBaseForm';


@Component
export default class YBaseButtonSubmit extends YBaseButton {

   public isActive: boolean = false;


   @Override
   public get isDisabledComputed() {
      return (!this.isActive && !this.isLoading);
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


   public activate() {
      this.isActive = true;
   }


   public disable() {
      this.isActive = false;
   }

}
