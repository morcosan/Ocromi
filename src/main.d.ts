import Vue, { VueConstructor } from 'vue';


export interface YForm extends Vue {}
export interface YCheckbox extends Vue {}
export interface YFieldText extends Vue {}
export interface YFieldEmail extends Vue {}
export interface YFieldPassword extends Vue {}
export interface YFieldTextArea extends Vue {}
export interface YFieldSelect extends Vue {}
export interface YFieldMultiselect extends Vue {}
export interface YGroupCheckbox extends Vue {}
export interface YGroupRadio extends Vue {}
export interface YFieldCipher extends Vue {}
export interface YFieldLink extends Vue {}
export interface YFieldNumber extends Vue {}
export interface YSlider extends Vue {}
export interface YSliderRange extends Vue {}
export interface YFieldDate extends Vue {}
export interface YFieldFileUpload extends Vue {}
export interface YButtonSubmit extends Vue {}

export const YForm: VueConstructor<YForm>;
export const YCheckbox: VueConstructor<YCheckbox>;
export const YFieldText: VueConstructor<YFieldText>;
export const YFieldEmail: VueConstructor<YFieldEmail>;
export const YFieldPassword: VueConstructor<YFieldPassword>;
export const YFieldTextArea: VueConstructor<YFieldTextArea>;
export const YFieldSelect: VueConstructor<YFieldSelect>;
export const YFieldMultiselect: VueConstructor<YFieldMultiselect>;
export const YGroupCheckbox: VueConstructor<YGroupCheckbox>;
export const YGroupRadio: VueConstructor<YGroupRadio>;
export const YFieldCipher: VueConstructor<YFieldCipher>;
export const YFieldLink: VueConstructor<YFieldLink>;
export const YFieldNumber: VueConstructor<YFieldNumber>;
export const YSlider: VueConstructor<YSlider>;
export const YSliderRange: VueConstructor<YSliderRange>;
export const YFieldDate: VueConstructor<YFieldDate>;
export const YFieldFileUpload: VueConstructor<YFieldFileUpload>;
export const YButtonSubmit: VueConstructor<YButtonSubmit>;
