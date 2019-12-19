'use strict';

module.exports = ({ conferencesRepository }) => async ({ when }) => {
  return await conferencesRepository.find({ when });
};
