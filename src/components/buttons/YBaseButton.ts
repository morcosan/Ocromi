import { Component, Override, Prop, Vue, Watch } from '../../core/decorators';


@Component
export default class YBaseButton extends Vue {

   @Prop({ default: '' }) public label!: string;
   @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
   @Prop({ default: false, type: Boolean }) public hasFlatDesign!: boolean;


   public get isDisabledComputed() {
      return this.isDisabled;
   }

}
