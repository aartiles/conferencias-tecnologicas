'use strict'

const should = require('should');
const { getConferencesFactory, conferencesRepository } = require('../../DI');
const { ensureConferences } = require('../../dataBuilders');
const { TimeFrame, ThisWeek, NextWeek, Day } = require('../../../src/core/domain/TimeFrame');

describe('getConferences action', () => {
  const getConferences = getConferencesFactory({ conferencesRepository });

  beforeEach(conferencesRepository.clear);

  it('should return no conferences when there aren\'t', async () => {
    const when = ThisWeek();
    await ensureConferences({ number: 1, when: NextWeek() });

    const conferences = await getConferences({ when });
    should(conferences).size(0);
  });

  it('should return conferences for this week', async () => {
    await ensureConferences({ number: 3, when: ThisWeek() });
    await ensureConferences({ number: 1, when: NextWeek() });

    const conferences = await getConferences({ when: ThisWeek() });

    should(conferences).size(3);
  });

  it('should return conferences that only one of their start or ends are inside the time frame', async () => {
    await ensureConferences({ number: 1, when: ThisWeek() });
    await ensureConferences({ number: 3, when: NextWeek() });

    const conferences = await getConferences({ when: Day({ day: 'wednesday'}) });

    should(conferences).size(1);
  });

  it('should return conferences for "this week" timeframe loading them before', async () => {
    const when = TimeFrame({ name: 'this_week', from: new Date('2019/11/01') , to: new Date('2019/11/15') });

    const conferences = await getConferences({ when });

    conferences[0].name().should.be.eql('Barcelona Perl  Friends Barcelona');
    conferences[1].name().should.be.eql('DevFest Granada');
    conferences[2].name().should.be.eql('DevFest Lleida');
    conferences[3].name().should.be.eql('Fabada Conf Gijón, Asturias');
    conferences[4].name().should.be.eql('JSDay Canarias Tenerife');
    conferences[5].name().should.be.eql('PHP.Barcelona Barcelona');
    should(conferences).size(6);
  });

});