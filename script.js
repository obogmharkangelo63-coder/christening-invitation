
// CHRISTENING EVENT DATE
// Format: Year, Month (0-11), Day, Hour, Minute
const eventDate = new Date(2026, 11, 20, 10, 0, 0);

function updateCountdown() {
    const now = new Date();
    const difference = eventDate - now;

    if (difference <= 0) {
        document.querySelector(".countdown-title").textContent =
            "The Celebration Has Started!";

        ["days", "hours", "minutes", "seconds"].forEach(id => {
            document.getElementById(id).textContent = "00";
        });

        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);


// RSVP FORM
const form = document.getElementById("rsvpForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("guestName").value.trim();
    const guests = document.getElementById("guestCount").value;
    const attendance = document.getElementById("attendance").value;

    if (!name || !guests || !attendance) {
        alert("Please complete all fields.");
        return;
    }

    const response = {
        name: name,
        guests: Number(guests),
        attendance: attendance,
        dateSubmitted: new Date().toLocaleString()
    };

    // Save RSVP in the browser
    let responses = JSON.parse(
        localStorage.getItem("christeningRSVPs") || "[]"
    );

    responses.push(response);

    localStorage.setItem(
        "christeningRSVPs",
        JSON.stringify(responses)
    );

    document.getElementById("responseMessage").textContent =
        "Thank you, " + name + "! Your RSVP has been recorded.";

    form.reset();
});
