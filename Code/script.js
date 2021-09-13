const form = document.getElementById("form");
const otpForm = document.getElementById("otpform");
const otpSubmit = document.getElementById("otpSubmit");
const otpInput = document.getElementById("otpinput");
const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const mob_no = document.getElementById("mobno");
const clearField_mob = document.getElementById("clear_mobno");
const clearField_fullname = document.getElementById("clear_fullname");
const clearField_email = document.getElementById("clear_email");
const clearField_otp = document.getElementById("clear_otp");
const reset_all = document.getElementById("resetall");

//regex pattern in which full-name should be written
let fullnameRegex = /^[a-zA-Z]([a-zA-Z]{3,}[ ])+[a-zA-Z]{4,}[ ]*?$/;

//regex pattern in which email should be written
let emailRegex = /^[a-zA-Z]([a-zA-Z0-9_\-]){4,}[@][a-z]+[\.][a-z]{2,}/;

//clear fields on click
clearField_mob.addEventListener("click", () => {
  mob_no.value = "";
  document.getElementById("mob_provider").innerHTML = "";
  document.getElementById("logo").style.display = "none";
  document.getElementById("state").innerHTML = "";
});

//clear fields on click
clearField_fullname.addEventListener("click", () => {
  fullName.value = "";
});

//clear fields on click
clearField_email.addEventListener("click", () => {
  email.value = "";
});

//clear fields on click
clearField_otp.addEventListener("click", () => {
  otpInput.value = "";
});

//clear all fields
reset_all.addEventListener("click", () => {
  fullName.value = "";
  email.value = "";
  mob_no.value = "";
  document.getElementById("mob_provider").innerHTML = "";
  document.getElementById("logo").style.display = "none";
  document.getElementById("state").innerHTML = "";
  document.getElementById("name_err").innerHTML = "";
  document.getElementById("email_err").innerHTML = "";
  document.getElementById("mob_err").innerHTML = "";
});

//on input eventlistener in mobile-no field
mob_no.addEventListener("input", (e) => {
  if (e.target.value.length < 8) {
    e.target.value = e.target.value
      .replace(/[^\d]/g, "")
      .replace(/(.{3})/g, "$1-")
      .trim();
  }
  // service provider code from mobile-no
  const mobileprovider = e.target.value.slice(0, 3);

  // state code from mobile-no
  const stateCode = e.target.value.slice(4, 7);

  // to determine service provider from mobile no
  if (mobileprovider <= 799 && mobileprovider >= 621) {
    document.getElementById("logo").src = "jio.svg.png";
    document.getElementById("logo").style.display = "inline-block";
  } else if (mobileprovider <= 920 && mobileprovider >= 801) {
    document.getElementById("logo").src = "idea.jpg";
    document.getElementById("logo").style.display = "inline-block";
  } else if (mobileprovider <= 999 && mobileprovider >= 921) {
    document.getElementById("logo").src = "vodafone.png";
    document.getElementById("logo").style.display = "inline-block";
  } else {
    if (mob_no.value.length >= 3) {
      document.getElementById("mob_provider").innerHTML =
        "Invalid Service Provider";
      // setTimeout(() => {
      //   document.getElementById('mob_provider').innerHTML = '';
      // }, 4500);
      throw "invalid";
    } else if (mob_no.value.length < 3) {
      document.getElementById("mob_provider").innerHTML = "";
      document.getElementById("logo").style.display = "none";
    }
  }

  // to determine state from mobile no
  if (document.getElementById("mob_provider").innerHTML == "") {
    if (stateCode >= 100 && stateCode <= 200) {
      document.getElementById("state").innerHTML = "Delhi";
    } else if (stateCode >= 201 && stateCode <= 300) {
      document.getElementById("state").innerHTML = "Maharashtra";
    } else if (stateCode >= 301 && stateCode <= 400) {
      document.getElementById("state").innerHTML = "Rajasthan";
    } else if (stateCode >= 401 && stateCode <= 500) {
      document.getElementById("state").innerHTML = "Gujrat";
    } else if (stateCode >= 501 && stateCode <= 600) {
      document.getElementById("state").innerHTML = "Karnataka";
    } else if (stateCode >= 601 && stateCode <= 700) {
      document.getElementById("state").innerHTML = "West Bengal";
    } else if (stateCode >= 701 && stateCode <= 800) {
      document.getElementById("state").innerHTML = "Punjab";
    } else if (stateCode >= 801 && stateCode <= 900) {
      document.getElementById("state").innerHTML = "Harayana";
    } else if (stateCode >= 901 && stateCode <= 999) {
      document.getElementById("state").innerHTML = "Madhya Pradesh";
    }
  }

  // if (
  //   mob_no.value.length == 0 &&
  //   document.getElementById("mob_provider").innerHTML == ""
  // ) {
  //   document.getElementById("mob_err").innerHTML = "";
  // }
});

