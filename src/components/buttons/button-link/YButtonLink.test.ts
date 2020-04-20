import { mount, shallowMount } from '@vue/test-utils';
import YButtonLink from './YButtonLink.vue';
import { i18n } from '.jest/vue-setup';


describe('YButtonLink', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YButtonLink, { i18n });
      expect(wrapper.is(YButtonLink)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YButtonLink, { i18n });
      expect(wrapper.is(YButtonLink)).toBe(true);
   });

});


