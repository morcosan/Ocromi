import { Component, Prop, Vue } from '../../core/decorators';


@Component
export default class YBaseForm extends Vue {

   @Prop({ default: false, type: Boolean }) public isMini!: boolean;
   @Prop({ default: '' }) public sideLabelWidth!: string;

}
