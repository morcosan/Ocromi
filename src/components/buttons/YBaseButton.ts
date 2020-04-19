import { Component, Prop } from '../../core/decorators';
import YBase from '../YBase';


@Component
export default class YBaseButton extends YBase {

   @Prop({ default: '' }) public label!: string;
   @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
   @Prop({ default: false, type: Boolean }) public hasFlatDesign!: boolean;


   public get isDisabledComputed() {
      return this.isDisabled;
   }

}
