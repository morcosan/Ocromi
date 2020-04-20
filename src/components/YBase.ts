import { Component, Override, Prop, Vue } from '../core/decorators';
import { Settings } from '../core/settings';
import Utils from '../utils';


@Component
export default class YBase extends Vue {

   @Prop({ default: () => {} }) public settings!: Settings;


   private parent!: YBase;


   public get settingsComputed(): Settings {
      if (this.parent) {
         return Utils.mergeObjects(this.parent.settingsComputed, this.settings);
      }
      return Utils.mergeObjects(this.YSettings, this.settings);
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
