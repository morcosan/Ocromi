/**
 * Used as the base for all slider controls
 */

import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import YBaseFormControl from 'src/components/mixins/YBaseFormControl';


export interface Range {
   min: number;
   max: number;
}

@Component
export default class YBaseFormSlider extends Mixins(YBaseFormControl) {

   /** Content props */
   @Prop({ default: '' }) public thumbSuffix!: string;

   /** Config props */
   @Prop({ default: 0 }) public minValue!: number;
   @Prop({ default: 100 }) public maxValue!: number;
   @Prop({ default: 1 }) public valueStep!: number;
   @Prop({ default: 2 }) public stepDecimals!: number;
   @Prop({ default: false, type: Boolean }) public hasMarkers!: number;

   /** States */
   public innerError: string = '';
   public isDirty: boolean = false;

   /** Reset error if not required */
   @Watch('isRequired')
   public onChangeIsRequired(value: string, oldValue: string) {
      if (!this.isRequired) {
         this.innerError = '';
      }
   }

   /** Check if dirty and update error */
   public validate() {
      // check if required
      if (this.isRequired) {
         this.innerError = (this.isDirty ? '' : this.$text.all.required);
      }
      return !this.innerError;
   }

   /** Focus this control */
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
