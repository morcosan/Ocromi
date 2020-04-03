import { mount, shallowMount } from '@vue/test-utils';
import YFieldCipher from './YFieldCipher.vue';
import { i18n } from '.jest/vue-setup';


describe('YFieldCipher', () => {

   test('creates component - shallow', () => {
      const wrapper = shallowMount(YFieldCipher, { i18n });
      expect(wrapper.is(YFieldCipher)).toBe(true);
   });

   test('creates component - full', () => {
      const wrapper = mount(YFieldCipher, { i18n });
      expect(wrapper.is(YFieldCipher)).toBe(true);
   });

});


