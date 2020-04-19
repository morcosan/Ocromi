import { Component, Override, Prop } from '../../core/decorators';
import YBaseInput from './YBaseInput';


export type Range = {
   min: number,
   max: number,
}


@Component
export default class YBaseInputSlider extends YBaseInput {

   @Prop({ default: '' }) public thumbSuffix!: string;
   @Prop({ default: 0 }) public minValue!: number;
   @Prop({ default: 100 }) public maxValue!: number;
   @Prop({ default: 1 }) public valueStep!: number;
   @Prop({ default: 2 }) public stepDecimals!: number;
   @Prop({ default: false, type: Boolean }) public hasMarkers!: number;


   @Override
   public get rulesComputed() {
      const rules = [...this.rules];

      // add required rule
      if (!this.isOptional) {
         rules.push(() => (this.isDirty || this.YLocale.slider.requiredError));
      }

      return rules;
   }

}
