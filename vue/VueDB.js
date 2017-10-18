class VueDB{
  constructor () {
  }

  setItem (key, value) {
    if(typeof value == 'object')
      value = JSON.stringify(value);

    if(window.localStorage){
      window.localStorage.setItem(key,value);
    }else{
      cookie.set(key,value,{
        path: '/',
        expires : 10000000
      });
    }
  }

  removeItem (key) {
    if(window.localStorage){
      window.localStorage.removeItem(key);
    }else{
      cookie.set(key,'',{
        path: '/',
        expires : -10000000
      });
    }
  }

  getItem (key) {
    if(window.localStorage){
      return window.localStorage.getItem(key);
    }else{
      return cookie.get(key);
    }
  }

  getItemOnce (key) {
    var now = this.getItem(key);
    this.removeItem(key);
    return {
      toString () {
        return now;
      },
      toJson () {
        var tryObj = {};
        try{
          tryObj = JSON.parse(now)
        }catch (e){
          tryObj = null;
        }
        return tryObj;
      }
    }
  }

}
