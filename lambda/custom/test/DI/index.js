'use strict';

const getConferencesFactory = require('../../src/core/actions/getConferences');
const UserRepositoryFactory = require('../../src/core/infrastructure/UsersRepository');
const ConferencesRepositoryFactory = require('../../src/core/infrastructure/ConferencesRepository');
const EventsRetrieverFromFileFactory = require('../../src/core/infrastructure/EventsRetrieverFromFile');
const eventsRetriever = EventsRetrieverFromFileFactory({ path: __dirname + '/../fixtures/conferences.ics' });
const storage = {};

module.exports = {
  getConferencesFactory,
  usersRepository: UserRepositoryFactory({ storage }),
  conferencesRepository: ConferencesRepositoryFactory({ eventsRetriever })
};