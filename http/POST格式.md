# POST请求格式
- application/x-www-form-urlencoded: 数据被编码成以 '&' 分隔的键-值对, 同时以 '=' 分隔键和值. 非字母或数字的字符会被 percent encoded: 这也就是为什么这种类型不支持二进制数据的原因 (应使用 application/form-data 代替).

- multipart/form-data：可以使用`form data`来进行，主要是上传图片等而二进制文件，请求的body中通过`boundary`将数据隔开

- text/plain

- application/json
