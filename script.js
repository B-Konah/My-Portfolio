var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

// Function to close the sidebar when clicking away
document.addEventListener("click", function (event) {
  var sidebar = document.getElementById("nav");
  var targetElement = event.target; // clicked element

  do {
    if (targetElement == sidebar) {
      // Clicked inside the sidebar
      return;
    }
    // Move up the DOM
    targetElement = targetElement.parentNode;
  } while (targetElement);

  // Clicked outside the sidebar, so hide it
  hideSidebar();
});

// Function to close the sidebar when clicking on an in-page anchor link
document.querySelectorAll('#nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Scroll to the target
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });

    // Hide the sidebar
    hideSidebar();
  });
});

function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }

  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

const scriptURL =
  "https://script.google.com/macros/s/AKfycbyAKdmAcqc61z99nus9OTd26f4J6lNLfywG9_uFsJq33yuguv2aWubaWYFBQeHupObCxQ/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Message sent successfully";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});

var nav = document.getElementById("nav"),
  stop = nav.offsetTop,
  docBody =
    document.documentElement || document.body.parentNode || document.body,
  hasOffset = window.pageYOffset !== undefined,
  scrollTop;

window.onscroll = function (e) {
  scrollTop = hasOffset ? window.pageYOffset : docBody.scrollTop;
  if (scrollTop >= stop) {
    nav.className = "sticky";
  } else {
    nav.className = "";
  }
};
