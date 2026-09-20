async function updateDashboard() {
    try {
        const response = await fetch(
            "https://ari-flood-api.onrender.com/sensor-data"
        );

        const data = await response.json();

        document.getElementById("waterLevel").textContent =
            data.distance.toFixed(1) + " cm";

        if (data.distance <= 5) {
            document.getElementById("waterStatus").textContent =
                "HIGH WATER LEVEL";
        } else {
            document.getElementById("waterStatus").textContent =
                "NORMAL";
        }

        document.getElementById("rainStatus").textContent =
            data.rain ? "RAIN DETECTED" : "NO RAIN";

        document.getElementById("floatStatus").textContent =
            data.float ? "WATER DETECTED" : "NORMAL";

        document.getElementById("alertStatus").textContent =
            data.alert ? "⚠️ FLOOD ALERT" : "✅ SYSTEM NORMAL";

    } catch (error) {
        console.log("API connection waiting...");

        document.getElementById("alertStatus").textContent =
            "ESP32 DISCONNECTED";
    }
}

setInterval(updateDashboard, 1000);

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