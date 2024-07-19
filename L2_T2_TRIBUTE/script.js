document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleButton");
  const moreContent = document.getElementById("more-content");

  toggleButton.addEventListener("click", function () {
    if (moreContent.classList.contains("hide")) {
      moreContent.classList.remove("hide");
      toggleButton.textContent = "See Less";
    } else {
      moreContent.classList.add("hide");
      toggleButton.textContent = "See More";
    }
  });
});
