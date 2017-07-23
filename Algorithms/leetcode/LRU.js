/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.map = new Map();
  this.arr = new Array();
};

/**
 * @param {number} key
 * @returns {number}
 */
LRUCache.prototype.get = function (key) {
  var val = this.map[key];
  if (val > 0) {
    var index = this.arr.indexOf(key);
    this.arr.splice(index, 1);
    this.arr.unshift(key);
    return val;
  } else 
    return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @returns {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.map[key]) {
    this.map[key] = value;
    var index = this.arr.indexOf(key);
    this.arr.splice(index, 1);
    this.arr.unshift(key);
    return;
  }

  if (this.capacity === this.arr.length) {
    var k = this.arr.pop();
    this.map[k] = undefined;
  }

  this.map[key] = value;
  this.arr.unshift(key);
};