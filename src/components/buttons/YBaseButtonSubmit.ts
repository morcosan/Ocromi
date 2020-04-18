import { Component, Override, Prop, Vue, Watch } from '../../core/decorators';
import YBaseButtonLoading from './YBaseButtonLoading';
import YBaseForm from '../forms/YBaseForm';


@Component
export default class YBaseButtonSubmit extends YBaseButtonLoading {

   @Prop({ default: false, type: Boolean }) public isActivatable!: boolean;


   public isActive: boolean = false;


   @Override
   public get isDisabledComputed() {
      if (this.isActivatable) {
         return (!this.isActive && !this.isLoading);
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


   public activate() {
      this.isActive = true;
   }


   public disable() {
      this.isActive = false;
   }

}
