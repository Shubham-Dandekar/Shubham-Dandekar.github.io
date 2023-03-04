/* ---------------------------- Navbar ---------------------------- */

const menu = document.querySelector(".navbar > .menu ");

function openMenu() {
  menu.style.right = "0";
}

function closeMenu() {
  menu.style.right = "-100%";
}

/* ---------------------------- Resume Open in New Tab ---------------------------- */

function openResume() {
  const redirectWindow = window.open(
    "./Files/fw20_0018-Shubham-Dandekar-Resume.pdf",
    "_blank"
  );
  redirectWindow.location;
}

/* ---------------------------- Active menu selection ---------------------------- */

const menus = document.querySelectorAll("a.menu-item");
const section = document.querySelectorAll("section");

function activeMenu() {
  let length = section.length;
  while (--length && window.scrollY + 200 < section[length].offsetTop) {}

  menus.forEach((menu) => menu.removeAttribute("id", "active"));
  menus[length].setAttribute("id", "active");
}

activeMenu();

/* ---------------------------- Display go-to-top button ---------------------------- */

window.addEventListener("scroll", activeMenu);

const navbar = document.querySelector(".navbar");
const arrow = document.querySelector(".go-to-top");

window.onscroll = function () {
  if (window.scrollY >= 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  if (window.scrollY >= 120) {
    arrow.classList.add("arrow");
  } else {
    arrow.classList.remove("arrow");
  }
};

/* ---------------------------- Email Sent ---------------------------- */
const form = document.getElementById("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validate();
});

const validate = () => {
  const fullNameVal = fullName.value.trim();
  const emailVal = email.value.trim();
  const subjectVal = subject.value.trim();
  const messageVal = message.value.trim();

  const isEmail = (emailVal) => {
    let atSymbol = emailVal.indexOf("@");
    let dotSymbol = emailVal.lastIndexOf(".");

    if (atSymbol < 1) return false;
    else if (dotSymbol < atSymbol + 5) return false;
    else if (dotSymbol < emailVal.length - 5) return false;
    else return true;
  };

  const setErrorMsg = (field, errorMessage) => {
    const formControl = field.parentElement;
    const msg = formControl.querySelector("p");
    formControl.className = "form-control error";
    msg.innerText = errorMessage;
  };

  const setSuccessMsg = (field) => {
    const formControl = field.parentElement;
    const msg = formControl.querySelector("p");
    formControl.className = "form-control success";
    msg.innerText = "";
  };

  if (fullNameVal === "") {
    setErrorMsg(fullName, "Name cannot be blank");
  } else if (fullNameVal.length < 5) {
    setErrorMsg(fullName, "Name should be atleast of 5 characters");
  } else {
    setSuccessMsg(fullName);
  }

  if (emailVal === "") {
    setErrorMsg(email, "Email cannot be blank");
  } else if (!isEmail(emailVal)) {
    setErrorMsg(email, "Please enter valid email address");
  } else {
    setSuccessMsg(email);
  }

  if (subjectVal === "") {
    setErrorMsg(subject, "Subject cannot be blank");
  } else if (subjectVal.length < 5) {
    setErrorMsg(subject, "Subject should be atleast of 5 characters");
  } else {
    setSuccessMsg(subject);
  }

  if (messageVal === "") {
    setErrorMsg(message, "Message cannot be blank");
    return;
  } else if (messageVal.length < 10) {
    setErrorMsg(message, "Subject should be atleast of 10 characters");
    return;
  } else {
    setSuccessMsg(message);
  }

  Email.send({
    SecureToken: "f69974b9-33cf-49ec-87b4-e3ad01144763",
    To: "shubhamdandekar4@gmail.com",
    From: "portfolio.shubhamdandekar@gmail.com",
    Subject: subjectVal,
    Body:
      "From: " +
      emailVal +
      "\nName: " +
      fullNameVal +
      "\nMessage: " +
      messageVal,
  }).then((message) => {
    if (message === "OK") {
      swal(
        "Congratulation!",
        "Your mail has been sent successfully!",
        "success"
      );
      form.reset();
    } else {
      console.log(message);
      swal("Oops..", "Failed to send your mail...", "success");
    }
  });
};

/*-------------------------- GitHub Calender --------------------------*/
GitHubCalendar(".calendar", "Shubham-Dandekar", { responsive: true }).then(
  (r) => r.text()
);
