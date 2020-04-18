import { mount, shallowMount } from '@vue/test-utils';
import YButtonBuy from './YButtonBuy.vue';
import { i18n } from '.jest/vue-setup';


describe('YButtonBuy', () => {

   test('Creates component - shallow', () => {
      const wrapper = shallowMount(YButtonBuy, { i18n });
      expect(wrapper.is(YButtonBuy)).toBe(true);
   });

   test('Creates component - full', () => {
      const wrapper = mount(YButtonBuy, { i18n });
      expect(wrapper.is(YButtonBuy)).toBe(true);
   });

});


