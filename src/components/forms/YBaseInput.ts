import { Component, Prop, Vue, Watch } from '../../core/decorators';


@Component
export default class YBaseInput extends Vue {

   @Prop({ default: '' }) public label!: string;
   @Prop({ default: '' }) public error!: string;
   @Prop({ default: false, type: Boolean }) public isOptional!: boolean;
   @Prop({ default: false, type: Boolean }) public hidesOptional!: boolean;
   @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
   @Prop({ default: false, type: Boolean }) public isReadonly!: boolean;
   @Prop({ default: false, type: Boolean }) public isMini!: boolean;
   @Prop({ default: '' }) public sideLabelWidth!: string;
   @Prop({ default: 'white' }) public bgColor!: string;


   public isDirty: boolean = false;
   public innerError: string = '';


   @Watch('value')
   public onChange_value() {
      if (this.isDirty) {
         this.validate();
      }
   }


   // to override for each type of input
   public get finalValue(): any {
      return undefined;
   }


   public get finalLabel() {
      const isVisible = (this.isOptional && !this.hidesOptional);
      return (isVisible ? (this.label + ' ' + this.$locale.all.optional) : this.label);
   }


   public get finalError() {
      return (this.error || this.innerError);
   }


   // to override for each type of input
   public validate() {
      return true;
   }


   // to override for each type of input
   public resetValidation() {
      this.isDirty = false;
      this.innerError = '';
   }


   // to override for each type of input
   public focus() {}


   public updateValueProp(value: any) {
      this.$emit('input', value);
   }

}
