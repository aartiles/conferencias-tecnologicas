'use strict';
const Alexa = require('ask-sdk-core');

module.exports = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' ||
        Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent')
    );
  },
  handle(handlerInput) {
    const { attributesManager } = handlerInput;
    const requestAttributes = attributesManager.getRequestAttributes();
    const speakOutput = requestAttributes.t('BYE_MSG');

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};
