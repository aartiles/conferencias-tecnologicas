'use strict';
const User = require('../domain/User');

module.exports = ({ storage }) => {
  const that = {};
  storage.user = storage.user || {};

  that.save = async ({ user }) => {
    storage.user = user.toJSON();
    return Promise.resolve();
  };

  that.retrieve = async () => {
    const lastAccess = storage.user.lastAccess;
    const user = User({ lastAccess });
    return Promise.resolve(user);
  };

  that.clear = async () => {
    storage.user = {};
    Promise.resolve();
  };

  return that;
};
