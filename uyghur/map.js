const cities = {
  kashgar: {
    name: "Kashgar",
    description:
      "Historisk oaseby ved vestkanten av Taklamakanørkenen. Kashgars gamleby og basar vitner om byens lange historie som møteplass langs handelsrutene gjennom Sentral-Asia.",
    note: "Kjent for: gamlebyen, basaren og historiske handelsforbindelser.",
  },
  yarkand: {
    name: "Yarkand (Shache)",
    description:
      "En historisk by sør for Kashgar og et viktig sentrum i Yarkent-khanatet. Yarkand forbindes også med musikktradisjonen muqam og fortellinger fra Tarim-bekkenet.",
    note: "Kjent for: Yarkent-khanatet, muqam og historiske oaser.",
  },
  hotan: {
    name: "Hotan (Khotan)",
    description:
      "Oaseby på sørkanten av Taklamakanørkenen. Hotan har lenge vært kjent for jade, silke og teppeveving, og lå ved en viktig gren av handelsrutene gjennom Tarim-bekkenet.",
    note: "Kjent for: jade, silke, tepper og oasekultur.",
  },
  kucha: {
    name: "Kucha (Kuqa)",
    description:
      "Historisk oase og kultursentrum nord for Taklamakanørkenen. Kucha-regionen er særlig kjent for buddhistiske grotter og veggmalerier, blant annet Kizil-grottene.",
    note: "Kjent for: Kizil-grottene og regionens buddhistiske kunsthistorie.",
  },
  turpan: {
    name: "Turpan (Turfan)",
    description:
      "Oaseby i et varmt og tørt basseng øst i regionen. Området er kjent for de gamle byruinene Jiaohe og Gaochang, karez-vanningssystemene og vindruedyrking.",
    note: "Kjent for: Jiaohe, karez, druer og oaselandbruk.",
  },
  urumqi: {
    name: "Urumqi (Ürümqi)",
    description:
      "Hovedstaden i Xinjiang Uyghur autonome region og et moderne administrativt og kulturelt sentrum. Byen ligger nord for Taklamakanørkenen, ved foten av Tian Shan.",
    note: "Kjent for: regionens hovedstad, museer og moderne byliv.",
  },
  gulja: {
    name: "Gulja (Yining)",
    description:
      "By i Ili-dalen vest i Xinjiang, nær grensen til Kasakhstan. Området har lenge vært et møtested for ulike folk og tradisjoner i Sentral-Asia.",
    note: "Kjent for: Ili-dalen, historisk handel og mangfoldige kulturtradisjoner.",
  },
};

const cityName = document.querySelector("#city-name");
const cityDescription = document.querySelector("#city-description");
const cityNote = document.querySelector("#city-note");
const cityControls = document.querySelectorAll("[data-city]");

function selectCity(cityId) {
  const city = cities[cityId];
  if (!city) {
    return;
  }

  cityName.textContent = city.name;
  cityDescription.textContent = city.description;
  cityNote.textContent = city.note;

  cityControls.forEach((control) => {
    const selected = control.dataset.city === cityId;
    control.classList.toggle("is-selected", selected);
    control.setAttribute("aria-pressed", String(selected));
  });
}

cityControls.forEach((control) => {
  control.addEventListener("click", () => selectCity(control.dataset.city));

  if (control.matches(".city-marker")) {
    control.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectCity(control.dataset.city);
      }
    });
  }
});
