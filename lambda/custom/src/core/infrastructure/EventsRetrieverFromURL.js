'use strict';

const ical = require('node-ical');

module.exports = ({ url }) => {
  const that = {};

  that.retrieve = async () => {
    return await ical.fromURL(url);
  };

  return that;
};
