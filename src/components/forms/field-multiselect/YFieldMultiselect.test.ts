import { mount, shallowMount } from '@vue/test-utils';
import YFieldMultiselect from './YFieldMultiselect.vue';
import { i18n } from '.jest/vue-setup';


describe('YFieldMultiselect', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YFieldMultiselect, { i18n });
      expect(wrapper.is(YFieldMultiselect)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YFieldMultiselect, { i18n });
      expect(wrapper.is(YFieldMultiselect)).toBe(true);
   });

});


