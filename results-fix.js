"use strict";
(() => {
  const params = new URLSearchParams(location.search);
  const browse = params.get("browse");
  const value = params.get("value");
  const q = params.get("q");
  if (!browse || value || q) return;
  const refine = document.getElementById("refine-button");
  if (refine) refine.hidden = true;
  const form = document.getElementById("results-search-form");
  const input = document.getElementById("results-search-input");
  if (form && input) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const query = input.value.trim();
      location.href = query ? `results.html?q=${encodeURIComponent(query)}` : "browse.html";
    });
  }
})();
