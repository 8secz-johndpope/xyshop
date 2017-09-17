define(function(require, exports, module) {
	require('jquery');
	require('messages_zh');
	function Validate(){}
	module.exports=Validate;
	Validate.prototype._init=function(formID){
		$.validator.setDefaults({
		    highlight: function(e) {
		        $(e).closest(".form-group").removeClass("has-success").addClass("has-error")
		    },
		    success: function(e) {
		        e.closest(".form-group").removeClass("has-error").addClass("has-success")
		    },
		    errorElement: "span",
		    errorPlacement: function(e, r) {
		        e.appendTo(r.is(":radio") || r.is(":checkbox") ? r.parent().parent().parent() : r.parent())
		    },
		    errorClass: "help-block m-b-none",
		    validClass: "help-block m-b-none",
		    debug: true
		});
		$(formID).validate();
		// 手机号码格式验证
		$.validator.addMethod("isMobile", function(value, element) {
		    var length = value.length;
		    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
		    return this.optional(element) || (length == 11 && mobile.test(value));
		}, "请正确填写您的手机号码");

	};
	/*	默认rule
	 	required: { required: true },
		email: { email: true },
		url: { url: true },
		date: { date: true },
		dateISO: { dateISO: true },
		number: { number: true },
		digits: { digits: true },
		creditcard: { creditcard: true }
	 * */
	Validate.prototype.add=function(id,rules){
		$(id).addClass(rules);
	};
	Validate.prototype.remove=function(id,rules){
		$(id).parent().removeClass(rules).remove('has-error').removeClass('has-success');
	};
	//两次输入值相同
	Validate.prototype.equalTo=function(id,toid){
		$.validator.addClassRules("equalTo"+toid, {
			 	equalTo: toid
			});
		$(id).addClass("equalTo"+toid);
	};
	Validate.prototype.phone=function(id){
		$.validator.addClassRules("phone", {
				isMobile: true,
				hasPhone:true
			});
		$(id).addClass("phone");
	};
});