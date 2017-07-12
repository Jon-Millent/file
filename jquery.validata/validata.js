


        //必须是英文或者数字
        jQuery.validator.addMethod("enAndNumber", function(value, element) {   
		    var tel = /^[0-9a-zA-Z]+$/;
		    return this.optional(element) || (tel.test(value));
		}, "此项必须是英文或者数字");

		//手机号验证
        jQuery.validator.addMethod("phone", function(value, element) {   
		    var tel = /^1\d{10}$/;
		    return this.optional(element) || (tel.test(value));
		}, "手机号码不正确");


		var myRules = {
    		rules : {
    			qiyebianhao : { //企业编号
        			required : true,
        			enAndNumber : true
        		},
        		qiyemingcheng : { //企业名称
        			required : true
        		},
        		qiyejianjie : {//企业简介
        			required : true
        		},
        		lianxiren : {
        			required : true
        		},
        		lianxidianhua : {
        			required : true,
        			phone : true
        		},
        		lianxiyouxiang : {
        			required : true,
        			email : true
        		},
        		lianxidizhi : {
        			required : true
        		}
        	},
        	messages : {

        	}
        }
		function FormRegExpFactory(form){
			this.init(form);
		}
		FormRegExpFactory.prototype.getName = function(fakename){
			return this.form.find('[data-rule="'+fakename+'"]').attr('name');
		}
        FormRegExpFactory.prototype.init = function(form){

        	this.form = $(form);
        	this.run();

        }
        FormRegExpFactory.prototype.run = function(){
        	var rules = [];

        	this.form.find('input').each(function(k,v){
        		if($(v).attr("data-rule")){
        			rules.push(v);
        		}
        	})
        	this.form.find('select').each(function(k,v){
        		if($(v).attr("data-rule")){
        			rules.push(v);
        		}
        	})
        	this.form.find('textarea').each(function(k,v){
        		if($(v).attr("data-rule")){
        			rules.push(v);
        		}
        	})

        	console.log(rules)
        	var rulse = {
        		rules : {

        		},
        		messages : {

        		}
        	}

        	for(var i=0; i<rules.length; i++){
        		var r = null;
        		var m = null;
        		var rname = $(rules[i]).attr('data-rule');
        		if(myRules.rules[rname]){
        			var trueName = this.getName(rname);
        			
        			rulse.rules[trueName] = myRules.rules[rname];
        			if(myRules.messages[rname]){
        				rulse.messages[trueName] = myRules.messages[rname];
        			}

        		}
        	}
        	console.log(rulse)
        	this.form.validate(rulse)

        }
        
// <input type="text" name="xlyx" data-rule="lianxiyouxiang" class="text">

//use 
// var rules = new rose.controller.($('.form1'));
