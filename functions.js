// Fetch data from the backend
async function fetchEvents() {
    try {
        const response = await fetch('http://localhost:8800/data');
        const data = await response.json();
        const eventsContainer = document.getElementById('eventsContainer');
        data.forEach(event => {
            const eventDate = new Date(event.date);
            const eventTime = event.time;
            const eventDiv = document.createElement('div');
            eventDiv.className = 'event';
            eventDiv.innerHTML = 
            `
                <img src="./assets/cancel-inactive.png" class="x"/>
                <div class="row" style="gap: 15px; align-items: center;">
                    <time datetime="2014-09-20" class="icon">
                        <em>${getDayOfWeek(eventDate)}</em>
                        <strong>${getMonth(eventDate)}</strong>
                        <span>${eventDate.getDate()}</span>
                    </time>
                    <div class="column">
                        <h3 class="event-name">${event.name}</h3>
                        <div class = 'event-date'>${eventTime} Jan 27, 2024</div>
                    </div>
                </div>
                <div class="event-info">
                    ${event.google_maps}
                </div>
                
                <div class = 'event-desc'>${event.desc}</div>
            `;
            eventsContainer.appendChild(eventDiv);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function addEvent() {
    // Get user input values from the form
    const date = document.getElementById('dateInput').value;
    const time = document.getElementById('timeInput').value.toString();
    const mapsEmbed = document.getElementById('mapsInput').value;
    const address = document.getElementById('addressInput').value;
    const desc = document.getElementById('descInput').value;

    // Your logic to send a POST request to /addEvent with user input values
    const response = await fetch('/addEvent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: date,
            time: time,
            google_maps: mapsEmbed,
            address: address,
            desc: desc
        })
    });

    const data = await response.json();

    // After successfully adding the event, fetch and update the events data
    fetchEvents();
}

// Helper function to get the day of the week
function getDayOfWeek(date) {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
}

// Helper function to get the month
function getMonth(date) {
    return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
}


// Call the fetchData function when the page loads
fetchEvents();