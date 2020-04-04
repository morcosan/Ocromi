/**
 * Used as base for all form groups (checkbox, radio, etc)
 */

import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import YBaseFormControl from './YBaseFormControl';


export interface Option {
   value: string;
   label: string;
}

@Component
export default class YBaseFormGroup extends Mixins(YBaseFormControl) {

   /** Content props */
   @Prop({ default: () => [] }) public options!: Option[];

   /** States */
   public innerError: string = '';
   public currOptionIndex: number = 0;

   /** Compute HTML list of group's children */
   public get qOptionGroupChildren() {
      if (this.$refs.qOptionGroup) {
         // @ts-ignore
         return this.$refs.qOptionGroup.$el.children;
      }
      return [];
   }

   /** Reset error if not required */
   @Watch('isRequired')
   public onChangeIsRequired(value: string, oldValue: string) {
      if (!this.isRequired) {
         this.innerError = '';
      }
   }

   /** Focus this control */
   public focus() {
      if (this.qOptionGroupChildren[0]) {
         const firstChild = this.qOptionGroupChildren[0].children[0];
         if (firstChild) {
            firstChild.focus();
         }
      }
   }

   /** Use arrows to navigate options */
   public onKeyDown(event: KeyboardEvent) {
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

   /** Toggle keyboard selection for an option */
   protected toggleOption(index: number, isEnabled: boolean) {
      const elem: HTMLElement = this.qOptionGroupChildren[index];
      if (elem) {
         const target: HTMLElement | null = elem.querySelector('[tabindex]');
         if (target) {
            const tabindex = (isEnabled ? '0' : '-1');
            target.setAttribute('tabindex', tabindex);
         }
      }
   }

   /** Focus an option */
   protected focusOption(index: number) {
      const elem: HTMLElement = this.qOptionGroupChildren[index];
      if (elem) {
         const target: HTMLElement | null = elem.querySelector('[tabindex]');
         if (target) {
            target.focus();
         }
      }
   }

   /** Lifecycle hook */
   public mounted() {
      // make the options readonly
      [...this.qOptionGroupChildren].forEach((elem: HTMLElement) => {
         // remove tabindex
         const target: HTMLElement | null = elem.querySelector('[tabindex]');
         if (target) {
            target.setAttribute('tabindex', '-1');
         }
      });

      if (!this.isReadonly && !this.isDisabled) {
         // enable the current option
         this.toggleOption(this.currOptionIndex, true);
      }
   }

}
