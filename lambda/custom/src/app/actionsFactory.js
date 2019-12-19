'use strict';
const CONFERENCES_URL = 'https://npatarino.github.io/tech-conferences-spain/conferences.ics';
const getConferencesFactory = require('../core/actions/getConferences');
const conferencesRepositoryFactory = require('../core/infrastructure/ConferencesRepository');
const EventsRetrieverFromURLFactory = require('../core/infrastructure/EventsRetrieverFromURL');
const eventsRetriever = EventsRetrieverFromURLFactory({ url: CONFERENCES_URL });

module.exports = () => {
  const conferencesRepository = conferencesRepositoryFactory({ eventsRetriever });

  return {
    getConferences: getConferencesFactory({ conferencesRepository }),
  };
};
