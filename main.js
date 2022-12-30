let form = document.getElementById("form");
let input = document.getElementById("input");
let currentWeight = document.getElementById("current-weight");
let lowestWeight = document.getElementById("lowest-weight");
let goalWeight = document.getElementById("goal-weight");

let data = {
    currentWeight: 200,
    lowestWeight: 200,
    goalWeight: 150,
    weightArray: [
        {
            date: "12-19-2022",
            weight: 200,
        },
    ]
};

const ctx = document.getElementById('myChart');
                
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.weightArray.map(row => row.date),
        datasets: [{
          label: 'Daily Weight',
          data: data.weightArray.map(row => row.weight),
        }]
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("button clicked");
  
    formValidation();
});

let formValidation = () => {
    if (input.value === ""){
        console.log("failure: no data to add");
    }

    else {
        console.log("success: input was read");
        updateData();
    }
}

let updateData = () => {
    //update current weight
    currentWeight.innerHTML = input.value;
    data.currentWeight = input.value;

    //update lowest weight
    if (input.value < data.lowestWeight){
        lowestWeight.innerHTML = input.value;
        data.lowestWeight = input.value;
    }

    //add to array of logged info
    const date = new Date();
    let currentDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    console.log(currentDate);

    data.weightArray.push({
        date: currentDate,
        weight: input.value
    })

    localStorage.setItem("data", JSON.stringify(data));

    chart.data.labels.push(currentDate);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(input.value);
    });
    chart.update();

    //how do I update chart????

    //update chart

    //update log

    input.value = "";
};

(() => {

    data = JSON.parse(localStorage.getItem("data")) || {
        currentWeight: 200,
        lowestWeight: 200,
        goalWeight: 150,
        weightArray: [{
            date: "12-19-2022",
            weight: 200,
        }]
    };
    console.log(data);
    data.weightArray.forEach((weight) => {
        chart.data.labels.push(weight.date);
        chart.data.datasets.forEach((dataset) => {
        dataset.data.push(weight.weight);
    });
    chart.update();
    });

})();


