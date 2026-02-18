$(document).ready(function () {
  const STORAGE_KEY = "stopwatch_sessions_v1";

  let seconds = 0;
  let intervalId = null;
  let isRunning = false;
  let isPaused = false;

  const pad = (n) => String(n).padStart(2, "0");

  const formatHHMMSS = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  const todayISO = () => new Date().toISOString().slice(0, 10);

  const showToast = (msg) => {
    $("#toast").text(msg).removeClass("hidden").hide().fadeIn(150);
    setTimeout(() => $("#toast").fadeOut(200, () => $("#toast").addClass("hidden")), 1500);
  };

  const openModal = (title, msg) => {
    $("#modalTitle").text(title);
    $("#modalMsg").text(msg);
    $("#modalBackdrop, #modal").removeClass("hidden");
  };

  const closeModal = () => {
    $("#modalBackdrop, #modal").addClass("hidden");
  };

  const getSessions = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  };

  const setSessions = (sessions) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  };

  const validateDate = () => {
    const val = $("#eventDate").val();
    if (!val) {
      $("#dateError").text("Please select a date");
      return false;
    }
    $("#dateError").text("");
    return true;
  };

  const validateName = () => {
    const name = $("#eventName").val().trim();

    if (!name) { $("#nameError").text("Event name is required"); return false; }
    if (name.length < 3) { $("#nameError").text("Event name must be at least 3 characters"); return false; }
    if (name.length > 100) { $("#nameError").text("Event name too long (max 100 characters)"); return false; }

    const regex = /^[A-Za-z0-9\s\-']+$/;
    if (!regex.test(name)) { $("#nameError").text("Event name contains invalid characters"); return false; }

    $("#nameError").text("");
    return true;
  };

  $("#eventDate").on("focus", () => $("#dateError").text(""));
  $("#eventName").on("focus", () => $("#nameError").text(""));

  const setInputsDisabled = (disabled) => {
    $("#eventDate, #eventName").prop("disabled", disabled);
  };

  const startTicking = async () => {
    const startPromise = () =>
      new Promise((resolve) => {
        intervalId = setInterval(() => {
          seconds += 1;
          $("#timerDisplay").text(formatHHMMSS(seconds));
        }, 1000);
        resolve(true);
      });

    await startPromise();
  };

  const stopTicking = async () => {
    const stopPromise = () =>
      new Promise((resolve) => {
        if (intervalId) clearInterval(intervalId);
        intervalId = null;
        resolve(true);
      });

    await stopPromise();
  };

  const renderStats = (sessions) => {
    $("#totalSessions").text(sessions.length);
    const totalSeconds = sessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
    $("#totalTime").text(formatHHMMSS(totalSeconds));
  };

  const renderHistory = (sessions, filterDate = "") => {
    const container = $("#history");
    container.empty();

    let list = [...sessions].sort((a, b) => (b.savedAt || "").localeCompare(a.savedAt || ""));
    if (filterDate) list = list.filter((s) => s.date === filterDate);

    if (list.length === 0) {
      container.append(`<div class="empty">No sessions recorded yet</div>`);
      return;
    }

    list.forEach((s) => {
      container.append(`
        <div class="historyItem">
          <div class="historyTop">
            <div>
              <span class="tag">${s.date}</span>
              <div style="margin-top:8px; font-weight:900;">${s.eventName}</div>
            </div>
            <div style="text-align:right;">
              <div style="color:#6b7280; font-weight:800;">Duration</div>
              <div style="font-size:18px; font-weight:900;">${formatHHMMSS(s.durationSeconds)}</div>
            </div>
          </div>
        </div>
      `);
    });
  };

  const refreshUI = () => {
    const sessions = getSessions();
    renderStats(sessions);
    renderHistory(sessions, $("#filterDate").val());
  };

  $("#eventDate").val(todayISO());
  $("#timerDisplay").text("00:00:00");
  refreshUI();

  $("#startBtn").click(async () => {
    if (isRunning) return;

    const okDate = validateDate();
    const okName = validateName();
    if (!okDate || !okName) return;

    isRunning = true;
    isPaused = false;

    setInputsDisabled(true);
    $("#startBtn").prop("disabled", true);
    $("#pauseBtn").prop("disabled", false).text("Pause");
    $("#stopSaveBtn").prop("disabled", false);

    showToast("Timer started");
    await startTicking();
  });

  $("#pauseBtn").click(async () => {
    if (!isRunning) return;

    if (!isPaused) {
      isPaused = true;
      $("#pauseBtn").text("Resume");
      showToast("Paused");
      await stopTicking();
    } else {
      isPaused = false;
      $("#pauseBtn").text("Pause");
      showToast("Resumed");
      await startTicking();
    }
  });

  $("#stopSaveBtn").click(async () => {
    if (!isRunning) return;

    await stopTicking();
    isRunning = false;
    isPaused = false;

    const date = $("#eventDate").val();
    const eventName = $("#eventName").val().trim();

    const sessionObj = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      date,
      eventName,
      durationSeconds: seconds,
      savedAt: new Date().toISOString()
    };

    const sessions = getSessions();
    sessions.unshift(sessionObj);
    setSessions(sessions);

    openModal("Saved!", "Your session was saved successfully.");
    refreshUI();

    seconds = 0;
    $("#timerDisplay").text("00:00:00");

    setInputsDisabled(false);
    $("#startBtn").prop("disabled", false);
    $("#pauseBtn").prop("disabled", true).text("Pause");
    $("#stopSaveBtn").prop("disabled", true);

    showToast("Session saved");
  });

  $("#resetBtn").click(async () => {
    if (isRunning) {
      await stopTicking();
      isRunning = false;
      isPaused = false;

      setInputsDisabled(false);
      $("#startBtn").prop("disabled", false);
      $("#pauseBtn").prop("disabled", true).text("Pause");
      $("#stopSaveBtn").prop("disabled", true);
    }

    seconds = 0;
    $("#timerDisplay").text("00:00:00");
    showToast("Reset to 00:00:00");
  });

  $("#filterDate").on("change", () => refreshUI());
  $("#clearFilterBtn").click(() => {
    $("#filterDate").val("");
    refreshUI();
  });

  $("#modalClose").click(() => closeModal());
  $("#modalBackdrop").click(() => closeModal());
});
