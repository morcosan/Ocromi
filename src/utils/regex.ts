import * as VerEx from 'verbal-expressions';


// validate email addresses: https://emailregex.com/
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// validate allowed characters for email address
export const emailCharRegex = VerEx()
   .range('0', '9', 'a', 'z')
   .or()
   .anyOf(['!#$%&\'*+-/=?^_`{|}~', '.@'])
   .removeModifier('g');

// validate IP address
export const ipRegex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;

// validate URL without http
export const simpleLinkRegex = VerEx()
   .find(
      VerEx()
         .find(/^localhost/)
         .or(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/)
         .or(/^[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,5}/i),
   )
   .then(/(:[0-9]{1,5})?(\/[^\s]*)?$/)
   .removeModifier('g');

// validate number
export const numberRegex = /^-?\d*(\.\d+)?$/;


export default class Regex {

   public static isEmail(value: string) {
      return emailRegex.test(value);
   }

   public static isAllowedInEmail(value: string) {
      return emailCharRegex.test(value);
   }

   public static isIP(value: string) {
      return ipRegex.test(value);
   }

   public static isSimpleLink(value: string) {
      return simpleLinkRegex.test(value);
   }

   public static isNumber(value: string) {
      return numberRegex.test(value);
   }

}
