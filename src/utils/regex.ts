/**
 * List of regex for various purposes
 */

import * as VerEx from 'verbal-expressions';


/** Validate email addresses: https://emailregex.com/ */
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


/** Validate characters for email address */
export const emailCharRegex = VerEx()
   .range('0', '9', 'a', 'z')
   .or()
   .anyOf(['!#$%&\'*+-/=?^_`{|}~', '.@'])
   .removeModifier('g');


/** Validate IP address */
export const ipRegex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;


/** Validate URL without http */
export const hyperlinkRegex = VerEx()
   .find(
      VerEx()
         .find(/^localhost/)
         .or(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/)
         .or(/^[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,5}/i),
   )
   .then(/(:[0-9]{1,5})?(\/[^\s]*)?$/)
   .removeModifier('g');


/** Validate number */
export const numberRegex = /^-?\d*(\.\d+)?$/;
