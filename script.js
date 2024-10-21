// Function to mark tasks as done
function markAsDone(checkbox) {
    const label = checkbox.nextElementSibling;
    if (checkbox.checked) {
        label.classList.add('completed');
    } else {
        label.classList.remove('completed');
    }

    // Set the cookie with task status
    setCookie(checkbox.id, checkbox.checked, 7); // Cookie expires in 7 days
}

// Countdown function
function updateCountdown(dueDate, countdownId) {
    const countdownElement = document.getElementById(countdownId);
    const now = new Date().getTime();
    const distance = new Date(dueDate).getTime() - now;

    if (distance < 0) {
        countdownElement.innerHTML = "Deadline Passed";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Update the countdown every second
    setTimeout(() => updateCountdown(dueDate, countdownId), 1000);
}

// Start countdown for each task
function startCountdowns() {
    const tasks = [
        { dueDate: "2024-10-25", countdownId: "countdown1" },
        { dueDate: "2024-10-30", countdownId: "countdown2" },
        { dueDate: "2024-11-05", countdownId: "countdown3" },
        { dueDate: "2024-11-10", countdownId: "countdown4" },
        { dueDate: "2024-11-23", countdownId: "countdown5" },
        { dueDate: "2024-11-25", countdownId: "countdown6" },
    ];

    tasks.forEach(task => {
        updateCountdown(task.dueDate, task.countdownId);
    });
}

// Function to set a cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Function to get a cookie
function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Load task status from cookies when the page loads
document.addEventListener("DOMContentLoaded", function () {
    const taskIds = ['task1', 'task2', 'task3', 'task4', 'task5', 'task6'];

    taskIds.forEach(id => {
        const status = getCookie(id);
        const checkbox = document.getElementById(id);
        checkbox.checked = (status === "true"); // Set checkbox based on cookie value
        markAsDone(checkbox); // Update label style based on cookie status
    });
});

// Start countdowns when the page loads
window.onload = startCountdowns;
