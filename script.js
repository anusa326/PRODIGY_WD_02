let [hours, minutes, seconds] = [0, 0, 0];
let timer = null;
let running = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");
const toggleBtn = document.getElementById("toggleBtn");

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  display.innerText = `${h}:${m}:${s}`;
}

function startTimer() {
  if (!running) {
    running = true;
    toggleBtn.textContent = "⏸️ Pause";
    toggleBtn.classList.add("pause");

    timer = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      updateDisplay();
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  running = false;
  toggleBtn.textContent = "▶️ Start";
  toggleBtn.classList.remove("pause");
}

function resetTimer() {
  clearInterval(timer);
  running = false;
  [hours, minutes, seconds] = [0, 0, 0];
  updateDisplay();
  laps.innerHTML = "";
  toggleBtn.textContent = "▶️ Start";
  toggleBtn.classList.remove("pause");
}

function recordLap() {
  if (running) {
    let li = document.createElement("li");
    li.innerText = display.innerText;
    laps.appendChild(li);
  }
}

function exportLaps() {
  if (laps.children.length === 0) {
    alert("No laps to export!");
    return;
  }
  let text = "My Stopwatch Laps:\n\n";
  Array.from(laps.children).forEach((li, i) => {
    text += `Lap ${i + 1}: ${li.innerText}\n`;
  });

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "stopwatch-laps.txt";
  a.click();
  URL.revokeObjectURL(url);
}

toggleBtn.addEventListener("click", () => {
  if (running) pauseTimer();
  else startTimer();
});

document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);
document.getElementById("export").addEventListener("click", exportLaps);

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  themeToggle.textContent = document.body.classList.contains("dark-theme") ? "☀️" : "🌙";
});

updateDisplay();
