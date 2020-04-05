import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class YBaseButton extends Vue {

   @Prop({ default: '' }) public label!: string;
   @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
   @Prop({ default: 'button' }) public type!: string;	// options: a / submit / button / reset

}
