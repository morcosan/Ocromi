/**
 * This file is mandatory for TS checking when importing .vue files
 */
declare module '*.vue' {
   import Vue from 'vue';
   export default Vue;
}
