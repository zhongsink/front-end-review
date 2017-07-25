/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 * 链表，每对前后互换。
 */
var swapPairs = function(head) {
    if (!head)
        return null;
    var arr = [];
    while (head) {
        var next = head.next;
        head.next = null;
        arr.push(head);
        head = next;
    }
    for (var i= 0; i< arr.length; i=i+2){
        var a = arr[i],
            b = arr[i+1];
        if(!b) continue;
        arr[i] = b;
        arr[i + 1] = a;
    }
    for (var i = 0; i < arr.length;i++){
        arr[i].next = arr[i+1];
    }
    return arr[0];
};
