import { mount, shallowMount } from '@vue/test-utils';
import YFieldLink from './YFieldLink.vue';
import { i18n } from '.jest/vue-setup';


describe('YFieldLink', () => {

   test('creates component - shallow', () => {
      const wrapper = shallowMount(YFieldLink, { i18n });
      expect(wrapper.is(YFieldLink)).toBe(true);
   });

   test('creates component - full', () => {
      const wrapper = mount(YFieldLink, { i18n });
      expect(wrapper.is(YFieldLink)).toBe(true);
   });

});


