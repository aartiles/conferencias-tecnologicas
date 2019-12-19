'use strict';
const Alexa = require('ask-sdk-core');
const actionsFactory = require('../actionsFactory');
const resolveSlots = require('../resolveSlots');
const { TimeFrameByName } = require('../../core/domain/TimeFrame');

module.exports = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetConferencesIntent'
    );
  },
  async handle(handlerInput) {
    const { attributesManager } = handlerInput;
    const requestAttributes = attributesManager.getRequestAttributes();
    const { getConferences } = actionsFactory(handlerInput);
    const { timeframe } = resolveSlots(handlerInput.requestEnvelope.request.intent.slots);

    console.log('timeframe', timeframe);
    const when = TimeFrameByName({ name: timeframe.resolved });
    console.log('when', when.name(), when.from(), when.to());

    const conferences = await getConferences({ when });
    const periodName = requestAttributes.t(when.name().toUpperCase());

    let speakOutput;
    if (conferences.length === 0) {
      speakOutput = requestAttributes.t('NO_CONFERENCES_MSG', periodName);
    } else {
      const conferencesText = conferences
        .map(conference =>
          requestAttributes.t(
            'CONFERENCE_MSG',
            conference.name(),
            conference.startAsText(),
            conference.endAsText(),
          ),
        )
        .join(' ');
      speakOutput = requestAttributes.t('CONFERENCES_MSG', periodName, conferencesText);
    }

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .withShouldEndSession(false)
      .getResponse();
  },
};
