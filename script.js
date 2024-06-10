const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const voiceList = document.getElementById('voiceList');

function loadVoiceOptions() {
    const voices = window.speechSynthesis.getVoices();
    const dropdown = document.getElementById("voiceDropdown");
    if (voices.length > 0) {
        voices.forEach(voice => {
            var option = document.createElement('option');
            option.value = voice.voiceURI.toLowerCase().replace(' ', '');
            option.textContent = voice.name;
            dropdown.appendChild(option);

            var list = document.createElement('li');
            list.textContent = voice.name;
            voiceList.appendChild(list);
        });
    } else {
        var option = document.createElement('option');
        option.value = "no-voice-available";
        option.textContent = "no voice available";
        dropdown.appendChild(option);
    }
}
speechSynthesis.onvoiceschanged = loadVoiceOptions;

convertBtn.addEventListener('click', function () {
    const speechSynth = window.speechSynthesis;
    const enteredText = text.value.trim();
    if (!enteredText) {
        enteredText = "Please enter the text to read";
    }
    const newUtter = new SpeechSynthesisUtterance(enteredText);
    const voices = speechSynth.getVoices();
    if (voices.length > 0) {
        var selectedVoice = document.getElementById("voiceDropdown").selectedOptions[0];
        selectedVoice = voices.find(voice => voice.name === selectedVoice.innerText);
        if (selectedVoice) {
            newUtter.voice = selectedVoice;
            speechSynth.speak(newUtter);
            convertBtn.textContent = "Reading...";
            newUtter.onend = () => {
                convertBtn.textContent = "Read";
            };
        }
    }
});
