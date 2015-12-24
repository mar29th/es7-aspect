import { BEFORE, AFTER, INTERCEPT } from './aspects';
import decorators from './decorators';

class Aspect {

  wrapFunction(obj, fun) {
    if ('undefined' === typeof this.functionAspectsMap || 'undefined' === typeof this.functionAspectsMap[fun.name]) return fun;
    else {
      let retval = function () {
        let aspectsMap = this.functionAspectsMap[fun.name];
        let args = Array.prototype.slice.call(arguments);
        let result;

        if ('undefined' !== typeof aspectsMap[BEFORE]) {
          aspectsMap[BEFORE].forEach(beforeAspectFunName => this[beforeAspectFunName].bind(obj)(...args));
        }
        if ('undefined' !== typeof aspectsMap[INTERCEPT]) {
          if (aspectsMap[INTERCEPT].length > 1) {
            throw new Error('Multiple interceptions: There can be one and only one interceptions');
          }

          let shouldContinue = true;
          let resolve = () => shouldContinue = true;
          let reject = (val) => {
            shouldContinue = false;
            if (val) result = val();
          };
          let interceptAspectFunName = aspectsMap[INTERCEPT][0];
          this[interceptAspectFunName](resolve, reject, ...args);
          if (!shouldContinue) return result;
        }
        result = fun.bind(obj)(...args);
        if ('undefined' !== typeof aspectsMap[AFTER]) {
          aspectsMap[AFTER].forEach(afterAspectFunName => this[afterAspectFunName].bind(obj)(...args));
        }
        return result;
      }.bind(this);
      for (let propName in fun) retval[propName] = fun[propName];
      return retval;
    }
  }

  applyToClass(clazz) {
    for (let funcName in this.functionAspectsMap) {
      if (!clazz.prototype.hasOwnProperty(funcName)) {
        throw new Error(`Function ${funcName} does not exist in class ${clazz.name} definition`);
      }
      clazz.prototype[funcName] = this.wrapFunction(clazz, clazz.prototype[funcName]);
    }
  }
}

for (let decoratorName in decorators) {
  Aspect[decoratorName] = decorators[decoratorName];
}

export default (Aspect);
