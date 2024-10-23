function dayWeek() {
    const today = new Date();
    let day = today.getDay();
    if (day == 0) {
        day = 7;
    }
    day--;
    return day;
}

const chart = document.getElementById("chart");
const data = "./data.json";

fetch(data)
    .then((res) => res.json())
    .then((json) => {
        for (const item in json) {
            let value = json[item];

            let chartItem = document.createElement("li");
            chartItem.setAttribute("id", value.day);
            chartItem.classList.add("d-week");
            chartItem.innerText = value.day;
            chart.appendChild(chartItem);

            let bar = document.createElement("div");
            bar.style.height = `
                ${Math.round(
                (value.amount * 100) / 478, 33
            )}em
            `;
            bar.classList.add("bar");

            if (dayWeek() == item) {
                bar.classList.add("today");
            }

            let hint = document.createElement("span");
            hint.innerText = `$${value.amount}`;

            hint.classList.add("hint");

            
            chartItem.prepend(bar);
            chartItem.prepend(hint);
        }    
    })
    .catch((err) => console.log(err))

