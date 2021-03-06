'use strict';
require('../common');
const assert = require('assert');
const vm = require('vm');

// Check that we do not accidentally query attributes.
// Issue: https://github.com/nodejs/node/issues/11902
const handler = {
  getOwnPropertyDescriptor: (target, prop) => {
    throw new Error('whoops');
  }
};
const sandbox = new Proxy({ foo: 'bar' }, handler);
const context = vm.createContext(sandbox);

assert.doesNotThrow(() => vm.runInContext('', context));
