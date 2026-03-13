(function () {
  emailjs.init("bgPMvjgJ9C-HJ3z9j");
})();

const btn = document.getElementsByClassName("button-text")[0];
const inputs = document.getElementsByClassName("inputs-wrapper")[0];
const msgBox = document.getElementsByClassName("message-sent-box")[0];

const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const eventDetails = document.getElementById("event-details");

document
  .getElementById("book-event-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    btn.textContent = "Sending...";

    const serviceID = "default_service";
    const templateID = "template_fr819xj";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.textContent = "Submit";
        fullName.value = "";
        email.value = "";
        phone.value = "";
        eventDetails.value = "";

        inputs.classList.toggle("subdued");
        msgBox.classList.toggle("show");
        console.log("🫟 Message successfully sent! 🤙")
      },
      (err) => {
        btn.textContent = "Submit";
        alert(JSON.stringify(err));
      }
    );
  });
