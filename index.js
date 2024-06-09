const translateButton = document.getElementById("translateButton");
const inputtextElement = document.getElementById("inputText");
const outputTextElement = document.getElementById("outputText");
const languageSelect = document.getElementById("languageSelect");

translateButton.addEventListener("click", async () => {
  const inputText = inputtextElement.value.trim();
  const targetLanguage = languageSelect.value;

  if (inputText === "") {
    alert("Please enter tet to translate");
    return;
  }

  // Attempt to fetch the translation using an API
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        inputText
      )}&langpair=en|${targetLanguage}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Translation");
    }
    const data = await response.json();

    let translatedText = data.responseData.translatedText;

    if (!translatedText && data.matches && data.matches.length > 0) {
      translatedText = data.matches[0].translation;
    }
    outputTextElement.innerText = translatedText || "Translation not available";
  } catch (error) {
    console.log("Error:", error);
    alert("Translation failed. Please try again!");
  }
});
