// forms
import YBaseInput from './components/forms/YBaseInput';
import YBaseInputField from './components/forms/YBaseInputField';
import YBaseInputGroup from './components/forms/YBaseInputGroup';
import YBaseInputSelect from './components/forms/YBaseInputSelect';
import YBaseInputSlider from './components/forms/YBaseInputSlider';
import YBaseForm from './components/forms/YBaseForm';
import YForm from './components/forms/form/YForm.vue';
import YCheckbox from './components/forms/checkbox/YCheckbox.vue';
import YFieldText from './components/forms/field-text/YFieldText.vue';
import YFieldEmail from './components/forms/field-email/YFieldEmail.vue';
import YFieldPassword from './components/forms/field-password/YFieldPassword.vue';
import YFieldTextArea from './components/forms/field-text-area/YFieldTextArea.vue';
import YFieldSelect from './components/forms/field-select/YFieldSelect.vue';
import YFieldMultiselect from './components/forms/field-multiselect/YFieldMultiselect.vue';
import YFieldCipher from './components/forms/field-cipher/YFieldCipher.vue';
import YFieldLink from './components/forms/field-link/YFieldLink.vue';
import YFieldNumber from './components/forms/field-number/YFieldNumber.vue';
import YFieldFileUpload from './components/forms/field-file-upload/YFieldFileUpload.vue';
import YFieldDate from './components/forms/field-date/YFieldDate.vue';
import YGroupCheckbox from './components/forms/group-checkbox/YGroupCheckbox.vue';
import YGroupRadio from './components/forms/group-radio/YGroupRadio.vue';
import YSlider from './components/forms/slider/YSlider.vue';
import YSliderRange from './components/forms/slider-range/YSliderRange.vue';
// buttons
import YBaseButton from './components/buttons/YBaseButton';
import YBaseButtonSubmit from './components/buttons/YBaseButtonSubmit';
import YBaseButtonLoading from './components/buttons/YBaseButtonLoading';
import YBaseButtonReset from './components/buttons/YBaseButtonReset';
import YTemplateButton from './components/buttons/YTemplateButton.vue';
import YButtonSubmit from './components/buttons/button-submit/YButtonSubmit.vue';
import YButtonConfirm from './components/buttons/button-confirm/YButtonConfirm.vue';
import YButtonReset from './components/buttons/button-reset/YButtonReset.vue';
import YButtonCancel from './components/buttons/button-cancel/YButtonCancel.vue';
import YButtonBuy from './components/buttons/button-buy/YButtonBuy.vue';
import YButtonIcon from './components/buttons/button-icon/YButtonIcon.vue';
import YButtonBack from './components/buttons/button-back/YButtonBack.vue';


import Vue from 'vue';
import Quasar from 'quasar';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';
import './css/app.scss';
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

export * from './core/enums';
export {
   // forms
   YBaseInput,
   YBaseInputField,
   YBaseInputGroup,
   YBaseInputSelect,
   YBaseInputSlider,
   YBaseForm,
   YForm,
   YCheckbox,
   YFieldText,
   YFieldEmail,
   YFieldPassword,
   YFieldTextArea,
   YFieldSelect,
   YFieldMultiselect,
   YFieldCipher,
   YFieldLink,
   YFieldNumber,
   YFieldDate,
   YFieldFileUpload,
   YGroupCheckbox,
   YGroupRadio,
   YSlider,
   YSliderRange,

   // buttons
   YBaseButton,
   YBaseButtonSubmit,
   YBaseButtonLoading,
   YBaseButtonReset,
   YTemplateButton,
   YButtonSubmit,
   YButtonConfirm,
   YButtonReset,
   YButtonCancel,
   YButtonBuy,
   YButtonIcon,
   YButtonBack,
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
