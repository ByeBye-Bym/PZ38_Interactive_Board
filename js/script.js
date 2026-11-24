"use strict";

const searchInput = document.querySelector("#search-input");
const ideaForm = document.querySelector("#idea-form");
const ideaInput = document.querySelector("#idea-input");
const list = document.querySelector("#ideas-list");
const count = document.querySelector("#favorite-count");
const status = document.querySelector("#board-status");

function updateCount() {
  count.textContent = list.querySelectorAll(".fav-button.is-favorite").length;
}

// Задание 1. На input в searchInput переберите .idea-card через querySelectorAll().
// Сравните data-title с запросом в нижнем регистре и переключите is-hidden.

function filterIdeas() {
  const query = searchInput.value.trim().toLowerCase();
  const cards = list.querySelectorAll(".idea-card");

  cards.forEach(function (card) {
    const title = card.dataset.title.toLowerCase();
    card.classList.toggle("is-hidden", !title.includes(query));
  });
}

searchInput.addEventListener("input", function () {
  filterIdeas();
});

// Задание 2. На keydown в searchInput обработайте Escape:
// очистите поле и вызовите обновление поиска (можно dispatchEvent(new Event("input"))).

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input"));
  }
});

// Задание 3. На submit формы создайте li.idea-card, span и button.fav-button.
// Запишите data-title, добавьте в список и очистите поле.
// Обновите фильтр, чтобы новая карточка сразу отображалась корректно.

ideaForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = ideaInput.value.trim();
  if (title === "") {
    status.textContent = "Введите название идеи.";
    return;
  }

  const card = document.createElement("li");
  card.className = "idea-card";
  card.dataset.title = title;

  const text = document.createElement("span");
  text.textContent = title;

  const button = document.createElement("button");
  button.className = "fav-button";
  button.type = "button";
  button.setAttribute("aria-label", "Добавить в избранное");
  button.setAttribute("aria-pressed", "false");
  button.textContent = "☆";

  card.append(text, button);
  list.append(card);

  ideaInput.value = "";
  filterIdeas();
  status.textContent = "Добавлена идея: " + title;
});

// Задание 4. Подключите один click к list. Найдите .fav-button через closest().
// Переключите is-favorite, aria-pressed и символ ☆ / ★. Вызовите updateCount().

list.addEventListener("click", function (event) {
  const button = event.target.closest(".fav-button");
  if (!button) {
    return;
  }

  const isFavorite = button.classList.toggle("is-favorite");
  button.setAttribute("aria-pressed", String(isFavorite));
  button.textContent = isFavorite ? "★" : "☆";

  updateCount();
});
