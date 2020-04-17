import { Component, Prop, Vue, Watch } from '../../core/decorators';
import YBaseInput from './YBaseInput';
import YBaseButtonSubmit from '../buttons/YBaseButtonSubmit';


@Component
export default class YBaseForm extends Vue {

   @Prop({ default: false, type: Boolean }) public isMini!: boolean;
   @Prop({ default: '' }) public sideLabelWidth!: string;


   private inputChildren: YBaseInput[] = [];
   private submitButton!: YBaseButtonSubmit;


   @Watch('isMini')
   public onChange_isMini() {
      this.inputChildren.forEach(child => {
         child.formProps.isMini = this.isMini;
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
         sideLabelWidth: this.sideLabelWidth,
      };
   }


   public registerSubmitButton(button: YBaseButtonSubmit) {
      this.submitButton = button;
   }


   public emitInputChange() {
      let numValidInputs = 0;
      this.inputChildren.forEach(child => {
         if (child.isValid()) {
            numValidInputs += 1;
         }
      });

      const isComplete = numValidInputs === this.inputChildren.length;
      if (this.submitButton && isComplete) {
         this.submitButton.activate();
      }
      else {
         this.submitButton.disable();
      }
   }


   public onSubmit() {
      this.inputChildren.forEach(child => {
         child.disable();
      });

      this.$emit('submit');
   }

}
