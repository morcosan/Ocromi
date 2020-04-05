import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import YBaseInput from './YBaseInput';


export interface Option {
   value: string;
   label: string;
}


@Component
export default class YBaseInputGroup extends Mixins(YBaseInput) {

   @Prop({ default: () => [] }) public options!: Option[];


   public innerError: string = '';
   public currOptionIndex: number = 0;


   public get qOptionGroupChildren() {
      // compute HTML list of group's children
      if (this.$refs.qOptionGroup) {
         // @ts-ignore
         return this.$refs.qOptionGroup.$el.children;
      }
      return [];
   }


   @Watch('isRequired')
   public onChange_isRequired() {
      if (!this.isRequired) {
         // reset error
         this.innerError = '';
      }
   }


   // Override
   public focus() {
      if (this.qOptionGroupChildren[0]) {
         const firstChild = this.qOptionGroupChildren[0].children[0];
         if (firstChild) {
            firstChild.focus();
         }
      }
   }


   // Override
   public mounted() {
      // make the options readonly
      [...this.qOptionGroupChildren].forEach((elem: HTMLElement) => {
         // remove tabindex
         const target: (HTMLElement | null) = elem.querySelector('[tabindex]');
         if (target) {
            target.setAttribute('tabindex', '-1');
         }
      });

      if (!this.isReadonly && !this.isDisabled) {
         // enable the current option
         this.toggleOption(this.currOptionIndex, true);
      }
   }


   public onKeyDown(event: KeyboardEvent) {
      // use arrows to navigate options
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
         // disable current option
         this.toggleOption(this.currOptionIndex, false);
         // enable next option
         this.currOptionIndex = (this.currOptionIndex + 1) % this.options.length;
         this.toggleOption(this.currOptionIndex, true);
      }
      else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
         // disable current option
         this.toggleOption(this.currOptionIndex, false);
         // enable previous option
         this.currOptionIndex = (this.options.length + this.currOptionIndex - 1) % this.options.length;
         this.toggleOption(this.currOptionIndex, true);
      }

      // focus enabled option
      this.focusOption(this.currOptionIndex);
   }


   protected toggleOption(index: number, isEnabled: boolean) {
      // toggle keyboard selection for an option
      const elem: HTMLElement = this.qOptionGroupChildren[index];
      if (elem) {
         const target: (HTMLElement | null) = elem.querySelector('[tabindex]');
         if (target) {
            const tabindex = (isEnabled ? '0' : '-1');
            target.setAttribute('tabindex', tabindex);
         }
      }
   }


   protected focusOption(index: number) {
      const elem: HTMLElement = this.qOptionGroupChildren[index];
      if (elem) {
         const target: (HTMLElement | null) = elem.querySelector('[tabindex]');
         if (target) {
            target.focus();
         }
      }
   }

}
