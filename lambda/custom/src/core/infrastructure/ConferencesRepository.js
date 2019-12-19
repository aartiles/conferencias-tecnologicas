'use strict';

const moment = require('moment');
const Conference = require('../domain/Conference');

module.exports = ({ eventsRetriever }) => {
  const that = {};
  let _conferences = null;

  that.add = async ({ conference }) => {
    if (!_conferences) _conferences = [];
    _conferences.push(conference);
    return Promise.resolve();
  };

  that.find = async ({ when }) => {
    if (!_conferences) await _loadConferences();
    const found = _conferences.filter(conference => {
      return (
        moment(conference.start()).isBetween(when.from(), when.to()) ||
        moment(conference.end()).isBetween(when.from(), when.to()) ||
        moment(when.from()).isBetween(conference.start(), conference.end()) ||
        moment(when.to()).isBetween(conference.start(), conference.end())
      );
    });
    return Promise.resolve(found);
  };

  async function _loadConferences() {
    _conferences = [];
    const events = await eventsRetriever.retrieve();
    for (const event of Object.values(events)) {
      const conference = Conference({
        name: _cleanName(event.summary),
        start: event.start,
        end: event.end,
      });
      await that.add({ conference });
    }
  }

  function _cleanName(name) {
    return name.replace(/\(|\)|&/g, '').replace(', Spain', '');
  }

  that.clear = async () => {
    _conferences = null;
    Promise.resolve();
  };

  return that;
};
