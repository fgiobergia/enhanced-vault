// ==UserScript==
// @name      Vault2DoK
// @namespace http://f.giobergia.com
// @author    Flavio Giobergia
// @version   1
// @grant     none
// @include   https://www.keyforgegame.com/deck-details/*
// ==/UserScript==

const buildDoKLogo = () => {
    /* This has been extracted from the SVG logo of DoK */
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "26");
    svg.setAttribute("height", "35");
    svg.setAttribute("viewBox", "0 0 26 35");
    svg.setAttribute("fill", "none");

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "0.8125");
    rect.setAttribute("y", "0.125");
    rect.setAttribute("width", "25");
    rect.setAttribute("height", "34.4375");
    rect.setAttribute("rx", "4");
    rect.setAttribute("fill", "#FFC107");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M21.1814 8.45235C21.1814 10.3472 19.6158 11.9108 17.6502 11.9108C15.6846 11.9108 14.1189 10.3472 14.1189 8.45235C14.1189 6.55753 15.6846 4.99393 17.6502 4.99393C19.6158 4.99393 21.1814 6.55753 21.1814 8.45235Z");
    path.setAttribute("stroke", "#2196F3");
    path.setAttribute("stroke-width", "2");

    const linesObjs = [
      {x1: "16.0861", y1: "10.6206", x2: "5.28522", y2:"27.4533", stroke:"#2196F3", "stroke-width": "2"},
      {x1: "6.06371", y1: "24.3884", x2: "11.9552", y2:"28.1687", stroke:"#2196F3", "stroke-width": "2"},
      {x1: "7.68384", y1: "21.8634", x2: "13.5753", y2:"25.6437", stroke:"#2196F3", "stroke-width": "2"}
    ];

    const lines = linesObjs.map(l => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        Object.keys(l).forEach(k => line.setAttribute(k, l[k]));
        return line;
    });

    svg.append(rect, path, ...lines);

    return svg;
  }


  const iid = setInterval(() => {
    console.log("WAIT");
    const deckIdMatch = window.location.href.match(/[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}/);
    const icon = document.getElementById("dok-icon");

    if (deckIdMatch === null || icon !== null) {
        clearInterval(iid);
        return ;
    }
    const deckId = deckIdMatch[0];
    console.log(deckId);

    const title = document.getElementsByClassName("deck-details__deck-name")[0];
    if (title !== undefined) {
      clearInterval(iid);
      const dokLogo = buildDoKLogo();
      const link = document.createElement("a");
      link.setAttribute("id", "dok-icon");

      link.appendChild(dokLogo);
      link.setAttribute("href", `https://decksofkeyforge.com/decks/${deckId}`);
      title.after(link);
    }
  }, 1000);

