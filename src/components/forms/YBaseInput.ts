import { Component, Override, Prop, Watch } from '../../core/decorators';
import YBase from '../YBase';
import YBaseForm from './YBaseForm';
import Regex from '../../utils/regex';


type FormProps = {
   isMini?: boolean,
   sideLabelWidth?: string,
}


@Component
export default class YBaseInput extends YBase {

   @Prop({ default: '' }) public label!: string;
   @Prop({ default: '' }) public error!: string;
   @Prop({ default: false, type: Boolean }) public isOptional!: boolean;
   @Prop({ default: false, type: Boolean }) public hidesOptional!: boolean;
   @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
   @Prop({ default: false, type: Boolean }) public isReadonly!: boolean;
   @Prop({ default: null, type: Boolean }) public isMini!: boolean | null;
   @Prop({ default: null }) public sideLabelWidth!: string | null;
   @Prop({ default: 'white' }) public bgColor!: string;
   @Prop({ default: () => [] }) public rules!: Function[];


   public isDirty: boolean = false;
   public innerError: string = '';
   public formProps: FormProps = {};
   public parentForm: (YBaseForm | null) = null;
   public isEnabled: boolean = true;
   public initialValue!: any;


   @Watch('value')
   public onChange_value() {
      if (this.parentForm) {
         this.parentForm.emitInputChange();
      }

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


   public get valueComputed(): any {
      return undefined;
   }


   public get isDisabledComputed(): any {
      return (this.isDisabled || !this.isEnabled);
   }


   public get rulesComputed() {
      return this.rules;
   }


   public get labelComputed() {
      if (this.label !== '') {
         const hasOptional = (this.isOptional && !this.hidesOptional);
         return (hasOptional ? (this.label + ' ' + this.YLocale.all.optional) : this.label);
      }
      return '';
   }


   public get errorComputed() {
      return (this.error || this.innerError);
   }


   public get isMiniComputed() {
      return (this.isMini !== null ? this.isMini : this.formProps.isMini);
   }


   public get sideLabelWidthComputed() {
      const width = (this.sideLabelWidth !== null ? this.sideLabelWidth : this.formProps.sideLabelWidth);
      if (width) {
         const hasUnits = !Regex.isNumber(width);
         return (hasUnits ? width : (width + '%'));
      }
      return null;
   }


   public get isValid() {
      return !this.getValidationError();
   }


   @Override
   public created() {
      this.parentForm = this.getParentForm();
      if (this.parentForm) {
         this.parentForm.registerInputChild(this);
      }
   }


   public validate() {
      this.innerError = this.getValidationError();
      return !this.innerError;
   }


   public getValidationError() {
      for (let i = 0; i < this.rulesComputed.length; i++) {
         const result: (boolean | string) = this.rulesComputed[i](this.valueComputed);
         if (result !== true) {
            return (result as string);
         }
      }

      return '';
   }


   public resetValidation() {
      this.isDirty = false;
      this.innerError = '';
      this.updateValueProp(this.initialValue);
   }


   public focus() {
      // @ts-ignore
      this.$refs.inputRef.$el.focus();
   }


   public enable() {
      this.isEnabled = true;
   }


   public disable() {
      this.isEnabled = false;
   }


   public updateValueProp(value: any) {
      this.$emit('input', value);
   }


   private getParentForm() {
      let parent = this.$parent;
      while (parent) {
         if (parent instanceof YBaseForm) {
            return parent;
         }

         parent = parent.$parent;
      }

      return null;
   }

}
