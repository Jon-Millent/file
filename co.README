```javascript

class GetImages{
  
  ajax(pluginName){
      // 使用 Promise 封装
      return new Promise((resolve)=> {
          axios.get(config.cdn.url+(config.api.getListInfo).replace('{{name}}', pluginName))
              .then( (response)=> {
                  resolve(response);
              })
              .catch(err=>{
                  resolve(err);
              })
      });
  }
  
  toGet(){
    var root = this
    
    co(function* () {

        for(var i=0; i<10; i++){
            var foo = yield root.ajax('jquery');
            console.log('ok');
        }
        console.log('end')

    });
    
  }
}

```
