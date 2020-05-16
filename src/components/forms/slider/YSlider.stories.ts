import YSlider from './YSlider.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsInputSlider, settingsComputed } from '.storybook/custom/knob-props';


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
   computed: settingsComputed,
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
            :thumb-suffix="thumbSuffix"
            :min-value="minValue"
            :max-value="maxValue"
            :value-step="valueStep"
            :step-decimals="stepDecimals"
            :has-markers="hasMarkers"
            :error="error"
            :is-mini="isMini"
            :side-label-width="sideLabelWidth"
            ref="slider"
         />
         <br>
         <button class="story-button" @click="onClick">Validate</button>
      `,
      states: ['value'],
   },
];


export default StoryBuilder.createDefault('Forms / Inputs / Slider');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to choose one value from a spectrum.
 */
`);
