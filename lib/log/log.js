var bunyan = require('bunyan');

module.exports = {
  logger: undefined,

  init: function() {
    this.logger = bunyan.createLogger({
      name: 'gah',
      level: 'debug',
      serializers: {
        req: bunyan.stdSerializers.req
      }
    });
  }
};
