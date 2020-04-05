import { Component, Mixins, Override, Prop, Watch } from '../../core/decorators';
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


   @Override
   public focus() {
      if (this.qOptionGroupChildren[0]) {
         const firstChild = this.qOptionGroupChildren[0].children[0];
         if (firstChild) {
            firstChild.focus();
         }
      }
   }


   @Override
   public mounted() {
      // make the options readonly
      [...this.qOptionGroupChildren].forEach((elem: HTMLElement) => {
         const target: (HTMLElement | null) = elem.querySelector('[tabindex]');
         if (target) {
            // disable option
            target.setAttribute('tabindex', '-1');
         }
      });

      if (!this.isReadonly && !this.isDisabled) {
         this.enableCurrOption();
      }
   }


   public onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
         event.preventDefault();
         this.navigateDown();
      }
      else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
         event.preventDefault();
         this.navigateUp();
      }

      this.focusCurrOption();
   }


   private navigateDown() {
      this.disableCurrOption();
      this.currOptionIndex = (this.currOptionIndex + 1) % this.options.length;
      this.enableCurrOption();
   }


   private navigateUp() {
      this.disableCurrOption();
      this.currOptionIndex = (this.options.length + this.currOptionIndex - 1) % this.options.length;
      this.enableCurrOption();
   }


   private enableCurrOption() {
      const target: (HTMLElement | null) = this.getTarget(this.currOptionIndex);
      if (target) {
         target.setAttribute('tabindex', '0');
      }
   }


   private disableCurrOption() {
      const target: (HTMLElement | null) = this.getTarget(this.currOptionIndex);
      if (target) {
         target.setAttribute('tabindex', '-1');
      }
   }


   private focusCurrOption() {
      const target: (HTMLElement | null) = this.getTarget(this.currOptionIndex);
      if (target) {
         target.focus();
      }
   }


   private getTarget(index: number) {
      const elem: (HTMLElement | undefined) = this.qOptionGroupChildren[index];
      if (elem) {
         const target: (HTMLElement | null) = elem.querySelector('[tabindex]');
         if (target) {
            return target;
         }
      }

      return null;
   }

}
