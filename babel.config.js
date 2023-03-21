module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            api: './api',
            assets: './assets',
            components: './components',
            pages: './pages',
            style: './style',
            utils: './utils',
            env: './env.js',
          },
        },
      ],
      [
      'module:react-native-dotenv',
      {
        "moduleName": "react-native-dotenv",
        "verbose": false,
      },
    ],
    ],
  };
};
