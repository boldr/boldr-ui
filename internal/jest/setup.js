const { EventEmitter } = require('events');
const { shallow } = require('enzyme');
const { shallowToJson } = require('enzyme-to-json');

require('jest-enzyme');
// "^.+\\.(css|scss|less)$": "<rootDir>/internal/jest/styleMock.js"
// Some of the `jest-runtime` tests are very slow and cause
// timeouts on travis
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

global.shallow = shallow;

global.shallowToJson = shallowToJson;

window.matchMedia = function matchMedia() {
  return false;
};

EventEmitter.defaultMaxListeners = Infinity;

global.Array = Array;
global.Date = Date;
global.Function = Function;
global.Math = Math;
global.Number = Number;
global.Object = Object;
global.RegExp = RegExp;
global.String = String;
global.Uint8Array = Uint8Array;
global.WeakMap = WeakMap;
global.Set = Set;
global.Error = Error;
global.TypeError = TypeError;
global.parseInt = parseInt;
global.parseFloat = parseFloat;
