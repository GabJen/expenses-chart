
const chart = document.getElementById("chart");
const data = "./data.json";

// Creates the chart elements dinamically
fetch(data)
    .then((res) => res.json()) // Converts the response to json format
    .then((json) => {
        for (const item in json) { // Works on each item of json file
            let day = json[item].day;
            let amount = json[item].amount;

            let chartItem = createListItems(day);
            let bar = createBars(amount, item);
            let tooltip = createTooltip(amount);
            
            chartItem.prepend(bar);
            chartItem.prepend(tooltip);
        }    
    })
    .catch((err) => console.log(err))



// Makes the initial index refer to Monday, not Sunday
function dayWeek() {
    const today = new Date();
    let day = today.getDay();
    if (day == 0) {
        day = 7;
    }
    day--;
    
    return day;
}

function createListItems(day) {
    let item = document.createElement("li");

    item.setAttribute("id", day);
    item.classList.add("d-week");
    item.innerText = day;
    chart.appendChild(item);

    return item;
}

function createBars(amount, dayIndex) {
    let bar = document.createElement("div");
    bar.style.height = `${Math.round((amount * 100) / 478,33)/*Converts amount to a percentage of total*/}em`;
    bar.classList.add("bar");

    if (dayWeek() == dayIndex) {
        bar.classList.add("today");
    }

    return bar;
}

function createTooltip(amount) {
    let tooltip = document.createElement("span");

    tooltip.innerText = `$${amount}`;
    tooltip.classList.add("tooltip");

    return tooltip;
}