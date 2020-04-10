import YSlider from './YSlider.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsInputSlider } from '.storybook/custom/knob-props';
import { withKnobs } from '@storybook/addon-knobs';


const vue = {
   components: {
      YSlider,
   },
   props: propsInputSlider,
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
				:is-optional="isOptional"
				:hides-optional="hidesOptional"
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
   title: 'Forms / Other / Slider',
   decorators: [withKnobs],
};
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to choose one value from a spectrum.
 */
`);
