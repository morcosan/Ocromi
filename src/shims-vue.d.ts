// TS checking for importing .vue files
declare module '*.vue' {
   import Vue from 'vue';
   export default Vue;
}
