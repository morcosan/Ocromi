import { mount, shallowMount } from '@vue/test-utils';
import YFieldDate from './YFieldDate.vue';
import { i18n } from '.jest/vue-setup';


describe('YFieldDate', () => {

   test('creates component - shallow', () => {
      const wrapper = shallowMount(YFieldDate, { i18n });
      expect(wrapper.is(YFieldDate)).toBe(true);
   });

   test('creates component - full', () => {
      const wrapper = mount(YFieldDate, { i18n });
      expect(wrapper.is(YFieldDate)).toBe(true);
   });

});


