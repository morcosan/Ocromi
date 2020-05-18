const path = require('path');


module.exports = {
   stories: ['../src/**/*.stories.[tj]s'],
   addons: [
      '@storybook/preset-typescript',
      '@storybook/addon-a11y',
      '@storybook/addon-knobs',
      '@storybook/addon-storysource',
   ],
   webpackFinal: async (config, { configType }) => {
      // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
      // 'PRODUCTION' is used when building the static version of storybook

      // add SCSS loader
      config.module.rules.push({
         test: /\.scss$/,
         use: [
            'style-loader',
            'css-loader',
            {
               loader: 'postcss-loader',
               options: {
                  plugins: () => [require('autoprefixer')],
               },
            },
            {
               loader: 'sass-loader',
               options: {
                  prependData: '@import "~src/css/variables";',
               },
            },
         ],
         include: path.resolve(__dirname, '../'),
      });

      // add absolute path
      config.resolve.modules = [
         ...(config.resolve.modules || []),
         path.resolve(__dirname, '../'),
      ];

      return config;
   },
};
