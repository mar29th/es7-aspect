'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _aspects = require('./aspects');

var defineAspects = function defineAspects(aspectName, funName) {
  return function (target, name, descriptor) {
    if ('undefined' === typeof target.functionAspectsMap) target.functionAspectsMap = {};
    if ('undefined' === typeof target.functionAspectsMap[funName]) target.functionAspectsMap[funName] = {};
    if ('undefined' === typeof target.functionAspectsMap[funName][aspectName]) target.functionAspectsMap[funName][aspectName] = [];
    target.functionAspectsMap[funName][aspectName].push(descriptor.value.name);
    return descriptor;
  };
};

var useDecorator = function useDecorator(AspectClass) {
  return function (val) {
    new AspectClass().applyToClass(val);
  };
};

exports['default'] = {
  before: function before(funName) {
    return defineAspects(_aspects.BEFORE, funName);
  },
  after: function after(funName) {
    return defineAspects(_aspects.AFTER, funName);
  },
  intercept: function intercept(funName) {
    return defineAspects(_aspects.INTERCEPT, funName);
  },
  use: function use(aspectClass) {
    return useDecorator(aspectClass);
  }
};
module.exports = exports['default'];