import { Component, Override, Prop, Vue, Watch } from '../../core/decorators';
import YBaseForm from './YBaseForm';


type FormProps = {
   isMini?: boolean;
   sideLabelWidth?: string;
}


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
   @Prop({ default: () => [] }) public rules!: Function[];


   public isDirty: boolean = false;
   public innerError: string = '';
   public formProps: FormProps = {};


   @Watch('value')
   public onChange_value() {
      if (this.isDirty) {
         this.validate();
      }
   }


   @Watch('isOptional')
   public onChange_isOptional() {
      if (this.isOptional) {
         this.resetValidation();
      }
   }


   public get finalValue(): any {
      return undefined;
   }


   public get finalRules() {
      return this.rules;
   }


   public get finalLabel() {
      if (this.label !== '') {
         const hasOptional = (this.isOptional && !this.hidesOptional);
         return (hasOptional ? (this.label + ' ' + this.$locale.all.optional) : this.label);
      }
      return '';
   }


   public get finalError() {
      return (this.error || this.innerError);
   }


   @Override
   public created() {
      this.findFormProps();
   }


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


   public resetValidation() {
      this.isDirty = false;
      this.innerError = '';
   }


   public focus() {}


   public updateValueProp(value: any) {
      this.$emit('input', value);
   }


   public findFormProps() {
      let parent = this.$parent;

      while (parent) {
         if (parent instanceof YBaseForm) {
            console.log(parent);
            break;
         }

         parent = parent.$parent;
      }
   }

}
