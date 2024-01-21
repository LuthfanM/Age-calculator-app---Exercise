function calculateAge(birthDateString) {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();

  let months = today.getMonth() - birthDate.getMonth();

  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    years--;
    months = 12 + months;
  }

  let days = today.getDate() - birthDate.getDate();
  if (days < 0) {
    let lastDayOfPrevMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    days = lastDayOfPrevMonth + days;
    months--;
    if (months < 0) {
      years--;
      months = 11;
    }
  }

  return { years, months, days };
}

document.addEventListener("DOMContentLoaded", () => {
  let submitBtn = document.querySelector("#img_container");

  submitBtn.addEventListener("click", () => {
    const allNotifs = document.querySelectorAll(".notif");
    allNotifs.forEach((notif) => {
      notif.textContent = "";
      notif.classList.remove("active");
    });

    const day = document.getElementById("day").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;

    let isValid = true;

    if (!day || !month || !year) {
      document.querySelector("#day + .notif").textContent =
        "Please fill out all fields";
      document.querySelector("#day + .notif").classList.add("active");
      isValid = false;
    }

    if (day < 1 || day > 31) {
      document.querySelector("#day + .notif").textContent =
        "Must be a valid day";
      document.querySelector("#day + .notif").classList.add("active");
      isValid = false;
    }

    if (month < 1 || month > 12) {
      document.querySelector("#month + .notif").textContent =
        "Must be a valid month";
      document.querySelector("#month + .notif").classList.add("active");
      isValid = false;
    }

    const inputDate = new Date(year, month - 1, day);
    if (
      inputDate.getDate() != day ||
      inputDate.getMonth() != month - 1 ||
      inputDate.getFullYear() != year
    ) {
      document.querySelector("#day + .notif").textContent = "Invalid date";
      document.querySelector("#day + .notif").classList.add("active");
      isValid = false;
    }

    const today = new Date();
    if (inputDate > today) {
      document.querySelector("#day + .notif").textContent =
        "Must be in the past";
      document.querySelector("#day + .notif").classList.add("active");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    let result = calculateAge(year + "-" + month + "-" + day);

    document.querySelector(".label-years .dash.extra-bold-italic").textContent =
      result.years;
    document.querySelector(
      ".label-months .dash.extra-bold-italic"
    ).textContent = result.months;
    document.querySelector(".label-days .dash.extra-bold-italic").textContent =
      result.days;

    submitBtn.classList.toggle("clicked");

    setTimeout(() => {
      submitBtn.classList.remove("clicked");
    }, 300);
  });
});
