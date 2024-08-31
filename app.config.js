module.exports = ({ config }) => {
  config.version = process.env.RELEASE_VERSION || '0.0.0';
  config.ios.buildNumber = process.env.RELEASE_VERSION || '0.0.0';
  return {
    ...config,
  };
};
  