const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: true,
        },
    },

    scales: {
        x: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
        },

        y: {
            beginAtZero: true,
            max: 60,
            ticks: {
                stepSize: 20,
            },
            grid: {
                color: "#eeeeee",
            },
            border: {
                display: false,
            },
        },
    },
};
export default chartOptions