import StoryBuilder from '.storybook/custom/story-builder';
import { propsButtonLoading } from '.storybook/custom/knob-props';
import { boolean, select, text } from '@storybook/addon-knobs';
import YButtonSubmit from './YButtonSubmit.vue';
import YForm from '../../forms/form/YForm.vue';
import YCheckbox from '../../forms/checkbox/YCheckbox.vue';
import YFieldText from '../../forms/field-text/YFieldText.vue';


const vue = {
   components: {
      YForm,
      YCheckbox,
      YFieldText,
      YButtonSubmit,
   },
   props: {
      ...propsButtonLoading,
      label: {
         default: () => text('Label', 'Submit'),
      },
      willBeEnabled: {
         default: () => boolean('Will Be Enabled', false),
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
         console.log('Submitting...');
         setTimeout(
            () => {
               console.log('Form submitted');
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
   
   <br/>
   <br/>
   
   <YButtonSubmit
      :label="label"
      :is-disabled="isDisabled"
      :loading-time="loadingTime"
      :spinner="spinner"
      :will-be-enabled="willBeEnabled"
   />
</YForm>
`;


export default StoryBuilder.createDefault('Buttons / Button Submit');
export const default_ = StoryBuilder.createBasicStory(vue, basicFormTemplate);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to take the submit action for certain data.
 */
`);
