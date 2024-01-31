const nameInput = document.getElementById("name-input");
const saveBtn = document.getElementById("save-btn");
const timeInput = document.getElementById("time-input");

saveBtn.addEventListener("click", () => {
  const name = nameInput.value;
  const notificationTime = timeInput.value;
  chrome.storage.sync.set(
    {
      name,
      notificationTime,
    },
    () => {
      console.log(`name is set to ${name}`);
    }
  );
});

chrome.storage.sync.get(["name", "notificationTime"], (res) => {
  nameInput.value = res.name ?? "??";
  timeInput.value = res.notificationTime ?? "??";
  console.log(`name is set to ${res.value}`);
});
