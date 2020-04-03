import { mount, shallowMount } from '@vue/test-utils';
import YFieldSelect from './YFieldSelect.vue';
import { i18n } from '.jest/vue-setup';


describe('YFieldSelect', () => {

	test('creates component - shallow', () => {
		const wrapper = shallowMount(YFieldSelect, { i18n });
		expect(wrapper.is(YFieldSelect)).toBe(true);
	});

	test('creates component - full', () => {
		const wrapper = mount(YFieldSelect, { i18n });
		expect(wrapper.is(YFieldSelect)).toBe(true);
	});

});


