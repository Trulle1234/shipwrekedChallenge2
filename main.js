const sound = new Map([
    ["beep", "sound/sfx/beep.wav"],
    ["phone", "sound/lines/hello.wav"],
    ["square", "sound/lines/info.wav"],
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
        if (img && img.src) {
            const fileName = img.src.split('/').pop().replace('.svg', '');
            playSound(fileName);''
        }''
    });
});