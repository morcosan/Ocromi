import { Component, Mixins, Override, Prop, Watch } from '../../core/decorators';
import YBaseInput from './YBaseInput';


export interface Range {
   min: number;
   max: number;
}


@Component
export default class YBaseInputSlider extends Mixins(YBaseInput) {

   @Prop({ default: '' }) public thumbSuffix!: string;
   @Prop({ default: 0 }) public minValue!: number;
   @Prop({ default: 100 }) public maxValue!: number;
   @Prop({ default: 1 }) public valueStep!: number;
   @Prop({ default: 2 }) public stepDecimals!: number;
   @Prop({ default: false, type: Boolean }) public hasMarkers!: number;


   public innerError: string = '';
   public isDirty: boolean = false;


   @Watch('isOptional')
   public onChange_isOptional() {
      if (this.isOptional) {
         this.innerError = '';
      }
   }


   @Override
   public validate() {
      if (!this.isOptional) {
         this.innerError = (this.isDirty ? '' : this.$locale.slider.requiredError);
      }

      return !this.innerError;
   }


   @Override
   public focus() {
      if (this.$refs.qRange) {
         // @ts-ignore
         this.$refs.qRange.$el.querySelector('[tabindex]').focus();
      }
      else if (this.$refs.qSlider) {
         // @ts-ignore
         this.$refs.qSlider.$el.focus();
      }
   }

}
