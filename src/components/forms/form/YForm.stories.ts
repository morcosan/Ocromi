import StoryBuilder from '.storybook/custom/story-builder';
import { generateRandomOptions } from '.storybook/custom/utils';
import '.storybook/custom/story-builder.scss';
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
import { boolean, text } from '@storybook/addon-knobs';


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
   },
   props: {
      isMini: {
         default: () => boolean('Is Mini', false),
      },
      sideLabelWidth: {
         default: () => text('Side Label Width', ''),
      },
   },
   data() {
      return {
         value: null,
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
   methods: {
      onSubmit(event: Event) {
         console.log('form submitted');
      },
   },
};


const basicFormTemplate = `
<YForm 
   :is-mini="isMini"
   :side-label-width="sideLabelWidth"
   class="story-form-panel"
   @submit="onSubmit" 
>
   <YFieldText
      v-model="fullName"
      label="Full name"
   />

   <YFieldEmail
      v-model="email"
      label="Email address"
      placeholder="email@gmail.com"
   />

   <YFieldPassword
      v-model="password"
      label="New password"
      has-meter
   />
   
   <YFieldPassword
      v-model="password2"
      label="Confirm password"
   />
   
   <YFieldTextArea
      v-model="description"
      label="Description"
   />
   
   <YFieldLink
      v-model="website"
      label="Website"
      placeholder="Enter your website"
   />
   
   <YFieldSelect
      v-model="jobTitle"
      :options="jobTitleList"
      label="Job title"
   />
   
   <YFieldMultiselect
      v-model="hobbies"
      :options="hobbyList"
      :selection-limit="5"
      label="Hobbies"
      hint="Select 5 hobbies"
      can-add-new
   />
   
   <YFieldNumber
      v-model="budget"
      :value-step="10"
      :decimals="2"
      label="Budget"
      placeholder="Enter your budget"
   />
      
   <YGroupCheckbox
      v-model="jobTypes"
      :options="jobTypeList"
      label="Job preferences"
   />
   
   <YGroupRadio
      v-model="gender"
      :options="genderList"
      label="Gender"
   />
   
   <YFieldCipher
      v-model="cardNumber"
      input-mask="####  ####  ####  ####"
      label="Card number"
   />
   
   <YSlider
      v-model="successRate"
      :min-value="0"
      :max-value="100"
      :value-step="5"
      label="Success rate"
      thumb-label=" %"
   />
   
   <YSliderRange
      v-model="successRange"
      :min-value="0"
      :max-value="100"
      label="Success range"
      thumb-label=" %"
   />
   
   <YFieldDate
      v-model="meetingDate"
      label="Meeting date"
   />
   
   <YFieldFileUpload
      v-model="documents"
      label="Upload 3 documents"
      :max-num-files="3"
      :rules="[ (value) => (value.length === 3 || 'Please select 3 documents') ]"
      is-multiple
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
   
   <YButtonSubmit	label="Validate"/>
</YForm>
`;


export default StoryBuilder.createDefault('Forms / Form');
export const default_ = StoryBuilder.createBasicStory(vue, basicFormTemplate);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when displaying form controls.
 */
`);
