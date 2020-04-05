import YGroupRadio from './YGroupRadio.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsInputGroup } from '.storybook/custom/knob-props';
import { withKnobs } from '@storybook/addon-knobs';


const options = [
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
];

const vue = {
   components: {
      YGroupRadio,
   },
   props: propsInputGroup,
   data() {
      return {
         value: null,
         options,
      };
   },
   methods: {
      onClick() {
         // @ts-ignore
         this.$refs.groupRadio.validate();
      },
   },
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
			<YGroupRadio
				v-model="value"
				:options="options"
				:label="label"
				:is-disabled="isDisabled"
				:is-required="isRequired"
				:is-readonly="isReadonly"
				:error="error"
				ref="groupRadio"
			/>
			<br/>
			<button class="story-button" @click="onClick">Validate</button>
		`,
      states: ['value'],
   },
];


export default {
   title: 'Forms / Other / Group Radio',
   decorators: [withKnobs],
};
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to select one option from no more than 5.
 * If more than 5 options are required, use a select field instead.
 */
`);
