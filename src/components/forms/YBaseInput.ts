import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class YBaseInput extends Vue {

   @Prop({ default: '' }) public label!: string;
   @Prop({ default: false, type: Boolean }) public isRequired!: boolean;
   @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
   @Prop({ default: false, type: Boolean }) public isReadonly!: boolean;
   @Prop({ default: false, type: Boolean }) public hasSpacing!: boolean;
   @Prop({ default: 'white' }) public bgColor!: string;


   /**
    * Validate this form input
    * Override this for each type of form control
    */
   public validate() {
      return true;
   }


   /**
    * Focus this form input
    * Override this for each type of form control
    */
   public focus() {}
}
