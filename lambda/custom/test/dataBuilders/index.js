'use strict';

const faker = require('faker');
const moment = require('moment');
const { conferencesRepository } = require('../DI/');
const Conference = require('../../src/core/domain/Conference');
const { ThisWeek } = require('../../src/core/domain/TimeFrame');

function aTimeFrame() {
  return ThisWeek();
}

function aConference({ when }) {
  return Conference({
    name: faker.random.words(5),
    start: when ? moment(when.from()).add(1, 'minute') : moment(),
    end: when ? moment(when.to()).add(-1, 'minute') : moment()
  });
}

async function ensureConferences({ number, when }) {
  for (let i = 0; i < number; i++) {
    await conferencesRepository.add({ conference: aConference({ when }) });
  }
}

module.exports = {
  aTimeFrame,
  aConference,
  ensureConferences
};