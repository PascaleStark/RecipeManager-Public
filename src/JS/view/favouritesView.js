import regeneratorRuntime from "regenerator-runtime";
import View from "./view";
import { URL } from "../config.js";

class FavouritesView extends View {
  _parentEl = document.querySelector(".recipe__container");
  _favouriteRecipeBtn = document.querySelector(".icon-heart");
  _body = document.getElementsByTagName("body")[0];
  _titleView = "Favourites";
  _allFavouritesBtn = document.querySelector(".nav__favourites--btn");
  _allfavouritesMenuBtn = document.querySelector(
    ".menu-view__list--favourites"
  );
  _resultsHeading = document.querySelector(".results__heading");
  _viewMenu = document.querySelector(".menu-section");
  _closeMenu = document.querySelector(".menu-view__icon");
  _dropdownFilterEl = document.querySelector(".dropdown");

  constructor() {
    super();
    this.setFavouriteIcon();
  }

  _setRecipeID(handler, e) {
    const targetEl = e.target.closest(".icon-heart");
    if (targetEl) {
      const id = targetEl.dataset.id;
      handler(`${URL}/favourites/${id}`);
    }
  }

  toggleFavourites(handler) {
    this._body.addEventListener("click", this._setRecipeID.bind(this, handler));
  }

  _toggleHeartIcon(e) {
    const targetEl = e.target.closest(".icon-heart");
    if (targetEl) {
      targetEl.classList.toggle("empty-icon");
      targetEl.classList.toggle("filled-icon");
    }
  }

  setFavouriteIcon() {
    this._body.addEventListener("click", this._toggleHeartIcon.bind(this));
  }

  openFavouritesView(handler) {
    this._allFavouritesBtn.addEventListener("click", function () {
      document
        .querySelector(".results__heading")
        .scrollIntoView({ behavior: "smooth" });
      handler();
    });
  }
}
export default new FavouritesView();
