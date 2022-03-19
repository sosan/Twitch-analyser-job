const gracefulStopper = () => {
  return {
    stopGracefully: () => {
      process.exit(0);
    },
  };
};

module.exports = gracefulStopper;
