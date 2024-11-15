// src/components/ProductBarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductBarChart = ({ products }) => {
    const data = {
        labels: products.map(product => product.name),
        datasets: [
            {
                label: 'Product Quantity',
                data: products.map(product => product.quantity),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',  // Updated bar color
                borderColor: 'rgba(54, 162, 235, 1)',         // Updated border color
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)', // Darker color on hover
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Inventory Product Quantities',
                font: {
                    size: 18,
                    weight: 'bold'
                },
                color: '#333',
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            legend: {
                display: false, // Hide legend for simplicity
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `Quantity: ${tooltipItem.raw}`, // Show quantity dynamically
                },
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleFont: { size: 14 },
                bodyFont: { size: 12 },
                padding: 10,
                boxPadding: 5,
            }
        },
        scales: {
            x: {
                grid: {
                    display: false, // Hide x-axis grid lines
                },
                title: {
                    display: true,
                    text: 'Product Names',
                    color: '#666',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                ticks: {
                    color: '#333',
                    font: {
                        size: 12
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)', // Subtle y-axis grid lines
                    borderDash: [5, 5]
                },
                title: {
                    display: true,
                    text: 'Quantity',
                    color: '#666',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                ticks: {
                    color: '#333',
                    font: {
                        size: 12
                    },
                    stepSize: 1,  // Step size for better readability
                    beginAtZero: true
                }
            }
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuad'
        }
    };

    return (
        <div style={{ height: '400px', marginTop: '20px' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ProductBarChart;
