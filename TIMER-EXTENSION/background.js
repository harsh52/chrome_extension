chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(["timer", "isRunning"], (res) => {
    const time = res.timer ?? 0;

    const isRunning = res.isRunning ?? true;
    console.log(`is running ${res.isRunning}`);
    if (!isRunning) {
      return;
    }
    chrome.storage.local.set({
      timer: time + 1,
    });
    chrome.action.setBadgeText({
      text: `${time + 1}`,
    });
    chrome.storage.sync.get(["notificationTime"], (res) => {
      const notificationTime = res.notificationTime;
      if (time % notificationTime == 0) {
        this.registration.showNotification("Chrome Timer Extension", {
          body: `${notificationTime} second`,
          icon: "icon.png",
        });
      }
    });
  });
});
