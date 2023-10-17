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
    document.querySelector("#dado_2").setAttribute("src", images[dieTwoValue]);

      // Guardar los resultados de los dados en las listas
      dadoTiempo.push(dieOneValue + 1);
      dadoUbicacion.push(dieTwoValue + 1);
  
      console.log("dadoTiempo: " + dadoTiempo);
      console.log("dadoUbicacion: " + dadoUbicacion);

      document.querySelector("#mensaje-avance").textContent = "";
//avance


  let mensaje = "";
  let indice1 = dadoUbicacion.length - 1;
  let indice2 = dadoUbicacion.length - 2; 
  if(dadoTiempo.length < 2 && dadoUbicacion.length < 2){
    
    mensaje = "Lanzar otra vez";

  }else{
    if(((dadoTiempo[1]) - (dadoTiempo[0])) === 0){
      mensaje = "Quédate quieto";
    }else{
      let velocidad = ((dadoUbicacion[indice1] - dadoUbicacion[indice2]) / (dadoTiempo[indice1] - dadoTiempo[indice2]));
      let apro = Math.round(velocidad);
      if (apro === Infinity || apro === -Infinity) {
        mensaje = "Quédate quieto";
      } else if (apro < 0) {
        apro = Math.abs(apro);
        mensaje = "Retrocede " +  apro + " casillas";
      } else if (apro > 0) {
        apro = Math.abs(apro);
        mensaje = "Avanza " +  apro + " casillas";
      } else {
        mensaje = "Quédate quieto";
      }

    }



  }

  document.querySelector("#mensaje-avance").textContent = mensaje;


  }, 1000);

}

roll();
