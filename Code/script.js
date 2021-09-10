const form = document.getElementById('form');
const otpForm = document.getElementById('otpform');
const otpInput = document.getElementById('otpinput');
const fullName = document.getElementById('fullname');
const email = document.getElementById('email');
const mob_no = document.getElementById('mobno');
const clearField_mob = document.getElementById('clear_mobno');
const clearField_fullname = document.getElementById('clear_fullname');
const clearField_email = document.getElementById('clear_email');

//regex pattern in which full-name should be written
let fullnameRegex = /^[a-zA-Z]([a-zA-Z]{3,}[ ])+[a-zA-Z]{4,}[ ]*?$/;

//regex pattern in which email should be written
let emailRegex = /^[a-zA-Z]([a-zA-Z0-9_\-]){3,}[@][a-z]+[\.][a-z]{2,}/;

//clear fields on click
clearField_mob.addEventListener('click', () => {
  mob_no.value = '';
  document.getElementById('mob_provider').innerHTML = '';
  document.getElementById('logo').style.display = 'none';
  document.getElementById('state').innerHTML = '';
});

//clear fields on click
clearField_fullname.addEventListener('click', () => {
  fullName.value = '';
});

//clear fields on click
clearField_email.addEventListener('click', () => {
  email.value = '';
});

//on input eventlistener in mobile-no field
mob_no.addEventListener('input', (e) => {
  if (e.target.value.length < 8) {
    e.target.value = e.target.value
      .replace(/[^\d]/g, '')
      .replace(/(.{3})/g, '$1-')
      .trim();
  }
  // service provider code from mobile-no
  const mobileprovider = e.target.value.slice(0, 3);

  // state code from mobile-no
  const stateCode = e.target.value.slice(4, 7);

  // to determine service provider from mobile no
  if (mobileprovider <= 799 && mobileprovider >= 621) {
    document.getElementById('logo').src = 'jio.svg.png';
    document.getElementById('logo').style.display = 'inline-block';
  } else if (mobileprovider <= 920 && mobileprovider >= 801) {
    document.getElementById('logo').src = 'idea.jpg';
    document.getElementById('logo').style.display = 'inline-block';
  } else if (mobileprovider <= 999 && mobileprovider >= 921) {
    document.getElementById('logo').src = 'vodafone.png';
    document.getElementById('logo').style.display = 'inline-block';
  } else {
    if (mob_no.value.length > 3) {
      document.getElementById('mob_provider').innerHTML =
        'Invalid Service Provider';
      throw 'invalid';
    }
  }

  // to determine state from mobile no
  if (stateCode >= 100 && stateCode <= 200) {
    document.getElementById('state').innerHTML = 'Delhi';
  } else if (stateCode >= 201 && stateCode <= 300) {
    document.getElementById('state').innerHTML = 'Maharashtra';
  } else if (stateCode >= 301 && stateCode <= 400) {
    document.getElementById('state').innerHTML = 'Rajasthan';
  } else if (stateCode >= 401 && stateCode <= 500) {
    document.getElementById('state').innerHTML = 'Gujrat';
  } else if (stateCode >= 501 && stateCode <= 600) {
    document.getElementById('state').innerHTML = 'Karnataka';
  } else if (stateCode >= 601 && stateCode <= 700) {
    document.getElementById('state').innerHTML = 'West Bengal';
  } else if (stateCode >= 701 && stateCode <= 800) {
    document.getElementById('state').innerHTML = 'Punjab';
  } else if (stateCode >= 801 && stateCode <= 900) {
    document.getElementById('state').innerHTML = 'Harayana';
  } else if (stateCode >= 901 && stateCode <= 999) {
    document.getElementById('state').innerHTML = 'Madhya Pradesh';
  }
});

//on submit eventlistener of form
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (fullnameRegex.test(fullName.value) == false) {
    var name_message =
      'Fullname should contain min 2 words with min 4 alphabet Ex: John Snow';
    document.getElementById('name_err').innerHTML = name_message;
  } else if (emailRegex.test(email.value) == false) {
    var email_message = 'email format Ex: abc21@gmail.com';
    document.getElementById('email_err').innerHTML = email_message;
  } else if (
    mob_no.value === '' ||
    mob_no.value.length < 12 ||
    mob_no.value.length > 12
  ) {
    var mob_message = 'Mobile no should contain 10 numbers';
    document.getElementById('mob_err').innerHTML = mob_message;
  } else {
    document.getElementById('formpage').style.display = 'none';
    document.getElementById('resultpage').style.display = 'block';
  }
  const firstName = fullName.value.substr(0, fullName.value.indexOf(' '));

  //result page  code ---------------------------
  if (fullnameRegex.test(fullName.value) && mob_no.value.length == 12) {
    document.getElementById('verifyMsg').innerHTML = `Dear ${firstName},
    Thank you for your inquiry. A 4 digit verification number has been sent to your phone 
    number: ${mob_no.value}, please enter in the following box and submit for confirmation:`;
  }
});

const otp = Math.floor(1000 + Math.random() * 9000);
document.getElementById('otp_no').innerHTML = `OTP : ${otp}`;

//on submit eventlistener for otp verification
otpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (otpInput.value == otp) {
    document.getElementById('ValidationSuccess').innerHTML =
      'Validation successful';
    console.log('Validation Success');
    document.getElementById('otpformCard').style.display = 'none';
    document.getElementById('otp_no').style.display = 'none';
    document.getElementById('verifyMsg').style.display = 'none';
    window.open('http://pixel6.co/');
  } else {
    e.preventDefault();
    console.log(otpInput.value);

    document.getElementById('otp_err').innerHTML = 'Invalid OTP';
    console.log('invalid otp');
  }
});
