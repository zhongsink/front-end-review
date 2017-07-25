/**
 * @param {string} str
 * @return {number}
 * 字符串转为数字，非-/+加上数字的字符或只有数字开头的串不符合要求
 */
var myAtoi = function(str) {
    if (str == null || str.length < 1)
        return 0;
    str=str.trim();
    var pattern = /^(\-|\+)?[0-9]+/;
    var tmp = pattern.exec(str);

    if (tmp) {
        var num = Number(tmp[0]);
        if (num < -2147483648)
            return -2147483648;
        if (num > 2147483647)
            return 2147483647;
        return num;
    }
  return 0;
};