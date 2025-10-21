const STORAGE_KEY = "taskAidState";
const DEFAULT_TIMER_SECONDS = 25 * 60;
let state;
let timerInterval;
const els = {
  body: document.body,
  themeToggle: document.getElementById("theme-toggle"),
  helperToggle: document.getElementById("helper-toggle"),
  upcomingTitle: document.getElementById("upcoming-title"),
  upcomingDetail: document.getElementById("upcoming-detail"),
  timerToggle: document.getElementById("timer-toggle"),
  timerPlay: document.getElementById("timer-play"),
  timerReset: document.getElementById("timer-reset"),
  timerDisplay: document.getElementById("timer-display"),
  timerProgress: document.getElementById("timer-progress-label"),
  calendarTitle: document.getElementById("calendar-title"),
  calendarDays: document.getElementById("calendar-days"),
  prevMonth: document.getElementById("prev-month"),
  nextMonth: document.getElementById("next-month"),
  selectedDateLabel: document.getElementById("selected-date-label"),
  selectedDateCount: document.getElementById("selected-date-count"),
  dailyTaskList: document.getElementById("daily-task-list"),
  syncCalendar: document.getElementById("sync-calendar"),
  tasksHeaderActions: document.querySelector(".tasks-header__actions"),
  searchInput: document.getElementById("task-search"),
  filterButton: document.getElementById("filter-button"),
  addTaskButton: document.getElementById("add-task"),
  tableBody: document.getElementById("task-table-body"),
  paginationSummary: document.getElementById("pagination-summary"),
  rowsPerPage: document.getElementById("rows-per-page"),
  prevPage: document.getElementById("prev-page"),
  nextPage: document.getElementById("next-page"),
  modal: document.getElementById("task-modal"),
  modalTitle: document.getElementById("task-modal-title"),
  closeModal: document.getElementById("close-modal"),
  cancelModal: document.getElementById("cancel-modal"),
  taskForm: document.getElementById("task-form"),
  toast: document.getElementById("toast"),
  timerProgressLabel: document.getElementById("timer-progress-label"),
  timerToggleText: document.getElementById("timer-toggle")
};
function createDefaultState() {
  const today = formatDateISO(new Date());
  const sampleTasks = [
    {
      id: crypto.randomUUID(),
      name: "Understanding the tools in Figma",
      dueDate: "2025-01-14",
      dueTime: "09:00",
      reminderStatus: "active",
      reminderLabel: "Monday, Jan 14 - 9:00",
      createdAt: Date.now()
    },
    {
      id: crypto.randomUUID(),
      name: "Understanding the tools in Figma",
      dueDate: "2025-01-18",
      dueTime: "09:00",
      reminderStatus: "overdue",
      reminderLabel: "Monday, Jan 18 - 9:00",
      createdAt: Date.now()
    },
    {
      id: crypto.randomUUID(),
      name: "Task name",
      dueDate: "2025-01-20",
      dueTime: "21:00",
      reminderStatus: "none",
      reminderLabel: "Not set",
      createdAt: Date.now()
    },
    {
      id: crypto.randomUUID(),
      name: "Task name",
      dueDate: "2025-01-20",
      dueTime: "21:00",
      reminderStatus: "none",
      reminderLabel: "Not set",
      createdAt: Date.now()
    }
  ];
  return {
    tasks: sampleTasks,
    search: "",
    pagination: { page: 1, pageSize: 10 },
    settings: { theme: "light", helper: false },
    calendar: {
      currentMonth: `${today.slice(0, 7)}-01`,
      selectedDate: today
    },
    timer: {
      duration: DEFAULT_TIMER_SECONDS,
      remaining: DEFAULT_TIMER_SECONDS,
      running: false,
      lastTick: null,
      doneTodaySeconds: 0,
      doneTodayDate: today
    }
  };
}
function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return createDefaultState();
    const parsed = JSON.parse(stored);
    const defaults = createDefaultState();
    return {
      ...defaults,
      ...parsed,
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : defaults.tasks,
      pagination: {
        page: parsed?.pagination?.page || defaults.pagination.page,
        pageSize: parsed?.pagination?.pageSize || defaults.pagination.pageSize
      },
      settings: {
        theme: parsed?.settings?.theme || defaults.settings.theme,
        helper: Boolean(parsed?.settings?.helper)
      },
      calendar: {
        currentMonth: parsed?.calendar?.currentMonth || defaults.calendar.currentMonth,
        selectedDate: parsed?.calendar?.selectedDate || defaults.calendar.selectedDate
      },
      timer: {
        duration: parsed?.timer?.duration || defaults.timer.duration,
        remaining: parsed?.timer?.remaining ?? defaults.timer.remaining,
        running: Boolean(parsed?.timer?.running),
        lastTick: null,
        doneTodaySeconds: parsed?.timer?.doneTodaySeconds || 0,
        doneTodayDate: parsed?.timer?.doneTodayDate || defaults.timer.doneTodayDate
      }
    };
  } catch {
    return createDefaultState();
  }
}
function saveState() {
  const persistable = { ...state, timer: { ...state.timer, lastTick: null } };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
}
function formatDateISO(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function formatDateDisplay(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}-${month}-${year}`;
}
function formatTimeDisplay(value) {
  if (!value) return "";
  const [hourPart, minutePart] = value.split(":");
  const hour = Number(hourPart);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}${minutePart !== "00" ? `:${minutePart}` : ""} ${period}`;
}
function formatDurationHMS(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hrs).padStart(1, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
function formatTimerDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
function setTheme(theme) {
  state.settings.theme = theme;
  els.body.setAttribute("data-theme", theme);
  saveState();
}
function toggleTheme() {
  setTheme(state.settings.theme === "light" ? "dark" : "light");
}
function toggleHelper() {
  state.settings.helper = !state.settings.helper;
  els.body.classList.toggle("helper-active", state.settings.helper);
  saveState();
}
function getTodayString() {
  return formatDateISO(new Date());
}
function refreshTimerDay() {
  const today = getTodayString();
  if (state.timer.doneTodayDate !== today) {
    state.timer.doneTodayDate = today;
    state.timer.doneTodaySeconds = 0;
  }
}
function updateTimerDisplay() {
  refreshTimerDay();
  els.timerDisplay.textContent = formatTimerDisplay(state.timer.remaining);
  els.timerProgress.textContent = `${formatDurationHMS(state.timer.doneTodaySeconds)} Done Today`;
  const running = state.timer.running;
  els.timerToggle.textContent = running ? "Pause Timer" : "Start Timer";
  els.timerPlay.classList.toggle("paused", running);
}
function tickTimer() {
  if (!state.timer.running) return;
  const now = Date.now();
  const last = state.timer.lastTick || now;
  const delta = Math.floor((now - last) / 1000);
  if (delta <= 0) return;
  state.timer.lastTick = now;
  state.timer.remaining = Math.max(0, state.timer.remaining - delta);
  if (state.timer.remaining === 0) {
    state.timer.running = false;
    state.timer.remaining = state.timer.duration;
    state.timer.doneTodaySeconds += state.timer.duration;
    clearInterval(timerInterval);
    timerInterval = undefined;
    showToast("Great job! Timer completed.");
  }
  saveState();
  updateTimerDisplay();
}
function startTimer() {
  if (state.timer.running) return;
  state.timer.running = true;
  state.timer.lastTick = Date.now();
  if (!timerInterval) timerInterval = setInterval(tickTimer, 1000);
  saveState();
  updateTimerDisplay();
}
function pauseTimer() {
  if (!state.timer.running) return;
  state.timer.running = false;
  state.timer.lastTick = null;
  clearInterval(timerInterval);
  timerInterval = undefined;
  saveState();
  updateTimerDisplay();
}
function resetTimer() {
  state.timer.running = false;
  state.timer.remaining = state.timer.duration;
  state.timer.lastTick = null;
  clearInterval(timerInterval);
  timerInterval = undefined;
  saveState();
  updateTimerDisplay();
}
function toggleTimer() {
  if (state.timer.running) {
    pauseTimer();
  } else {
    startTimer();
  }
}
function renderUpcomingTask() {
  const now = new Date();
  const tasks = [...state.tasks].sort((a, b) => new Date(`${a.dueDate}T${a.dueTime || "00:00"}`) - new Date(`${b.dueDate}T${b.dueTime || "00:00"}`));
  let upcoming = tasks.find(task => new Date(`${task.dueDate}T${task.dueTime || "23:59"}`) >= now);
  if (!upcoming && tasks.length) upcoming = tasks[0];
  if (!upcoming) {
    els.upcomingTitle.textContent = "No tasks yet";
    els.upcomingDetail.textContent = "Plan something amazing today.";
    return;
  }
  els.upcomingTitle.textContent = upcoming.name;
  const dueDate = formatDateDisplay(upcoming.dueDate);
  const dueTime = formatTimeDisplay(upcoming.dueTime);
  els.upcomingDetail.textContent = dueTime ? `${dueDate} • ${dueTime}` : dueDate;
}
function renderDailySummary() {
  const selected = state.calendar.selectedDate;
  const dateObj = new Date(selected);
  const formatter = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "short", day: "numeric" });
  els.selectedDateLabel.textContent = formatter.format(dateObj);
  const tasksForDay = state.tasks.filter(task => task.dueDate === selected).sort((a, b) => (a.dueTime || "") > (b.dueTime || "") ? 1 : -1);
  els.selectedDateCount.textContent = `${tasksForDay.length} Task${tasksForDay.length === 1 ? "" : "s"} planned`;
  els.dailyTaskList.innerHTML = "";
  if (!tasksForDay.length) {
    const empty = document.createElement("li");
    empty.className = "day-task-item";
    empty.innerHTML = `<span class="day-task-index">–</span><span class="day-task-name">No tasks planned</span>`;
    els.dailyTaskList.appendChild(empty);
    return;
  }
  tasksForDay.slice(0, 3).forEach((task, idx) => {
    const li = document.createElement("li");
    li.className = "day-task-item";
    li.innerHTML = `<span class="day-task-index">${idx + 1}</span><span class="day-task-name">${task.name}</span>`;
    els.dailyTaskList.appendChild(li);
  });
}
function renderCalendar() {
  const currentMonthDate = new Date(state.calendar.currentMonth);
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(currentMonthDate);
  els.calendarTitle.textContent = monthName;
  els.calendarDays.innerHTML = "";
  const firstDay = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 0).getDate();
  for (let i = 0; i < startWeekday; i += 1) {
    const spacer = document.createElement("div");
    spacer.className = "calendar-day placeholder";
    els.calendarDays.appendChild(spacer);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateString = `${currentMonthDate.getFullYear()}-${String(currentMonthDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";
    button.dataset.date = dateString;
    button.textContent = String(day);
    if (dateString === getTodayString()) button.classList.add("today");
    if (dateString === state.calendar.selectedDate) button.classList.add("selected");
    const hasTasks = state.tasks.some(task => task.dueDate === dateString);
    if (hasTasks) button.classList.add("has-tasks");
    els.calendarDays.appendChild(button);
  }
}
function applySearchFilter(tasks) {
  const term = state.search.trim().toLowerCase();
  if (!term) return tasks;
  return tasks.filter(task => `${task.name} ${task.reminderLabel}`.toLowerCase().includes(term));
}
function renderTasksTable() {
  const filtered = applySearchFilter(state.tasks);
  const sorted = [...filtered].sort((a, b) => new Date(`${a.dueDate}T${a.dueTime || "00:00"}`) - new Date(`${b.dueDate}T${b.dueTime || "00:00"}`));
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / state.pagination.pageSize));
  state.pagination.page = Math.min(state.pagination.page, totalPages);
  const startIdx = (state.pagination.page - 1) * state.pagination.pageSize;
  const pageItems = sorted.slice(startIdx, startIdx + state.pagination.pageSize);
  els.tableBody.innerHTML = pageItems
    .map(task => {
      const date = formatDateDisplay(task.dueDate);
      const time = formatTimeDisplay(task.dueTime);
      return `<tr data-task-id="${task.id}">
        <td class="task-name">${task.name}</td>
        <td class="task-meta">${date}</td>
        <td class="task-meta">${time || ""}</td>
        <td><span class="reminder-tag" data-status="${task.reminderStatus}">${task.reminderLabel || "Not set"}</span></td>
        <td><div class="table-actions">
          <button class="action-button" data-action="edit" aria-label="Edit task"><span class="icon icon-edit"></span></button>
          <button class="action-button" data-action="delete" aria-label="Delete task"><span class="icon icon-delete"></span></button>
        </div></td>
      </tr>`;
    })
    .join("");
  const startRange = total === 0 ? 0 : startIdx + 1;
  const endRange = Math.min(total, startIdx + pageItems.length);
  els.paginationSummary.textContent = `${startRange} - ${endRange} of ${total}`;
  els.prevPage.disabled = state.pagination.page === 1;
  els.nextPage.disabled = state.pagination.page === totalPages;
}
function renderAll() {
  renderUpcomingTask();
  renderCalendar();
  renderDailySummary();
  renderTasksTable();
  updateTimerDisplay();
}
function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("visible");
  setTimeout(() => {
    els.toast.classList.remove("visible");
  }, 3200);
}
function openModal(task) {
  els.modal.classList.remove("hidden");
  if (task) {
    els.modalTitle.textContent = "Edit Task";
    document.getElementById("task-id").value = task.id;
    document.getElementById("task-name").value = task.name;
    document.getElementById("task-date").value = task.dueDate;
    document.getElementById("task-time").value = task.dueTime || "";
    document.getElementById("reminder-status").value = task.reminderStatus;
    document.getElementById("reminder-label").value = task.reminderLabel || "";
  } else {
    els.modalTitle.textContent = "Add Task";
    els.taskForm.reset();
    document.getElementById("task-id").value = "";
    document.getElementById("reminder-status").value = "active";
  }
}
function closeModal() {
  els.modal.classList.add("hidden");
}
function handleTaskFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(els.taskForm);
  const id = formData.get("task-id");
  const task = {
    id: id || crypto.randomUUID(),
    name: formData.get("task-name").trim(),
    dueDate: formData.get("task-date"),
    dueTime: formData.get("task-time") || "",
    reminderStatus: formData.get("reminder-status"),
    reminderLabel: formData.get("reminder-label").trim() || (formData.get("reminder-status") === "none" ? "Not set" : "Reminder set"),
    createdAt: id ? state.tasks.find(t => t.id === id)?.createdAt || Date.now() : Date.now()
  };
  if (!task.name || !task.dueDate) {
    showToast("Please complete required fields.");
    return;
  }
  const existingIndex = state.tasks.findIndex(t => t.id === task.id);
  if (existingIndex >= 0) {
    state.tasks.splice(existingIndex, 1, task);
    showToast("Task updated.");
  } else {
    state.tasks.push(task);
    showToast("Task added.");
  }
  saveState();
  closeModal();
  renderAll();
}
function handleTableAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const row = button.closest("tr[data-task-id]");
  if (!row) return;
  const id = row.dataset.taskId;
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  if (button.dataset.action === "edit") {
    openModal(task);
  } else if (button.dataset.action === "delete") {
    state.tasks = state.tasks.filter(t => t.id !== id);
    showToast("Task deleted.");
    saveState();
    renderAll();
  }
}
function handleCalendarClick(event) {
  const button = event.target.closest("button.calendar-day");
  if (!button) return;
  state.calendar.selectedDate = button.dataset.date;
  renderCalendar();
  renderDailySummary();
  saveState();
}
function changeMonth(offset) {
  const current = new Date(state.calendar.currentMonth);
  current.setMonth(current.getMonth() + offset, 1);
  state.calendar.currentMonth = formatDateISO(current);
  renderCalendar();
  saveState();
}
function handleSearchInput(event) {
  state.search = event.target.value;
  state.pagination.page = 1;
  renderTasksTable();
  saveState();
}
function handleRowsPerPage(event) {
  state.pagination.pageSize = Number(event.target.value);
  state.pagination.page = 1;
  renderTasksTable();
  saveState();
}
function handlePageChange(direction) {
  const total = applySearchFilter(state.tasks).length;
  const totalPages = Math.max(1, Math.ceil(total / state.pagination.pageSize));
  state.pagination.page = Math.min(totalPages, Math.max(1, state.pagination.page + direction));
  renderTasksTable();
  saveState();
}
function initialize() {
  state = loadState();
  els.body.setAttribute("data-theme", state.settings.theme);
  els.body.classList.toggle("helper-active", state.settings.helper);
  els.rowsPerPage.value = String(state.pagination.pageSize);
  if (state.timer.running) {
    timerInterval = setInterval(tickTimer, 1000);
    state.timer.lastTick = Date.now();
  }
  renderAll();
  els.themeToggle.addEventListener("click", toggleTheme);
  els.helperToggle.addEventListener("click", toggleHelper);
  els.timerToggle.addEventListener("click", toggleTimer);
  els.timerPlay.addEventListener("click", toggleTimer);
  els.timerReset.addEventListener("click", resetTimer);
  els.prevMonth.addEventListener("click", () => changeMonth(-1));
  els.nextMonth.addEventListener("click", () => changeMonth(1));
  els.calendarDays.addEventListener("click", handleCalendarClick);
  els.syncCalendar.addEventListener("click", () => showToast("Calendar sync coming soon."));
  els.filterButton.addEventListener("click", () => showToast("Filters coming soon."));
  els.addTaskButton.addEventListener("click", () => openModal());
  els.closeModal.addEventListener("click", closeModal);
  els.cancelModal.addEventListener("click", closeModal);
  els.taskForm.addEventListener("submit", handleTaskFormSubmit);
  els.tableBody.addEventListener("click", handleTableAction);
  els.searchInput.addEventListener("input", handleSearchInput);
  els.rowsPerPage.addEventListener("change", handleRowsPerPage);
  els.prevPage.addEventListener("click", () => handlePageChange(-1));
  els.nextPage.addEventListener("click", () => handlePageChange(1));
  els.modal.addEventListener("click", event => {
    if (event.target === els.modal) closeModal();
  });
}
document.addEventListener("DOMContentLoaded", initialize);
