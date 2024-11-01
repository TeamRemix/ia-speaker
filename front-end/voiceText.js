// voiceText.js

const btnListen = document.getElementById("btnListen");
const showText = document.getElementById("showText");
let voice = "";

const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();
recognition.lang = "en-US";

// Función para que el navegador hable
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);

  // Inicia la animación cuando el navegador comienza a hablar
  utterance.onstart = () => {
    const startEvent = new CustomEvent("startAnimation");
    window.dispatchEvent(startEvent);
  };

  // Detiene la animación cuando el navegador termina de hablar
  utterance.onend = () => {
    const stopEvent = new CustomEvent("stopAnimation");
    window.dispatchEvent(stopEvent);
  };

  speechSynthesis.speak(utterance);
}

// Evento de resultado del reconocimiento de voz
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  showText.innerText = transcript;
  voice = transcript;
  console.log("Texto reconocido:", transcript);
};

// Manejar el botón para alternar entre escuchar y hablar
btnListen.addEventListener("click", () => {
  if (btnListen.value === "listen") {
    recognition.start();
    console.log("Listening...");
    btnListen.value = "tell";
    btnListen.innerText = "tell";
  } else {
    speakText(voice);
    console.log("voice is :" + voice);
    btnListen.value = "listen";
    btnListen.innerText = "listen";
  }
});
