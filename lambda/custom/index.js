const Alexa = require('ask-sdk-core');
const persistence = require('./src/app/persistance');
const interceptors = require('./src/app/interceptors');

const {
  LaunchRequestHandler,
  GetConferencesIntentHandler,
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  ErrorHandler,
  SessionEndedRequestHandler,
  IntentReflectorHandler
} = require('./src/app/intent-handlers/');


// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    GetConferencesIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
  )
  .addErrorHandlers(
    ErrorHandler,
  )
  .addRequestInterceptors(
    interceptors.LocalizationRequestInterceptor,
    interceptors.LoggingRequestInterceptor,
    interceptors.LoadAttributesRequestInterceptor)
  .addResponseInterceptors(
    interceptors.LoggingResponseInterceptor,
    interceptors.SaveAttributesResponseInterceptor)
  .withPersistenceAdapter(persistence.getPersistenceAdapter())
  .withApiClient(new Alexa.DefaultApiClient())    
  .lambda();
