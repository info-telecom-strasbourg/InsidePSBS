module.exports = ({ config }) => {
  const version = process.env.RELEASE_VERSION || 'v0.0.0';
  config.version = version.substring(1);
  config.ios.buildNumber = config.version;
  return {
    ...config,
  };
};
  