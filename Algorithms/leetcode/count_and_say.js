/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    if(n === 1){
        return '1';
    }
    //递归调用，然后对字符串处理
    var str = countAndSay(n-1) ;
    var count = 1;
    var s = '';
    for(var i = 0; i < str.length;i++){
        if(str[i] === str[i+1]){
            count++;//计数增加
        }else{
            s = s + count + str[i];
            count = 1;//初始化
        }
    }
    return s;
};
