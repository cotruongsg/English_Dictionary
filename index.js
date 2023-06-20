const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());
    console.log(result);
    if (result.title) {
      meaningContainerEl.style.display = "block";
      infoTextEl.style.display = "none";
      titleEl.innerText = word;
      meaningEl.innerText = "N/A";
      audioEl.style.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";
      titleEl.innerText = result[0].word;
      // Meaning Source
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
      // Audio Source
      audioArr = result[0].phonetics;
      audioEl.src = "";
      var i = 0;
      while (i < audioArr.length) {
        let audio = result[0].phonetics[i].audio;
        if (audio !== "" && audio.includes("us.mp3")) {
          audioEl.src = result[0].phonetics[i].audio;
          break;
        }
        i++;
      }
    }
  } catch (error) {
    console.log(error);
    infoTextEl.innerText = `an error happened, try again later`;
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
