import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputRef = document.querySelector("#datetime-picker");
const btnRef = document.querySelector("button");
const timerRef=document.querySelectorAll(".value")

let userSelectedDate;
let interval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        interval = userSelectedDate - options.defaultDate;
        if (interval < 1) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
            });
        }
        else {
            btnRef.disabled = false;
            inputRef.disabled = true;
        }
      console.log(selectedDates[0]);
  },
};

const calendar =  flatpickr("#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
    return String(value).padStart(2, '0'); 
};

btnRef.addEventListener('click', (event) => {
   const timerRepeat = setInterval(() => {
    interval = userSelectedDate - new Date();
       if (interval < 1) {
        btnRef.disabled = true; 
      clearInterval(timerRepeat);
      return;
    }
    
    const { days, hours, minutes, seconds } = convertMs(interval);
       
    timerRef[0].textContent = addLeadingZero(days);
    timerRef[1].textContent = addLeadingZero(hours);
    timerRef[2].textContent = addLeadingZero(minutes);
    timerRef[3].textContent = addLeadingZero(seconds);
  }, 1000);
});