import { Component, Prop, Watch } from '../../core/decorators';
import YBase from '../YBase';
import YBaseInput from './YBaseInput';
import YBaseButtonSubmit from '../buttons/YBaseButtonSubmit';
import YBaseButtonReset from '../buttons/YBaseButtonReset';


@Component
export default class YBaseForm extends YBase {

   @Prop({ default: false, type: Boolean }) public isMini!: boolean;
   @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
   @Prop({ default: '' }) public sideLabelWidth!: string;


   private inputChildren: YBaseInput[] = [];
   private submitButton!: YBaseButtonSubmit;
   private resetButton!: YBaseButtonReset;


   @Watch('isMini')
   public onChange_isMini() {
      this.inputChildren.forEach(child => {
         child.formProps.isMini = this.isMini;
      });
   }


   @Watch('isDisabled')
   public onChange_isDisabled() {
      this.inputChildren.forEach(child => {
         child.formProps.isDisabled = this.isDisabled;
      });
   }


   @Watch('sideLabelWidth')
   public onChange_sideLabelWidth() {
      this.inputChildren.forEach(child => {
         child.formProps.sideLabelWidth = this.sideLabelWidth;
      });
   }


   public registerInputChild(child: YBaseInput) {
      if (this.inputChildren.includes(child)) {
         return;
      }

      this.inputChildren.push(child);

      child.formProps = {
         isMini: this.isMini,
         isDisabled: this.isDisabled,
         sideLabelWidth: this.sideLabelWidth,
      };
   }


   public registerSubmitButton(button: YBaseButtonSubmit) {
      console.log('reg submit');
      this.submitButton = button;
   }


   public registerResetButton(button: YBaseButtonReset) {
      this.resetButton = button;
   }


   public emitInputChange() {
      let numValidInputs = 0;
      this.inputChildren.forEach(child => {
         if (child.isValid) {
            numValidInputs++;
         }
      });

      if (this.submitButton) {
         const isComplete = numValidInputs === this.inputChildren.length;
         if (isComplete) {
            this.submitButton.enable();
         }
         else {
            this.submitButton.disable();
         }
      }
   }


   public onSubmit() {
      this.submitButton?.startLoading();
      this.resetButton?.disable();
      this.inputChildren.forEach(child => {
         child.disable();
      });

      this.$emit('submit');
   }


   public onSubmitComplete() {
      this.submitButton?.reset();
      this.resetButton?.enable();
      this.inputChildren.forEach(child => {
         child.enable();
      });
   }

}
