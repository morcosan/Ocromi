import YSliderRange from './YSliderRange.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsInputSlider } from '.storybook/custom/knob-props';
import { boolean, withKnobs } from '@storybook/addon-knobs';


const vue = {
   components: {
      YSliderRange,
   },
   props: {
      ...propsInputSlider,
      isFixed: {
         default: () => boolean('Is Fixed', false),
      },
   },
   data() {
      return {
         value: {
            min: 30,
            max: 70,
         },
      };
   },
   methods: {
      onClick() {
         // @ts-ignore
         this.$refs.sliderRange.validate();
      },
   },
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
			<YSliderRange
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
				:is-fixed="isFixed"
				ref="sliderRange"
			/>
			<br/>
			<button class="story-button" @click="onClick">Validate</button>
		`,
      states: ['value'],
   },
];


export default {
   title: 'Forms / Other / Slider Range',
   decorators: [withKnobs],
};
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to choose an interval from a spectrum.
 */
`);
