import regeneratorRuntime from "regenerator-runtime";
import View from "./view";
import { URL } from "../config.js";

class FeaturedView extends View {
  _parentEl = document.querySelector(".recipe__container");
  _featuredRecipeBtn = document.querySelector(".icon-star");
  _body = document.getElementsByTagName("body")[0];
  _titleView = "Featured";
  _allFavouritesBtn = document.querySelector(".nav__favourites--btn");
  _resultsHeading = document.querySelector(".results__heading");
  _dropdownFilterEl = document.querySelector(".dropdown");
  _titleView = "Featured";

  constructor() {
    super();
    this.setFeaturedIcon();
  }

  _setRecipeID(handler, e) {
    const targetEl = e.target.closest(".icon-star");
    if (targetEl) {
      const id = targetEl.dataset.id;
      handler(`${URL}/featured/${id}`);
    }
  }

  toggleFeatured(handler) {
    this._body.addEventListener("click", this._setRecipeID.bind(this, handler));
  }

  _toggleStarIcon(e) {
    const targetEl = e.target.closest(".icon-star");
    if (targetEl) {
      targetEl.classList.toggle("empty-icon");
      targetEl.classList.toggle("filled-icon");
    }
  }

  setFeaturedIcon() {
    this._body.addEventListener("click", this._toggleStarIcon.bind(this));
  }
}

export default new FeaturedView();
