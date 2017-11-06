
class VueEvent{
  constructor(){
    window.evnet = window.evnet || {};
    this.evnet = window.evnet;
  }
  $on(eventName, callBack) {
    this.evnet[eventName] = this.evnet[eventName] || [];
    this.evnet[eventName].push(callBack);
  }
  $emit(eventName,dataJson){
    if(this.evnet[eventName]){
      for(var i=0; i<this.evnet[eventName].length; i++){
        this.evnet[eventName][i](dataJson);
      }
    }
  }
}


export default VueEvent;
