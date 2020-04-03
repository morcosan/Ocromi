/**
 * Utilities for stories
 */

import VueI18n from 'vue-i18n';
import messages from '../../src/i18n';
import faker from 'faker';
import './custom-story.scss';
import { boolean, text, number } from '@storybook/addon-knobs';


/** Localization setup */
const i18n = new VueI18n({
	locale: 'en-us',
	fallbackLocale: 'en-us',
	messages,
});


/** Utility options for select */
export const selectOptions = [
	{
		label: 'Little Cat',
		value: 'little_cat',
	},
	{
		label: 'Big Cat',
		value: 'big_cat',
	},
	{
		label: 'Little Dog',
		value: 'little_dog',
	},
	{
		label: 'Big Dog',
		value: 'big_dog',
	},
	{
		label: 'Little Fish',
		value: 'little_fish',
	},
	{
		label: 'Big Fish',
		value: 'big_fish',
	},
];


/** Interface for creating story */
export interface StoryLine {
	template: string;
	title: string;
	states: string[];
}


/** Crates stories with a specific format */
export function createStory(vue: object, stories: StoryLine[]) {
	let storyTemplate = '';
	stories.forEach((story: StoryLine) => {
		let statesTemplate = '';
		story.states.forEach((state: string) => {
			statesTemplate += `<div class="story__state">{{ ${ state } }}</div>`;
		});

		storyTemplate += `
		<div class="story">
			<div class="story_header">
				<h6 class="story__title">${ story.title }</h6>
				${ statesTemplate }
			</div>
			${ story.template }
		</div>
		`;
	});

	return () => ({
		...vue,
		i18n,
		template: `
			<div class="story-display">
				${ storyTemplate }
			</div>
		`,
	});
}


/** Crates a story based on template */
export function createBasicStory(vue: object, template: string) {
	return () => ({
		...vue,
		i18n,
		template,
	});
}


/** Utility function for generating random list of options */
export function randomOptions(total: number, fakerCategory: string, fakerList: string) {
	const list: object[] = [];
	while (list.length < total) {
		// @ts-ignore
		const fake = faker[fakerCategory][fakerList]();
		// @ts-ignore
		if (!list.find(e => e.value === fake)) {
			list.push({
				value: fake,
				label: fake,
			});
		}
	}
	return list;
}
