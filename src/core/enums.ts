import Vue from 'vue';


export enum Theme {
   Light = 'LIGHT',
   Dark = 'DARK',
}

export enum Design {
   Material = 'MATERIAL',
   Flat = 'FLAT',
}

export enum DuoStyle {
   FilledText = 'FILLED_TEXT',
   FilledOutlined = 'FILLED_OUTLINED',
}

export enum Spinner {
   Default = 'DEFAULT',
   Bars = 'BARS',
   Cube = 'CUBE',
   Dots = 'DOTS',
   Facebook = 'FACEBOOK',
   Grid = 'GRID',
   Hourglass = 'HOURGLASS',
   IOS = 'IOS',
   Circle = 'CIRCLE',
   Pie = 'PIE',
   Radio = 'RADIO',
}

export enum ButtonStyle {
   Filled = 'FILLED',
   Outlined = 'OUTLINED',
   Text = 'TEXT',
}

export enum IconSize {
   UltraSmall = 'xs',
   Small = 'sm',
   Medium = 'md',
   Large = 'lg',
   UltraLarge = 'xl',
}

export enum BuyIcon {
   Default = 'shopping_cart',
   Add = 'add_shopping_cart',
   Play = 'shop',
   Basket = 'shopping_basket',
   None = '',
}


Vue.mixin({
   computed: {
      YTheme(): typeof Theme {
         return Theme;
      },
      YDesign(): typeof Design {
         return Design;
      },
      YDuoStyle(): typeof DuoStyle {
         return DuoStyle;
      },
      YSpinner(): typeof Spinner {
         return Spinner;
      },
      YButtonStyle(): typeof ButtonStyle {
         return ButtonStyle;
      },
      YIconSize(): typeof IconSize {
         return IconSize;
      },
      YBuyIcon(): typeof BuyIcon {
         return BuyIcon;
      },
   },
});
