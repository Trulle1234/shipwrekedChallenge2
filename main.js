let inCall = false
const sound = new Map([
    ["beep", "sound/sfx/beep.wav"],
    ["phone", "sound/lines/hello.wav"],
    ["square", "sound/lines/info.wav"],
    ["hash", "sound/lines/main.wav"]
]);

function playSound(key) {
    const audioUrl = sound.get(key);
    if (!audioUrl) {
        console.warn(`No audio found for key: ${key}`);
        return;
  }
    const audio = new Audio(audioUrl);
    audio.play().catch(err => {
        console.error("Audio play failed:", err);
  });
}

const buttons = document.querySelectorAll(".button-grid button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        playSound("beep")
        const img = button.querySelector("img");
        
        if (img && img.src && inCall) {
            const fileName = img.src.split('/').pop().replace('.svg', '');
            playSound(fileName);
            if (fileName === "phone") {
                inCall = !inCall;
                console.log(inCall);
            }
            playSound(fileName);
        }
    });
});