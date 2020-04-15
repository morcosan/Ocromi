import { Component, Mixins, Override, Prop } from '../../core/decorators';
import YMixinInput from './YMixinInput';


export type Range = {
   min: number;
   max: number;
}


@Component
export default class YMixinInputSlider extends Mixins(YMixinInput) {

   @Prop({ default: '' }) public thumbSuffix!: string;
   @Prop({ default: 0 }) public minValue!: number;
   @Prop({ default: 100 }) public maxValue!: number;
   @Prop({ default: 1 }) public valueStep!: number;
   @Prop({ default: 2 }) public stepDecimals!: number;
   @Prop({ default: false, type: Boolean }) public hasMarkers!: number;


   @Override
   public get finalRules() {
      const rules = [...this.rules];

      // add required rule
      if (!this.isOptional) {
         rules.push(() => (this.isDirty || this.$locale.slider.requiredError));
      }

      return rules;
   }


   @Override
   public validate() {
      for (let i = 0; i < this.finalRules.length; i++) {
         const result: (boolean | string) = this.finalRules[i](this.finalValue);
         if (result === true) {
            this.innerError = '';
         }
         else {
            this.innerError = (result as string);
            break;
         }
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
