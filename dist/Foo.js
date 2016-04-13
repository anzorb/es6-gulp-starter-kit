(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Foo = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @module Mocktail
 * @author Adam Timberlake
 * @see https://github.com/Wildhoney/Mocktail
 */

/**
 * @property PRODUCTION
 * @type {String}
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.resolve = resolve;
exports.mock = mock;
exports.stub = stub;
exports.env = env;
exports.inject = inject;
exports.reset = reset;
var PRODUCTION = 'production';

/**
 * @constant TESTING
 * @type {String}
 */
var TESTING = 'testing';

/**
 * @constant ENV
 * @type {{PRODUCTION: String, TESTING: String}}
 */
var ENV = { PRODUCTION: PRODUCTION, TESTING: TESTING };

exports.ENV = ENV;
/**
 * @property modules
 * @type {Map}
 */
var modules = new Map();

/**
 * @property currentEnvironment
 * @type {String}
 */
var currentEnvironment = PRODUCTION;

/**
 * @method isProduction
 * @return {Boolean}
 */
function isProduction() {
  return currentEnvironment === PRODUCTION;
}

/**
 * @method resolve
 * @param {Function} actualModule
 * @param {String} nameRepresentation
 * @return {*}
 */

function resolve(actualModule) {
  var nameRepresentation = arguments[1] === undefined ? '' : arguments[1];

  return mock(actualModule, nameRepresentation);
}

/**
 * @method mock
 * @param {Function} actualModule
 * @param {String} [nameRepresentation='']
 * @return {*}
 */

function mock(actualModule) {
  var nameRepresentation = arguments[1] === undefined ? '' : arguments[1];

  if ((!actualModule.name || actualModule.name === '_class') && !nameRepresentation) {

    // Prevent the user from passing an anonymous function/class.
    throw new Error('Mocktail: Passing anonymous function to mocktail.mock; use second argument to specify a name.');
  }

  var runtimeDependency = modules.get(nameRepresentation || actualModule.name);

  if (!isProduction() && typeof runtimeDependency !== 'undefined') {
    return runtimeDependency;
  }

  return actualModule;
}

/**
 * @method stub
 * @param {Array} modules
 * @return {*}
 */

function stub() {
  for (var _len = arguments.length, modules = Array(_len), _key = 0; _key < _len; _key++) {
    modules[_key] = arguments[_key];
  }

  if (modules.length === 0 || typeof modules[0] === 'undefined') {

    // Prevent the developer from shooting themselves in the foot.
    throw new Error('Mocktail: You must supply at least one component to the mocktail.stub method.');
  }

  var stubbedModule = typeof modules[1] !== 'undefined' ? modules[1] : modules[0];
  return isProduction() ? modules[0] : stubbedModule;
}

/**
 * @method env
 * @param {String} [name=null]
 * @return {String|void}
 */

function env() {
  var name = arguments[0] === undefined ? null : arguments[0];

  if (name === null) {
    return currentEnvironment;
  }

  if (! ~[PRODUCTION, TESTING].indexOf(name)) {

    // Ensure the developer is passing the correct values to avoid disappointment.
    throw new Error('Mocktail: Environment must be either mocktail.ENV.PRODUCTION or mocktail.ENV.TESTING.');
  }

  currentEnvironment = name;
}

/**
 * @method inject
 * @param {String} actualName
 * @param {*} stubModule
 * @return {void}
 */

function inject(actualName, stubModule) {

  if (typeof actualName !== 'string') {
    throw new Error('Mocktail: You must supply the function name of the object to stub.');
  }

  modules.set(actualName, stubModule);
}

/**
 * @method reset
 * @return {void}
 */

function reset() {
  currentEnvironment = PRODUCTION;
}

// Export an object of all the functions as the default.
exports['default'] = { resolve: resolve, stub: stub, env: env, inject: inject, mock: mock, reset: reset, ENV: ENV };
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mocktail = require('mocktail');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class Bar. Does things
 * @param {String} name
 */

var strings = ['Welcome', 'Willkommen', 'Bienvenue'];

var pickOneOutOfThree = function pickOneOutOfThree() {
    return Math.floor(Math.random(0, 2) * 3);
};

var Bar = function () {
    function Bar(name) {
        _classCallCheck(this, Bar);

        this.name = name;
    }

    /**
     * Welcome String getter
     */

    _createClass(Bar, [{
        key: 'welcomeString',
        get: function get() {
            return strings[pickOneOutOfThree()];
        }
    }]);

    return Bar;
}();

var BarMock = function () {
    function BarMock(name) {
        _classCallCheck(this, BarMock);

        this.name = name;
    }

    _createClass(BarMock, [{
        key: 'welcomeString',
        get: function get() {
            return 'Welcome';
        }
    }]);

    return BarMock;
}();

exports.default = (0, _mocktail.stub)(Bar, BarMock);

},{"mocktail":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bar3 = require('./Bar');

var _Bar4 = _interopRequireDefault(_Bar3);

var _mocktail = require('mocktail');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class Foo. Does things
 * @param {String} name
 */

var Foo = function (_Bar) {
    _inherits(Foo, _Bar);

    function Foo() {
        _classCallCheck(this, Foo);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Foo).apply(this, arguments));
    }

    _createClass(Foo, [{
        key: 'greet',

        /**
         * Draws the inside part of the opening (the door itself, transparent window, etc)
         * @private
         * @returns {THREE.Mesh}
         */
        value: function greet() {
            return 'hi, ' + this.name + '! ' + this.welcomeString;
        }
    }]);

    return Foo;
}(_Bar4.default);

var FooMock = function (_Bar2) {
    _inherits(FooMock, _Bar2);

    function FooMock() {
        _classCallCheck(this, FooMock);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FooMock).apply(this, arguments));
    }

    _createClass(FooMock, [{
        key: 'greet',
        value: function greet() {
            return 'hi, ' + this.name + '! Welcome';
        }
    }]);

    return FooMock;
}(_Bar4.default);

exports.default = (0, _mocktail.stub)(Foo, FooMock);

},{"./Bar":2,"mocktail":1}]},{},[3])(3)
});
//# sourceMappingURL=Foo.js.map
