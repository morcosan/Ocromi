import StoryBuilder from '.storybook/custom/story-builder';
import { propsGroupId, propsButton, settingsComputed } from '.storybook/custom/knob-props';
import { text } from '@storybook/addon-knobs';
import YButtonReset from './YButtonReset.vue';
import YButtonSubmit from './../button-submit/YButtonSubmit.vue';
import YForm from '../../forms/form/YForm.vue';
import YCheckbox from '../../forms/checkbox/YCheckbox.vue';
import YFieldText from '../../forms/field-text/YFieldText.vue';


const vue = {
   components: {
      YForm,
      YCheckbox,
      YFieldText,
      YButtonSubmit,
      YButtonReset,
   },
   props: {
      ...propsButton,
      label: {
         default: () => text('Label', 'Reset', propsGroupId),
      },
   },
   data() {
      return {
         fullName: '',
         hasTOS: false,
         hasSpam: false,
      };
   },
   computed: settingsComputed,
   methods: {
      onSubmit() {
         console.log('Submitting...');
         setTimeout(() => {
            console.log('Form submitted');
            // @ts-ignore
            this.$refs.form.onSubmitComplete();
         }, 2000);
      },

      onReset() {
         console.log('Form reset');
      },
   },
};


const defaultTemplate = `
<YForm 
   class="story-form-panel"
   :settings="settings"
   @submit="onSubmit"
   @reset="onReset" 
   ref="form"
>
   <YFieldText
      v-model="fullName"
      label="Full name"
   />
   
   <YCheckbox 
      v-model="hasTOS"
      side-label-width=""
      error="You must agree with our terms"
   >
      I agree with terms of service
   </YCheckbox>
   
   <br>
   <br>
   
   <YButtonSubmit label="Submit"/>
   <YButtonReset
      :label="label"
      :is-disabled="isDisabled"
      @reset="onReset" 
   />
</YForm>
`;


export default StoryBuilder.createDefault('Buttons / Button Reset');
export const default_ = StoryBuilder.createBasicStory(vue, defaultTemplate);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to take clear the form.
 */
`);
