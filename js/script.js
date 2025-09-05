// =========================
// Mock Login Data
// =========================
const users = {
  student: { username: "student", password: "1234" },
  faculty: { username: "faculty", password: "1234" },
  company: { username: "company", password: "1234" },
  admin: { username: "admin", password: "1234" }
};

// Simple login check
function login(role) {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === users[role].username && pass === users[role].password) {
    localStorage.setItem("loggedIn", role);
    window.location.href = role + ".html"; // Redirect to respective portal
  } else {
    alert("Invalid credentials! Try again.");
  }
}

// =========================
// Student Portal Functions
// =========================

// Apply for job
function applyJob(jobTitle) {
  let apps = JSON.parse(localStorage.getItem("applications")) || [];
  if (!apps.includes(jobTitle)) {
    apps.push({ job: jobTitle, status: "Pending" });
    localStorage.setItem("applications", JSON.stringify(apps));
    alert("Applied for " + jobTitle);
    loadApplications();
  } else {
    alert("Already applied!");
  }
}

// Load applications into UI
function loadApplications() {
  const apps = JSON.parse(localStorage.getItem("applications")) || [];
  const list = document.getElementById("applicationList");
  if (!list) return;

  list.innerHTML = "";
  apps.forEach((a, i) => {
    let li = document.createElement("li");
    li.innerHTML = `${a.job} - ${a.status} <button onclick="withdrawApp(${i})">Withdraw</button>`;
    list.appendChild(li);
  });
}

// Withdraw application
function withdrawApp(index) {
  let apps = JSON.parse(localStorage.getItem("applications")) || [];
  apps.splice(index, 1);
  localStorage.setItem("applications", JSON.stringify(apps));
  loadApplications();
}

// =========================
// Faculty Functions
// =========================

// Add announcement
function addAnnouncement() {
  const text = document.getElementById("noticeText").value;
  if (text.trim() === "") return;
  let notes = JSON.parse(localStorage.getItem("notices")) || [];
  notes.push(text);
  localStorage.setItem("notices", JSON.stringify(notes));
  document.getElementById("noticeText").value = "";
  loadNotices();
}

// Load announcements
function loadNotices() {
  const notes = JSON.parse(localStorage.getItem("notices")) || [];
  const container = document.getElementById("noticeBoard");
  if (!container) return;

  container.innerHTML = "";
  notes.forEach(n => {
    let li = document.createElement("li");
    li.textContent = n;
    container.appendChild(li);
  });
}

// =========================
// Company Functions
// =========================

// Post new job
function postJob() {
  const title = document.getElementById("jobTitle").value;
  const salary = document.getElementById("jobSalary").value;
  if (!title || !salary) return alert("Fill all job fields!");

  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  jobs.push({ title, salary, applicants: [] });
  localStorage.setItem("jobs", JSON.stringify(jobs));

  alert("Job posted: " + title);
  loadJobs();
}

// Load posted jobs
function loadJobs() {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const container = document.getElementById("jobList");
  if (!container) return;

  container.innerHTML = "";
  jobs.forEach(j => {
    let div = document.createElement("div");
    div.classList.add("job-card");
    div.innerHTML = `<h3>${j.title}</h3><p>Salary: ${j.salary}</p>`;
    container.appendChild(div);
  });
}

// =========================
// Auto Load Content
// =========================
window.onload = function () {
  loadApplications();
  loadNotices();
  loadJobs();
};
