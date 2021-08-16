import regeneratorRuntime from "regenerator-runtime";
import View from "./view.js";
import { URL } from "../config.js";

class RecipeView extends View {
  _recipeContainer = document.querySelector(".recipe__container");
  _parentEl = document.querySelector(".recipe-view");
  _viewRecipeBtn = document.querySelector(".recipe__card--btn");
  _body = document.getElementsByTagName("body")[0];
  _deleteRecipeBtn = document.querySelector(
    ".recipe__card--btn-options-delete"
  );
  _failMessage = "Something went wrong, please try again later!";

  constructor() {
    super();
    this._closeRecipeView();
    this._closeErrMsgModal();
  }

  openRecipeView(handler) {
    this._recipeContainer.addEventListener(
      "click",
      this._setRecipeID.bind(this, handler)
    );
  }

  _setRecipeID(handler, e) {
    const targetEl = e.target.closest("#btn-view");
    if (
      targetEl &&
      targetEl.id === "btn-view" &&
      targetEl.id !== "btn-delete"
    ) {
      const id = targetEl.dataset.id;
      this.showModalView();
      handler(`${URL}/where?id=${id}`);
    }
  }

  _closeRecipeView() {
    const self = this;
    this._parentEl.addEventListener("click", function (e) {
      if (e.target && e.target.id === "closeModal") self.hideModalView();
    });
  }

  renderView(data) {
    this._parentEl.innerHTML = "";
    this._data = data;
    this._generateMarkup();
    this._parentEl.insertAdjacentHTML("beforeend", this._generateMarkup());
  }

  _generateMarkup() {
    return `<svg class="icon icon__close-view icon__close-outline" id="closeModal">
    <use
      xlink:href="./src/img/icons.svg#icon-close-outline"
    ></use></svg>
<h1 class=" heading--secondary">${this._data.title}</h1>
<div class="recipe-view__info">
<div class="recipe-view__ingredients">
  <h2 class="heading--tertiary">Ingredients</h2>
  
  <div class="recipe-view__ingredients--details">
    <ul class="list-style">
    ${this._data.ingredients
      .map((ing) => {
        return `<li><svg class="icon icon__cheveron-right">
      <use
        xlink:href="./src/img/icons.svg#icon-cheveron-right"
      ></use></svg
    ><span class="recipe-view__element--text">${ing}</span></li>`;
      })
      .join("")}
    </ul>
  </div>
</div>

<div class="recipe-view__info--details">
  <svg class="icon icon__file--text">
    <use
      xlink:href="./src/img/icons.svg#icon-file-text"
    ></use></svg
  >
  <ul class="list-style">
    <li><span class="text-bolder">Preparation time:</span> ${
      this._data.prepTime
    }</li>
    <li><span class="text-bolder">Cooking time:</span> ${
      this._data.cookingTime
    }</li>
    <li><span class="text-bolder">Servings:</span> ${this._data.servings}</li>
    <li><span class="text-bolder">Category:</span> ${this._data.category}</li>
    <li><span class="text-bolder">Publisher:</span> ${this._data.publisher}</li>
  </ul>
</div>
</div>

<div class="recipe-view__directions">
<h2 class="heading--tertiary">Directions</h2>
<div class="recipe-view__directions--details">
  <ul class="list-style">
    ${this._data.directions
      .map((direc, i) => {
        return `<li class="recipe-view__directions--element"><svg class="icon icon__checkmark-outline">
      <use
        xlink:href="./src/img/icons.svg#icon-checkmark-outline"
      ></use></svg
    ><span class="text-bolder">Step ${i + 1}:&nbsp;</span>${direc}</li>`;
      })
      .join("")}
  </ul>
</div>
</div>
<div class="recipe-view__url">
      Source: <a href="${this._data.url}" target="_blank">${this._data.url} </a>
</div>`;
  }
}

export default new RecipeView();
