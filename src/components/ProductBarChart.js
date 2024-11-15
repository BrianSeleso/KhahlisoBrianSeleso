import React from 'react';
import { Bar } from 'react-chartjs-2'; // Import Bar chart component from react-chartjs-2
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'; // Import necessary components from Chart.js

// Register the necessary components for the chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ProductBarChart component displays a bar chart of product quantities
const ProductBarChart = ({ products }) => {
    // Prepare the data for the chart
    const data = {
        labels: products.map(product => product.name), // Use product names as labels on the x-axis
        datasets: [
            {
                label: 'Product Quantity', // Label for the dataset
                data: products.map(product => product.quantity), // Use product quantities as data points
                backgroundColor: 'rgba(54, 162, 235, 0.6)', // Color of the bars
                borderColor: 'rgba(54, 162, 235, 1)', // Border color of the bars
                borderWidth: 1, // Width of the border around each bar
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)', // Color when hovering over bars
                hoverBorderColor: 'rgba(54, 162, 235, 1)', // Border color when hovering over bars
            },
        ],
    };

    // Options for configuring the chart's appearance and behavior
    const options = {
        responsive: true, // Make the chart responsive to window size changes
        maintainAspectRatio: false, // Allow flexibility in aspect ratio
        plugins: {
            title: {
                display: true, // Display the title of the chart
                text: 'Inventory Product Quantities', // Title text
                font: {
                    size: 18, // Font size for the title
                    weight: 'bold' // Font weight for the title
                },
                color: '#333', // Color of the title text
                padding: {
                    top: 10, // Padding above the title
                    bottom: 30 // Padding below the title
                }
            },
            legend: {
                display: false, // Hide legend for simplicity
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `Quantity: ${tooltipItem.raw}`, // Customize tooltip label to show quantity
                },
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Background color of tooltips
                titleFont: { size: 14 }, // Font size for tooltip title
                bodyFont: { size: 12 }, // Font size for tooltip body text
                padding: 10, // Padding inside tooltips
                boxPadding: 5, // Padding around tooltip boxes
            }
        },
        scales: {
            x: {
                grid: {
                    display: false, // Hide grid lines on x-axis
                },
                title: {
                    display: true,
                    text: 'Product Names', // Title for x-axis
                    color: '#666', // Color of x-axis title text
                    font: {
                        size: 14,
                        weight: 'bold' // Font weight for x-axis title text
                    }
                },
                ticks: {
                    color: '#333', // Color of x-axis tick labels
                    font: {
                        size: 12 // Font size for x-axis tick labels
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)', // Color of y-axis grid lines
                    borderDash: [5, 5] // Dashed style for y-axis grid lines
                },
                title: {
                    display: true,
                    text: 'Quantity', // Title for y-axis
                    color: '#666', // Color of y-axis title text
                    font: {
                        size: 14,
                        weight: 'bold' // Font weight for y-axis title text
                    }
                },
                ticks: {
                    color: '#333', // Color of y-axis tick labels
                    font: {
                        size: 12 // Font size for y-axis tick labels
                    },
                    stepSize: 1, // Step size for y-axis ticks (interval between ticks)
                    beginAtZero: true // Start y-axis at zero value 
                }
            }
        },
        animation: {
            duration: 1000, // Duration of chart animation in milliseconds
            easing: 'easeInOutQuad' // Easing function for animation effect 
        }
    };

    return (
        <div style={{ height: '400px', marginTop: '20px' }}>
            <Bar data={data} options={options} /> {/* Render the Bar chart with provided data and options */}
        </div>
    );
};

export default ProductBarChart; 