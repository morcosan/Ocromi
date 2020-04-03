import { mount, shallowMount } from '@vue/test-utils';
import YFieldText from './YFieldText.vue';
import { i18n } from '.jest/vue-setup';


describe('YFieldText', () => {

   test('creates component - shallow', () => {
      const wrapper = shallowMount(YFieldText, { i18n });
      expect(wrapper.is(YFieldText)).toBe(true);
   });

   test('creates component - full', () => {
      const wrapper = mount(YFieldText, { i18n });
      expect(wrapper.is(YFieldText)).toBe(true);
   });

});


