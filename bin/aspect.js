'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aspects = require('./aspects');

var _decorators = require('./decorators');

var _decorators2 = _interopRequireDefault(_decorators);

var Aspect = (function () {
  function Aspect() {
    _classCallCheck(this, Aspect);
  }

  _createClass(Aspect, [{
    key: 'wrapFunction',
    value: function wrapFunction(obj, fun) {
      if ('undefined' === typeof this.functionAspectsMap || 'undefined' === typeof this.functionAspectsMap[fun.name]) return fun;else {
        var retval = (function () {
          var _this = this;

          var aspectsMap = this.functionAspectsMap[fun.name];
          var args = Array.prototype.slice.call(arguments);
          var result = undefined;

          if ('undefined' !== typeof aspectsMap[_aspects.BEFORE]) {
            aspectsMap[_aspects.BEFORE].forEach(function (beforeAspectFunName) {
              return _this[beforeAspectFunName].bind(obj).apply(undefined, _toConsumableArray(args));
            });
          }
          if ('undefined' !== typeof aspectsMap[_aspects.INTERCEPT]) {
            if (aspectsMap[_aspects.INTERCEPT].length > 1) {
              throw new Error('Multiple interceptions: There can be one and only one interceptions');
            }

            var shouldContinue = true;
            var resolve = function resolve() {
              return shouldContinue = true;
            };
            var reject = function reject(val) {
              shouldContinue = false;
              if (val) result = val();
            };
            var interceptAspectFunName = aspectsMap[_aspects.INTERCEPT][0];
            this[interceptAspectFunName].apply(this, [resolve, reject].concat(_toConsumableArray(args)));
            if (!shouldContinue) return result;
          }
          result = fun.bind(obj).apply(undefined, _toConsumableArray(args));
          if ('undefined' !== typeof aspectsMap[_aspects.AFTER]) {
            aspectsMap[_aspects.AFTER].forEach(function (afterAspectFunName) {
              return _this[afterAspectFunName].bind(obj).apply(undefined, _toConsumableArray(args));
            });
          }
          return result;
        }).bind(this);
        for (var propName in fun) {
          retval[propName] = fun[propName];
        }return retval;
      }
    }
  }, {
    key: 'applyToClass',
    value: function applyToClass(clazz) {
      for (var funcName in this.functionAspectsMap) {
        if (!clazz.prototype.hasOwnProperty(funcName)) {
          throw new Error('Function ' + funcName + ' does not exist in class ' + clazz.name + ' definition');
        }
        clazz.prototype[funcName] = this.wrapFunction(clazz, clazz.prototype[funcName]);
      }
    }
  }]);

  return Aspect;
})();

for (var decoratorName in _decorators2['default']) {
  Aspect[decoratorName] = _decorators2['default'][decoratorName];
}

exports['default'] = Aspect;
module.exports = exports['default'];