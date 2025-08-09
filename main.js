let inCall = false;
let onHold = false;
let holdAudio = null;

const sound = new Map([
    ["beep", "sound/sfx/beep.wav"],
    ["phone", "sound/lines/hello.wav"],
    ["square", "sound/lines/info.wav"],
    ["hash", "sound/lines/main.wav"],
    ["circle", "sound/lines/hold.wav"],
]);

function playSound(key, loop = false) {
    const audioUrl = sound.get(key);
    if (!audioUrl) {
        console.warn(`No audio found for key: ${key}`);
        return null;
    }
    const audio = new Audio(audioUrl);
    audio.loop = loop;
    audio.play().catch(err => {
        console.error("Audio play failed:", err);
    });
    return audio;
}

function playHoldMusic() {
    const audio = new Audio("sound/music/hold.wav");
    audio.loop = true;
    audio.play().catch(err => {
        console.error("Hold music failed:", err);
    });
    return audio;
}

document.querySelectorAll(".button-grid button").forEach(button => {
    button.addEventListener("click", () => {
        playSound("beep");

        const img = button.querySelector("img");
        if (!img || !img.src) return;

        const fileName = img.src.split('/').pop().replace('.svg', '');

        if (fileName === "phone") {
            inCall = !inCall;
            document.querySelector(".call-btn")?.classList.toggle("in-call");

            // Stop hold if hanging up
            if (!inCall && holdAudio) {
                holdAudio.pause();
                holdAudio = null;
                onHold = false;
            }

            if (inCall) playSound(fileName);

        } else if (fileName === "circle") {
            onHold = !onHold;

            if (onHold) {
                playSound(fileName);
                holdAudio = playHoldMusic();
            } else if (holdAudio) {
                holdAudio.pause();
                holdAudio = null;
            }

        } else if (fileName === "hash") {
            if (onHold) {
                onHold = false;
                if (holdAudio) {
                    holdAudio.pause();
                    holdAudio = null;
                }
            }
            playSound(fileName);

        } else if (inCall && !onHold) {
            playSound(fileName);
        }
    });
});