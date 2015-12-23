import { BEFORE, AFTER, INTERCEPT } from './aspects';

let defineAspects = (aspectName, funName) => (target, name, descriptor) => {
  if ('undefined' === typeof target.functionAspectsMap) target.functionAspectsMap = {};
  if ('undefined' === typeof target.functionAspectsMap[funName]) target.functionAspectsMap[funName] = {};
  if ('undefined' === typeof target.functionAspectsMap[funName][aspectName]) target.functionAspectsMap[funName][aspectName] = [];
  target.functionAspectsMap[funName][aspectName].push(descriptor.value.name);
  return descriptor;
};

let useDecorator = AspectClass => val => {
  new AspectClass().applyToClass(val);
};

export default {
  before: funName => defineAspects(BEFORE, funName),
  after: funName => defineAspects(AFTER, funName),
  intercept: funName => defineAspects(INTERCEPT, funName),
  use: aspectClass => useDecorator(aspectClass)
};
