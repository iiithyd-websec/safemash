/*
* SafeMash.js: A framework for ensuring privilege separation and secure interactions in web mashups.
* Author: Krishna Chaitanya Telikicherla (@novogeek)
* Date: 22-01-2014	
*/

(function(){
    var sm=function(selector){
        return new safeMash(selector);
    }
 
    var safeMash=function(selector){
		this.selector = document.querySelectorAll(selector)[0],
        this.version = '0.1.0';
		return this;
    };    
 
	//Extend the safeMash function object using prototype.
    safeMash.prototype={	
        init:function(){
            return this;
        },
		//Ex: $sm.createWidget({id: 'widgetId', loadPage: page.html, csp:'img-src http://localhost:3000'});
        createWidget:function(options){
			
			var widgetId= options.id || Math.floor((Math.random()*1000)+1);
			var sandboxFlags = options.sandboxFlags || 'allow-scripts';
			if(options.loadPage){
				//sandbox="allow-scripts allow-same-origin"
				var widget='<div id="divIfrWrap">'+
				'<iframe sandbox="'+sandboxFlags+'" id="'+widgetId+'"'+
				' src="'+options.loadPage+'" scrolling="no"></iframe></div>';
				
				/*		
				// The idea is to check if CSP is inherited by nested frames. Unfortunately it doesn't.
				if(options.csp){
					//widget+=' onload="$m.ifrLoad(\''+widgetId+'\')"></iframe></div>';
					widget+=' onload="$m.ifrLoad(\''+widgetId+'\',\''+options.csp+'\' )"></iframe></div>';
				}else{
					widget+='></iframe></div>';
				}
				*/
				
				this.selector.innerHTML=widget;
			}
            return this;
        }, 
		//Ex: $m('#flickrWidget').send({message: address});
		send:function(options){
			if(!this.selector) {
				throw "Error in $sw.send: Widget does not exist. Please ensure that the selector is correct.";
				return;
			}
			var msg=options.message || '';
			var targetOrigin = options.origin || '*';
			var targetFrame = this.selector.contentWindow;
			targetFrame.postMessage(msg, targetOrigin);
            return this;
        }
    }
	
	//Ex: $sw.receive({from: 'http://localhost:3000', callback: receiveMessage});
	sm.receive=function(options){
		if(!options.callback){
			throw "Error in $m.receive: Please configure 'callback' property";
			return;
		}
		window.addEventListener("message", function(event){
			if(options.from){
				if (options.from.indexOf(event.origin) < 0){
					throw "Blocked an unauthorized attempt to send messages!";
					return;
				}
			}
			else{
				var msg="Warning in $m.receive: You current configuration receives messages from any random origin. "+
				"Please configure the 'from' property wisely.";
				throw msg;
			}
			options.callback(event);
		}, false);
		return this;
	}
	
	//Ex: $m.applyCSP("img http://localhost:3000");
	sm.applyCSP=function(policy){
		var cspMetaTag=document.createElement('meta');
		cspMetaTag.setAttribute('http-equiv','Content-Security-Policy');
		cspMetaTag.setAttribute('content', policy);
		document.getElementsByTagName('head')[0].appendChild(cspMetaTag);
	}
	
    if(!window.$m) {
        window.$m = sm;
    }
})();