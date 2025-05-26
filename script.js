"use strict";

const barChartsDiv = document.getElementById('bar-chart-divs')
const barCharts = [...document.querySelectorAll(".bar")];
const amountEls = [...document.querySelectorAll(".amount")];
const bars = [...document.querySelectorAll(".bar")];

// console.log(barCharts);
// console.log(amountEls);

//Formatting the amount to a standard currency
const formatcur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

//fetching the data from the json file to work with

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    //getting the highest day with the most spending
    const maxAmount = data.reduce((max, current) => {
      return current.amount > max.amount ? current : max;
    });

    // console.log(maxAmount);
    
    //getting the day of the week
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const today = new Date ();
    const dayName = days[today.getDay()];
    console.log(dayName);


    //displaying the bars base on the amount spend a day
    barCharts.forEach((bar, i) => {
      const height = Math.round(3 * data[i].amount);
      //   console.log(height);
    //   console.log(maxAmount.amount);
      bar.style.height = `${height}px`;

      console.log(maxAmount.day, dayName);

      //highlighting the bar base on the current day
      if (data[i].day === dayName) {
        bar.style.backgroundColor = "hsl(186, 34%, 65%)";
        // console.log(maxAmount.amount);
      }

      //displaying the amount on top of the bar chart
      amountEls[i].textContent = `${formatcur(
        Number(data[i].amount),
        "en-US",
        "USD"
      )}`;

      bar.addEventListener("mouseover", () => {
        amountEls[i].style.display = "block";
      });

      bar.addEventListener("mouseout", () => {
        amountEls[i].style.display = "none";
      });
    });
  })
  .catch((error) => {
    console.log("Error loading JSON", error);
  });

//added a clock because why not???
const timeEl = document.getElementById("time");
// console.log(timeEl);

const tick = function () {
  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  timeEl.textContent = new Intl.DateTimeFormat("en-US", options).format(now);
};

tick();
setInterval(tick, 1000);
