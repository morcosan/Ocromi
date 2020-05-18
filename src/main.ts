import YBase from './components/YBase';
// forms
import YBaseForm from './components/forms/YBaseForm';
import YBaseInput from './components/forms/YBaseInput';
import YBaseInputField from './components/forms/YBaseInputField';
import YBaseInputGroup from './components/forms/YBaseInputGroup';
import YBaseInputSelect from './components/forms/YBaseInputSelect';
import YBaseInputSlider from './components/forms/YBaseInputSlider';
import YCheckbox from './components/forms/checkbox/YCheckbox.vue';
import YFieldCipher from './components/forms/field-cipher/YFieldCipher.vue';
import YFieldDate from './components/forms/field-date/YFieldDate.vue';
import YFieldEmail from './components/forms/field-email/YFieldEmail.vue';
import YFieldFileUpload from './components/forms/field-file-upload/YFieldFileUpload.vue';
import YFieldLink from './components/forms/field-link/YFieldLink.vue';
import YFieldMultiselect from './components/forms/field-multiselect/YFieldMultiselect.vue';
import YFieldNumber from './components/forms/field-number/YFieldNumber.vue';
import YFieldPassword from './components/forms/field-password/YFieldPassword.vue';
import YFieldSelect from './components/forms/field-select/YFieldSelect.vue';
import YFieldText from './components/forms/field-text/YFieldText.vue';
import YFieldTextArea from './components/forms/field-text-area/YFieldTextArea.vue';
import YForm from './components/forms/form/YForm.vue';
import YGroupCheckbox from './components/forms/group-checkbox/YGroupCheckbox.vue';
import YGroupRadio from './components/forms/group-radio/YGroupRadio.vue';
import YSlider from './components/forms/slider/YSlider.vue';
import YSliderRange from './components/forms/slider-range/YSliderRange.vue';
import YTemplateInput from './components/forms/YTemplateInput.vue';
import YTemplateInputGroup from './components/forms/YTemplateInputGroup.vue';
import YTemplateInputSlider from './components/forms/YTemplateInputSlider.vue';
// buttons
import YBaseButton from './components/buttons/YBaseButton';
import YBaseButtonLoading from './components/buttons/YBaseButtonLoading';
import YBaseButtonReset from './components/buttons/YBaseButtonReset';
import YBaseButtonSubmit from './components/buttons/YBaseButtonSubmit';
import YButtonBack from './components/buttons/button-back/YButtonBack.vue';
import YButtonBuy from './components/buttons/button-buy/YButtonBuy.vue';
import YButtonCancel from './components/buttons/button-cancel/YButtonCancel.vue';
import YButtonConfirm from './components/buttons/button-confirm/YButtonConfirm.vue';
import YButtonIcon from './components/buttons/button-icon/YButtonIcon.vue';
import YButtonLink from './components/buttons/button-link/YButtonLink.vue';
import YButtonReset from './components/buttons/button-reset/YButtonReset.vue';
import YButtonSubmit from './components/buttons/button-submit/YButtonSubmit.vue';
import YTemplateButton from './components/buttons/YTemplateButton.vue';
import YToggleSwitch from './components/buttons/toggle-switch/YToggleSwitch.vue';
// containers
import YLayout from './components/containers/layout/YLayout.vue';
import YPage from './components/containers/page/YPage.vue';
// navigation
import YNavBar from './components/navigation/nav-bar/YNavBar.vue';
// css
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';
import './css/app/index.scss';


import Vue from 'vue';
import Quasar from 'quasar';
import packageJSON from '../package.json';
import { install, Settings } from './core/settings';


// @ts-ignore
Vue.use(Quasar);


export class Ocromi {
   public static readonly version: string = 'v' + packageJSON.version;
   public static readonly license: string = packageJSON.license;
   public static readonly description: string = packageJSON.description;
   public static install(Vue: any, settings: Settings) {
      install(Vue, settings);
   }
}
export * from './core/decorators';
export * from './core/enums';
export {
   YBase,

   // forms
   YBaseForm,
   YBaseInput,
   YBaseInputField,
   YBaseInputGroup,
   YBaseInputSelect,
   YBaseInputSlider,
   YCheckbox,
   YFieldCipher,
   YFieldDate,
   YFieldEmail,
   YFieldFileUpload,
   YFieldLink,
   YFieldMultiselect,
   YFieldNumber,
   YFieldPassword,
   YFieldSelect,
   YFieldText,
   YFieldTextArea,
   YForm,
   YGroupCheckbox,
   YGroupRadio,
   YSlider,
   YSliderRange,
   YTemplateInput,
   YTemplateInputGroup,
   YTemplateInputSlider,

   // buttons
   YBaseButton,
   YBaseButtonLoading,
   YBaseButtonReset,
   YBaseButtonSubmit,
   YButtonBack,
   YButtonBuy,
   YButtonCancel,
   YButtonConfirm,
   YButtonIcon,
   YButtonLink,
   YButtonReset,
   YButtonSubmit,
   YTemplateButton,
   YToggleSwitch,

   // containers
   YLayout,
   YPage,

   // navigation
   YNavBar,
};


// display ocromi version in console
console.log(
   `%cPowered by Ocromi%c${ Ocromi.version }`,
   `
      padding: 4px 5px 4px 7px;
      background-color: #585858;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      color: #fff;
   `,
   `
      padding: 4px 7px 4px 5px;
      background-color: #6ab04c;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      color: #fff;
   `,
);
