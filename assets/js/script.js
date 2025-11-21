'use strict';

/* ------------------------------------------------------------
   1. PAGE NAVIGATION (Moved to top so it always works)
------------------------------------------------------------ */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Only run this if links exist
if (navigationLinks.length > 0) {
  navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
      const targetPage = this.innerHTML.toLowerCase().trim();

      // Switch the active page
      let pageFound = false;
      pages.forEach(page => {
        if (page.dataset.page === targetPage) {
          page.classList.add("active");
          pageFound = true;
          window.scrollTo(0, 0);
        } else {
          page.classList.remove("active");
        }
      });

      // Switch the active button color
      if (pageFound) {
        navigationLinks.forEach(nav => nav.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });
}

/* ------------------------------------------------------------
   2. ELEMENT TOGGLE FUNCTION
------------------------------------------------------------ */
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

/* ------------------------------------------------------------
   3. SIDEBAR TOGGLE
------------------------------------------------------------ */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

/* ------------------------------------------------------------
   4. TESTIMONIALS (Fixed the crash here)
------------------------------------------------------------ */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// We check if ALL these exist before trying to use them.
// If 'modalCloseBtn' is missing, this entire block is skipped safely.
if (testimonialsItem.length > 0 && modalContainer && modalCloseBtn && overlay) {
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  testimonialsItem.forEach(item => {
    item.addEventListener("click", function () {
      const modalImg = document.querySelector("[data-modal-img]");
      const modalTitle = document.querySelector("[data-modal-title]");
      const modalText = document.querySelector("[data-modal-text]");

      if (modalImg && modalTitle && modalText) {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
        testimonialsModalFunc();
      }
    });
  });

  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

/* ------------------------------------------------------------
   5. FILTER & SELECT (Fixed potential crashes)
------------------------------------------------------------ */
const select = document.querySelector("[data-select]");

if (select) {
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  select.addEventListener("click", function () { elementToggleFunc(this); });

  const filterFunc = function (selectedValue) {
    filterItems.forEach(item => {
      if (selectedValue === "all" || selectedValue === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  selectItems.forEach(item => {
    item.addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  });

  if (filterBtn.length > 0) {
    let lastClickedBtn = filterBtn[0];
    filterBtn.forEach(btn => {
      btn.addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        if (selectValue) selectValue.innerText = this.innerText;
        filterFunc(selectedValue);
        
        if(lastClickedBtn) lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
      });
    });
  }
}

/* ------------------------------------------------------------
   6. CONTACT FORM
------------------------------------------------------------ */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs && formBtn) {
  formInputs.forEach(input => {
    input.addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });
}
