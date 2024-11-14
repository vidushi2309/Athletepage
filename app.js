let events = []; // Stores all events
let reminders = []; // Stores event reminders
let leaderboard = [
  { name: "John Doe", sport: "Soccer", performance: 95 },
  { name: "Jane Smith", sport: "Basketball", performance: 89 },
  { name: "Mike Lee", sport: "Tennis", performance: 92 },
  { name: "Emily Davis", sport: "Soccer", performance: 87 },
  { name: "Chris Walker", sport: "Basketball", performance: 91 }
];

// Update event count on the dashboard
function updateDashboard() {
  document.getElementById('event-count').textContent = events.length;
}

// Render Events with Images in the Upcoming Events Section
function renderEvents() {
  const eventList = document.getElementById('event-list');
  eventList.innerHTML = '';
  events.forEach(event => {
    const eventItem = document.createElement('div');
    eventItem.className = 'event-item';
    eventItem.innerHTML = `
      <img src="sample-event.jpg" alt="${event.name}">
      <h3>${event.name}</h3>
      <p>${new Date(event.date).toLocaleString()}</p>
    `;
    eventList.appendChild(eventItem);
  });
}

// Save a Reminder and Automatically Add to Upcoming Events
function saveReminder() {
  const eventName = document.getElementById('reminder-event').value;
  const eventTime = document.getElementById('reminder-time').value;

  if (eventName && eventTime) {
    // Create a new event object for the reminder
    const newEvent = { name: eventName, date: eventTime };
    
    // Add reminder to the reminders array
    reminders.push(newEvent);

    // Add the event to the main events array for Upcoming Events section
    events.push(newEvent);

    // Render the updated sections
    renderReminders();
    renderEvents(); // Automatically update the Upcoming Events section
    updateDashboard(); // Update the dashboard count
    closeModal();
  } else {
    alert("Please fill out both fields for the event name and time.");
  }
}

// Render Event Reminders in the Reminders Section
function renderReminders() {
  const reminderList = document.getElementById('reminder-list');
  reminderList.innerHTML = '';
  reminders.forEach(reminder => {
    const reminderItem = document.createElement('div');
    reminderItem.className = 'reminder-item';
    reminderItem.innerHTML = `<p>Reminder for ${reminder.name} at ${new Date(reminder.date).toLocaleString()}</p>`;
    reminderList.appendChild(reminderItem);
  });
}

// Open Reminder Modal
function openReminderModal() {
  document.getElementById('reminder-modal').style.display = 'flex';
}

// Close Modal
function closeModal() {
  document.getElementById('reminder-modal').style.display = 'none';
}

// Real-Time Leaderboard Rendering
function filterLeaderboard() {
  const sportFilter = document.getElementById('filter-sport').value;
  const filteredLeaderboard = leaderboard.filter(athlete => 
    sportFilter === 'all' || athlete.sport === sportFilter
  );
  renderLeaderboard(filteredLeaderboard);
}

function renderLeaderboard(filteredLeaderboard) {
  const leaderboardList = document.getElementById('leaderboard-list');
  leaderboardList.innerHTML = '';
  filteredLeaderboard.forEach(athlete => {
    const item = document.createElement('li');
    item.textContent = `${athlete.name} (${athlete.sport}): ${athlete.performance} points`;
    leaderboardList.appendChild(item);
  });
}

// Performance Graph Initialization
const performanceGraph = document.getElementById('performanceGraph').getContext('2d');
const performanceChart = new Chart(performanceGraph, {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
      label: 'Performance Score',
      data: [75, 80, 85, 90, 92],
      borderColor: '#3498db',
      fill: false
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    }
  }
});

// Initial Rendering
renderLeaderboard(leaderboard);
renderReminders();
renderEvents();
