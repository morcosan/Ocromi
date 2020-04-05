import { mount, shallowMount } from '@vue/test-utils';
import YFieldFileUpload from './YFieldFileUpload.vue';
import { i18n } from '.jest/vue-setup';


describe('YFieldFileUpload', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YFieldFileUpload, { i18n });
      expect(wrapper.is(YFieldFileUpload)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YFieldFileUpload, { i18n });
      expect(wrapper.is(YFieldFileUpload)).toBe(true);
   });

});


