import { createBasicStory, createDocs, randomOptions } from '.storybook/story-utils/custom-story';
import '.storybook/story-utils/custom-story.scss';
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


// generate random lists
const jobTitleList: object[] = randomOptions(10, 'name', 'jobTitle');
const hobbyList: object[] = randomOptions(10, 'commerce', 'department');


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
         termOfService: false,
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
<YForm @submit="onSubmit" class="story-form-panel">
	<div>
		<YFieldText
			v-model="fullName"
			label="Full name"
			is-required
			has-spacing
		/>
		
		<YFieldEmail
			v-model="email"
			label="Email address"
			placeholder="email@gmail.com"
			is-required
			has-spacing
		/>
		
		<YFieldPassword
			v-model="password"
			label="New password"
			is-required
			has-spacing
			has-meter
		/>
		
		<YFieldPassword
			v-model="password2"
			label="Confirm password"
			is-required
			has-spacing
		/>
		
		<YFieldTextArea
			v-model="description"
			label="Description"
			is-required
			has-spacing
		/>
		
		<YFieldLink
			v-model="website"
			label="Website"
			placeholder="Enter your website"
			is-required
			has-spacing
		/>
		
		<YFieldSelect
			v-model="jobTitle"
			:options="jobTitleList"
			label="Job title"
			is-required
			has-spacing
		/>
		
		<YFieldMultiselect
			v-model="hobbies"
			:options="hobbyList"
			:selection-limit="5"
			label="Hobbies"
			hint="Select 5 hobbies"
			can-add-new
			is-required
			has-spacing
		/>
		
		<YFieldNumber
			v-model="budget"
			:value-step="10"
			:decimals="2"
			label="Budget"
			placeholder="Enter your budget"
			is-required
			has-spacing
		/>
	</div>
	
	<div>		
		<YGroupCheckbox
			v-model="jobTypes"
			:options="jobTypeList"
			label="Job preferences"
			is-required
			has-spacing
		/>
		
		<YGroupRadio
			v-model="gender"
			:options="genderList"
			label="Gender"
			is-required
			has-spacing
		/>
		
		<YFieldCipher
			v-model="cardNumber"
			input-mask="####  ####  ####  ####"
			label="Card number"
			is-required
			has-spacing
		/>
		
		<YSlider
			v-model="successRate"
			:min-value="0"
			:max-value="100"
			:value-step="5"
			label="Success rate"
			thumb-label=" %"
			is-required
			has-spacing
		/>
		
		<YSliderRange
			v-model="successRange"
			:min-value="0"
			:max-value="100"
			label="Success range"
			thumb-label=" %"
			is-required
			has-spacing
		/>
		
		<YFieldDate
			v-model="meetingDate"
			label="Meeting date"
			is-required
			has-spacing
		/>
		
		<YFieldFileUpload
			v-model="documents"
			label="Upload 3 documents"
			:max-num-files="3"
			:rules="[ (value) => (value.length === 3 || 'Please select 3 documents') ]"
			is-multiple
			is-required
			has-spacing
		/>
		
		<YCheckbox
			v-model="termOfService"
			is-required
			has-spacing
		>
			I agree with terms of service
		</YCheckbox>
		
		<YButtonSubmit	label="Validate"/>
	</div>
</YForm>
`;


export default {
   title: 'Forms / Form',
};
export const default_ = createBasicStory(vue, basicFormTemplate);
export const docs = createDocs(`

`);
