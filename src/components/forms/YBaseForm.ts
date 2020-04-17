import { Component, Prop, Vue, Watch } from '../../core/decorators';
import YBaseInput from './YBaseInput';


@Component
export default class YBaseForm extends Vue {

   @Prop({ default: false, type: Boolean }) public isMini!: boolean;
   @Prop({ default: '' }) public sideLabelWidth!: string;


   public inputChildren: YBaseInput[] = [];


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

}
