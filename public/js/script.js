const navbtn = document.querySelector(".mobile-nav");
const nav_header = document.querySelector(".nav-main");

const showMenu = () => {
  nav_header.classList.toggle("active");
};

navbtn.addEventListener("click", showMenu);

// NEW Functions

async function checkLinks(links) {
  const invalidLinks = [];

  for (let i = 0; i < links.length; i++) {
    const link = links[i];

    try {
      const response = await fetch(link, { method: "HEAD" });
      if (response.status === 404 || response.redirected) {
        invalidLinks.push(link);
      }
    } catch (error) {
      invalidLinks.push(link);
    }
  }

  return invalidLinks;
}

function checkLinksOnPage() {
  const links = document.getElementsByTagName("a");
  let linksToCheck = [];
  for (let i = 0; i < links.length; i++) {
    const linke = links[i].href;
    linksToCheck.push(linke);
  }
  checkLinks(linksToCheck)
    .then((invalidLinks) => {
      invalidLinks.forEach((link) => {
        console.log("Invalid Link:", link);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

checkLinksOnPage();
