'use strict'

const should = require('should');
const moment = require('moment');
const { TimeFrame, TimeFrameByName } = require('../../../src/core/domain/Timeframe');
const InvalidTimeFrame = require('../../../src/core/domain/errors/InvalidTimeFrame');

describe('Timeframe', () => {
  it('should throw error is the name is not valid', () => {
    const name = 'not valid name';
    const from = moment('2019-01-01');
    const to = moment('2019-01-05');

    should(() => { TimeFrame({ name, from, to }); }).throwError(InvalidTimeFrame);
  });

  it('should create a valid timeframe', () => {
    const name = 'this_week';
    const from = moment('2019-01-01');
    const to = moment('2019-01-05');

    const timeframe = TimeFrame({ name, from, to });
    
    timeframe.name().should.be.eql(name);
  });

  it('should create a timeframe by name', () => {
    const name = 'july';
    const timeframe = TimeFrameByName({ name });
    
    timeframe.name().should.be.eql(name);
    moment(timeframe.from()).get('month').should.equal(6);
  });

});