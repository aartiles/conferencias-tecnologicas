'use strict';

const ical = require('node-ical');

module.exports = ({ path }) => {
  const that = {};

  that.retrieve = async () => {
    return await ical.async.parseFile(path);
  };

  return that;
};
