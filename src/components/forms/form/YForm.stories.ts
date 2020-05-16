import StoryBuilder from '.storybook/custom/story-builder';
import { generateRandomOptions } from '.storybook/custom/utils';
import '.storybook/custom/story-builder.scss';
import { boolean, text } from '@storybook/addon-knobs';
import YForm from './YForm.vue';
import YCheckbox from '../checkbox/YCheckbox.vue';
import YFieldText from '../field-text/YFieldText.vue';
import YFieldEmail from '../field-email/YFieldEmail.vue';
import YFieldPassword from '../field-password/YFieldPassword.vue';
import YFieldTextArea from '../field-text-area/YFieldTextArea.vue';
import YFieldSelect from '../field-select/YFieldSelect.vue';
import YFieldMultiselect from '../field-multiselect/YFieldMultiselect.vue';
import YGroupCheckbox from '../group-checkbox/YGroupCheckbox.vue';
import YGroupRadio from '../group-radio/YGroupRadio.vue';
import YFieldCipher from '../field-cipher/YFieldCipher.vue';
import YFieldLink from '../field-link/YFieldLink.vue';
import YFieldNumber from '../field-number/YFieldNumber.vue';
import YSlider from '../slider/YSlider.vue';
import YSliderRange from '../slider-range/YSliderRange.vue';
import YFieldDate from '../field-date/YFieldDate.vue';
import YFieldFileUpload from '../field-file-upload/YFieldFileUpload.vue';
import YButtonSubmit from '../../buttons/button-submit/YButtonSubmit.vue';
import YButtonReset from '../../buttons/button-reset/YButtonReset.vue';
import { groupId, settingsComputed, settingsProps } from '.storybook/custom/knob-props';


// generate random lists
const jobTitleList: object[] = generateRandomOptions(10, 'name', 'jobTitle');
const hobbyList: object[] = generateRandomOptions(10, 'commerce', 'department');


const vue = {
   components: {
      YForm,
      YCheckbox,
      YFieldText,
      YFieldEmail,
      YFieldPassword,
      YFieldTextArea,
      YFieldSelect,
      YFieldMultiselect,
      YGroupCheckbox,
      YGroupRadio,
      YFieldCipher,
      YFieldLink,
      YFieldNumber,
      YSlider,
      YSliderRange,
      YFieldDate,
      YFieldFileUpload,
      YButtonSubmit,
      YButtonReset,
   },
   props: {
      isDisabled: {
         default: () => boolean('Is Disabled', false, groupId),
      },
      isMini: {
         default: () => boolean('Is Mini', false, groupId),
      },
      sideLabelWidth: {
         default: () => text('Side Label Width', '', groupId),
      },
      optional: {
         default: () => boolean('Inputs: Is Optional', false),
      },
      ...settingsProps,
   },
   data() {
      return {
         email: '',
         fullName: '',
         password: '',
         password2: '',
         description: '',
         jobTitle: '',
         website: '',
         hobbies: [],
         jobTypes: [],
         jobTypeList: [
            {
               label: 'Full-time',
               value: 'full_time',
            },
            {
               label: 'Part-time',
               value: 'part_time',
            },
            {
               label: 'Contract',
               value: 'contract',
            },
            {
               label: 'Project',
               value: 'project',
            },
         ],
         gender: null,
         genderList: [
            {
               value: 'male',
               label: 'Male',
            },
            {
               value: 'female',
               label: 'Female',
            },
            {
               value: 'other',
               label: 'Other',
            },
         ],
         cardNumber: '',
         budget: '',
         successRange: {
            min: 40,
            max: 60,
         },
         hasTOS: false,
         hasSpam: false,
         successRate: 50,
         meetingDate: '',
         documents: [],
         jobTitleList,
         hobbyList,
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
         }, 5000);
      },
   },
};


