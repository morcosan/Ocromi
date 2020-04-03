import YSlider from './YSlider.vue';
import { createStory, StoryLine } from '.storybook/story-utils/custom-story';
import { formSliderProps } from '.storybook/story-utils/knob-props';
import { withKnobs } from '@storybook/addon-knobs';


const vue = {
	components: {
		YSlider,
	},
	props: formSliderProps,
	data() {
		return {
			value: 50,
		};
	},
	methods: {
		onClick() {
			// @ts-ignore
			this.$refs.slider.validate();
		},
	},
};


const storyLines: StoryLine[] = [
	{
		title: 'Default',
		template: `
			<YSlider
				v-model="value"
				:label="label"
				:is-disabled="isDisabled"
				:is-required="isRequired"
				:is-readonly="isReadonly"
				:error="error"
				:thumb-suffix="thumbSuffix"
				:min-value="minValue"
				:max-value="maxValue"
				:value-step="valueStep"
				:step-decimals="stepDecimals"
				:has-markers="hasMarkers"
				ref="slider"
			/>
			<br/>
			<button class="story-button" @click="onClick">Validate</button>
		`,
		states: ['value'],
	},
];


export default {
	title: 'Form Controls / Other / Slider',
	decorators: [withKnobs],
};
export const default_ = createStory(vue, storyLines);
