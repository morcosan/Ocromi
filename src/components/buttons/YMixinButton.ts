import { Component, Prop, Vue } from '../../core/decorators';


@Component
export default class YMixinButton extends Vue {

   @Prop({ default: '' }) public label!: string;
   @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
   @Prop({ default: 'button' }) public type!: string;	// available options: a / submit / button / reset

}
