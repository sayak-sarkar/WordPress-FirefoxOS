enyo.kind({
	name: "wp.AddExternal",
	kind: "FittableRows",
	fit: true,
	classes: "enyo-fit",
	components: [

		
		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes: "toolbar", components: [
			{kind: "onyx.Icon", src: "images/toolbar/wp.png", style: "margin-left:10px; height: 38px; width: 38px;"},
			{content: "WordPress", fit: true}
		]},
		

		{kind: "enyo.Image", classes: "logoBanner", src: "images/icon128.png", style: "margin-top: 10px;"},
		
		{content: "ACCOUNT DETAILS", style: "color: grey; margin-left: 20px; margin-bottom: -10px; font-size: 12px; font-weight: bold;"},
		{kind: "onyx.Groupbox", style: "margin-bottom: 10px;", components: [
			{kind: "Input", name: "blogurl", classes: "addExternalInputBox", placeholder: " Blog URL", type: "url", selectOnFocus: true},
			{kind: "Input", name: "username", classes: "addExternalInputBox", placeholder: " Username", type: "text", selectOnFocus: true},
			{kind: "Input", name: "password", classes: "addExternalInputBox", placeholder: " Password", type: "password", selectOnFocus: true}
		]},

		/*
		{kind: "onyx.Button", style: "margin-left: 20px;", content: "Optional Settings", ontap: "optionalSettings"},
		{tag: "br"},
		*/
		{id: "SignInButton", kind: "onyx.Button", style: "margin-top: 2px; margin-left: 114px;", content: "Sign In", ontap: "signIn"},
		{tag: "br"},
		{id: "status", style: "margin-top: -30px; text-align: center; font-size: 16px;", content: ""},
		{id: "spinner", kind: "onyx.Spinner", classes: "onyx-light", style: "margin-left: 125px; visibility: hidden;"}

		/*
		{content: "Don't yet have a blog?", style: "margin-top: 10px; text-align: center;"},
		{kind: "onyx.Button", style: "margin-left: 68px; height: 55px; width: 180px;", allowHtml: true, content: "Get a free blog at <br/> WordPress.com", ontap: "signUp"}
		*/
	],

	/*signUp: function () {
		new wp.Signup().renderInto(document.body);
		//window.open("https://en.wordpress.com/signup/?ref=wp-android");
	},*/

	signIn: function () {
		sessionStorage.inputUrl = fixURL(this.$.blogurl.getValue());
		sessionStorage.url = fixURL(this.$.blogurl.getValue()) + "/xmlrpc.php";
		sessionStorage.username = this.$.username.getValue();
		sessionStorage.password = this.$.password.getValue();	
		var params = [sessionStorage.username, sessionStorage.password];
		var xmlrpc_data =  XMLRPCBuilder.marshal("wp.getUsersBlogs", params);
		makeLoginRequest(sessionStorage.url, xmlrpc_data);
	},

	/*optionalSettings: function() {
		new wp.OptionalSettings().renderInto(document.body);
	}*/
});

function fixURL(url) {
    if(url.substr(-1) == '/') {
        return url.substr(0, url.length - 1);
    }
    if(url.match('^http://')){
    	url = url.replace('http://','https://')
	}
    return url;
}

function makeLoginRequest(url, data) {
	var xhr = new XMLHttpRequest({mozSystem:true});
   	xhr.open('POST', url);
    
    xhr.onreadystatechange = function() {
    	//console.log("Readystate: ", xhr.readyState);
      	if (xhr.readyState == 1) {
	        document.getElementById("SignInButton").style.visibility="hidden";
	        document.getElementById("status").style.color="#000000";
	        var reqStatus = "Signing in...";
	        document.getElementById("spinner").style.visibility="visible";
      	}
       	else if (xhr.readyState == 2) {
        	var reqStatus = "Status available..";
      	}
	    else if (xhr.readyState == 3) {
	        var reqStatus = "Downloading stuff....";
	    } 
      	else if(xhr.readyState == 4) {
	    	var reqStatus = "<br/><br/>Invalid input. <br/>Check URL / Username / Password!";
	        document.getElementById("SignInButton").style.visibility="visible";
	        document.getElementById("status").style.color="red";
	        document.getElementById("spinner").style.visibility="hidden";
      	}
      	document.getElementById("status").innerHTML = reqStatus;
    }
    
    xhr.onload = function() {
    	handleLoginSuccess(xhr);
    };
    
    xhr.onerror = function() {
    	handleLoginError(xhr);
    };
    
    xhr.send(data);    
    return xhr;
}

function handleLoginSuccess(xhr) {     
     
    var parser = new XMLRPCParser(xhr.response);
    var json = parser.toObject();
    var fault = parser.fault;
    //console.log(fault);

    if (fault) {
    	/*alert("Parser Fault");
    	console.log(xhr.response);*/
    	return;
    }
    else {
    	if (json instanceof Array) {
			for (var i = 0; i < json.length; i++) {
				var obj = json[i];
				for(var key in obj) {
					if (key == "url") {
						sessionStorage.urlResponse = fixURL(obj[key]);
						//alert("sessionStorage.urlResponse: "+sessionStorage.urlResponse);
					}
					else if (sessionStorage.urlResponse == sessionStorage.inputUrl) {
						if (key == "blogid") {
							sessionStorage.blogid = obj[key];
							//alert("sessionStorage.blogid: "+sessionStorage.blogid);
						}
						else if (key == "blogName") {
							sessionStorage.blogName = obj[key];
							//alert("sessionStorage.blogName: "+sessionStorage.blogName);
						}
					}
					//console.log(key, obj[key]);
				}
			}
		} 
		else {
			console.log(json);
		}

    	new wp.Posts().renderInto(document.body);
    }
    //console.log(json);
}

function handleLoginError(xhr) {
  	alert("Error! " + xhr.statusText);
}