'use strict';

module.exports = ({ lastAccess }) => {
  const that = {};
  let _lastAccess = lastAccess;

  that.toJSON = () => ({
    lastAccess: _lastAccess,
  });

  return that;
};
