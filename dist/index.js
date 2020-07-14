'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isCollection = require('iterall').isCollection;
var forEach = require('iterall').forEach;
var isPlainObject = require('lodash.isplainobject');
var uniq = require('lodash.uniq');

var DeepIterall = function () {
  function DeepIterall(content) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      objectValues: false,
      excludeObjectKeysWithIterableValue: true
    };

    _classCallCheck(this, DeepIterall);

    this.content = content;
    this.list = [];
    this.middlewares = [];
    this.options = options;
  }

  _createClass(DeepIterall, [{
    key: 'addMiddleware',
    value: function addMiddleware(middlewares) {
      var addition = Array.isArray(middlewares) ? middlewares : [middlewares];
      this.middlewares = this.middlewares.concat(addition);
    }
  }, {
    key: 'addContent',
    value: function addContent(content) {
      this.content = this.content.concat(content);
    }
  }, {
    key: 'iteratingInfo',
    value: function iteratingInfo(content) {
      var iteratingInfoObject = {};
      if (isCollection(content)) {
        iteratingInfoObject.iteratee = content;
        iteratingInfoObject.getiIteratedItem = function (item) {
          return item;
        };
      }

      if (isPlainObject(content)) {
        iteratingInfoObject.iteratee = Object.keys(content);
        iteratingInfoObject.rawContent = content;
        iteratingInfoObject.getiIteratedItem = function (item) {
          return content[item];
        };
      }
      return iteratingInfoObject;
    }
  }, {
    key: 'isIterable',
    value: function isIterable(content) {
      return isCollection(content) || isPlainObject(content);
    }
  }, {
    key: 'pushToList',
    value: function pushToList(item) {
      var $item = item;
      if (this.middlewares.length) {
        this.middlewares.forEach(function (middleware) {
          $item = middleware(item);
        });
      }
      this.list.push($item);
    }
  }, {
    key: 'iterate',
    value: function iterate() {
      var _this = this;

      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.content;

      var isIterable = this.isIterable(content);
      if (isIterable) {
        var _iteratingInfo = this.iteratingInfo(content),
            iteratee = _iteratingInfo.iteratee,
            getiIteratedItem = _iteratingInfo.getiIteratedItem,
            _iteratingInfo$rawCon = _iteratingInfo.rawContent,
            rawContent = _iteratingInfo$rawCon === undefined ? {} : _iteratingInfo$rawCon;

        forEach(iteratee, function (key) {
          if (!_this.isIterable(key) && !_this.options.excludeObjectKeysWithIterableValue) _this.pushToList(key);
          var iteratedItem = getiIteratedItem(key);
          if (_this.isIterable(iteratedItem)) {
            _this.iterate(iteratedItem);
          } else {
            if (rawContent && isPlainObject(rawContent) && _this.options.objectValues && rawContent[key]) {
              _this.pushToList(_defineProperty({}, key, rawContent[key]));
            } else {
              _this.pushToList(key);
            }
          }
        });
      }
      return this.list;
    }
  }, {
    key: 'run',
    value: function run() {
      return uniq(this.iterate());
    }
  }]);

  return DeepIterall;
}();

module.exports = DeepIterall;