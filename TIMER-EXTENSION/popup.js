const nameElement = document.getElementById("name");
const timeElement = document.getElementById("time");
const timerElement = document.getElementById("timer");

function updateTimeElements() {
  chrome.storage.local.get(["timer"], (res) => {
    const time = res.timer ?? 0;
    timerElement.textContent = `your time is: ${time} seconds`;
  });
  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = `the time is: ${currentTime}`;
}

chrome.storage.sync.get(["name"], (res) => {
  const name = res.name ?? "???";
  nameElement.textContent = `your name is: ${name}`;
});

updateTimeElements();
setInterval(updateTimeElements, 1000);

// const timeElement = document.getElementById("time");
// const nameElement = document.getElementById("name");
// const timerElement = document.getElementById("timer");

// function updateTimeElements() {
//   chrome.storage.local.get(["timer"], (res) => {
//     const time = res.timer ?? 0;
//     timerElement.textContent = `The timer is at: ${time} seconds`;
//   });
//   const currentTime = new Date().toLocaleTimeString();
//   timeElement.textContent = `The time is: ${currentTime}`;
// }

// updateTimeElements();
// setInterval(updateTimeElements, 1000);

// chrome.storage.sync.get(["name"], (res) => {
//   const name = res.name ?? "???";
//   nameElement.textContent = `Your name is: ${name}`;
// });

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

startBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: true,
  });
});

stopBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
  });
  console.log("in stopBtn listener");
});

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
  });
});
