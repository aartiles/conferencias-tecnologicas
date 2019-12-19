'use strict';
const Alexa = require('ask-sdk-core');

module.exports = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
    );
  },
  handle(handlerInput) {
    const { attributesManager } = handlerInput;
    const requestAttributes = attributesManager.getRequestAttributes();

    const speakOutput = requestAttributes.t('HELP_MSG');

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};
