const isCollection = require('iterall').isCollection;
const forEach = require('iterall').forEach;
const isPlainObject = require('lodash.isplainobject');
const uniq = require('lodash/uniq');

class DeepIterall {
  constructor(content, options = {
    objectValues: false,
    excludeObjectKeysWithIterableValue: true,
  }) {
    this.content = content;
    this.list = [];
    this.middlewares = [];
    this.options = options;
  }

  addMiddleware(middlewares) {
    const addition = Array.isArray(middlewares) ? middlewares : [middlewares];
    this.middlewares = this.middlewares.concat(addition);
  }

  addContent(content) {
    this.content = this.content.concat(content);
  }


  iteratingInfo(content) {
    const iteratingInfoObject = {};
    if (isCollection(content)) {
      iteratingInfoObject.iteratee = content;
      iteratingInfoObject.getiIteratedItem = (item) => item;
    }

    if (isPlainObject(content)) {
      iteratingInfoObject.iteratee = Object.keys(content);
      iteratingInfoObject.rawContent = content;
      iteratingInfoObject.getiIteratedItem = (item) => content[item];
    }
    return iteratingInfoObject;
  }

  isIterable(content) {
    return isCollection(content) || isPlainObject(content);
  }

  pushToList(item) {
    let $item = item;
    if (this.middlewares.length) {
      this.middlewares.forEach(middleware => {
        $item = middleware(item);
      });
    }
    this.list.push($item);
  }

  iterate(content = this.content) {
    const isIterable = this.isIterable(content);
    if (isIterable) {
      const { iteratee, getiIteratedItem, rawContent = {} } = this.iteratingInfo(content);
      forEach(iteratee, key => {
        if (!this.isIterable(key) && !this.options.excludeObjectKeysWithIterableValue) this.pushToList(key);
        const iteratedItem = getiIteratedItem(key);
        if (this.isIterable(iteratedItem)) {
          this.iterate(iteratedItem);
        } else {
          if (rawContent && isPlainObject(rawContent) && this.options.objectValues && rawContent[key]) {
            this.pushToList({ [key]: rawContent[key] });
          } else {
            this.pushToList(key);
          }
        }
      });
    }
    return this.list;
  }

  run() {
    return uniq(this.iterate());
  }
}

module.exports = DeepIterall;