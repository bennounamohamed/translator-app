const container = document.querySelector(".container");

// Input/Output
const textFrom = document.querySelector(".from-text");
const textTo = document.querySelector(".to-text");

// Language Selectors
const select1 = document.getElementById("select_1");
const select2 = document.getElementById("select_2");

// First language select
Object.values(countries).forEach((country) => {
  const option = document.createElement("option");
  option.value = option.textContent = country;
  if (country === "English") option.selected = "selected";
  select1.appendChild(option);
});

// Second language select
Object.values(countries).forEach((country) => {
  const option = document.createElement("option");
  option.value = option.textContent = country;
  if (country === "French") option.selected = "selected";
  select2.appendChild(option);
});

// translate function
const translate = async function (text, langPair) {
  if (text === "") return;
  try {
    const req = await fetch(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=${langPair}` // langpair Format : en|fr
    );

    if (!req.ok) alert("Failed, please try again.");

    const data = await req.json();

    return data.responseData.translatedText;
  } catch (err) {
    alert(err);
  }
};

const copyText = function (input) {
  input.select();
  input.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(input.value);

  alert(`Copied: ${input.value}`);
};

// Event Delegation
container.addEventListener("click", (e) => {
  // Switch button
  if (e.target.classList.contains("fa-exchange-alt")) {
    [select1.value, select2.value] = [select2.value, select1.value]; // Swap variables without temporary 3rd variable
  }

  // Copy button Resulting Text
  if (e.target.id === "copy-to") {
    if (textTo.textContent === "") return;
    copyText(textTo);
  }

  // Copy button Typed Text
  if (e.target.id === "copy-from") {
    if (textFrom.value === "") return;
    copyText(textFrom);
  }

  // Main Translate Button
  if (e.target.id === "translateBtn") {
    // find object key from country value.
    const lang1 = Object.keys(countries)
      .find((k) => countries[k] === select1.value)
      .slice(0, 2);

    const lang2 = Object.keys(countries)
      .find((k) => countries[k] === select2.value)
      .slice(0, 2);

    const langPair = `${lang1}|${lang2}`;

    translate(textFrom.value, langPair).then(
      (res) => (textTo.textContent = res)
    );
  }
});
