
$(document).ready(function(){
	$(".button").click(function(){
		$(".dato1").show("slow");
		$(".Home").show("slow");
		$(".ingresos").fadeOut("slow");
		var pais = $("input[name=pais]").val();
		var depto = $("input[name=depto]").val();
		var grados = $("input[name=grados]").val();
		if (depto.length!=0 && pais.length!=0){
			jQuery(document).ready(function($) { 
				var codPais = "";
				$.ajax({ 
					url : "paises.json", dataType : "json",
					success : function(parsed_json) {
						for (var i = 0; i <= 242; i++) { //recorrer el json de paises para encontrar su codigo
							if (((parsed_json[i]["name"]).toLowerCase()) == pais.toLowerCase()){
								codPais = parsed_json[i]["code"];
							};
						};
						//Codigo para el departamento
						if (codPais.length==0) { //error si no encontro el codigo para el pais ingresado
							alert("Ops! Looks like your country doesn't exist! Try again.");
						}else{
							var direccion = "http://api.wunderground.com/api/0a3dd826c5ddd6ff/conditions/q/"+codPais+"/"+depto+".json";
							$(document).ready(function(){
								jQuery(document).ready(function($) { 
									$.ajax({ url : direccion, dataType : "jsonp",
										success : function(parsed_json2) {
											if(parsed_json2["current_observation"]){ //revisar si el departamento tiene esta llave
												var location = parsed_json2['current_observation']['display_location']['full']; 
												var lastUpdate = parsed_json2['current_observation']['observation_time']; 
												if (grados == "c"){
													var tempC = parsed_json2['current_observation']['temp_c']+ "°C"; 
												}else{
													var tempC = parsed_json2['current_observation']['temp_f'] +"°F" ;
												} 	
												var weather = parsed_json2['current_observation']['weather']; 
												var weatherImg = parsed_json2['current_observation']['icon_url']; 
												$(".dato1").empty();
												$(".dato1").append("<h5>"+"Current temperature in " + location + " is: " + tempC +"<br/>Weather: "+ weather + "<br/><img src=\""+weatherImg+"\"><br/>" + lastUpdate+"</h5>" );
											}else{//error si no tiene esa llave
												alert("Ops! The city you entered doesn't exist or we don't have any data of this city!");
											}
										}
									});
								});
							});
						};
					}
				});
			});
			$("input").val("");
		}else if (depto.length==0 && pais.length==0){
			alert("You must input something in both boxes!");
		}else if(depto.length==0){
			alert("You forgot to input something in city box!");
		}else if(pais.length==0){
			alert("You forgot to input something in country box!");
		}
		
	});
});