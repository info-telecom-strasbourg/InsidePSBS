module.exports = ({ config }) => {
  config.version = process.env.RELEASE_VERSION || 'v0.0.0';
  config.ios.buildNumber = config.version.substring(1);
  return {
    ...config,
  };
};
  