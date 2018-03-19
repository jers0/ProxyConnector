
$(document).ready(function(){

	/*Callback que recibe la respuesta del servidor*/
	function success(data){
		console.log('Respuesta recibida del servidor....', data)

		/*Simulación de como podría ser la respuesta recibida por el servidor.*/
		data = {ip: '123.123.123.123', port: 3000, user: 'pepe', 'password': '123456', scheme: 'http'}

		/*Aquí lanzamos un message através de Chrome, en nuestro caso lo recibe background.js que es el que tiene el listener creado.*/
		chrome.extension.sendMessage({ functions: 'setProxyOn', data: data });
	}

	$('#send').click(function(){
		console.log('#send has been clicked.')

		/*Deshabilitamos proxy o no, dependiendo si de cada vez que se vaya a solicitar un proxy nuevo queremos salir por el proxy anterior para obtener los datos, o por la red real donde está el equipo*/
		//chrome.extension.sendMessage({ functions: 'setProxyOff', data: {} });

		/*Llamamos al servicio que nos proporciona los nuevos datos para bindear la conexión al proxy.*/
		$.ajax({
		  type: "GET",
		  url: $('#url').val(),
		  data: "",
		  success: success
		});

	});

	$('#deshabilitarProxy').click(function(){

		chrome.extension.sendMessage({ functions: 'setProxyOff', data: {} });

	})
})