const basicFormTemplate = `
<YForm 
   :is-mini="isMini"
   :is-disabled="isDisabled"
   :side-label-width="sideLabelWidth"
   class="story-form-panel"
   :settings="settings"
   @submit="onSubmit" 
   ref="form"
>
   <YFieldText
      v-model="fullName"
      label="Full name"
      :is-optional="optional"
   />

   <YFieldEmail
      v-model="email"
      label="Email address"
      placeholder="email@gmail.com"
      :is-optional="optional"
   />

   <YFieldPassword
      v-model="password"
      label="New password"
      has-meter
      :is-optional="optional"
   />
   
   <YFieldPassword
      v-model="password2"
      label="Confirm password"
      :is-optional="optional"
   />
   
   <YFieldTextArea
      v-model="description"
      label="Description"
      :is-optional="optional"
   />
   
   <YFieldLink
      v-model="website"
      label="Website"
      placeholder="Enter your website"
      :is-optional="optional"
   />
   
   <YFieldSelect
      v-model="jobTitle"
      :options="jobTitleList"
      label="Job title"
      :is-optional="optional"
   />
   
   <YFieldMultiselect
      v-model="hobbies"
      :options="hobbyList"
      :selection-limit="5"
      label="Hobbies"
      hint="Select 5 hobbies"
      can-add-new
      :is-optional="optional"
   />
   
   <YFieldNumber
      v-model="budget"
      :value-step="10"
      :decimals="2"
      label="Budget"
      placeholder="Enter your budget"
      :is-optional="optional"
   />
      
   <YGroupCheckbox
      v-model="jobTypes"
      :options="jobTypeList"
      label="Job preferences"
      :is-optional="optional"
   />
   
   <YGroupRadio
      v-model="gender"
      :options="genderList"
      label="Gender"
      :is-optional="optional"
   />
   
   <YFieldCipher
      v-model="cardNumber"
      input-mask="####  ####  ####  ####"
      label="Card number"
      :is-optional="optional"
   />
   
   <YSlider
      v-model="successRate"
      :min-value="0"
      :max-value="100"
      :value-step="5"
      label="Success rate"
      thumb-label=" %"
      :is-optional="optional"
   />
   
   <YSliderRange
      v-model="successRange"
      :min-value="0"
      :max-value="100"
      label="Success range"
      thumb-label=" %"
      :is-optional="optional"
   />
   
   <YFieldDate
      v-model="meetingDate"
      label="Meeting date"
      :is-optional="optional"
   />
   
   <YFieldFileUpload
      v-model="documents"
      label="Upload documents"
      :max-num-files="3"
      is-multiple
      :is-optional="optional"
   />
   
   <YCheckbox 
      v-model="hasSpam"
      label="I want spam"
      error="You must want spam"
      :is-optional="optional"
   />
   
   <YCheckbox 
      v-model="hasTOS"
      side-label-width=""
      error="You must agree with our terms"
      :is-optional="optional"
   >
      I agree with terms of service
   </YCheckbox>
   
   <br>
   <br>
   
   <YButtonSubmit	label="Save"/>
   <YButtonReset label="Reset"/>
</YForm>
`;


const loginFormTemplate = `
<YForm 
   :is-mini="isMini"
   :side-label-width="sideLabelWidth"
   class="story-form-panel"
   :settings="settings"
   @submit="onSubmit" 
   ref="form"
>
   <YFieldEmail
      v-model="email"
      label="Email address"
      placeholder="email@gmail.com"
      :is-optional="optional"
   />

   <YFieldPassword
      v-model="password"
      label="New password"
      :is-optional="optional"
   />
   
   <br>
   
   <YButtonSubmit	
      label="Log In" 
      will-be-enabled
      style="width: 100%"
   />
</YForm>
`;


export default StoryBuilder.createDefault('Forms / Form');
export const default_ = StoryBuilder.createBasicStory(vue, basicFormTemplate);
export const login = StoryBuilder.createBasicStory(vue, loginFormTemplate);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when displaying form controls.
 */
`);
