module.exports = ({ config }) => {
    config.version = process.env.RELEASE_VERSION || '0.0.0';
    return {
      ...config,
    };
  };
  