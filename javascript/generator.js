var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);//fetch 是promise
  console.log(result);
}

var g = gen();
var result = g.next();
result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});

var co = require('co');
var a=co.wrap(function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);//fetch 是promise
  result.json()
        .then(function(data){
            console.log(data);
            return data;
        });
    }
);
a();