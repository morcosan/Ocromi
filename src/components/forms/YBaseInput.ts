import { Component, Prop, Vue } from '../../core/decorators';


@Component
export default class YBaseInput extends Vue {

   @Prop({ default: '' }) public label!: string;
   @Prop({ default: false, type: Boolean }) public isOptional!: boolean;
   @Prop({ default: false, type: Boolean }) public hidesOptional!: boolean;
   @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
   @Prop({ default: false, type: Boolean }) public isReadonly!: boolean;
   @Prop({ default: 'white' }) public bgColor!: string;


   public get finalLabel() {
      const isVisible = (this.isOptional && !this.hidesOptional);
      return (isVisible ? (this.label + ' ' + this.$locale.all.optional) : this.label);
   }


   // to override for each type of input
   public validate() {
      return true;
   }


   // to override for each type of input
   public focus() {}


   public updateValueProp(value: any) {
      this.$emit('input', value);
   }

}
