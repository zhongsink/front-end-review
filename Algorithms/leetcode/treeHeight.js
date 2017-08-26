// 按照树的层级，获得树高
// 输入　n 节点
// 输入　n-1　条边
/*
5
0 1
0 2
1 3
1 4

输出
３
*/

var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

function culTreeHeight(array) {
    var height = 1;
    for (var i =0 ; i < array.length; i++) {
        if (array[i]) {
            height++;
        }
    }
    return height
}
var array = [], node, count = 0;
rl.on('line', function (line) {
    var stringToArray = line.trim().split(' ');
    if (stringToArray.length === 1) {
        node = parseInt(stringToArray[0]);
    } else {
        
        if (array[parseInt(stringToArray[0])]) {
            array[parseInt(stringToArray[0])].push(stringToArray[1]);
        } else {
            array[parseInt(stringToArray[0])] = [stringToArray[1]];
        }
    }
    count ++
    if(count === node){
        console.log(culTreeHeight(array));
        count = 0;
        array = [];
    }
})
