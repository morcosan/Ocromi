import { extend } from 'quasar';


export default class Utils {

   public static isSpecialKey(event: KeyboardEvent) {
      const specialKeys = ['Tab', 'Backspace', 'Enter', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      if (specialKeys.includes(event.key)) {
         return true;
      }

      // spacial case: copy/paste
      if (event.ctrlKey) {
         return (event.key === 'c' || event.key === 'v');
      }

      return false;
   }


   public static insertSubstrInString(substr: string, str: string, position: number = 0) {
      return (str.slice(0, position) + substr + str.slice(position));
   }


   public static countSubstrInString(substr: string, str: string) {
      const regex = new RegExp(substr, 'g');
      return (str.match(regex) || []).length;
   }


   public static openURL(url: string) {
      const newWindow = globalThis.open('', '_blank');
      if (newWindow) {
         newWindow.opener = null;
         newWindow.location.href = url;
      }
   }


   public static mergeObjects(...args: object[]): object {
      return extend(true, {}, ...args);
   }

}
