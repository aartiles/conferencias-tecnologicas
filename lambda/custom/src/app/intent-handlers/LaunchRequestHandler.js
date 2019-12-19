'use strict';
const Alexa = require('ask-sdk-core');

module.exports = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const { attributesManager } = handlerInput;
    const requestAttributes = attributesManager.getRequestAttributes();
    const speakOutput = requestAttributes.t('GREETING_MSG');

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .withShouldEndSession(false)
      .getResponse();
  },
};
