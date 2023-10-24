//Funcionalidad de los dados basada en https://www.youtube.com/watch?v=6CMfZkLntX8&t=181s

var dadoTiempo = [];
var dadoUbicacion = [];
var dieOneValue;
var dieTwoValue;

let images = [
  "dice-01.svg",
  "dice-02.svg",
  "dice-03.svg",
  "dice-04.svg",
  "dice-05.svg",
  "dice-06.svg"
];

let images2 = [
  "dice2-01.svg",
  "dice2-02.svg",
  "dice2-03.svg",
  "dice2-04.svg",
  "dice2-05.svg",
  "dice2-06.svg"
];

let diceWrappers = document.querySelectorAll(".dado_container"); // Elementos con clase .dice-wrapper

function roll() {
  diceWrappers.forEach(function (dieWrapper) {
    dieWrapper.classList.add("shake"); // Aplicar la animación solo a .dice-wrapper
  });

  setTimeout(function () {
    diceWrappers.forEach(function (dieWrapper) {
      dieWrapper.classList.remove("shake"); // Quitar la animación de .dice-wrapper
    });

    let dieOneValue = Math.floor(Math.random() * 6);
    let dieTwoValue = Math.floor(Math.random() * 6);
    console.log(dieOneValue, dieTwoValue);
    document.querySelector("#dado_1").setAttribute("src", images[dieOneValue]);
    document.querySelector("#dado_2").setAttribute("src", images2[dieTwoValue]);

      // Guardar los resultados de los dados en las listas
      dadoTiempo.push(dieOneValue + 1);
      dadoUbicacion.push(dieTwoValue + 1);
  
      console.log("dadoTiempo: " + dadoTiempo);
      console.log("dadoUbicacion: " + dadoUbicacion);

      document.querySelector("#mensaje-tiempo").textContent = "";
      document.querySelector("#mensaje-ubicacion").textContent = "";    
      document.querySelector("#mensaje-avance").textContent = "";
      document.querySelector("#ecuacion-velocidad").textContent = "";
      


//avance


  let mensaje = "";
  let ecuacion = "V = (x2 - x1) / (t2 - t1)";
  let datosTiempo = "t: ";
  let datosUbicacion = "x: ";
  let indice1 = dadoUbicacion.length - 1;
  let indice2 = dadoUbicacion.length - 2; 
  let indice3 = dadoTiempo.length - 1;
  let indice4 = dadoTiempo.length - 2; 
  if(dadoTiempo.length < 2 && dadoUbicacion.length < 2){
    
    mensaje = "Lanzar otra vez";

  }else{
    if(((dadoTiempo[1]) - (dadoTiempo[0])) === 0){
      mensaje = "Quédate quieto";
    }else{
      let velocidad = ((dadoUbicacion[indice1] - dadoUbicacion[indice2]) / (dadoTiempo[indice3] - dadoTiempo[indice4]));
      let mover = velocidad + dadoUbicacion[indice1] + dadoTiempo[indice3];
      let apro = Math.round(velocidad);
      if (velocidad === Infinity || velocidad === -Infinity) {
        ecuacion = "V = " + "(" + dadoUbicacion[indice1] + " - " + dadoUbicacion[indice2] + ") / (" + dadoTiempo[indice3] + " - " + dadoTiempo[indice4] + ") = " + velocidad;
        let mov = dadoUbicacion[indice1]  + dadoTiempo[indice3];
        mensaje = "Avanza " + mov + " casillas.";
      } else if (apro < 0) {
        ecuacion = "V = " + "(" + dadoUbicacion[indice1] + " - " + dadoUbicacion[indice2] + ") / (" + dadoTiempo[indice3] + " - " + dadoTiempo[indice4] + ") = " + velocidad;
        let mov2 = dadoUbicacion[indice1] + dadoTiempo[indice3] + Math.abs(velocidad);
        mov2 = Math.abs(mov2);
        mov2 = Math.round(mov2);
        mensaje = "Retrocede " +  mov2 + " casillas." + "\n" + "Tu velocidad fue de: " + apro;
      } else if (apro > 0) {
        ecuacion = "V = " + "(" + dadoUbicacion[indice1] + " - " + dadoUbicacion[indice2] + ") / (" + dadoTiempo[indice3] + " - " + dadoTiempo[indice4] + ") = " + velocidad;
        mover = Math.abs(mover);
        mover = Math.round(mover);
        mensaje = "Avanza " +  mover + " casillas." + "\n" + "Tu velocidad fue de: " + apro;
      } else {
        ecuacion = "V = " + "(" + dadoUbicacion[indice1] + " - " + dadoUbicacion[indice2] + ") / (" + dadoTiempo[indice3] + " - " + dadoTiempo[indice4] + ") = " + velocidad;
        mensaje = "Quédate quieto tu velocidad fue de: " + apro;
      }

    }



  }

  for (var i = 0; i < dadoTiempo.length; i++) {
    datosTiempo += dadoTiempo[i];
    datosUbicacion += dadoUbicacion[i];
    if (i < dadoUbicacion.length - 1) {
      datosTiempo += ", ";
      datosUbicacion += ", ";
    }
  }

  document.querySelector("#mensaje-tiempo").textContent = datosTiempo;
  document.querySelector("#mensaje-ubicacion").textContent = datosUbicacion;

  document.querySelector("#ecuacion-velocidad").textContent = ecuacion;
  document.querySelector("#mensaje-avance").textContent = mensaje;



  }, 1000);

}

roll();
