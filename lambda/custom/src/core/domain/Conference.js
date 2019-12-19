'use strict';
const moment = require('moment');

module.exports = ({ name, start, end }) => {
  const that = {};

  that.name = () => name;
  that.start = () => start;
  that.end = () => end;
  that.startAsText = () => moment(start).format('MMDD');
  that.endAsText = () => moment(end).format('MMDD');

  return that;
};
