let inCall = false;
let onHold = false;
let holdAudio = null;
let villagerAudio = null;

const sound = new Map([
    ["beep", "sound/sfx/beep.wav"],
    ["phone", "sound/lines/hello.wav"],
    ["square", "sound/lines/info.wav"],
    ["hash", "sound/lines/main.wav"],
    ["circle", "sound/lines/hold.wav"],
    ["triangle", "sound/sfx/villager.wav"],
]);

function playSound(key, loop = false) {
    const audioUrl = sound.get(key);
    if (!audioUrl) return null;
    const audio = new Audio(audioUrl);
    audio.loop = loop;
    audio.play().catch(() => {});
    return audio;
}

function playMusic(path) {
    if (!path) return null;
    const audio = new Audio(path);
    audio.loop = true;
    audio.play().catch(() => {});
    return audio;
}

function stopHoldAudio() {
    if (holdAudio) {
        holdAudio.pause();
        holdAudio.currentTime = 0;
        holdAudio = null;
    }
    onHold = false;
}

function stopVillagerAudio() {
    if (villagerAudio) {
        villagerAudio.pause();
        villagerAudio.currentTime = 0;
        villagerAudio = null;
        console.log("Villager audio stopped");
    }
}

function stopAllAudio() {
    stopHoldAudio();
    stopVillagerAudio();
}

document.querySelectorAll(".button-grid button").forEach(button => {
    button.addEventListener("click", () => {
        const img = button.querySelector("img");
        if (!img || !img.src) return;
        const src = img.src.split('?')[0];
        const fileName = src.substring(src.lastIndexOf('/') + 1).replace(/\.[^/.]+$/, '');

        if (fileName !== "triangle") stopVillagerAudio();

        playSound("beep");

        if (fileName === "phone") {
            if (inCall) {
                stopAllAudio();
                inCall = false;
                document.querySelector(".call-btn")?.classList.remove("in-call");
            } else {
                inCall = true;
                document.querySelector(".call-btn")?.classList.add("in-call");
                playSound("phone");
            }
            return;
        }

        if (!inCall) return;

        if (fileName === "circle") {
            if (onHold) {
                stopHoldAudio();
            } else {
                stopVillagerAudio();
                holdAudio = playMusic("sound/music/hold.wav");
                playSound("circle");
            }
            onHold = !onHold;
            return;
        }

        if (fileName === "triangle") {
            if (villagerAudio) {
                stopVillagerAudio();
            } else {
                stopHoldAudio();
                villagerAudio = playMusic(sound.get("triangle"));
            }
            return;
        }

        if (fileName === "hash") {
            if (onHold) stopHoldAudio();
            stopVillagerAudio();
            playSound("hash");
            return;
        }

        if (inCall && !onHold) {
            playSound(fileName);
        }
    });
});