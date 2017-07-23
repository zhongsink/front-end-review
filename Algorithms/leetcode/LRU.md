### Description
Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.

get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

### Follow up:
Could you do both operations in O(1) time complexity?

### Example:

LRUCache cache = new LRUCache( 2 /* capacity */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4

### 思路
设计LRU Cache， 需要先定义一个队列结构array，同时我们希望查找的时间复杂度为O(1),我们需要个HashMap，来记录存的值, key为所插入的key，value为所存的node。其中，我们定义队列的头部为新的元素， 尾部为旧的元素。

对于以下操作，

当array.length = capacity的时候, pop 队尾元素，删除HashMap记录。

当put一个元素，我们之间将这个元素插入array头部,更新HashMap。

当put一个元素，这个元素已经存在于hashMap中的时候，我们需要将这个元素的value更新，并且更新hashmap的索引，最后把这个元素拿出来，插到头部。

当get一个元素的时候，我们需要返回这个元素值得同时，把这个元素拿出来，放到头部。