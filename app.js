document.addEventListener("DOMContentLoaded", () => {
  const textAreaElm = document.querySelector("#textArea");

  function showElement(id) {
    document
      .querySelectorAll(".hovered")
      .forEach((elm) => (elm.style.display = "none"));
    const menu = document.getElementById(id);
    menu.style.display = "flex";
    document.addEventListener("click", () => hideElement(menu));

    event.stopPropagation();
  }

  function hideElement(menu) {
    menu.style.display = "none";
    document
      .querySelectorAll(".hovered")
      .forEach((elm) => (elm.style.display = "none"));
    document.removeEventListener("click", () => hideElement(menu));
  }

  document
    .querySelector("#file")
    .addEventListener("click", () => showElement("menu"));
  document
    .querySelector("#edit")
    .addEventListener("click", () => showElement("menu2"));
  openBtn.addEventListener("click", async () => {
    const textAreaElm = document.querySelector("#textArea");
    const { content, path } = await window.invoke.openFile();
    if (content) {
      textAreaElm.value = content;
    }
    fileName.innerText = path.toString();
  });
  saveBtn.addEventListener("click", async () => {
    const path = await window.invoke.saveFile(textAreaElm.value);
    if (path) {
      fileName.innerText = path;
    }
  });
  newBtn.addEventListener("click", () => {
    textAreaElm.value = "";
    fileName.innerText = "";
  });

  timeDate.addEventListener("click", () => {
    textAreaElm.value += formatDateAndTime();
  });

  codeBtn.addEventListener("click", () => {
    textAreaElm.classList.toggle("code");
  });
  function formatDateAndTime() {
    var now = new Date();

    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();

    var hours = now.getHours();
    var minutes = now.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    var formattedDateTime =
      day + "/" + month + "/" + year + " " + hours + ":" + minutes + ampm;

    return formattedDateTime;
  }
});
