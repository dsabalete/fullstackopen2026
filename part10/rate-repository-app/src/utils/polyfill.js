/* eslint-disable no-undef */
if (typeof FinalizationRegistry === 'undefined') {
  global.FinalizationRegistry = class FinalizationRegistry {
    constructor() {}
    register() {}
    unregister() {}
  };
}
