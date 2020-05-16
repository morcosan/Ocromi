import { Component, Override, Prop, Vue } from '../core/decorators';
import { defaultSettings, Settings } from '../core/settings';
import Utils from '../utils';


@Component
export default class YBase extends Vue {

   @Prop({ default: () => {} }) public settings!: Settings;


   private parent!: YBase;


   public get YLocale(): any {
      // @ts-ignore
      return this.$t('locale');
   }


   public get settingsComputed(): Settings {
      if (this.parent) {
         return Utils.mergeObjects(this.parent.settingsComputed, this.settings);
      }
      return Utils.mergeObjects(defaultSettings, this.settings);
   }


   @Override
   public created() {
      this.findParent();
   }


   private findParent() {
      let parent = this.$parent;
      while (parent) {
         if (parent instanceof YBase) {
            this.parent = parent;
            return;
         }

         parent = parent.$parent;
      }
   }

}
