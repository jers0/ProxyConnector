/*Opciones que acepta el parámetro scheme: "http", "https", "quic", "socks4", or "socks5", si lo eliminas por defecto es http.*/
/*byPassList sería un array de strings de las direcciones web por las que no deberían salir a través del proxy.*/

let funcs = {
  setProxyOn: setProxyOn,
  setProxyOff: setProxyOff
}

chrome.runtime.onMessage.addListener( function (request, sender, sendResponse){
	console.log('background onMessage...', request)

	funcs[request.functions](request)

})

chrome.proxy.onProxyError.addListener(function (err){
	console.log('Se ha producido un error realizando la conexión al proxy.', err)
});


function setProxyOn(request){
	console.log('setProxyOn...', request.data)

	let proxyOn = {
		mode: "fixed_servers",
		rules: {
			singleProxy: {scheme: request.data.scheme, host: request.data.ip, port: request.data.port},
			bypassList: []
		}
	}

	chrome.proxy.settings.set( {value: proxyOn, scope: 'regular'}, function(){})

	chrome.webRequest.onAuthRequired.addListener(
	    function(details, callbackFn) {
	        console.log("onAuthRequired!", details, callbackFn);
	        callbackFn({
	            authCredentials: {username: request.data.user, password: request.data.password}
	        });
	    },

	    {urls: ["<all_urls>"]},

	    ['asyncBlocking']
	);

}

function setProxyOff(request){
	console.log('setProxyOff...', request.data)

	let proxyOff = { mode: "system" }
	
	chrome.proxy.settings.set( {value: proxyOff, scope: 'regular'}, function(){})
}