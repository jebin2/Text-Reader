const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const error = document.querySelector('.error-para');

convertBtn.addEventListener('click', function () {
    const speechSynth = window.speechSynthesis;
    const enteredText = text.value.trim();

    if (!enteredText) {
        enteredText = "Please enter the text to read";
    }

    const newUtter = new SpeechSynthesisUtterance(enteredText);
    const voices = speechSynth.getVoices();

    // Ensure voices are loaded
    function loadVoices() {
        const voices = speechSynth.getVoices();
        console.log("Available Voices:", voices);

        if (voices.length > 0) {
            // const selectedVoice = voices.find(voice => voice.name.includes("Tamil"));
            const selectedVoice = voices.find(voice => voice.name.includes("Catherine"));
            if (selectedVoice) {
                newUtter.voice = selectedVoice;
            } else {
                console.error("Voice 'Zira' not found.");
                // Handle voice not found error
            }
        } else {
            console.error("No voices available.");
            // Handle no voices available error
        }

        speechSynth.speak(newUtter);

        // Update button text
        convertBtn.textContent = "Sound is Playing...";

        // Reset button text after 5 seconds
        setInterval(() => {
            if(!speechSynth.speaking) {
                convertBtn.textContent = "Play Converted Sound";
            }
        }, 1000);
    }

    // Reset onvoiceschanged event handler
    speechSynthesis.onvoiceschanged = null;

    // Assign the event handler
    speechSynthesis.onvoiceschanged = loadVoices;

    // If voices are already loaded, call loadVoices immediately
    if (voices.length > 0) {
        loadVoices();
    }
});
