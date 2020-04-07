import YGroupCheckbox from './YGroupCheckbox.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { selectOptions } from '.storybook/custom/utils';
import { propsInputGroup } from '.storybook/custom/knob-props';
import { withKnobs } from '@storybook/addon-knobs';


const vue = {
   components: {
      YGroupCheckbox,
   },
   props: propsInputGroup,
   data() {
      return {
         value: [],
         options: selectOptions.splice(0, 4),
      };
   },
   methods: {
      onClick() {
         // @ts-ignore
         this.$refs.groupCheckbox.validate();
      },
   },
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
			<YGroupCheckbox
				v-model="value"
				:options="options"
				:label="label"
				:is-disabled="isDisabled"
				:is-required="isRequired"
				:is-readonly="isReadonly"
				:error="error"
				ref="groupCheckbox"
			/>
			<br/>
			<button class="story-button" @click="onClick">Validate</button>
		`,
      states: ['value'],
   },
];


export default {
   title: 'Forms / Other / Group Checkbox',
   decorators: [withKnobs],
};
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to select multiple options, no more than 5.
 * If more than 5 options are required, use a multiselect field instead.
 */
`);