// error handling on blur start
function nameErrorHandler() {
  if (fullName.value.length != 0) {
    if (fullnameRegex.test(fullName.value) == false) {
      var name_message =
        "Fullname should contain min 2 words with min 4 alphabet Ex: John Snow";
      document.getElementById("name_err").innerHTML = name_message;
    } else {
      document.getElementById("name_err").innerHTML = "";
    }
  }
}

function emailErrorHandler() {
  if (email.value.length != 0) {
    if (emailRegex.test(email.value) == false) {
      var email_message =
        "(Must contain atleat 5 characters before @) Ex: ab123@gmail.com";
      document.getElementById("email_err").innerHTML = email_message;
    } else {
      document.getElementById("email_err").innerHTML = "";
    }
  }
}

function mobileErrorHandler() {
  if (mob_no.value.length != 0) {
    if (
      mob_no.value === "" ||
      mob_no.value.length < 12 ||
      mob_no.value.length > 12 ||
      document.getElementById("mob_provider").innerHTML ==
        "Invalid Service Provider"
    ) {
      var mob_message =
        "Mobile no should contain 10 numbers with valid service provider";
      document.getElementById("mob_err").innerHTML = mob_message;
    } else {
      document.getElementById("mob_err").innerHTML = "";
    }
  }
}
// error handling on blur end

//on submit eventlistener of form

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (fullnameRegex.test(fullName.value) == false) {
    var name_message =
      "Fullname should contain min 2 words with min 4 alphabet Ex: John Snow";
    document.getElementById("name_err").innerHTML = name_message;
  } else if (emailRegex.test(email.value) == false) {
    var email_message =
      "(Must contain atleat 5 characters before @) Ex: ab123@gmail.com";
    document.getElementById("email_err").innerHTML = email_message;
  } else if (
    mob_no.value === "" ||
    mob_no.value.length < 12 ||
    mob_no.value.length > 12 ||
    document.getElementById("mob_provider").innerHTML ==
      "Invalid Service Provider"
  ) {
    var mob_message =
      "Mobile no should contain 10 numbers with valid service provider";
    document.getElementById("mob_err").innerHTML = mob_message;
  } else {
    document.getElementById("formpage").style.display = "none";
    document.getElementById("resultpage").style.display = "block";
  }
  const firstName = fullName.value.substr(0, fullName.value.indexOf(" "));

  //result page  code ---------------------------

  if (fullnameRegex.test(fullName.value) && mob_no.value.length == 12) {
    document.getElementById(
      "verifyMsg"
    ).innerHTML = `Dear <span style="color:green; display:contents">${firstName}</span>,
    Thank you for your inquiry. A 4 digit verification number has been sent to your phone 
    number: <span style="color:green; display:contents">${mob_no.value}</span>, please enter in the following box and submit for confirmation:`;
  }
});

const otp = Math.floor(1000 + Math.random() * 9000);
document.getElementById("otp_no").innerHTML = `OTP : ${otp}`;

let clickCount = 0;
//on submit eventlistener for otp verification

// on input maxlength of otp is 4
otpInput.addEventListener("input", (e) => {
  const maxLength = 4;
  if (e.target.value > maxLength) {
    otpInput.value = e.target.value.slice(0, maxLength);
  }
});

//otp error handling on blur
function otpErrorHandler() {
  if (otpInput.value.length != 0) {
    if (otpInput.value != otp) {
      console.log(otpInput.value);
      document.getElementById("otp_err").innerHTML = "Invalid OTP";
    } else {
      document.getElementById("otp_err").innerHTML = "";
    }
  }
}

//on submit otp
otpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (otpInput.value == otp) {
    document.getElementById("ValidationMsg").innerHTML =
      '<span style="color:green">Validation successful</span>';
    console.log("Validation Success");
    document.getElementById("otpformCard").style.display = "none";
    document.getElementById("otp_no").style.display = "none";
    document.getElementById("verifyMsg").style.display = "none";
    window.open("http://pixel6.co/", "_self");
  } else {
    e.preventDefault();
    console.log(otpInput.value);
    document.getElementById("otp_err").innerHTML = "Invalid OTP";
    // setTimeout(() => {
    //   document.getElementById("otp_err").innerHTML = "";
    // }, 2750);
    otpSubmit.addEventListener("click", (e) => {
      clickCount++;
      console.log(clickCount);
    });
    if (clickCount > 3) {
      document.getElementById("ValidationMsg").innerHTML =
        '<span style="color:red">Validation Failed</span>';
      document.getElementById("otpformCard").style.display = "none";
      document.getElementById("otp_no").style.display = "none";
      document.getElementById("verifyMsg").style.display = "none";
      window.open("http://pixel6.co/notfound", "_self");
    }
  }
});
