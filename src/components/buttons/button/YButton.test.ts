import { mount, shallowMount } from '@vue/test-utils';
import YButtonLv3 from './YButton.vue';
import { i18n } from '.jest/vue-setup';


describe('YButtonLv3', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YButtonLv3, { i18n });
      expect(wrapper.is(YButtonLv3)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YButtonLv3, { i18n });
      expect(wrapper.is(YButtonLv3)).toBe(true);
   });

});


