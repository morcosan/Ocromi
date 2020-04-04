/**
 * Used as the base for all button
 */

import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class YBaseButton extends Vue {

   /** Content props */
   @Prop({ default: '' }) public label!: string;

   /** Config props */
   @Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
   @Prop({ default: 'button' }) public type!: string;	// a, submit, button, reset

}
