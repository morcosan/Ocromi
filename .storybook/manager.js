import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';


addons.setConfig({
   theme: themes.dark,
   isFullscreen: false,
   showNav: true,
   showPanel: true,
   panelPosition: 'right',
   sidebarAnimations: true,
   enableShortcuts: false,
   isToolshown: true,
   selectedPanel: undefined,
});
