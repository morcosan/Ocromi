import { mount, shallowMount } from '@vue/test-utils';
import YFieldTextArea from './YFieldTextArea.vue';
import { i18n } from '.jest/vue-setup';


describe('YFieldTextArea', () => {

	test('creates component - shallow', () => {
		const wrapper = shallowMount(YFieldTextArea, { i18n });
		expect(wrapper.is(YFieldTextArea)).toBe(true);
	});

	test('creates component - full', () => {
		const wrapper = mount(YFieldTextArea, { i18n });
		expect(wrapper.is(YFieldTextArea)).toBe(true);
	});

});


