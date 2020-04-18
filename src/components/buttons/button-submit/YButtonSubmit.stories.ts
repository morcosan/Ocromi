import YButtonSubmit from './YButtonSubmit.vue';
import YForm from '../../forms/form/YForm.vue';
import YCheckbox from '../../forms/checkbox/YCheckbox.vue';
import YFieldText from '../../forms/field-text/YFieldText.vue';
import YButtonReset from '../button-reset/YButtonReset.vue';
import StoryBuilder from '.storybook/custom/story-builder';
import { propsButtonLoading } from '.storybook/custom/knob-props';
import { boolean, text } from '@storybook/addon-knobs';


const vue = {
   components: {
      YForm,
      YCheckbox,
      YFieldText,
      YButtonSubmit,
      YButtonReset,
   },
   props: {
      ...propsButtonLoading,
      label: {
         default: () => text('Label', 'Submit'),
      },
      willBeEnabled: {
         default: () => boolean('Is Activatable', false),
      },
   },
   data() {
      return {
         fullName: '',
         hasTOS: false,
         hasSpam: false,
      };
   },
   methods: {
      onSubmit() {
         console.log('submitting...');
         setTimeout(
            () => {
               console.log('form submitted');
               // @ts-ignore
               this.$refs.form.onSubmitComplete();
            },
            // @ts-ignore
            this.loadingTime,
         );
      },
   },
};


const basicFormTemplate = `
<YForm 
   class="story-form-panel"
   @submit="onSubmit"
   ref="form"
>
   <YFieldText
      v-model="fullName"
      label="Full name"
   />
   
   <YCheckbox 
      v-model="hasSpam"
      label="I want spam"
      error="You must agree with our terms"
      is-optional
   />
   
   <YCheckbox 
      v-model="hasTOS"
      side-label-width=""
      error="You must agree with our terms"
   >
      I agree with terms of service
   </YCheckbox>
   
   <YButtonSubmit
      :label="label"
      :is-loading="isLoading"
      :is-disabled="isDisabled"
      :loading-time="loadingTime"
      :spinner="spinner"
      :will-be-enabled="willBeEnabled"
   />
   
   <YButtonReset label="Reset"/>
</YForm>
`;


export default StoryBuilder.createDefault('Buttons / Button Submit');
export const default_ = StoryBuilder.createBasicStory(vue, basicFormTemplate);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to take the submit action for certain data.
 */
`);
