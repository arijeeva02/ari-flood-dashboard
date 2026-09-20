async function updateDashboard() {
    try {
        const response = await fetch("http://localhost:5000/sensor-data");
        const data = await response.json();

        // Water level
        document.getElementById("waterLevel").textContent =
            data.distance.toFixed(1) + " cm";

        if (data.distance <= 5) {
            document.getElementById("waterStatus").textContent =
                "HIGH WATER LEVEL";
        } else {
            document.getElementById("waterStatus").textContent =
                "NORMAL";
        }

        // Rain
        document.getElementById("rainStatus").textContent =
            data.rain ? "RAIN DETECTED" : "NO RAIN";

        // Float
        document.getElementById("floatStatus").textContent =
            data.float ? "WATER DETECTED" : "NORMAL";

        // Alert
        document.getElementById("alertStatus").textContent =
            data.alert ? "⚠️ FLOOD ALERT" : "✅ SYSTEM NORMAL";

    } catch (error) {
        console.log("ESP32 connection waiting...");
        document.getElementById("alertStatus").textContent =
            "ESP32 DISCONNECTED";
    }
}

// Update every second
setInterval(updateDashboard, 1000);

// First update
updateDashboard();
function updateDateTime() {
    const now = new Date();

    const date = now.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    const time = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

    document.getElementById("dateTime").textContent =
        date + " | " + time;
}

updateDateTime();
setInterval(updateDateTime, 1000);