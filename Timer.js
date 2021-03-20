let displayTimer = document.querySelector(".remainingTime");
let backIn = document.querySelector(".backIn");
let buttons = document.querySelectorAll("[data-time]");
let initialText = document.querySelector(".initialText");
let butRemove = document.querySelector(".appendedButton");
let mainProgress = document.querySelector(".progress");
let progress = document.querySelector(".progress-bar");
let but, butFromWeb, body, totalSeconds, val, countDownTimer;
let restartBut, contBut, backBut, c, contSecs;
c = 0;
function initSeconds(seconds1) {
  totalSeconds = seconds1;
  timer(seconds1);
}
function timer(secondsGiven) {
  c = 0;
  if (restartBut) restartBut.remove();
  if (contBut) contBut.remove();
  if (backBut) backBut.remove();
  mainProgress.style.opacity = "1";
  displayTimer.style.display = "block";
  backIn.style.display = "block";
  butFromWeb = document.querySelector(".appendedButton");
  if (butFromWeb) butFromWeb.remove();
  but = document.createElement("button");
  but.innerHTML = "stop";
  but.classList.add("appendedButton");
  but.classList.add("btn");
  but.classList.add("btn-dark");
  let actualDisplay = document.querySelector(".actualdisplay");
  actualDisplay.appendChild(but);
  clearInterval(countDownTimer);
  const now = Date.now();
  const finalTime = now + secondsGiven * 1000;
  displayFinalTime(finalTime);
  displayLeftOutTime(secondsGiven);
  countDownTimer = setInterval(() => {
    let seconds = Math.round((finalTime - Date.now()) / 1000);
    if (seconds < 0) {
      clearInterval(countDownTimer);
      but.remove();
      back();
      return;
    }
    if (c == 1) return;
    displayLeftOutTime(seconds);
  }, 1000);
  but.addEventListener("click", stop);
}
function displayLeftOutTime(seconds) {
  contSecs = seconds;
  const minutesLeft = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  let display = `${minutesLeft}:${secondsLeft < 10 ? `0` : ``}${secondsLeft}`;
  document.title = display;
  displayTimer.textContent = display;
  val = seconds / totalSeconds;
  val = val * 100;
  val = 100 - val;
  progress.style.width = `${val}%`;
  if (seconds >= 10) {
    progress.classList.remove("bg-danger");
    progress.classList.remove("bg-warning");
    progress.classList.add("bg-success");
  } else if (seconds < 10 && seconds >= 5) {
    progress.classList.remove("bg-success");
    progress.classList.remove("bg-danger");
    progress.classList.add("bg-warning");
  } else if (seconds < 5) {
    progress.classList.remove("bg-warning");
    progress.classList.remove("bg-success");
    progress.classList.add("bg-danger");
  }
  if (seconds < 0) {
    back();
  }
}
function displayFinalTime(seconds) {
  const getHoursAndMinutes = new Date(seconds);
  const hours = getHoursAndMinutes.getHours();
  const minutes = getHoursAndMinutes.getMinutes();
  backIn.textContent = `Ends By ${hours > 12 ? hours - 12 : hours}:${
    minutes < 10 ? `0` : ``
  }${minutes}`;
}
function getTime() {
  timeRequired = parseInt(this.dataset.time);
  initSeconds(timeRequired);
  initialText.style.display = "none";
}
function stop() {
  c = 1;
  appBut = document.querySelector(".appendedButton");
  if (appBut) appBut.remove();
  restartBut = document.createElement("button");
  restartBut.innerHTML = "Restart";
  restartBut.classList.add("restartBut");
  restartBut.classList.add("btn");
  restartBut.classList.add("btn-dark");
  contBut = document.createElement("button");
  contBut.innerHTML = "Continue";
  contBut.classList.add("contBut");
  contBut.classList.add("btn");
  contBut.classList.add("btn-dark");
  backBut = document.createElement("button");
  backBut.innerHTML = "Back";
  backBut.classList.add("backBut");
  backBut.classList.add("btn");
  backBut.classList.add("btn-dark");
  actDis = document.querySelector(".actualdisplay");
  actDis.appendChild(restartBut);
  actDis.appendChild(contBut);
  actDis.appendChild(backBut);
  restartBut.addEventListener("click", restart);
  contBut.addEventListener("click", cont);
  backBut.addEventListener("click", back);
}
function restart() {
  timer(totalSeconds);
}
function cont() {
  timer(contSecs);
}
function back() {
  but.remove();
  restartBut.remove();
  contBut.remove();
  backBut.remove();
  clearInterval(countDownTimer);
  initialText.style.display = "block";
  displayTimer.style.display = "none";
  backIn.style.display = "none";
  document.title = "Timer";
  mainProgress.style.opacity = "0";
}
buttons.forEach((button) => button.addEventListener("click", getTime));
document.timeInMinutes.addEventListener("submit", function (e) {
  e.preventDefault(); //to remove the value from url
  const minutes = this.timeInMinutesInput.value;
  initialText.style.display = "none";
  initSeconds(minutes * 60);
  this.reset();
});
