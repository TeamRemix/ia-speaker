//selecion de lo elementos
const btnListen = document.getElementById("btnListen");
const showText = document.getElementById("showText");

const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();

recognition.lang = "en-US";
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  showText.innerText = transcript;
};

btnListen.addEventListener("click", () => {
  recognition.start();
});
