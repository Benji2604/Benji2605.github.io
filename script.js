// array van projecten
const projecten = [
  {
    naam: "Hotel Simulator",
    techniek: "Java · Swing",
    categorie: "java",
    beschrijving:
      "Een hotelsimulatie gebouwd rond MVC en SOLID-principes, waarbij ik zelf de architectuur heb opgezet en uitgebreid.",
    punten: [
      "MVC-architectuur met strikte scheiding tussen model, view en controller",
      "Destructie-eventsysteem (Godzilla) gebouwd met het Strategy pattern",
      "SRP-audits uitgevoerd en renderer-klassen opgesplitst in kleinere, losse verantwoordelijkheden",
      "UML-klassendiagram bijgehouden in Visual Paradigm",]
  },
  {
    naam: "SmartBin",
    techniek: "JavaFX · micro:bit · Groepsproject",
    categorie: "hardware",
    beschrijving:
      "Een slimme prullenbak die met een micro:bit meet hoe vol hij is, gekoppeld aan een JavaFX-applicatie.",
    punten: [
      "Afstandsmeting tussen top en bodem van de bak via een micro:bit-sensor",
      "JavaFX-applicatie die de vulgraad visualiseert",
      "Samengewerkt in groepsverband aan hardware- en software-integratie",]
  },
  {
    naam: "Portfolio website",
    techniek: "HTML · CSS · JavaScript",
    categorie: "web",
    beschrijving:
      "Deze portfoliosite zelf, gebouwd vanaf de basis met semantische HTML en een eigen CSS-opmaak.",
    punten: [
      "Semantische HTML5-structuur (header, nav, main, section, footer)",
      "Responsive CSS-layout met flexbox en grid",
      "Werkende navigatie tussen alle pagina's",]
  },];

// functie om projectkaart te maken
  const maakProjectKaart = (project) => {
  const kaart = document.createElement("article");
  kaart.classList.add("project");

  const titel = document.createElement("h2");
  titel.textContent = project.naam;

  const techniek = document.createElement("p");
  techniek.classList.add("project-tech");
  techniek.textContent = project.techniek;

  const beschrijving = document.createElement("p");
  beschrijving.textContent = project.beschrijving;

  const lijst = document.createElement("ul");
  project.punten.forEach((punt) => {
    const item = document.createElement("li");
    item.textContent = punt;
    lijst.appendChild(item);
  });

  kaart.append(titel, techniek, beschrijving, lijst);

  return kaart;
};

// functie om projecten te tonen
const toonProjecten = (lijst) => {
  const container = document.getElementById("projecten-lijst");
  if (!container) {
    return;
  }

  container.textContent = "";

  lijst.forEach((project) => {
    container.appendChild(maakProjectKaart(project));
  });
};

// knoppen functie voor projecten filter
const koppelFilterKnoppen = () => {
  const knoppen = document.querySelectorAll(".filter-knoppen button");

  knoppen.forEach((knop) => {
    knop.addEventListener("click", () => {
      const categorie = knop.dataset.categorie;
      toonProjecten(filterProjecten(categorie));
    });
  });
};

// knoppen functie voor projecten filter
const filterProjecten = (categorie) => {
  if (categorie === "alles") {
    return projecten;
  }
  return projecten.filter((project) => project.categorie === categorie);
};

// blogposts inklap functie
const koppelBlogposts = () => {
  const posts = document.querySelectorAll(".blogpost");

  posts.forEach((post) => {
    const titel = post.querySelector("h2");

    titel.addEventListener("click", () => {
      post.classList.toggle("open");
    });
  });
};

// dark mode functie
const koppelDarkMode = () => {
  const knop = document.getElementById("dark-mode-knop");
  if (!knop) {
    return;
  }

  const icoon = knop.querySelector("i");

  const zetDarkMode = (aan) => {
    document.body.classList.toggle("dark-mode", aan);
    icoon.classList.toggle("bi-moon-fill", !aan);
    icoon.classList.toggle("bi-sun-fill", aan);
    localStorage.setItem("dark-mode", aan ? "aan" : "uit");
  };

  zetDarkMode(localStorage.getItem("dark-mode") === "aan");

  knop.addEventListener("click", () => {
    const isNuAan = document.body.classList.contains("dark-mode");
    zetDarkMode(!isNuAan);
  });
};

//contactformulier validatie
const valideerNaam = (waarde) => {
  return waarde.trim().length >= 2;
};

const valideerEmail = (waarde) => {
  return waarde.includes("@") && waarde.length > 2;
};

const valideerBericht = (waarde) => {
  return waarde.trim().length >= 10;
};

const toonVeldFout = (input, foutElement, isGeldig, melding) => {
  if (isGeldig) {
    foutElement.textContent = "";
    input.classList.remove("ongeldig");
    input.removeAttribute("aria-invalid");
  } else {
    foutElement.textContent = melding;
    input.classList.add("ongeldig");
    input.setAttribute("aria-invalid", "true");
  }
};

// contactformulier submit functie
const verwerkFormulier = (event) => {
  event.preventDefault();

  const naamInput = document.getElementById("naam");
  const emailInput = document.getElementById("email");
  const berichtInput = document.getElementById("bericht");

  const naamFout = document.getElementById("naam-fout");
  const emailFout = document.getElementById("email-fout");
  const berichtFout = document.getElementById("bericht-fout");

  const bevestiging = document.getElementById("bevestiging");

  const naamGeldig = valideerNaam(naamInput.value);
  const emailGeldig = valideerEmail(emailInput.value);
  const berichtGeldig = valideerBericht(berichtInput.value);

  toonVeldFout(naamInput, naamFout, naamGeldig, "Vul minimaal 2 karakters in voor je naam.");
  toonVeldFout(emailInput, emailFout, emailGeldig, "Vul een geldig e-mailadres in, met een @.");
  toonVeldFout(berichtInput, berichtFout, berichtGeldig, "Je bericht moet minimaal 10 karakters lang zijn.");

  if (naamGeldig && emailGeldig && berichtGeldig) {
    bevestiging.textContent = "Bedankt, je bericht is verzonden!";
  } else {
    bevestiging.textContent = "";
  }
};

// koppel contactformulier submit event
const koppelContactFormulier = () => {
  const formulier = document.getElementById("contact-formulier");
  if (!formulier) {
    return;
  }

  formulier.addEventListener("submit", verwerkFormulier);
};

// functie om grap op te halen
const haalGrapOp = async () => {
  const tekstElement = document.getElementById("grap-tekst");
  if (!tekstElement) {
    return;
  }

  tekstElement.textContent = "Laden...";

  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error("Server gaf een foutstatus terug");
    }

    const data = await response.json();
    tekstElement.textContent = data.joke;
  } catch (fout) {
    tekstElement.textContent = "Kon geen grap ophalen. Probeer het later opnieuw.";
  }
};

// koppel grap knop
const koppelGrapKnop = () => {
  const knop = document.getElementById("grap-knop");
  if (!knop) {
    return;
  }

  knop.addEventListener("click", haalGrapOp);
  haalGrapOp();
};

toonProjecten(projecten);
koppelFilterKnoppen();
koppelBlogposts();
koppelDarkMode();
koppelContactFormulier();
koppelGrapKnop();