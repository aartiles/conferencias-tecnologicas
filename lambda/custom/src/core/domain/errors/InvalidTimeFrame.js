'use strict';

module.exports = class InvalidTimeFrame extends Error {
  constructor(message) {
    super(message);
  }
};
