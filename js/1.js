$(function(){

	vectorImagen = new Array(16);
	//variables usadas para el intercambio de imagenes
	var seleccion = 1;
	var pieza1, pieza2, idpieza1, idpieza2;
	//variables usadas para todo el proceso del rompecabezas
	var aciertos, rompecabezas, dificultad,dif;
	var opcion_rompecabezas="nada", opcion_dificultad="nada";

	//funcion para leer el estado del elemento select-rompecabezas
	$(document).on('change', '#select-rompecabezas', function(event) {

		//obtiene el valor seleccionado en el select
    	var select_rompecabezas = document.getElementById("select-rompecabezas");
		opcion_rompecabezas = select_rompecabezas.options[select_rompecabezas.selectedIndex].value;

		//mostramos la imagen en el form segun la opcion marcada en el select
		switch(opcion_rompecabezas){
			case "dinosaurio":
				$("#imagen_principal").attr("src","img/dinosaurio1/dinosaurio.jpg");
				rompecabezas = "dinosaurio";
			break;
			case "moto":
				$("#imagen_principal").attr("src","img/moto1/moto.jpg");
				rompecabezas = "moto";
			break;
			case "paisaje":
				$("#imagen_principal").attr("src","img/paisaje1/paisaje.jpg");
				rompecabezas = "paisaje";
			break;
			case "starwars":
				$("#imagen_principal").attr("src","img/starwars1/starwars.jpg");
				rompecabezas = "starwars";
			break;
		}
	});

	//obtiene el valor del select-dificultad y modifica el tamanio de la tabla segun la opcion
	$(document).on('change','#select-dificultad', function(event){

		var select_dificultad = document.getElementById("select-dificultad");
		opcion_dificultad = select_dificultad.options[select_dificultad.selectedIndex].value;

		switch(opcion_dificultad)
		{
			case "facil":
				dificultad = 17;
				dif = "1";
				document.getElementById("dificil").style.display = "none";
			break;
			case "dificil":
				dificultad = 25;
				dif = "2";
				document.getElementById("dificil").style.display = "";
			break;
		}
	});

	
	/*Funcion aleatorio para cargar imagenes*/
	function CargarAleatorio(){

		//Verifica que los select tengan una opcion valida seleccionada
		if((opcion_rompecabezas == "nada") || (opcion_dificultad == "nada")){
			alert('ALTO, no has seleccionado un rompecabezas o dificultad.');
		}else
		{

		//Carga de imagenes posiciones segun la dificultad seleccionada.
		for( i=1; i < dificultad ; i++){
			vectorImagen[i] = i+".jpg";
		}

		//Intercambio de imagenes
		var aux = "";
		for(i=1; i < dificultad ; i++){
			var aleatorio = Math.floor((Math.random()*(dificultad-2))+1);
			aux = vectorImagen[i];
			vectorImagen[i] = vectorImagen[aleatorio];
			vectorImagen[aleatorio] = aux;
		}

		//Asignacion de las imagenes a la tabla correspondiente.
		for(i=1;i < dificultad ; i++){
			$("#"+i+"a").attr("src","img/"+rompecabezas+dif+"/"+vectorImagen[i]);
		}
		
		//mensaje para el usuario indicando que el proceso de carga termino.
		alert('Rompecabezas Cargado. Dirigete a la pestaña -rompecabezas-');
	}
	}

	/* Llamamos a la Funcion cargar*/

	$("#cargar").on("click",function(){
		CargarAleatorio();
	})

	//Llamada a la funcion comprobar para verificar que el rompecabezas esta correcto.
	$("#comprobar").on("click",function(){
		comprobar();
	})

	//Llamada a la funcion copiar para cada elemento de la clase boton dentro de la tabla
	$(".boton").on("click",copiar); 

	//Funcion que realiza el cambio de posiciones de las imagenes en la tabla
	function copiar(){


		if(seleccion == 1)	//Primer imagen en ser seleccionada
		{
			pieza1 = $(this).attr('src');	//se obtiene el atributo src de la primer imagen
			idpieza1 = $(this).attr('id');	//se obtiene el atributo id de posicion de la primer imagen

			//asignamos opacidad a la primer imagen para identificar que esta seleccionada
			document.getElementById(idpieza1).style.opacity='0.5';	

			seleccion = 2;	//se cambia el estado de seleccion para la segunda imagen
		}
		else{		//segunda imagen en ser seleccionada

			pieza2 = $(this).attr('src');	//se obtiene el atributo src de la segunda imagen
			idpieza2 = $(this).attr('id');	//se obtiene el atributo id de posicion de la segunda imagen

			seleccion = 1;	//regresamos el estado de seleccion para la siguiente vuelta de copiado

			//Quitamos la opacidad de la imagen para el efecto de movimiento y seleccion
			document.getElementById(idpieza1).style.opacity='1';

			//se realiza el intercambio de imagenes y posiciones.
			$("#"+idpieza2).attr('src',pieza1);
			$("#"+idpieza1).attr('src',pieza2);

		}

	}

	//funcion para comprobar que el rompecabezas ha sido resuelto.
	function comprobar(){

		//recorremos todas las celdas de la tabla asi como la imagen que esta contiene
		for(i=1;i<dificultad;i++)
			{

			var lugar = $("#"+i+"a").attr('src');	 
			var comprobacion = "img/"+rompecabezas+dif+"/"+i+".jpg";

				if(lugar == comprobacion)	//si el url de la imagen es igual al url que debe contener 
				{							//la celda entonces se incrementan los aciertos.
					aciertos++;
				}
			}
			if(aciertos == dificultad-1)	//si la cantidad de aciertos corresponde a la cantidad de 
			{								//piezas del memorama, entonces esta completo y se manda una alerta
				alert('Felicidades, completaste el Rompecabezas');
			}
			else
			{
				alert('Lo sentimos, solo tienes '+aciertos+' piezas correctas.');
			}
			aciertos=0;	//se reinicia la variable aciertos para la siguiente comprobacion del usuario.
	}

})
