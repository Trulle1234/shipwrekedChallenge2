const buttons = document.querySelectorAll(".button-grid button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const img = button.querySelector("img");
        if (img && img.src) {
            const fileName = img.src.split('/').pop().replace('.svg', '');
            console.log(fileName);
        }
    });
});