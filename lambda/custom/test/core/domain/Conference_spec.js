'use strict'

require('should');
const moment = require('moment');
const Conference = require('../../../src/core/domain/Conference');

describe('Conference', () => {
  it('should create a valid conference', () => {
    const name = 'conference name';
    const start = moment('2019-01-01');
    const end = moment('2019-01-05');

    const conference = Conference({ name, start, end });

    conference.name().should.be.eql(name);
    conference.startAsText().should.be.eql('0101');
    conference.endAsText().should.be.eql('0105');
  });
});