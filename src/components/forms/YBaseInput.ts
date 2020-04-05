import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class YBaseInput extends Vue {

   @Prop({ default: '' }) public label!: string;
   @Prop({ default: false, type: Boolean }) public isRequired!: boolean;
   @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
   @Prop({ default: false, type: Boolean }) public isReadonly!: boolean;
   @Prop({ default: false, type: Boolean }) public hasSpacing!: boolean;
   @Prop({ default: 'white' }) public bgColor!: string;


   // override for each type of input
   public validate() {
      return true;
   }


   // override for each type of input
   public focus() {}


   public updateValueProp(value: any) {
      this.$emit('input', value);
   }
}
