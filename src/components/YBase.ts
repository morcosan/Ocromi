import { Component, Prop, Vue } from '../core/decorators';
import { Settings } from '../core/settings';
import Utils from '../utils';


@Component
export default class YBaseButton extends Vue {

   @Prop({ default: () => {} }) public settings!: Settings;


   public get settingsComputed() {
      return Utils.deepMerge(this.YSettings, this.settings);
   }

}
