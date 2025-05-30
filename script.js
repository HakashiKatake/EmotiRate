// Add these event listeners to your setupEmojiPicker function
document.querySelectorAll('.emoji').forEach(emoji => {
    emoji.addEventListener('click', handleEmojiSelection);
    emoji.addEventListener('mouseenter', handleEmojiHover);
    emoji.addEventListener('mouseleave', handleEmojiLeave);
});

// Add these new functions to your script.js
function handleEmojiSelection(event) {
    const selectedEmoji = event.target;
    const emojiPicker = selectedEmoji.closest('.emoji-picker');
    
    // Remove 'selected' class from all emojis in this picker
    emojiPicker.querySelectorAll('.emoji').forEach(emoji => {
        emoji.classList.remove('selected');
        emoji.classList.remove('emoji-bounce');
    });
    
    // Add 'selected' class to the clicked emoji
    selectedEmoji.classList.add('selected');
    selectedEmoji.classList.add('emoji-bounce');
    
    // Display the corresponding mood phrase
    const moodPhrase = moodPhrases[selectedEmoji.dataset.emoji];
    const moodPhraseElement = emojiPicker.querySelector('.mood-phrase');
    moodPhraseElement.textContent = moodPhrase;
    moodPhraseElement.classList.add('mood-phrase-appear');
    
    // Show the submit button
    const submitButton = emojiPicker.querySelector('.submit-rating');
    submitButton.style.display = 'block';
    submitButton.classList.add('button-appear');
}

function handleEmojiHover(event) {
    const emoji = event.target;
    emoji.classList.add('emoji-hover');
    
    const emojiPicker = emoji.closest('.emoji-picker');
    const moodPhraseElement = emojiPicker.querySelector('.mood-phrase');
    
    if (!moodPhraseElement.dataset.originalText) {
        moodPhraseElement.dataset.originalText = moodPhraseElement.textContent;
    }
    
    moodPhraseElement.textContent = moodPhrases[emoji.dataset.emoji];
    moodPhraseElement.classList.add('mood-phrase-preview');
}

function handleEmojiLeave(event) {
    const emoji = event.target;
    emoji.classList.remove('emoji-hover');
    
    const emojiPicker = emoji.closest('.emoji-picker');
    const selectedEmoji = emojiPicker.querySelector('.emoji.selected');
    const moodPhraseElement = emojiPicker.querySelector('.mood-phrase');
    
    moodPhraseElement.classList.remove('mood-phrase-preview');
    
    if (selectedEmoji) {
        moodPhraseElement.textContent = moodPhrases[selectedEmoji.dataset.emoji];
    } else if (moodPhraseElement.dataset.originalText) {
        moodPhraseElement.textContent = moodPhraseElement.dataset.originalText;
    }
}
// Replace the individual emoji event listeners with event delegation
// This should replace the existing emoji event listeners in setupEmojiPicker function

function setupEmojiPicker() {
    // Use event delegation by attaching listeners to the product-list container
    const productList = document.getElementById('product-list');
    
    // Single event listener for all emoji interactions using event delegation
    productList.addEventListener('click', function(event) {
        // Check if an emoji was clicked
        if (event.target.classList.contains('emoji')) {
            handleEmojiSelection(event);
        }
        
        // You can also handle submit button clicks here if needed
    });
    
    // Handle hover effects with event delegation
    productList.addEventListener('mouseover', function(event) {
        if (event.target.classList.contains('emoji')) {
            handleEmojiHover(event);
        }
    });
    
    productList.addEventListener('mouseout', function(event) {
        if (event.target.classList.contains('emoji')) {
            handleEmojiLeave(event);
        }
    });
    
    // Add current date and user info to the page (metadata for tracking)
    document.getElementById('metadata') && (document.getElementById('metadata').innerHTML = 
        `Last accessed: 2025-05-30 14:09:19 | User: BeingSeight`);
}

// The handleEmojiSelection, handleEmojiHover, and handleEmojiLeave functions 
// can remain the same as they were in the previous task
// Create notification container if it doesn't exist
function createNotificationContainer() {
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
}

// Show notification message
function showNotification(message, type = 'success', duration = 3000) {
    createNotificationContainer();
    
    const container = document.querySelector('.notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Current date and user information
    const currentDate = '2025-05-30 14:10:08'; // Hard-coded from requirements
    const currentUser = 'BeingSeight'; // Hard-coded from requirements
    
    notification.innerHTML = `
        ${message}
        <span class="notification-close">&times;</span>
        <span class="notification-time">Time: ${currentDate}</span>
        <span class="notification-user">User: ${currentUser}</span>
    `;
    
    container.appendChild(notification);
    
    // Show notification with slight delay for animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide notification after duration
    const hideTimeout = setTimeout(() => {
        hideNotification(notification);
    }, duration);
    
    // Allow manual closing
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(hideTimeout);
        hideNotification(notification);
    });
    
    return notification;
}

// Hide notification
function hideNotification(notification) {
    notification.classList.remove('show');
    notification.classList.add('hide');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
        if (notification.parentElement) {
            notification.parentElement.removeChild(notification);
        }
    }, 400); // Match transition duration
}

// Modify the existing function to show notification after rating submission
// This would be inside a submit rating function or event handler
function submitRating(event) {
    // Get product and rating info
    const submitButton = event.target;
    const emojiPicker = submitButton.closest('.emoji-picker');
    const productCard = submitButton.closest('.product-card');
    const productId = productCard.dataset.productId;
    const selectedEmoji = emojiPicker.querySelector('.emoji.selected');
    
    if (!selectedEmoji) {
        showNotification('Please select an emoji first!', 'error');
        return;
    }
    
    const rating = selectedEmoji.dataset.emoji;
    
    // Here you would normally save the rating to storage
    // ...
    
    // Hide emoji picker and show rate button again
    emojiPicker.style.display = 'none';
    productCard.querySelector('.rate-button').style.display = 'block';
    
    // Get product name for the notification
    const productName = productCard.querySelector('.product-name').textContent;
    
    // Show success notification
    showNotification(`Thanks for rating "${productName}"! Your ${rating} rating has been recorded.`);
}

// Make sure to update any existing click handlers for the submit button
document.querySelectorAll('.submit-rating').forEach(button => {
    button.addEventListener('click', submitRating);
});

// Alternatively, you can use event delegation for submit buttons too
document.getElementById('product-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('submit-rating')) {
        submitRating(event);
    }
});
// Create spinner overlay for the entire page
function createSpinnerOverlay() {
    if (!document.querySelector('.spinner-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'spinner-overlay';
        
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        
        const message = document.createElement('div');
        message.className = 'spinner-message';
        
        const metadata = document.createElement('div');
        metadata.className = 'spinner-metadata';
        metadata.textContent = `Time: 2025-05-30 14:11:30 | User: BeingSeight`;
        
        overlay.appendChild(spinner);
        overlay.appendChild(message);
        overlay.appendChild(metadata);
        document.body.appendChild(overlay);
    }
}

// Show the loading spinner with custom message
function showSpinner(message = 'Loading...') {
    createSpinnerOverlay();
    const overlay = document.querySelector('.spinner-overlay');
    const messageEl = overlay.querySelector('.spinner-message');
    messageEl.textContent = message;
    overlay.classList.add('active');
}

// Hide the loading spinner
function hideSpinner() {
    const overlay = document.querySelector('.spinner-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Add an inline spinner to an element
function addInlineSpinner(element, message = '') {
    const spinner = document.createElement('span');
    spinner.className = 'inline-spinner';
    
    if (message) {
        const text = document.createElement('span');
        text.textContent = message;
        element.innerHTML = '';
        element.appendChild(spinner);
        element.appendChild(text);
    } else {
        element.appendChild(spinner);
    }
    
    return spinner;
}

// Remove an inline spinner
function removeInlineSpinner(element, originalContent) {
    const spinner = element.querySelector('.inline-spinner');
    if (spinner) {
        spinner.remove();
    }
    
    if (originalContent !== undefined) {
        element.textContent = originalContent;
    }
}

// Add a spinner to a button
function addButtonSpinner(button) {
    // Save original text
    button.dataset.originalText = button.textContent;
    
    // Create spinner
    const spinner = document.createElement('span');
    spinner.className = 'button-spinner';
    
    // Add spinner to button
    button.innerHTML = '';
    button.appendChild(spinner);
    button.appendChild(document.createTextNode('Processing...'));
    button.disabled = true;
}

// Remove spinner from button
function removeButtonSpinner(button) {
    const originalText = button.dataset.originalText || 'Submit';
    button.innerHTML = originalText;
    button.disabled = false;
}

// Simulate an async operation with promise
function simulateAsyncOperation(operation = 'loading', duration = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${operation} completed`);
        }, duration);
    });
}

// Example: Use the spinner when submitting a rating
async function submitRating(event) {
    const submitButton = event.target;
    const emojiPicker = submitButton.closest('.emoji-picker');
    const productCard = submitButton.closest('.product-card');
    const productId = productCard.dataset.productId;
    const selectedEmoji = emojiPicker.querySelector('.emoji.selected');
    
    if (!selectedEmoji) {
        showNotification('Please select an emoji first!', 'error');
        return;
    }
    
    // Add spinner to button
    addButtonSpinner(submitButton);
    
    try {
        // Simulate saving data
        showSpinner('Saving your rating...');
        
        // Simulate network delay with promise
        await simulateAsyncOperation('Saving rating', 1500);
        
        // Here you would normally save the rating to storage
        // ...
        
        // Hide emoji picker and show rate button again
        hideSpinner();
        emojiPicker.style.display = 'none';
        productCard.querySelector('.rate-button').style.display = 'block';
        
        // Get product name for the notification
        const productName = productCard.querySelector('.product-name').textContent;
        const rating = selectedEmoji.dataset.emoji;
        
        // Show success notification
        showNotification(`Thanks for rating "${productName}"! Your ${rating} rating has been recorded.`);
    } catch (error) {
        hideSpinner();
        showNotification('Error saving rating. Please try again.', 'error');
    } finally {
        // Remove button spinner
        removeButtonSpinner(submitButton);
    }
}

// Example: Load reviews with spinner
async function loadProductReviews(productId) {
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    const reviewsContainer = productCard.querySelector('.reviews-container');
    
    if (!reviewsContainer) return;
    
    // Add inline spinner
    addInlineSpinner(reviewsContainer, 'Loading reviews...');
    
    try {
        // Simulate fetching data
        await simulateAsyncOperation('Fetching reviews', 2000);
        
        // Here you would normally load reviews from storage
        // ...
        
        // Display reviews
        removeInlineSpinner(reviewsContainer);
        reviewsContainer.innerHTML = `
            <div class="review-item">
                <span class="review-emoji">😍</span>
                <span class="review-date">2025-05-30</span>
                <span class="review-user">User: BeingSeight</span>
            </div>
            <!-- More reviews would be loaded here -->
        `;
    } catch (error) {
        removeInlineSpinner(reviewsContainer);
        reviewsContainer.textContent = 'Error loading reviews.';
    }
}

// Example: Reset ratings with full page spinner
async function resetRatings(productId) {
    showSpinner('Resetting all ratings...');
    
    try {
        // Simulate processing
        await simulateAsyncOperation('Resetting ratings', 2000);
        
        // Here you would normally clear ratings from storage
        // ...
        
        hideSpinner();
        showNotification('All ratings have been reset successfully!');
    } catch (error) {
        hideSpinner();
        showNotification('Error resetting ratings. Please try again.', 'error');
    }
}
// Add Chart.js to the page if not already included
function loadChartJsLibrary() {
    if (!window.Chart) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    return Promise.resolve();
}

// Create chart container for a product
function createChartContainer(productCard) {
    // Check if container already exists
    if (productCard.querySelector('.chart-container')) {
        return productCard.querySelector('.chart-container');
    }
    
    const container = document.createElement('div');
    container.className = 'chart-container';
    
    const title = document.createElement('div');
    title.className = 'chart-title';
    title.textContent = 'Mood Distribution';
    
    const canvas = document.createElement('canvas');
    canvas.className = 'chart-canvas';
    
    const legend = document.createElement('div');
    legend.className = 'chart-legend';
    
    const metadata = document.createElement('div');
    metadata.className = 'chart-metadata';
    metadata.textContent = `Updated: 2025-05-30 14:13:09 | User: BeingSeight`;
    
    container.appendChild(title);
    container.appendChild(canvas);
    container.appendChild(legend);
    container.appendChild(metadata);
    
    // Append after the emoji picker
    const emojiPicker = productCard.querySelector('.emoji-picker');
    if (emojiPicker) {
        emojiPicker.after(container);
    } else {
        productCard.appendChild(container);
    }
    
    return container;
}

// Get mock data for testing - in real app this would come from localStorage
function getMockRatingData(productId) {
    // Sample data structure:
    // You would replace this with actual data from localStorage
    const mockData = {
        "1": { "😍": 12, "😊": 8, "😐": 5, "😕": 2, "😠": 1 },
        "2": { "😍": 5, "😊": 15, "😐": 7, "😕": 3, "😠": 0 },
        "3": { "😍": 20, "😊": 10, "😐": 3, "😕": 1, "😠": 0 },
        "4": { "😍": 8, "😊": 12, "😐": 10, "😕": 5, "😠": 3 },
        "5": { "😍": 15, "😊": 7, "😐": 4, "😕": 2, "😠": 1 },
        "6": { "😍": 10, "😊": 13, "😐": 6, "😕": 4, "😠": 2 }
    };
    
    // Return the data for the requested product, or empty object if none exists
    return mockData[productId] || { "😍": 0, "😊": 0, "😐": 0, "😕": 0, "😠": 0 };
}

// Format ratings data for chart
function formatRatingDataForChart(ratingsData) {
    const emojis = ["😍", "😊", "😐", "😕", "😠"];
    const moodLabels = ["Love it!", "Like it", "It's okay", "Dislike it", "Hate it"];
    const colors = [
        'rgba(255, 99, 132, 0.8)',    // Pink for Love it
        'rgba(54, 162, 235, 0.8)',    // Blue for Like it
        'rgba(255, 206, 86, 0.8)',    // Yellow for It's okay
        'rgba(75, 192, 192, 0.8)',    // Teal for Dislike it
        'rgba(153, 102, 255, 0.8)'    // Purple for Hate it
    ];
    
    // Calculate total ratings
    const total = Object.values(ratingsData).reduce((sum, count) => sum + count, 0);
    
    // Prepare data for chart
    const data = [];
    const labels = [];
    const backgroundColors = [];
    
    emojis.forEach((emoji, index) => {
        const count = ratingsData[emoji] || 0;
        const percentage = total > 0 ? (count / total * 100).toFixed(1) : 0;
        
        data.push(count);
        labels.push(`${emoji} ${moodLabels[index]} (${percentage}%)`);
        backgroundColors.push(colors[index]);
    });
    
    return {
        data,
        labels,
        backgroundColors,
        total
    };
}

// Create or update chart for a product
async function updateProductChart(productId) {
    await loadChartJsLibrary();
    
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (!productCard) return;
    
    // Get container and canvas
    const container = createChartContainer(productCard);
    const canvas = container.querySelector('.chart-canvas');
    
    // Get data
    const ratingsData = getMockRatingData(productId);
    const chartData = formatRatingDataForChart(ratingsData);
    
    // Update chart title
    const chartTitle = container.querySelector('.chart-title');
    chartTitle.textContent = `Mood Distribution (${chartData.total} ratings)`;
    
    // Update or create chart
    if (canvas.chart) {
        // Update existing chart
        canvas.chart.data.datasets[0].data = chartData.data;
        canvas.chart.data.labels = chartData.labels;
        canvas.chart.data.datasets[0].backgroundColor = chartData.backgroundColors;
        canvas.chart.update();
    } else {
        // Create new chart
        canvas.chart = new Chart(canvas, {
            type: 'pie', // Can also use 'bar' for bar chart
            data: {
                labels: chartData.labels,
                datasets: [{
                    data: chartData.data,
                    backgroundColor: chartData.backgroundColors,
                    borderColor: 'white',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // We'll create custom legend
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = chartData.total;
                                const percentage = total > 0 ? (value / total * 100).toFixed(1) : 0;
                                return `${value} ratings (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Update legend
    updateChartLegend(container, chartData);
    
    // Update metadata
    const metadata = container.querySelector('.chart-metadata');
    metadata.textContent = `Updated: 2025-05-30 14:13:09 | User: BeingSeight`;
}

// Update chart legend
function updateChartLegend(container, chartData) {
    const legend = container.querySelector('.chart-legend');
    legend.innerHTML = '';
    
    const emojis = ["😍", "😊", "😐", "😕", "😠"];
    const moodLabels = ["Love it!", "Like it", "It's okay", "Dislike it", "Hate it"];
    const colors = [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)'
    ];
    
    emojis.forEach((emoji, index) => {
        const count = chartData.data[index];
        const percentage = chartData.total > 0 ? (count / chartData.total * 100).toFixed(1) : 0;
        
        const item = document.createElement('div');
        item.className = 'legend-item';
        
        const colorBox = document.createElement('div');
        colorBox.className = 'legend-color';
        colorBox.style.backgroundColor = colors[index];
        
        const label = document.createElement('span');
        label.textContent = `${emoji} ${percentage}%`;
        
        item.appendChild(colorBox);
        item.appendChild(label);
        legend.appendChild(item);
    });
}

// Update charts for all products
function updateAllProductCharts() {
    products.forEach(product => {
        updateProductChart(product.id);
    });
}

// Call this function after product list is rendered
function initializeCharts() {
    showSpinner('Generating mood charts...');
    
    // Timeout to simulate loading for better UX
    setTimeout(() => {
        updateAllProductCharts();
        hideSpinner();
    }, 800);
}

// Update chart when a new rating is submitted
function updateChartAfterRating(productId) {
    // Show loading on the specific chart
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (!productCard) return;
    
    const chartContainer = productCard.querySelector('.chart-container');
    if (!chartContainer) return;
    
    const canvas = chartContainer.querySelector('.chart-canvas');
    
    // Add inline spinner to chart
    addInlineSpinner(chartContainer.querySelector('.chart-title'), 'Updating chart...');
    
    // Simulate updating data
    setTimeout(() => {
        updateProductChart(productId);
        removeInlineSpinner(chartContainer.querySelector('.chart-title'), `Mood Distribution (${Object.values(getMockRatingData(productId)).reduce((sum, count) => sum + count, 0)} ratings)`);
    }, 800);
}

// Call this after submitting a rating
// Inside submitRating function, add this line after saving the rating:
// updateChartAfterRating(productId);

// Initialize charts when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // This goes after renderProductList() and setupEmojiPicker()
    setTimeout(initializeCharts, 500);
});
// Global chart update configuration 
Chart.defaults.animation = {
    duration: 800,
    easing: 'easeOutQuart'
};

// Store chart instances by product ID for easy access
const chartInstances = {};

// Function to update chart when a new rating is added
function updateChartWithNewRating(productId, newRatingEmoji) {
    // Get the product's current ratings data
    let ratingsData = getRatingsFromStorage(productId);
    
    // If the data wasn't found or initialized, create it
    if (!ratingsData) {
        ratingsData = { "😍": 0, "😊": 0, "😐": 0, "😕": 0, "😠": 0 };
    }
    
    // Increment the count for the new rating emoji
    ratingsData[newRatingEmoji] = (ratingsData[newRatingEmoji] || 0) + 1;
    
    // Save updated data to storage
    saveRatingsToStorage(productId, ratingsData);
    
    // Update the chart
    updateProductChartDynamically(productId, ratingsData);
}

// Get ratings from storage (mock implementation)
function getRatingsFromStorage(productId) {
    // In a real implementation, this would fetch from localStorage
    // For now, we'll use our mock data
    return getMockRatingData(productId);
}

// Save ratings to storage (mock implementation)
function saveRatingsToStorage(productId, ratingsData) {
    // In a real implementation, this would save to localStorage
    // For demonstration, we'll just log it
    console.log(`Saved ratings for product ${productId}:`, ratingsData);
    
    // Update our mock data (not needed in real implementation)
    updateMockData(productId, ratingsData);
}

// Update mock data (only for demonstration)
function updateMockData(productId, newData) {
    // This function is just for our demo to simulate persistent storage
    // In a real implementation with localStorage, you wouldn't need this
    const mockDataCopy = getMockRatingData(productId);
    Object.keys(newData).forEach(key => {
        mockDataCopy[key] = newData[key];
    });
}

// Update product chart dynamically with smooth transitions
function updateProductChartDynamically(productId, ratingsData) {
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (!productCard) return;
    
    const chartContainer = productCard.querySelector('.chart-container');
    if (!chartContainer) {
        // If chart doesn't exist yet, create it
        createChartContainer(productCard);
        updateProductChart(productId);
        return;
    }
    
    const canvas = chartContainer.querySelector('.chart-canvas');
    const chartInstance = canvas.chart;
    
    if (!chartInstance) {
        // If chart instance doesn't exist, create it
        updateProductChart(productId);
        return;
    }
    
    // Show updating status
    const chartTitle = chartContainer.querySelector('.chart-title');
    const originalTitle = chartTitle.textContent;
    chartTitle.innerHTML = `<span class="inline-spinner"></span> Updating chart...`;
    
    // Format the data for the chart
    const chartData = formatRatingDataForChart(ratingsData);
    
    // Update the chart with animation
    setTimeout(() => {
        // Update data in the chart
        chartInstance.data.datasets[0].data = chartData.data;
        chartInstance.data.labels = chartData.labels;
        
        // Update chart options
        chartInstance.options.plugins.tooltip.callbacks.label = function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = chartData.total;
            const percentage = total > 0 ? (value / total * 100).toFixed(1) : 0;
            return `${value} ratings (${percentage}%)`;
        };
        
        // Apply the update with animation
        chartInstance.update();
        
        // Update the legend
        updateChartLegend(chartContainer, chartData);
        
        // Update chart title
        chartTitle.textContent = `Mood Distribution (${chartData.total} ratings)`;
        
        // Update metadata with current timestamp and user
        const metadata = chartContainer.querySelector('.chart-metadata');
        metadata.textContent = `Updated: 2025-05-30 14:15:21 | User: BeingSeight`;
        
        // Store chart instance for future updates
        chartInstances[productId] = chartInstance;
    }, 400);
}

// Modified submitRating function to update chart after rating
async function submitRating(event) {
    const submitButton = event.target;
    const emojiPicker = submitButton.closest('.emoji-picker');
    const productCard = submitButton.closest('.product-card');
    const productId = productCard.dataset.productId;
    const selectedEmoji = emojiPicker.querySelector('.emoji.selected');
    
    if (!selectedEmoji) {
        showNotification('Please select an emoji first!', 'error');
        return;
    }
    
    const rating = selectedEmoji.dataset.emoji;
    
    // Add spinner to button
    addButtonSpinner(submitButton);
    
    try {
        // Simulate saving data
        showSpinner('Saving your rating...');
        
        // Simulate network delay with promise
        await simulateAsyncOperation('Saving rating', 1000);
        
        // Update the chart with the new rating
        updateChartWithNewRating(productId, rating);
        
        // Hide spinner and emoji picker, show rate button again
        hideSpinner();
        emojiPicker.style.display = 'none';
        productCard.querySelector('.rate-button').style.display = 'block';
        
        // Get product name for the notification
        const productName = productCard.querySelector('.product-name').textContent;
        
        // Show success notification
        showNotification(`Thanks for rating "${productName}"! Your ${rating} rating has been recorded.`);
    } catch (error) {
        hideSpinner();
        showNotification('Error saving rating. Please try again.', 'error');
    } finally {
        // Remove button spinner
        removeButtonSpinner(submitButton);
    }
}

// Add an event listener for "Reset Ratings" button
function setupResetButton() {
    document.querySelectorAll('.reset-ratings-button').forEach(button => {
        button.addEventListener('click', async function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.productId;
            const productName = productCard.querySelector('.product-name').textContent;
            
            // Show confirmation
            if (!confirm(`Are you sure you want to reset all ratings for "${productName}"?`)) {
                return;
            }
            
            // Add spinner to button
            addButtonSpinner(this);
            
            try {
                showSpinner(`Resetting ratings for "${productName}"...`);
                
                // Simulate processing
                await simulateAsyncOperation('Resetting ratings', 1500);
                
                // Reset the ratings data to all zeros
                const emptyRatings = { "😍": 0, "😊": 0, "😐": 0, "😕": 0, "😠": 0 };
                saveRatingsToStorage(productId, emptyRatings);
                
                // Update the chart
                updateProductChartDynamically(productId, emptyRatings);
                
                hideSpinner();
                showNotification(`All ratings for "${productName}" have been reset.`);
            } catch (error) {
                hideSpinner();
                showNotification('Error resetting ratings. Please try again.', 'error');
            } finally {
                // Remove button spinner
                removeButtonSpinner(this);
            }
        });
    });
}

// Observer to detect when new products are added to the DOM
function setupProductObserver() {
    // Create a mutation observer to watch for new products being added
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(node => {
                    // Check if the added node is a product card or contains product cards
                    if (node.classList && node.classList.contains('product-card')) {
                        // New product card added, initialize its chart
                        const productId = node.dataset.productId;
                        updateProductChart(productId);
                    } else if (node.querySelectorAll) {
                        // Check for product cards within added node
                        node.querySelectorAll('.product-card').forEach(card => {
                            const productId = card.dataset.productId;
                            updateProductChart(productId);
                        });
                    }
                });
            }
        });
    });
    
    // Start observing the product list container
    const productList = document.getElementById('product-list');
    if (productList) {
        observer.observe(productList, { childList: true, subtree: true });
    }
}

// Call this after DOM is loaded to set up everything
document.addEventListener('DOMContentLoaded', function() {
    // After product list is rendered and emoji picker is set up
    setTimeout(() => {
        // Initialize all charts
        initializeCharts();
        
        // Set up reset buttons
        setupResetButton();
        
        // Set up observer for dynamically added products
        setupProductObserver();
        
        // Add to the page metadata
        if (document.getElementById('metadata')) {
            document.getElementById('metadata').innerHTML = 
                `Last accessed: 2025-05-30 14:15:21 | User: BeingSeight`;
        }
    }, 500);
});
// Pagination configuration
const PAGINATION = {
    productsPerPage: 3,
    reviewsPerPage: 5,
    currentProductPage: 1,
    reviewPages: {}, // Store current review page for each product
    totalProductPages: 0,
    totalProducts: 0,
    timestamp: '2025-05-30 14:20:42',
    user: 'BeingSeight'
};

// Initialize pagination
function initPagination() {
    // Calculate total product pages
    PAGINATION.totalProducts = products.length;
    PAGINATION.totalProductPages = Math.ceil(PAGINATION.totalProducts / PAGINATION.productsPerPage);
    
    // Create pagination controls if needed
    createProductPaginationControls();
    
    // Go to first page
    goToProductPage(1);
}

// Create pagination controls for products
function createProductPaginationControls() {
    const productList = document.getElementById('product-list');
    if (!productList) return;
    
    // Check if pagination container already exists
    let paginationContainer = document.querySelector('.pagination-container');
    if (paginationContainer) {
        paginationContainer.innerHTML = ''; // Clear existing controls
    } else {
        // Create new pagination container
        paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination-container';
        productList.after(paginationContainer);
    }
    
    // Create pagination info
    const paginationInfo = document.createElement('div');
    paginationInfo.className = 'pagination-info';
    paginationInfo.textContent = `Showing products 1-${Math.min(PAGINATION.productsPerPage, PAGINATION.totalProducts)} of ${PAGINATION.totalProducts}`;
    
    // Create pagination controls
    const controls = document.createElement('div');
    controls.className = 'pagination-controls';
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn prev-btn';
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = true;
    prevBtn.addEventListener('click', () => {
        if (PAGINATION.currentProductPage > 1) {
            goToProductPage(PAGINATION.currentProductPage - 1);
        }
    });
    
    // Page numbers
    const pageNumbers = document.createElement('div');
    pageNumbers.className = 'page-numbers';
    
    for (let i = 1; i <= PAGINATION.totalProductPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'pagination-btn page-btn' + (i === 1 ? ' active' : '');
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => goToProductPage(i));
        pageNumbers.appendChild(pageBtn);
    }
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn next-btn';
    nextBtn.textContent = 'Next';
    nextBtn.disabled = PAGINATION.totalProductPages <= 1;
    nextBtn.addEventListener('click', () => {
        if (PAGINATION.currentProductPage < PAGINATION.totalProductPages) {
            goToProductPage(PAGINATION.currentProductPage + 1);
        }
    });
    
    // Metadata
    const metadata = document.createElement('div');
    metadata.className = 'pagination-metadata';
    metadata.textContent = `Last updated: ${PAGINATION.timestamp} | User: ${PAGINATION.user}`;
    
    // Assemble controls
    controls.appendChild(prevBtn);
    controls.appendChild(pageNumbers);
    controls.appendChild(nextBtn);
    
    paginationContainer.appendChild(paginationInfo);
    paginationContainer.appendChild(controls);
    paginationContainer.appendChild(metadata);
}

// Navigate to a specific product page
function goToProductPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > PAGINATION.totalProductPages) return;
    
    // Update current page
    PAGINATION.currentProductPage = pageNumber;
    
    // Show loading spinner
    showSpinner('Loading products...');
    
    setTimeout(() => {
        // Calculate start and end indices
        const startIndex = (pageNumber - 1) * PAGINATION.productsPerPage;
        const endIndex = Math.min(startIndex + PAGINATION.productsPerPage, PAGINATION.totalProducts);
        
        // Hide all product cards first
        document.querySelectorAll('.product-card').forEach((card, index) => {
            // Reset any active animations
            card.classList.remove('visible-page', 'hidden-page');
            
            // Add appropriate class
            if (index >= startIndex && index < endIndex) {
                card.classList.add('visible-page');
            } else {
                card.classList.add('hidden-page');
            }
        });
        
        // Update pagination info
        const paginationInfo = document.querySelector('.pagination-info');
        if (paginationInfo) {
            paginationInfo.textContent = `Showing products ${startIndex + 1}-${endIndex} of ${PAGINATION.totalProducts}`;
        }
        
        // Update page buttons
        document.querySelectorAll('.page-btn').forEach((btn, index) => {
            btn.classList.toggle('active', index + 1 === pageNumber);
        });
        
        // Update prev/next buttons
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) prevBtn.disabled = pageNumber === 1;
        if (nextBtn) nextBtn.disabled = pageNumber === PAGINATION.totalProductPages;
        
        // Initialize charts for visible products
        const visibleProductIds = Array.from(document.querySelectorAll('.product-card.visible-page'))
            .map(card => card.dataset.productId);
        
        visibleProductIds.forEach(productId => {
            updateProductChart(productId);
        });
        
        // Hide spinner
        hideSpinner();
        
        // Update metadata timestamp
        const metadata = document.querySelector('.pagination-metadata');
        if (metadata) {
            metadata.textContent = `Last updated: ${PAGINATION.timestamp} | User: ${PAGINATION.user}`;
        }
    }, 300); // Small delay for better UX
}

// Mock reviews data for demonstration
function getMockReviewsData(productId) {
    // Generate random number of reviews between 0 and 20
    const reviewCount = Math.floor(Math.random() * 21);
    const reviews = [];
    
    // Emojis and comments for mock data
    const emojis = ["😍", "😊", "😐", "😕", "😠"];
    const comments = [
        "Great product, really love it!",
        "Works as expected, would recommend.",
        "It's okay, nothing special.",
        "Didn't work as well as I hoped.",
        "Disappointed with this purchase.",
        "Exceeded my expectations!",
        "Good value for money.",
        "Average product, does the job.",
        "Had some issues but customer service was helpful.",
        "Not worth the price."
    ];
    
    // Generate random reviews
    for (let i = 0; i < reviewCount; i++) {
        // Create a random date within the last 30 days
        const daysAgo = Math.floor(Math.random() * 30);
        const reviewDate = new Date(new Date(PAGINATION.timestamp) - daysAgo * 24 * 60 * 60 * 1000);
        const formattedDate = reviewDate.toISOString().split('T')[0];
        
        // Random emoji and comment
        const emojiIndex = Math.floor(Math.random() * emojis.length);
        const commentIndex = Math.floor(Math.random() * comments.length);
        
        reviews.push({
            id: `review-${productId}-${i}`,
            emoji: emojis[emojiIndex],
            date: formattedDate,
            user: `User${Math.floor(Math.random() * 1000)}`,
            comment: comments[commentIndex]
        });
    }
    
    // Sort reviews by date (newest first)
    reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return reviews;
}

// Load product reviews with pagination
function loadProductReviewsWithPagination(productId) {
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (!productCard) return;
    
    // Check if reviews section exists, create if not
    let reviewsSection = productCard.querySelector('.reviews-section');
    if (!reviewsSection) {
        reviewsSection = document.createElement('div');
        reviewsSection.className = 'reviews-section';
        
        // Create title
        const reviewsTitle = document.createElement('h4');
        reviewsTitle.className = 'reviews-title';
        reviewsTitle.textContent = 'Customer Reviews';
        
        // Create container for reviews
        const reviewsContainer = document.createElement('div');
        reviewsContainer.className = 'reviews-container';
        
        // Add loading indicator
        reviewsContainer.innerHTML = '<div class="review-loading"><span class="inline-spinner"></span> Loading reviews...</div>';
        
        // Append to reviews section
        reviewsSection.appendChild(reviewsTitle);
        reviewsSection.appendChild(reviewsContainer);
        
        // Add to product card
        productCard.appendChild(reviewsSection);
    }
    
    // Set initial page for this product if not set
    if (!PAGINATION.reviewPages[productId]) {
        PAGINATION.reviewPages[productId] = 1;
    }
    
    // Fetch reviews (simulated)
    setTimeout(() => {
        const reviews = getMockReviewsData(productId);
        renderProductReviews(productId, reviews, PAGINATION.reviewPages[productId]);
    }, 800);
}

// Render product reviews with pagination
function renderProductReviews(productId, reviews, page) {
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (!productCard) return;
    
    const reviewsContainer = productCard.querySelector('.reviews-container');
    if (!reviewsContainer) return;
    
    // Calculate total pages
    const totalReviews = reviews.length;
    const totalPages = Math.ceil(totalReviews / PAGINATION.reviewsPerPage);
    
    // Validate page number
    page = Math.max(1, Math.min(page, totalPages || 1));
    PAGINATION.reviewPages[productId] = page;
    
    // Calculate start and end indices
    const startIndex = (page - 1) * PAGINATION.reviewsPerPage;
    const endIndex = Math.min(startIndex + PAGINATION.reviewsPerPage, totalReviews);
    
    // Clear container
    reviewsContainer.innerHTML = '';
    
    // Display reviews count
    const reviewCount = document.createElement('div');
    reviewCount.className = 'review-count';
    reviewCount.textContent = `${totalReviews} customer ${totalReviews === 1 ? 'review' : 'reviews'}`;
    reviewsContainer.appendChild(reviewCount);
    
    // Check if there are any reviews
    if (totalReviews === 0) {
        const noReviews = document.createElement('div');
        noReviews.className = 'no-reviews';
        noReviews.textContent = 'No reviews yet. Be the first to rate this product!';
        reviewsContainer.appendChild(noReviews);
        return;
    }
    
    // Display current page reviews
    const pageReviews = reviews.slice(startIndex, endIndex);
    
    pageReviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.innerHTML = `
            <span class="review-emoji">${review.emoji}</span>
            <span class="review-date">${review.date}</span>
            <span class="review-user">${review.user}</span>
            ${review.comment ? `<div class="review-comment">"${review.comment}"</div>` : ''}
        `;
        reviewsContainer.appendChild(reviewItem);
    });
    
    // Create pagination for reviews if multiple pages
    if (totalPages > 1) {
        const reviewsPagination = document.createElement('div');
        reviewsPagination.className = 'reviews-pagination';
        
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-btn prev-review-btn';
        prevBtn.textContent = 'Prev';
        prevBtn.disabled = page === 1;
        prevBtn.addEventListener('click', () => {
            if (page > 1) {
                renderProductReviews(productId, reviews, page - 1);
            }
        });
        
        // Page info
        const pageInfo = document.createElement('span');
        pageInfo.className = 'pagination-info';
        pageInfo.textContent = ` Page ${page} of ${totalPages} `;
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-btn next-review-btn';
        nextBtn.textContent = 'Next';
        nextBtn.disabled = page === totalPages;
        nextBtn.addEventListener('click', () => {
            if (page < totalPages) {
                renderProductReviews(productId, reviews, page + 1);
            }
        });
        
        // Assemble pagination
        reviewsPagination.appendChild(prevBtn);
        reviewsPagination.appendChild(pageInfo);
        reviewsPagination.appendChild(nextBtn);
        
        reviewsContainer.appendChild(reviewsPagination);
    }
    
    // Add metadata
    const metadata = document.createElement('div');
    metadata.className = 'pagination-metadata';
    metadata.textContent = `Updated: ${PAGINATION.timestamp} | User: ${PAGINATION.user}`;
    reviewsContainer.appendChild(metadata);
}

// Toggle reviews display
function toggleProductReviews(productId) {
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (!productCard) return;
    
    let reviewsSection = productCard.querySelector('.reviews-section');
    
    if (!reviewsSection) {
        // Reviews not loaded yet, load them
        loadProductReviewsWithPagination(productId);
    } else {
        // Toggle visibility
        if (reviewsSection.style.display === 'none') {
            reviewsSection.style.display = 'block';
        } else {
            reviewsSection.style.display = 'none';
        }
    }
}

// Add reviews toggle button to product cards
function addReviewsToggleButton() {
    document.querySelectorAll('.product-card').forEach(productCard => {
        if (!productCard.querySelector('.toggle-reviews-btn')) {
            const productId = productCard.dataset.productId;
            
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'toggle-reviews-btn';
            toggleBtn.textContent = 'Show Reviews';
            toggleBtn.addEventListener('click', function() {
                toggleProductReviews(productId);
                this.textContent = this.textContent === 'Show Reviews' ? 'Hide Reviews' : 'Show Reviews';
            });
            
            // Add after rate button
            const rateButton = productCard.querySelector('.rate-button');
            if (rateButton) {
                rateButton.after(toggleBtn);
            } else {
                productCard.appendChild(toggleBtn);
            }
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Render products
    renderProductList();
    
    // Setup emoji picker
    setupEmojiPicker();
    
    // Add reviews toggle buttons
    addReviewsToggleButton();
    
    // Initialize pagination
    initPagination();
    
    // Initialize charts for visible products (after pagination)
    setTimeout(() => {
        document.querySelectorAll('.product-card.visible-page').forEach(card => {
            updateProductChart(card.dataset.productId);
        });
    }, 600);
});
// Global search state
const SEARCH = {
    query: '',
    results: [],
    timestamp: '2025-05-30 14:28:01',
    user: 'BeingSeight'
};

// Create search bar
function createSearchBar() {
    // Check if search container already exists
    if (document.querySelector('.search-container')) {
        return;
    }
    
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    // Create search bar
    const searchBar = document.createElement('div');
    searchBar.className = 'search-bar';
    
    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Search products by name...';
    searchInput.setAttribute('aria-label', 'Search products');
    
    // Create clear button
    const clearButton = document.createElement('span');
    clearButton.className = 'search-clear';
    clearButton.innerHTML = '&times;';
    clearButton.setAttribute('aria-label', 'Clear search');
    clearButton.addEventListener('click', clearSearch);
    
    // Create search icon
    const searchIcon = document.createElement('span');
    searchIcon.className = 'search-icon';
    searchIcon.innerHTML = '🔍';
    
    // Create search stats
    const searchStats = document.createElement('div');
    searchStats.className = 'search-stats';
    
    // Create metadata
    const metadata = document.createElement('div');
    metadata.className = 'search-metadata';
    metadata.textContent = `Last search: ${SEARCH.timestamp} | User: ${SEARCH.user}`;
    
    // Assemble search bar
    searchBar.appendChild(searchInput);
    searchBar.appendChild(clearButton);
    searchBar.appendChild(searchIcon);
    
    // Assemble search container
    searchContainer.appendChild(searchBar);
    searchContainer.appendChild(searchStats);
    searchContainer.appendChild(metadata);
    
    // Add event listener for input
    searchInput.addEventListener('input', handleSearchInput);
    
    // Insert search bar before product list
    const productList = document.getElementById('product-list');
    if (productList) {
        productList.parentNode.insertBefore(searchContainer, productList);
    }
}

// Handle search input
function handleSearchInput(event) {
    const query = event.target.value.trim().toLowerCase();
    
    // Update search state
    SEARCH.query = query;
    SEARCH.timestamp = '2025-05-30 14:28:01'; // Fixed timestamp as provided
    
    // Filter products
    filterProducts(query);
    
    // Update metadata
    updateSearchMetadata();
}

// Clear search
function clearSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = '';
        
        // Reset search state
        SEARCH.query = '';
        SEARCH.timestamp = '2025-05-30 14:28:01'; // Fixed timestamp as provided
        
        // Show all products
        filterProducts('');
        
        // Update metadata
        updateSearchMetadata();
        
        // Reset pagination to page 1
        if (typeof goToProductPage === 'function') {
            goToProductPage(1);
        }
    }
}

// Update search metadata
function updateSearchMetadata() {
    const metadata = document.querySelector('.search-metadata');
    if (metadata) {
        metadata.textContent = `Last search: ${SEARCH.timestamp} | User: ${SEARCH.user}`;
    }
}

// Filter products based on search query
function filterProducts(query) {
    // Show loading spinner for better UX
    showSpinner('Filtering products...');
    
    setTimeout(() => {
        const productCards = document.querySelectorAll('.product-card');
        let matchCount = 0;
        
        // Filter products
        productCards.forEach(card => {
            const productName = card.querySelector('.product-name').textContent.toLowerCase();
            const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
            
            // Check if product matches search query
            const isMatch = query === '' || 
                productName.includes(query) || 
                productDescription.includes(query);
            
            // Toggle filtered-out class
            card.classList.toggle('filtered-out', !isMatch);
            
            // Remove previous highlights
            card.querySelectorAll('.highlight').forEach(el => {
                el.outerHTML = el.textContent;
            });
            
            // Add highlight for matching text
            if (isMatch && query !== '') {
                highlightText(card.querySelector('.product-name'), query);
                highlightText(card.querySelector('.product-description'), query);
                matchCount++;
            }
        });
        
        // Store results for pagination
        SEARCH.results = Array.from(productCards)
            .filter(card => !card.classList.contains('filtered-out'))
            .map(card => card.dataset.productId);
        
        // Update search stats
        updateSearchStats(matchCount, query);
        
        // Update pagination if available
        if (typeof updatePaginationForFilteredResults === 'function') {
            updatePaginationForFilteredResults(SEARCH.results);
        } else {
            // If pagination is not available, show/hide no results message
            updateNoResultsMessage(matchCount);
        }
        
        // Hide loading spinner
        hideSpinner();
    }, 300); // Short delay for better UX
}

// Update search stats
function updateSearchStats(matchCount, query) {
    const searchStats = document.querySelector('.search-stats');
    if (searchStats) {
        if (query === '') {
            searchStats.textContent = `Showing all ${products.length} products`;
        } else {
            searchStats.textContent = `Found ${matchCount} ${matchCount === 1 ? 'match' : 'matches'} for "${query}"`;
        }
    }
}

// Update no results message
function updateNoResultsMessage(matchCount) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.no-results');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // If no matches, show message
    if (matchCount === 0 && SEARCH.query !== '') {
        const productList = document.getElementById('product-list');
        if (productList) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <p>No products found matching "${SEARCH.query}"</p>
                <p>Try a different search term or <button class="clear-search-btn">clear search</button></p>
            `;
            
            // Add event listener to clear button
            noResults.querySelector('.clear-search-btn').addEventListener('click', clearSearch);
            
            // Insert after product list
            productList.after(noResults);
        }
    }
}

// Highlight matching text
function highlightText(element, query) {
    if (!element) return;
    
    const text = element.textContent;
    const lowerText = text.toLowerCase();
    let startIndex = 0;
    let result = '';
    
    // Find all occurrences of the query
    while (startIndex < text.length) {
        const index = lowerText.indexOf(query, startIndex);
        if (index === -1) {
            // No more matches, add the rest of the text
            result += text.substring(startIndex);
            break;
        }
        
        // Add text before match
        result += text.substring(startIndex, index);
        
        // Add highlighted match
        result += `<span class="highlight">${text.substring(index, index + query.length)}</span>`;
        
        // Update start index
        startIndex = index + query.length;
    }
    
    // Update element HTML
    element.innerHTML = result;
}

// Update pagination for filtered results
function updatePaginationForFilteredResults(filteredResults) {
    // If pagination is used, update it
    if (typeof PAGINATION !== 'undefined') {
        // Update pagination info
        PAGINATION.filteredProducts = filteredResults;
        PAGINATION.totalFilteredProducts = filteredResults.length;
        PAGINATION.totalFilteredPages = Math.ceil(filteredResults.length / PAGINATION.productsPerPage);
        
        // Update pagination controls
        updatePaginationControls();
        
        // Go to first page
        goToFilteredProductPage(1);
    } else {
        // If pagination is not used, just update no results message
        updateNoResultsMessage(filteredResults.length);
    }
}

// Update pagination controls for filtered results
function updatePaginationControls() {
    const pageNumbers = document.querySelector('.page-numbers');
    if (!pageNumbers) return;
    
    // Clear existing page buttons
    pageNumbers.innerHTML = '';
    
    // Create new page buttons based on filtered results
    const totalPages = PAGINATION.totalFilteredPages || 1;
    
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'pagination-btn page-btn' + (i === 1 ? ' active' : '');
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => goToFilteredProductPage(i));
        pageNumbers.appendChild(pageBtn);
    }
    
    // Update pagination info
    const paginationInfo = document.querySelector('.pagination-info');
    if (paginationInfo) {
        if (SEARCH.query === '') {
            paginationInfo.textContent = `Showing products 1-${Math.min(PAGINATION.productsPerPage, PAGINATION.totalProducts)} of ${PAGINATION.totalProducts}`;
        } else {
            const totalFiltered = PAGINATION.totalFilteredProducts;
            paginationInfo.textContent = `Showing ${totalFiltered > 0 ? '1' : '0'}-${Math.min(PAGINATION.productsPerPage, totalFiltered)} of ${totalFiltered} filtered products`;
        }
    }
    
    // Update prev/next buttons
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) prevBtn.disabled = true; // Start at page 1
    if (nextBtn) nextBtn.disabled = totalPages <= 1;
}

// Navigate to a specific page of filtered products
function goToFilteredProductPage(pageNumber) {
    if (!PAGINATION.filteredProducts) return;
    
    const totalPages = PAGINATION.totalFilteredPages || 1;
    if (pageNumber < 1 || pageNumber > totalPages) return;
    
    // Update current page
    PAGINATION.currentProductPage = pageNumber;
    
    // Show loading spinner
    showSpinner('Loading filtered products...');
    
    setTimeout(() => {
        // Calculate start and end indices for this page
        const startIndex = (pageNumber - 1) * PAGINATION.productsPerPage;
        const endIndex = Math.min(startIndex + PAGINATION.productsPerPage, PAGINATION.totalFilteredProducts);
        
        // Get product IDs for this page
        const pageProductIds = PAGINATION.filteredProducts.slice(startIndex, endIndex);
        
        // Hide all product cards first
        document.querySelectorAll('.product-card').forEach(card => {
            // Reset any active animations
            card.classList.remove('visible-page', 'hidden-page');
            
            // If card matches filter but not on this page, hide it
            if (PAGINATION.filteredProducts.includes(card.dataset.productId) && 
                !pageProductIds.includes(card.dataset.productId)) {
                card.classList.add('hidden-page');
            }
            
            // If card is on this page, show it
            if (pageProductIds.includes(card.dataset.productId)) {
                card.classList.remove('filtered-out');
                card.classList.add('visible-page');
            }
        });
        
        // Update pagination info
        const paginationInfo = document.querySelector('.pagination-info');
        if (paginationInfo) {
            if (SEARCH.query === '') {
                paginationInfo.textContent = `Showing products ${startIndex + 1}-${endIndex} of ${PAGINATION.totalProducts}`;
            } else {
                paginationInfo.textContent = `Showing ${startIndex + 1}-${endIndex} of ${PAGINATION.totalFilteredProducts} filtered products`;
            }
        }
        
        // Update page buttons
        document.querySelectorAll('.page-btn').forEach((btn, index) => {
            btn.classList.toggle('active', index + 1 === pageNumber);
        });
        
        // Update prev/next buttons
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) prevBtn.disabled = pageNumber === 1;
        if (nextBtn) nextBtn.disabled = pageNumber === totalPages;
        
        // Initialize charts for visible products
        const visibleProductIds = pageProductIds;
        visibleProductIds.forEach(productId => {
            updateProductChart(productId);
        });
        
        // Hide spinner
        hideSpinner();
        
        // Update no results message
        if (PAGINATION.totalFilteredProducts === 0) {
            updateNoResultsMessage(0);
        }
        
        // Update metadata timestamp
        const metadata = document.querySelector('.pagination-metadata');
        if (metadata) {
            metadata.textContent = `Last updated: ${PAGINATION.timestamp} | User: ${PAGINATION.user}`;
        }
    }, 300); // Small delay for better UX
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add search bar after products are rendered
    setTimeout(() => {
        createSearchBar();
    }, 300);
});
// User preferences object with defaults
const USER_PREFERENCES = {
    theme: 'light',
    preferredEmoji: '😊',
    chartType: 'pie',
    productsPerPage: 3,
    lastVisit: '2025-05-30 14:30:50', // Timestamp as provided
    user: 'BeingSeight',              // User as provided
    version: '1.0'
};

// Load preferences from localStorage
function loadUserPreferences() {
    try {
        const savedPrefs = localStorage.getItem('userPreferences');
        if (savedPrefs) {
            const parsedPrefs = JSON.parse(savedPrefs);
            
            // Update preferences with saved values, keeping defaults for any missing properties
            Object.assign(USER_PREFERENCES, parsedPrefs);
            
            // Always update timestamp and user to current values
            USER_PREFERENCES.lastVisit = '2025-05-30 14:30:50';
            USER_PREFERENCES.user = 'BeingSeight';
            
            console.log('Preferences loaded from localStorage', USER_PREFERENCES);
        } else {
            // First time user, save default preferences
            saveUserPreferences();
            console.log('Default preferences initialized', USER_PREFERENCES);
        }
    } catch (error) {
        console.error('Error loading preferences:', error);
    }
}

// Save preferences to localStorage
function saveUserPreferences() {
    try {
        // Always update timestamp before saving
        USER_PREFERENCES.lastVisit = '2025-05-30 14:30:50';
        USER_PREFERENCES.user = 'BeingSeight';
        
        localStorage.setItem('userPreferences', JSON.stringify(USER_PREFERENCES));
        console.log('Preferences saved to localStorage', USER_PREFERENCES);
        
        // Show notification
        showNotification('Preferences saved successfully!');
    } catch (error) {
        console.error('Error saving preferences:', error);
        showNotification('Error saving preferences. Please try again.', 'error');
    }
}

// Apply preferences to the UI
function applyUserPreferences() {
    // Apply theme
    document.body.classList.toggle('dark-theme', USER_PREFERENCES.theme === 'dark');
    
    // Update pagination if applicable
    if (typeof PAGINATION !== 'undefined') {
        // Only update if different from current setting
        if (PAGINATION.productsPerPage !== USER_PREFERENCES.productsPerPage) {
            PAGINATION.productsPerPage = USER_PREFERENCES.productsPerPage;
            // Recalculate pagination
            PAGINATION.totalProductPages = Math.ceil(PAGINATION.totalProducts / PAGINATION.productsPerPage);
            // Update pagination controls
            updatePaginationControls();
            // Go to first page
            goToProductPage(1);
        }
    }
    
    // Update charts to preferred type
    updateChartsToPreferredType();
    
    // Update preferred emoji highlight in emoji pickers
    highlightPreferredEmoji();
    
    // Update preferences panel UI to reflect current settings
    updatePreferencesPanelUI();
    
    console.log('Preferences applied to UI', USER_PREFERENCES);
}

// Update charts to preferred type (pie or bar)
function updateChartsToPreferredType() {
    // Get all chart canvases
    document.querySelectorAll('.chart-canvas').forEach(canvas => {
        if (canvas.chart && canvas.chart.config.type !== USER_PREFERENCES.chartType) {
            // Get current data
            const data = canvas.chart.data;
            // Destroy current chart
            canvas.chart.destroy();
            
            // Create new chart with preferred type
            canvas.chart = new Chart(canvas, {
                type: USER_PREFERENCES.chartType,
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const value = context.raw || 0;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = total > 0 ? (value / total * 100).toFixed(1) : 0;
                                    return `${value} ratings (${percentage}%)`;
                                }
                            }
                        }
                    },
                    // Bar chart specific options
                    ...(USER_PREFERENCES.chartType === 'bar' && {
                        indexAxis: 'y',
                        scales: {
                            x: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Number of Ratings'
                                }
                            }
                        }
                    })
                }
            });
        }
    });
}

// Highlight preferred emoji in pickers
function highlightPreferredEmoji() {
    document.querySelectorAll('.emoji').forEach(emoji => {
        emoji.classList.toggle('preferred', emoji.dataset.emoji === USER_PREFERENCES.preferredEmoji);
    });
}

// Create preferences panel
function createPreferencesPanel() {
    // Check if panel already exists
    if (document.querySelector('.preferences-panel')) {
        return;
    }
    
    // Create panel
    const panel = document.createElement('div');
    panel.className = 'preferences-panel';
    panel.innerHTML = `
        <div class="preferences-header">
            <h2 class="preferences-title">User Preferences</h2>
            <button class="close-preferences">&times;</button>
        </div>
        
        <div class="preferences-section">
            <h3>Theme</h3>
            <div class="theme-options">
                <div class="theme-option ${USER_PREFERENCES.theme === 'light' ? 'selected' : ''}" data-theme="light">
                    Light
                </div>
                <div class="theme-option ${USER_PREFERENCES.theme === 'dark' ? 'selected' : ''}" data-theme="dark">
                    Dark
                </div>
            </div>
        </div>
        
        <div class="preferences-section">
            <h3>Preferred Emoji</h3>
            <div class="emoji-preference-options">
                <span class="emoji-preference ${USER_PREFERENCES.preferredEmoji === '😍' ? 'selected' : ''}" data-emoji="😍">😍</span>
                <span class="emoji-preference ${USER_PREFERENCES.preferredEmoji === '😊' ? 'selected' : ''}" data-emoji="😊">😊</span>
                <span class="emoji-preference ${USER_PREFERENCES.preferredEmoji === '😐' ? 'selected' : ''}" data-emoji="😐">😐</span>
                <span class="emoji-preference ${USER_PREFERENCES.preferredEmoji === '😕' ? 'selected' : ''}" data-emoji="😕">😕</span>
                <span class="emoji-preference ${USER_PREFERENCES.preferredEmoji === '😠' ? 'selected' : ''}" data-emoji="😠">😠</span>
            </div>
        </div>
        
        <div class="preferences-section">
            <h3>Chart Type</h3>
            <div class="chart-options">
                <div class="chart-option ${USER_PREFERENCES.chartType === 'pie' ? 'selected' : ''}" data-chart-type="pie">
                    Pie Chart
                </div>
                <div class="chart-option ${USER_PREFERENCES.chartType === 'bar' ? 'selected' : ''}" data-chart-type="bar">
                    Bar Chart
                </div>
            </div>
        </div>
        
        <div class="preferences-section">
            <h3>Products Per Page</h3>
            <div class="product-count-options">
                <span class="product-count-option ${USER_PREFERENCES.productsPerPage === 3 ? 'selected' : ''}" data-count="3">3</span>
                <span class="product-count-option ${USER_PREFERENCES.productsPerPage === 6 ? 'selected' : ''}" data-count="6">6</span>
                <span class="product-count-option ${USER_PREFERENCES.productsPerPage === 9 ? 'selected' : ''}" data-count="9">9</span>
                <span class="product-count-option ${USER_PREFERENCES.productsPerPage === 12 ? 'selected' : ''}" data-count="12">12</span>
            </div>
        </div>
        
        <button class="save-preferences">Save Preferences</button>
        
        <div class="preferences-metadata">
            Last updated: ${USER_PREFERENCES.lastVisit} | User: ${USER_PREFERENCES.user}
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(panel);
    
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'preferences-toggle';
    toggleButton.innerHTML = '⚙️';
    toggleButton.setAttribute('aria-label', 'Open Preferences');
    document.body.appendChild(toggleButton);
    
    // Add event listeners
    toggleButton.addEventListener('click', togglePreferencesPanel);
    panel.querySelector('.close-preferences').addEventListener('click', togglePreferencesPanel);
    panel.querySelector('.save-preferences').addEventListener('click', saveAndApplyPreferences);
    
    // Add event listeners for theme options
    panel.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            panel.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Add event listeners for emoji preferences
    panel.querySelectorAll('.emoji-preference').forEach(emoji => {
        emoji.addEventListener('click', function() {
            panel.querySelectorAll('.emoji-preference').forEach(em => em.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Add event listeners for chart options
    panel.querySelectorAll('.chart-option').forEach(option => {
        option.addEventListener('click', function() {
            panel.querySelectorAll('.chart-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Add event listeners for product count options
    panel.querySelectorAll('.product-count-option').forEach(option => {
        option.addEventListener('click', function() {
            panel.querySelectorAll('.product-count-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

// Toggle preferences panel
function togglePreferencesPanel() {
    const panel = document.querySelector('.preferences-panel');
    if (panel) {
        panel.classList.toggle('open');
        
        // Update UI to match current preferences when opening
        if (panel.classList.contains('open')) {
            updatePreferencesPanelUI();
        }
    }
}

// Update preferences panel UI to match current preferences
function updatePreferencesPanelUI() {
    const panel = document.querySelector('.preferences-panel');
    if (!panel) return;
    
    // Update theme selection
    panel.querySelectorAll('.theme-option').forEach(option => {
        option.classList.toggle('selected', option.dataset.theme === USER_PREFERENCES.theme);
    });
    
    // Update emoji selection
    panel.querySelectorAll('.emoji-preference').forEach(emoji => {
        emoji.classList.toggle('selected', emoji.dataset.emoji === USER_PREFERENCES.preferredEmoji);
    });
    
    // Update chart type selection
    panel.querySelectorAll('.chart-option').forEach(option => {
        option.classList.toggle('selected', option.dataset.chartType === USER_PREFERENCES.chartType);
    });
    
    // Update products per page selection
    panel.querySelectorAll('.product-count-option').forEach(option => {
        option.classList.toggle('selected', parseInt(option.dataset.count) === USER_PREFERENCES.productsPerPage);
    });
    
    // Update metadata
    panel.querySelector('.preferences-metadata').textContent = 
        `Last updated: ${USER_PREFERENCES.lastVisit} | User: ${USER_PREFERENCES.user}`;
}

// Save and apply preferences
function saveAndApplyPreferences() {
    // Show loading spinner
    showSpinner('Saving preferences...');
    
    setTimeout(() => {
        // Get preferences from UI
        const panel = document.querySelector('.preferences-panel');
        
        // Theme
        const selectedTheme = panel.querySelector('.theme-option.selected').dataset.theme;
        USER_PREFERENCES.theme = selectedTheme;
        
        // Preferred emoji
        const selectedEmoji = panel.querySelector('.emoji-preference.selected').dataset.emoji;
        USER_PREFERENCES.preferredEmoji = selectedEmoji;
        
        // Chart type
        const selectedChartType = panel.querySelector('.chart-option.selected').dataset.chartType;
        USER_PREFERENCES.chartType = selectedChartType;
        
        // Products per page
        const selectedCount = parseInt(panel.querySelector('.product-count-option.selected').dataset.count);
        USER_PREFERENCES.productsPerPage = selectedCount;
        
        // Save to localStorage
        saveUserPreferences();
        
        // Apply to UI
        applyUserPreferences();
        
        // Close panel
        panel.classList.remove('open');
        
        // Hide spinner
        hideSpinner();
    }, 800);
}

// Set default emoji when rating products
function usePreferredEmojiByDefault() {
    document.querySelectorAll('.rate-button').forEach(button => {
        const originalClickHandler = button.onclick;
        
        // Replace click handler
        button.onclick = function(event) {
            // Call original handler
            if (originalClickHandler) {
                originalClickHandler.call(this, event);
            }
            
            // After emoji picker is shown, highlight preferred emoji
            const productCard = this.closest('.product-card');
            const emojiPicker = productCard.querySelector('.emoji-picker');
            const preferredEmoji = emojiPicker.querySelector(`.emoji[data-emoji="${USER_PREFERENCES.preferredEmoji}"]`);
            
            if (preferredEmoji) {
                // Trigger a click on the preferred emoji
                setTimeout(() => {
                    preferredEmoji.click();
                }, 100);
            }
        };
    });
}

// Initialize preferences system
function initPreferences() {
    // Load preferences from localStorage
    loadUserPreferences();
    
    // Create preferences panel
    createPreferencesPanel();
    
    // Apply preferences to UI
    applyUserPreferences();
    
    // Setup default emoji selection
    usePreferredEmojiByDefault();
    
    console.log('Preferences system initialized');
}

// Add to DOM ready event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize preferences after everything else is loaded
    setTimeout(initPreferences, 800);
});
// Theme toggle functionality
function initThemeToggle() {
    // Create toggle button if it doesn't exist
    if (!document.querySelector('.theme-toggle')) {
        const toggleButton = document.createElement('button');
        toggleButton.className = 'theme-toggle';
        toggleButton.setAttribute('aria-label', 'Toggle dark/light theme');
        toggleButton.innerHTML = '<span class="theme-icon">☀️</span>';
        document.body.appendChild(toggleButton);
        
        // Add click event listener
        toggleButton.addEventListener('click', toggleTheme);
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('themePreference');
    
    // Apply saved theme or default to light
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeIcon('dark');
    } else {
        document.body.classList.remove('dark-theme');
        updateThemeIcon('light');
    }
}

// Toggle between light and dark themes
function toggleTheme() {
    // Toggle the theme class
    const isDarkTheme = document.body.classList.toggle('dark-theme');
    
    // Update the theme icon
    updateThemeIcon(isDarkTheme ? 'dark' : 'light');
    
    // Save preference to localStorage
    localStorage.setItem('themePreference', isDarkTheme ? 'dark' : 'light');
    
    // Update any charts to match the theme
    updateChartsTheme(isDarkTheme);
    
    // Show notification
    showThemeChangeNotification(isDarkTheme);
    
    // If preferences system exists, update it
    if (typeof USER_PREFERENCES !== 'undefined') {
        USER_PREFERENCES.theme = isDarkTheme ? 'dark' : 'light';
        // Update preferences panel if it exists
        const panel = document.querySelector('.preferences-panel');
        if (panel) {
            panel.querySelectorAll('.theme-option').forEach(option => {
                option.classList.toggle('selected', option.dataset.theme === USER_PREFERENCES.theme);
            });
        }
    }
}

// Update the theme toggle icon
function updateThemeIcon(theme) {
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
        toggleButton.querySelector('.theme-icon').textContent = theme === 'dark' ? '🌙' : '☀️';
    }
}

// Update charts to match current theme
function updateChartsTheme(isDarkTheme) {
    // Set Chart.js defaults based on theme
    if (window.Chart) {
        Chart.defaults.color = isDarkTheme ? '#eee' : '#666';
        Chart.defaults.borderColor = isDarkTheme ? '#444' : '#ddd';
        
        // Update all existing charts
        document.querySelectorAll('.chart-canvas').forEach(canvas => {
            if (canvas.chart) {
                canvas.chart.update();
            }
        });
    }
}

// Show theme change notification
function showThemeChangeNotification(isDarkTheme) {
    // Remove existing notification if present
    const existingNotification = document.querySelector('.theme-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.innerHTML = `
        ${isDarkTheme ? 'Dark' : 'Light'} theme activated
        <span class="theme-metadata">Time: 2025-05-30 14:34:03 | User: BeingSeight</span>
    `;
    document.body.appendChild(notification);
    
    // Show the notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize theme on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme toggle after a short delay
    // to ensure all other components are loaded
    setTimeout(initThemeToggle, 500);
    
    // Update metadata with exact timestamp and user
    if (document.getElementById('metadata')) {
        document.getElementById('metadata').innerHTML = 
            `Last accessed: 2025-05-30 14:34:03 | User: BeingSeight`;
    }
});
// Input Validation and Sanitization Utilities

// Sanitize string to prevent XSS attacks
function sanitizeInput(input) {
    if (!input) return '';
    
    // Convert to string if not already
    const str = String(input);
    
    // Replace HTML special characters with their entities
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Safely render HTML content (use only for trusted content)
function safelyRenderHTML(element, html) {
    if (!element) return;
    
    // Use DOMPurify if available (add this library for better protection)
    if (window.DOMPurify) {
        element.innerHTML = DOMPurify.sanitize(html);
    } else {
        // Fallback to basic sanitization
        element.textContent = html; // This is safer but won't render any HTML
    }
}

// Validate input against specific patterns
function validateInput(input, type) {
    if (!input) return false;
    
    const value = String(input).trim();
    
    switch (type) {
        case 'text':
            // Basic text validation - not empty and reasonable length
            return value.length > 0 && value.length <= 500;
            
        case 'email':
            // Basic email validation
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            
        case 'number':
            // Basic number validation
            return !isNaN(value) && isFinite(value);
            
        case 'search':
            // Search query validation - not just spaces and reasonable length
            return value.length > 0 && value.length <= 100;
            
        case 'comment':
            // Comment validation - not empty and reasonable length
            return value.length > 0 && value.length <= 1000;
            
        default:
            // Default validation just checks if not empty
            return value.length > 0;
    }
}

// Check for potentially dangerous content
function checkForDangerousContent(input) {
    if (!input) return false;
    
    const value = String(input).toLowerCase();
    
    // Check for script tags, JS events, or iframe tags
    const dangerousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+=/i,  // onclick=, onload=, etc.
        /<iframe/i,
        /data:/i,   // data: URLs
        /vbscript:/i
    ];
    
    return dangerousPatterns.some(pattern => pattern.test(value));
}

// Log validation attempts for security monitoring
function logValidationAttempt(input, isValid, inputType) {
    const timestamp = '2025-05-30 14:35:39'; // Fixed timestamp as provided
    const user = 'BeingSeight';              // Fixed user as provided
    
    console.log(`[VALIDATION] ${timestamp} | User: ${user} | Type: ${inputType} | Valid: ${isValid} | Input: ${input.substring(0, 50)}${input.length > 50 ? '...' : ''}`);
    
    // In a real application, you might want to send this to a server or store it
    if (!isValid && checkForDangerousContent(input)) {
        console.warn(`[SECURITY] Potentially dangerous input detected from user ${user}`);
        // You could trigger additional security measures here
    }
}

// Apply validation to search input
function setupSearchValidation() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    // Store original handler
    const originalHandler = searchInput.oninput;
    
    // Replace with validated handler
    searchInput.oninput = function(event) {
        const input = event.target.value;
        
        // Validate search input
        const isValid = validateInput(input, 'search');
        
        // Log validation attempt
        logValidationAttempt(input, isValid, 'search');
        
        if (isValid || input === '') {
            // Safe input, proceed with original handler
            if (typeof originalHandler === 'function') {
                originalHandler.call(this, event);
            } else if (typeof handleSearchInput === 'function') {
                handleSearchInput(event);
            }
        } else if (checkForDangerousContent(input)) {
            // Potentially dangerous input
            event.target.value = sanitizeInput(input);
            showNotification('Invalid search input detected and sanitized', 'warning');
        }
    };
}

// Apply validation to comment/review submission
function setupReviewValidation() {
    // Monitor for dynamically added comment forms
    document.addEventListener('click', function(event) {
        // Check if this is a submit button for reviews/comments
        if (event.target.matches('.submit-comment, .submit-review')) {
            const form = event.target.closest('form');
            const commentInput = form ? form.querySelector('textarea, input[type="text"]') : null;
            
            if (commentInput) {
                const comment = commentInput.value;
                
                // Validate comment
                const isValid = validateInput(comment, 'comment');
                
                // Log validation attempt
                logValidationAttempt(comment, isValid, 'comment');
                
                if (!isValid) {
                    // Prevent form submission
                    event.preventDefault();
                    
                    // Show notification
                    showNotification('Please enter a valid comment (1-1000 characters)', 'error');
                    return false;
                }
                
                // Sanitize comment before submission
                commentInput.value = sanitizeInput(comment);
            }
        }
    });
}

// Sanitize and validate emoji ratings
function setupEmojiValidation() {
    document.addEventListener('click', function(event) {
        // Check if this is a submit button for emoji ratings
        if (event.target.matches('.submit-rating')) {
            const emojiPicker = event.target.closest('.emoji-picker');
            const selectedEmoji = emojiPicker ? emojiPicker.querySelector('.emoji.selected') : null;
            
            if (selectedEmoji) {
                const emojiValue = selectedEmoji.dataset.emoji;
                const validEmojis = ['😍', '😊', '😐', '😕', '😠'];
                
                // Validate emoji
                const isValid = validEmojis.includes(emojiValue);
                
                // Log validation attempt
                logValidationAttempt(emojiValue, isValid, 'emoji');
                
                if (!isValid) {
                    // Prevent submission
                    event.preventDefault();
                    
                    // Show notification
                    showNotification('Please select a valid emoji rating', 'error');
                    return false;
                }
            }
        }
    });
}

// Safe way to display product information
function renderProductSafely(product) {
    // Create product card with sanitized content
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.dataset.productId = sanitizeInput(product.id);
    
    // Use sanitized values for all text content
    productCard.innerHTML = `
        <img src="${sanitizeInput(product.image)}" alt="${sanitizeInput(product.name)}" class="product-image">
        <h3 class="product-name">${sanitizeInput(product.name)}</h3>
        <p class="product-description">${sanitizeInput(product.description)}</p>
        <button class="rate-button">Rate This Product</button>
        <div class="emoji-picker" style="display: none;">
            <div class="emoji-options">
                <span class="emoji" data-emoji="😍">😍</span>
                <span class="emoji" data-emoji="😊">😊</span>
                <span class="emoji" data-emoji="😐">😐</span>
                <span class="emoji" data-emoji="😕">😕</span>
                <span class="emoji" data-emoji="😠">😠</span>
            </div>
            <div class="mood-phrase"></div>
            <button class="submit-rating" style="display: none;">Submit Rating</button>
        </div>
    `;
    
    return productCard;
}

// Safe way to display review content
function renderReviewSafely(review) {
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    
    // Use sanitized values for all text content
    reviewItem.innerHTML = `
        <span class="review-emoji">${sanitizeInput(review.emoji)}</span>
        <span class="review-date">${sanitizeInput(review.date)}</span>
        <span class="review-user">${sanitizeInput(review.user)}</span>
        ${review.comment ? `<div class="review-comment">"${sanitizeInput(review.comment)}"</div>` : ''}
    `;
    
    return reviewItem;
}

// Modified function to safely render highlighted search results
function highlightTextSafely(element, query) {
    if (!element) return;
    
    const text = element.textContent;
    const sanitizedQuery = sanitizeInput(query);
    const lowerText = text.toLowerCase();
    const lowerQuery = sanitizedQuery.toLowerCase();
    
    let startIndex = 0;
    let result = '';
    
    // Find all occurrences of the query
    while (startIndex < text.length) {
        const index = lowerText.indexOf(lowerQuery, startIndex);
        if (index === -1) {
            // No more matches, add the rest of the text
            result += sanitizeInput(text.substring(startIndex));
            break;
        }
        
        // Add text before match
        result += sanitizeInput(text.substring(startIndex, index));
        
        // Add highlighted match
        result += `<span class="highlight">${sanitizeInput(text.substring(index, index + sanitizedQuery.length))}</span>`;
        
        // Update start index
        startIndex = index + sanitizedQuery.length;
    }
    
    // Update element HTML safely
    safelyRenderHTML(element, result);
}

// Initialize all input validation
function initInputValidation() {
    console.log(`[SECURITY] Initializing input validation and sanitization | ${new Date().toISOString()} | User: BeingSeight`);
    
    // Setup validation for various inputs
    setupSearchValidation();
    setupReviewValidation();
    setupEmojiValidation();
    
    // Monitor for dynamically added elements
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                // Check if new search inputs were added
                if (document.querySelector('.search-input:not(.validated)')) {
                    setupSearchValidation();
                    document.querySelectorAll('.search-input').forEach(input => {
                        input.classList.add('validated');
                    });
                }
            }
        });
    });
    
    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Log initialization with metadata
    const metadata = document.getElementById('metadata');
    if (metadata) {
        metadata.innerHTML = `
            Last accessed: 2025-05-30 14:35:39 | User: BeingSeight | 
            <span class="security-badge">Security: Enhanced ✓</span>
        `;
    }
}

// Add event listener for comments with validation
function addCommentFormWithValidation(productId) {
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (!productCard) return;
    
    // Check if reviews container exists
    let reviewsContainer = productCard.querySelector('.reviews-container');
    if (!reviewsContainer) {
        // Create reviews container if it doesn't exist
        const reviewsSection = document.createElement('div');
        reviewsSection.className = 'reviews-section';
        
        const reviewsTitle = document.createElement('h4');
        reviewsTitle.className = 'reviews-title';
        reviewsTitle.textContent = 'Customer Reviews';
        
        reviewsContainer = document.createElement('div');
        reviewsContainer.className = 'reviews-container';
        
        reviewsSection.appendChild(reviewsTitle);
        reviewsSection.appendChild(reviewsContainer);
        productCard.appendChild(reviewsSection);
    }
    
    // Create comment form if it doesn't exist
    if (!reviewsContainer.querySelector('.comment-form')) {
        const commentForm = document.createElement('form');
        commentForm.className = 'comment-form';
        commentForm.innerHTML = `
            <h5>Add Your Comment</h5>
            <textarea class="comment-input" placeholder="Share your thoughts about this product..." maxlength="1000" required></textarea>
            <div class="comment-validation-message"></div>
            <button type="submit" class="submit-comment">Submit Comment</button>
            <div class="form-metadata">Time: 2025-05-30 14:35:39 | User: BeingSeight</div>
        `;
        
        // Add validation and submission handling
        commentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const commentInput = this.querySelector('.comment-input');
            const comment = commentInput.value;
            const validationMessage = this.querySelector('.comment-validation-message');
            
            // Validate comment
            const isValid = validateInput(comment, 'comment');
            
            // Log validation attempt
            logValidationAttempt(comment, isValid, 'comment');
            
            if (isValid) {
                // Clear validation message
                validationMessage.textContent = '';
                
                // Show loading animation
                showSpinner('Submitting comment...');
                
                // Simulate submitting comment
                setTimeout(() => {
                    // Sanitize comment
                    const sanitizedComment = sanitizeInput(comment);
                    
                    // Create new review object
                    const newReview = {
                        id: `review-${productId}-${Date.now()}`,
                        emoji: USER_PREFERENCES?.preferredEmoji || '😊',
                        date: '2025-05-30',
                        user: 'BeingSeight',
                        comment: sanitizedComment
                    };
                    
                    // Render the review safely
                    const reviewItem = renderReviewSafely(newReview);
                    
                    // Add to the top of the reviews list
                    const reviewsList = reviewsContainer.querySelector('.review-items') || 
                                        reviewsContainer.appendChild(document.createElement('div'));
                    reviewsList.className = 'review-items';
                    
                    if (reviewsList.firstChild) {
                        reviewsList.insertBefore(reviewItem, reviewsList.firstChild);
                    } else {
                        reviewsList.appendChild(reviewItem);
                    }
                    
                    // Clear input
                    commentInput.value = '';
                    
                    // Hide spinner
                    hideSpinner();
                    
                    // Show success notification
                    showNotification('Your comment has been added successfully!');
                }, 1000);
            } else {
                // Show validation error
                validationMessage.textContent = 'Please enter a valid comment (1-1000 characters)';
                validationMessage.style.color = 'red';
            }
        });
        
        // Add live validation as user types
        const commentInput = commentForm.querySelector('.comment-input');
        commentInput.addEventListener('input', function() {
            const validationMessage = commentForm.querySelector('.comment-validation-message');
            const comment = this.value;
            
            // Check for potentially dangerous content
            if (checkForDangerousContent(comment)) {
                validationMessage.textContent = 'Invalid characters detected. Please remove HTML/script tags.';
                validationMessage.style.color = 'red';
            } else if (comment.length > 0 && comment.length <= 1000) {
                validationMessage.textContent = `${comment.length}/1000 characters`;
                validationMessage.style.color = 'green';
            } else if (comment.length > 1000) {
                validationMessage.textContent = `Comment too long: ${comment.length}/1000 characters`;
                validationMessage.style.color = 'red';
            } else {
                validationMessage.textContent = '';
            }
        });
        
        reviewsContainer.appendChild(commentForm);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize input validation after a short delay
    setTimeout(initInputValidation, 600);
    
    // Add comment form with validation to first visible product as example
    setTimeout(() => {
        const firstProductId = document.querySelector('.product-card')?.dataset.productId;
        if (firstProductId) {
            addCommentFormWithValidation(firstProductId);
        }
    }, 1000);
});
// Keyboard Accessibility for Emoji Picker
// Implementation date: 2025-05-30 14:37:26
// Implementation by: BeingSeight

// Add keyboard navigation to emoji picker
function setupEmojiPickerKeyboardNavigation() {
    // Add necessary ARIA attributes to all emoji pickers
    document.querySelectorAll('.emoji-picker').forEach(picker => {
        // Skip if already initialized
        if (picker.dataset.keyboardAccessible === 'true') return;
        
        // Mark as keyboard accessible
        picker.dataset.keyboardAccessible = 'true';
        
        // Add ARIA attributes
        picker.setAttribute('role', 'dialog');
        picker.setAttribute('aria-label', 'Emoji Reaction Picker');
        
        // Make container focusable
        const emojiOptions = picker.querySelector('.emoji-options');
        if (emojiOptions) {
            emojiOptions.setAttribute('role', 'listbox');
            emojiOptions.setAttribute('aria-orientation', 'horizontal');
            emojiOptions.setAttribute('tabindex', '0');
            
            // Add keyboard event listeners
            emojiOptions.addEventListener('keydown', handleEmojiKeyDown);
            
            // Add individual emoji ARIA attributes
            const emojis = emojiOptions.querySelectorAll('.emoji');
            emojis.forEach((emoji, index) => {
                emoji.setAttribute('role', 'option');
                emoji.setAttribute('tabindex', '-1');
                emoji.setAttribute('aria-selected', 'false');
                emoji.dataset.index = index.toString();
                
                // Add descriptions for screen readers
                const emojiValue = emoji.dataset.emoji;
                const descriptions = {
                    '😍': 'Love it',
                    '😊': 'Like it',
                    '😐': 'Neutral',
                    '😕': 'Dislike it',
                    '😠': 'Hate it'
                };
                
                emoji.setAttribute('aria-label', `${descriptions[emojiValue] || emojiValue} emoji`);
            });
        }
        
        // Make submit button accessible
        const submitButton = picker.querySelector('.submit-rating');
        if (submitButton) {
            submitButton.setAttribute('tabindex', '0');
            submitButton.setAttribute('role', 'button');
            submitButton.setAttribute('aria-label', 'Submit emoji rating');
        }
        
        // Add accessibility metadata
        const metadataSpan = document.createElement('span');
        metadataSpan.className = 'accessibility-metadata';
        metadataSpan.textContent = `Accessibility enabled: 2025-05-30 14:37:26 | User: BeingSeight`;
        metadataSpan.style.display = 'none'; // Hidden but available for screen readers
        metadataSpan.setAttribute('aria-hidden', 'true');
        picker.appendChild(metadataSpan);
    });
    
    // Add global event listener to handle opening emoji picker with keyboard
    document.addEventListener('keydown', function(event) {
        if (event.target.classList.contains('rate-button') && 
            (event.key === 'Enter' || event.key === ' ')) {
            // Prevent default space/enter action
            event.preventDefault();
            
            // Trigger click on rate button
            event.target.click();
            
            // Focus the emoji options after a short delay
            setTimeout(() => {
                const emojiOptions = event.target.closest('.product-card')
                    .querySelector('.emoji-options');
                
                if (emojiOptions) {
                    emojiOptions.focus();
                    
                    // Set first emoji as visually focused
                    const firstEmoji = emojiOptions.querySelector('.emoji');
                    if (firstEmoji) {
                        setEmojiVisualFocus(firstEmoji);
                    }
                }
            }, 50);
        }
    });
    
    // Add styles for keyboard focus indicators
    addEmojiKeyboardStyles();
    
    console.log(`[ACCESSIBILITY] Emoji picker keyboard navigation initialized | 2025-05-30 14:37:26 | User: BeingSeight`);
}

// Handle keyboard navigation within emoji picker
function handleEmojiKeyDown(event) {
    const emojiOptions = event.currentTarget;
    const emojis = Array.from(emojiOptions.querySelectorAll('.emoji'));
    const currentFocusedEmoji = emojiOptions.querySelector('.emoji.keyboard-focused') || emojis[0];
    const currentIndex = currentFocusedEmoji ? parseInt(currentFocusedEmoji.dataset.index) : 0;
    
    // Get the submit button
    const picker = emojiOptions.closest('.emoji-picker');
    const submitButton = picker ? picker.querySelector('.submit-rating') : null;
    
    switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
            event.preventDefault();
            
            // Move focus to next emoji
            const nextIndex = (currentIndex + 1) % emojis.length;
            setEmojiVisualFocus(emojis[nextIndex]);
            break;
            
        case 'ArrowLeft':
        case 'ArrowUp':
            event.preventDefault();
            
            // Move focus to previous emoji
            const prevIndex = (currentIndex - 1 + emojis.length) % emojis.length;
            setEmojiVisualFocus(emojis[prevIndex]);
            break;
            
        case 'Home':
            event.preventDefault();
            
            // Move focus to first emoji
            setEmojiVisualFocus(emojis[0]);
            break;
            
        case 'End':
            event.preventDefault();
            
            // Move focus to last emoji
            setEmojiVisualFocus(emojis[emojis.length - 1]);
            break;
            
        case ' ':
        case 'Enter':
            event.preventDefault();
            
            // Select the focused emoji
            if (currentFocusedEmoji) {
                // Simulate click on the emoji
                selectEmoji(currentFocusedEmoji);
                
                // Show and focus submit button
                if (submitButton) {
                    submitButton.style.display = 'block';
                    submitButton.focus();
                }
            }
            break;
            
        case 'Escape':
            event.preventDefault();
            
            // Close emoji picker
            closeEmojiPicker(emojiOptions);
            break;
            
        case 'Tab':
            // Allow natural tab navigation
            // If shift+tab, we let the browser handle it
            if (!event.shiftKey && submitButton) {
                // If submit button is visible, let tab navigate to it
                if (submitButton.style.display === 'block') {
                    // Let default tab behavior work
                } else {
                    // If submit button is not visible, we want to prevent tabbing out
                    event.preventDefault();
                    
                    // Instead, select the focused emoji
                    if (currentFocusedEmoji) {
                        selectEmoji(currentFocusedEmoji);
                        
                        // Show and focus submit button
                        submitButton.style.display = 'block';
                        submitButton.focus();
                    }
                }
            }
            break;
    }
    
    // Log keyboard navigation for monitoring
    console.log(`[KEYBOARD NAV] Key: ${event.key} | Time: 2025-05-30 14:37:26 | User: BeingSeight`);
}

// Set visual focus on an emoji
function setEmojiVisualFocus(emoji) {
    if (!emoji) return;
    
    // Remove focus from all emojis
    document.querySelectorAll('.emoji.keyboard-focused').forEach(el => {
        el.classList.remove('keyboard-focused');
        el.setAttribute('aria-selected', 'false');
    });
    
    // Add focus to target emoji
    emoji.classList.add('keyboard-focused');
    emoji.setAttribute('aria-selected', 'true');
    
    // Announce to screen readers
    announceToScreenReader(`Focused on ${emoji.getAttribute('aria-label')}`);
    
    // Update mood phrase if it exists
    const picker = emoji.closest('.emoji-picker');
    if (picker) {
        const moodPhrase = picker.querySelector('.mood-phrase');
        if (moodPhrase) {
            const emojiValue = emoji.dataset.emoji;
            const phrases = {
                '😍': 'Love it!',
                '😊': 'Like it',
                '😐': 'It\'s okay',
                '😕': 'Dislike it',
                '😠': 'Hate it'
            };
            moodPhrase.textContent = phrases[emojiValue] || '';
        }
    }
}

// Select an emoji
function selectEmoji(emoji) {
    if (!emoji) return;
    
    // Remove selection from all emojis
    const picker = emoji.closest('.emoji-picker');
    picker.querySelectorAll('.emoji').forEach(el => {
        el.classList.remove('selected');
        el.setAttribute('aria-selected', 'false');
    });
    
    // Select this emoji
    emoji.classList.add('selected');
    emoji.setAttribute('aria-selected', 'true');
    
    // Show submit button
    const submitButton = picker.querySelector('.submit-rating');
    if (submitButton) {
        submitButton.style.display = 'block';
    }
    
    // Announce to screen readers
    announceToScreenReader(`Selected ${emoji.getAttribute('aria-label')}`);
    
    // Log selection
    console.log(`[EMOJI SELECTED] ${emoji.dataset.emoji} | Time: 2025-05-30 14:37:26 | User: BeingSeight`);
}

// Close emoji picker and focus back on rate button
function closeEmojiPicker(emojiOptions) {
    const picker = emojiOptions.closest('.emoji-picker');
    const productCard = picker.closest('.product-card');
    
    // Hide emoji picker
    picker.style.display = 'none';
    
    // Show rate button
    const rateButton = productCard.querySelector('.rate-button');
    if (rateButton) {
        rateButton.style.display = 'block';
        rateButton.focus();
    }
    
    // Announce to screen readers
    announceToScreenReader('Emoji picker closed');
}

// Announce messages to screen readers
function announceToScreenReader(message) {
    // Check if we already have an announcer
    let announcer = document.getElementById('screen-reader-announcer');
    
    if (!announcer) {
        // Create a visually hidden announcer element
        announcer = document.createElement('div');
        announcer.id = 'screen-reader-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
        
        // Style it to be invisible but available to screen readers
        announcer.style.position = 'absolute';
        announcer.style.width = '1px';
        announcer.style.height = '1px';
        announcer.style.padding = '0';
        announcer.style.margin = '-1px';
        announcer.style.overflow = 'hidden';
        announcer.style.clip = 'rect(0, 0, 0, 0)';
        announcer.style.border = '0';
    }
    
    // Set the message and clear it after a short delay
    announcer.textContent = message;
    
    // Clear after 3 seconds
    setTimeout(() => {
        announcer.textContent = '';
    }, 3000);
}

// Add CSS styles for keyboard navigation
function addEmojiKeyboardStyles() {
    // Check if styles already exist
    if (document.getElementById('emoji-keyboard-styles')) return;
    
    // Create style element
    const styleElement = document.createElement('style');
    styleElement.id = 'emoji-keyboard-styles';
    styleElement.textContent = `
        /* Keyboard focus styles */
        .emoji.keyboard-focused {
            outline: 2px solid #4CAF50;
            outline-offset: 2px;
            box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
            position: relative;
        }
        
        /* Add a top indicator arrow for screen reader users who can see */
        .emoji.keyboard-focused::after {
            content: '▼';
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            color: #4CAF50;
            font-size: 12px;
        }
        
        /* Make emoji container have visible focus */
        .emoji-options:focus {
            outline: 2px solid #4CAF50;
            outline-offset: 2px;
            box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
        }
        
        /* Help text for keyboard users */
        .emoji-picker::before {
            content: 'Use arrow keys to navigate, Enter to select, Esc to close';
            display: block;
            font-size: 12px;
            color: #666;
            margin-bottom: 8px;
            font-style: italic;
        }
        
        /* For screen readers only */
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
        }
        
        /* Dark theme support */
        body.dark-theme .emoji.keyboard-focused {
            outline-color: #81C784;
            box-shadow: 0 0 5px rgba(129, 199, 132, 0.5);
        }
        
        body.dark-theme .emoji.keyboard-focused::after {
            color: #81C784;
        }
        
        body.dark-theme .emoji-options:focus {
            outline-color: #81C784;
            box-shadow: 0 0 5px rgba(129, 199, 132, 0.5);
        }
        
        body.dark-theme .emoji-picker::before {
            color: #aaa;
        }
    `;
    
    // Add to document head
    document.head.appendChild(styleElement);
}

// Enhance existing emoji picker setup function
function enhanceEmojiPickerWithKeyboardAccess() {
    // Store original function
    const originalSetupEmojiPicker = window.setupEmojiPicker;
    
    // Replace with enhanced version
    window.setupEmojiPicker = function() {
        // Call original function first
        if (typeof originalSetupEmojiPicker === 'function') {
            originalSetupEmojiPicker();
        }
        
        // Add keyboard accessibility
        setupEmojiPickerKeyboardNavigation();
        
        // Add help text about keyboard shortcuts
        const helpText = document.createElement('div');
        helpText.className = 'accessibility-help';
        helpText.innerHTML = `
            <p><strong>Keyboard shortcuts:</strong></p>
            <ul>
                <li>Arrow keys: Navigate between emojis</li>
                <li>Enter/Space: Select focused emoji</li>
                <li>Escape: Close emoji picker</li>
                <li>Tab: Move to submit button</li>
            </ul>
            <p class="metadata">Updated: 2025-05-30 14:37:26 | User: BeingSeight</p>
        `;
        
        // Add help text to document (hidden, toggled via button)
        if (!document.querySelector('.accessibility-help')) {
            helpText.style.display = 'none';
            document.body.appendChild(helpText);
            
            // Add help button
            const helpButton = document.createElement('button');
            helpButton.className = 'accessibility-help-toggle';
            helpButton.textContent = 'Keyboard Help';
            helpButton.setAttribute('aria-label', 'Toggle keyboard shortcuts help');
            helpButton.addEventListener('click', function() {
                helpText.style.display = helpText.style.display === 'none' ? 'block' : 'none';
            });
            
            // Style the help button
            helpButton.style.position = 'fixed';
            helpButton.style.bottom = '20px';
            helpButton.style.left = '20px';
            helpButton.style.padding = '10px';
            helpButton.style.background = '#4CAF50';
            helpButton.style.color = 'white';
            helpButton.style.border = 'none';
            helpButton.style.borderRadius = '4px';
            helpButton.style.cursor = 'pointer';
            helpButton.style.zIndex = '999';
            
            document.body.appendChild(helpButton);
        }
    };
    
    // If emoji pickers already exist, enhance them now
    if (document.querySelectorAll('.emoji-picker').length > 0) {
        setupEmojiPickerKeyboardNavigation();
    }
}

// Setup keyboard event handlers for submit button
function setupSubmitButtonKeyboardAccess() {
    // Use event delegation for dynamically added submit buttons
    document.addEventListener('keydown', function(event) {
        if (event.target.classList.contains('submit-rating') && 
            (event.key === 'Enter' || event.key === ' ')) {
            // Prevent default space action
            event.preventDefault();
            
            // Trigger click on submit button
            event.target.click();
            
            // Find the rate button to focus after submission
            const productCard = event.target.closest('.product-card');
            setTimeout(() => {
                const rateButton = productCard.querySelector('.rate-button');
                if (rateButton && rateButton.style.display === 'block') {
                    rateButton.focus();
                }
            }, 50);
        }
        
        // Handle escape key on submit button
        if (event.target.classList.contains('submit-rating') && event.key === 'Escape') {
            event.preventDefault();
            
            // Close emoji picker
            const picker = event.target.closest('.emoji-picker');
            const emojiOptions = picker.querySelector('.emoji-options');
            closeEmojiPicker(emojiOptions);
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Enhance emoji picker with keyboard accessibility
    enhanceEmojiPickerWithKeyboardAccess();
    
    // Setup submit button keyboard access
    setupSubmitButtonKeyboardAccess();
    
    // Update metadata
    if (document.getElementById('metadata')) {
        document.getElementById('metadata').innerHTML = 
            `Last accessed: 2025-05-30 14:37:26 | User: BeingSeight | 
            <span class="accessibility-badge">♿ Accessibility: Enhanced</span>`;
    }
});



// Add CSS styles for rating management
function addRatingManagementStyles() {
    if (document.getElementById('rating-management-styles')) return;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'rating-management-styles';
    styleElement.textContent = `
        /* Rating management styles */
        .rating-controls {
            display: flex;
            gap: 8px;
            margin-top: 5px;
        }
        
        .edit-rating-btn,
        .delete-rating-btn {
            font-size: 12px;
            padding: 3px 8px;
            background-color: transparent;
            border: 1px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s ease;
            color: #666;
        }
        
        .edit-rating-btn:hover {
            background-color: #f0f8ff;
            border-color: #4CAF50;
            color: #4CAF50;
        }
        
        .delete-rating-btn:hover {
            background-color: #fff0f0;
            border-color: #f44336;
            color: #f44336;
        }
        
        body.dark-theme .edit-rating-btn,
        body.dark-theme .delete-rating-btn {
            border-color: #555;
            color: #aaa;
        }
        
        body.dark-theme .edit-rating-btn:hover {
            background-color: rgba(76, 175, 80, 0.1);
            border-color: #4CAF50;
            color: #81C784;
        }
        
        body.dark-theme .delete-rating-btn:hover {
            background-color: rgba(244, 67, 54, 0.1);
            border-color: #f44336;
            color: #E57373;
        }
        
        .user-rating {
            border-left: 3px solid #4CAF50;
            padding-left: 8px;
            background-color: rgba(76, 175, 80, 0.05);
        }
        
        body.dark-theme .user-rating {
            background-color: rgba(76, 175, 80, 0.1);
        }
        
        .edit-mode .emoji-picker {
            margin-top: 10px;
            padding: 10px;
            border: 1px dashed #4CAF50;
            border-radius: 8px;
        }
        
        body.dark-theme .edit-mode .emoji-picker {
            border-color: #81C784;
        }
        
        .edit-rating-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #4CAF50;
        }
        
        body.dark-theme .edit-rating-title {
            color: #81C784;
        }
        
        .rating-action-log {
            font-size: 10px;
            color: #999;
            font-style: italic;
            margin-top: 5px;
        }
        
        .rating-metadata {
            font-size: 10px;
            color: #999;
            text-align: right;
            margin-top: 5px;
        }
        
        .confirm-delete {
            padding: 10px;
            background-color: #fff0f0;
            border: 1px solid #ffcdd2;
            border-radius: 8px;
            margin-top: 10px;
        }
        
        body.dark-theme .confirm-delete {
            background-color: rgba(244, 67, 54, 0.1);
            border-color: #f44336;
        }
        
        .confirm-delete-title {
            color: #f44336;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .confirm-delete-btns {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
        
        .confirm-yes {
            background-color: #f44336;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .confirm-no {
            background-color: #9e9e9e;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .history-item.deleted {
            opacity: 0.5;
            text-decoration: line-through;
        }
        
        .history-item.edited::after {
            content: '(edited)';
            font-size: 10px;
            color: #4CAF50;
            margin-left: 5px;
        }
        
        body.dark-theme .history-item.edited::after {
            color: #81C784;
        }
        
        /* Animation for deletion */
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .deleting {
            animation: fadeOut 0.5s forwards;
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Get ratings for a product
function getProductRatings(productId) {
    const ratings = JSON.parse(localStorage.getItem('productRatings') || '{}');
    return ratings[productId] || { 
        emojiCounts: { "😍": 0, "😊": 0, "😐": 0, "😕": 0, "😠": 0 },
        ratingHistory: []
    };
}

// Save ratings for a product
function saveProductRatings(productId, ratingsData) {
    let ratings = JSON.parse(localStorage.getItem('productRatings') || '{}');
    ratings[productId] = ratingsData;
    localStorage.setItem('productRatings', JSON.stringify(ratings));
    console.log(`[RATINGS] Updated ratings for product ${productId} at ${CURRENT_TIMESTAMP}`);
}

// Find a user's rating in the history
function findUserRating(productId, username = CURRENT_USER) {
    const productRatings = getProductRatings(productId);
    return productRatings.ratingHistory.find(rating => rating.user === username && !rating.deleted);
}

// Check if the user has already rated a product
function hasUserRated(productId, username = CURRENT_USER) {
    return !!findUserRating(productId, username);
}

// Add edit and delete controls to a rating
function addRatingControls(ratingElement, productId, ratingData) {
    // Check if controls already exist
    if (ratingElement.querySelector('.rating-controls')) return;
    
    // Only add controls for the current user's ratings
    if (ratingData.user !== CURRENT_USER) return;
    
    // Add user rating class
    ratingElement.classList.add('user-rating');
    
    // Create controls container
    const controls = document.createElement('div');
    controls.className = 'rating-controls';
    
    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-rating-btn';
    editBtn.innerHTML = '✏️ Edit';
    editBtn.addEventListener('click', () => editRating(productId, ratingData, ratingElement));
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-rating-btn';
    deleteBtn.innerHTML = '🗑️ Delete';
    deleteBtn.addEventListener('click', () => confirmDeleteRating(productId, ratingData, ratingElement));
    
    // Add buttons to controls
    controls.appendChild(editBtn);
    controls.appendChild(deleteBtn);
    
    // Add controls to rating element
    ratingElement.appendChild(controls);
}

// Edit a rating
function editRating(productId, ratingData, ratingElement) {
    // Add edit mode class to container
    const container = ratingElement.closest('.history-item') || ratingElement;
    container.classList.add('edit-mode');
    
    // Hide rating controls during edit
    const controls = container.querySelector('.rating-controls');
    if (controls) controls.style.display = 'none';
    
    // Create edit form
    const editForm = document.createElement('div');
    editForm.className = 'edit-rating-form';
    editForm.innerHTML = `
        <div class="edit-rating-title">Change your rating</div>
        <div class="emoji-picker">
            <div class="emoji-options" role="listbox" aria-orientation="horizontal" tabindex="0">
                <span class="emoji ${ratingData.emoji === '😍' ? 'selected' : ''}" data-emoji="😍" role="option" aria-selected="${ratingData.emoji === '😍'}" tabindex="-1" data-index="0">😍</span>
                <span class="emoji ${ratingData.emoji === '😊' ? 'selected' : ''}" data-emoji="😊" role="option" aria-selected="${ratingData.emoji === '😊'}" tabindex="-1" data-index="1">😊</span>
                <span class="emoji ${ratingData.emoji === '😐' ? 'selected' : ''}" data-emoji="😐" role="option" aria-selected="${ratingData.emoji === '😐'}" tabindex="-1" data-index="2">😐</span>
                <span class="emoji ${ratingData.emoji === '😕' ? 'selected' : ''}" data-emoji="😕" role="option" aria-selected="${ratingData.emoji === '😕'}" tabindex="-1" data-index="3">😕</span>
                <span class="emoji ${ratingData.emoji === '😠' ? 'selected' : ''}" data-emoji="😠" role="option" aria-selected="${ratingData.emoji === '😠'}" tabindex="-1" data-index="4">😠</span>
            </div>
            <div class="mood-phrase"></div>
            <div class="edit-rating-buttons">
                <button class="save-edit-btn">Save Changes</button>
                <button class="cancel-edit-btn">Cancel</button>
            </div>
            <div class="rating-metadata">Editing rating from ${ratingData.timestamp} | User: ${CURRENT_USER}</div>
        </div>
    `;
    
    // Add edit form to container
    container.appendChild(editForm);
    
    // Update mood phrase based on selected emoji
    const moodPhrase = editForm.querySelector('.mood-phrase');
    const selectedEmoji = editForm.querySelector('.emoji.selected');
    updateMoodPhrase(selectedEmoji, moodPhrase);
    
    // Add click handlers for emojis
    editForm.querySelectorAll('.emoji').forEach(emoji => {
        emoji.addEventListener('click', function() {
            editForm.querySelectorAll('.emoji').forEach(e => {
                e.classList.remove('selected');
                e.setAttribute('aria-selected', 'false');
            });
            this.classList.add('selected');
            this.setAttribute('aria-selected', 'true');
            updateMoodPhrase(this, moodPhrase);
        });
    });
    
    // Add keyboard navigation for accessibility
    editForm.querySelector('.emoji-options').addEventListener('keydown', handleEmojiKeyDown);
    
    // Add click handler for save button
    editForm.querySelector('.save-edit-btn').addEventListener('click', function() {
        const newEmoji = editForm.querySelector('.emoji.selected').dataset.emoji;
        saveEditedRating(productId, ratingData, newEmoji, container);
    });
    
    // Add click handler for cancel button
    editForm.querySelector('.cancel-edit-btn').addEventListener('click', function() {
        cancelEdit(container);
    });
}

// Update mood phrase based on selected emoji
function updateMoodPhrase(emojiElement, phraseElement) {
    if (!emojiElement || !phraseElement) return;
    
    const emoji = emojiElement.dataset.emoji;
    const phrases = {
        '😍': 'Love it!',
        '😊': 'Like it',
        '😐': 'It\'s okay',
        '😕': 'Dislike it',
        '😠': 'Hate it'
    };
    
    phraseElement.textContent = phrases[emoji] || '';
}

// Save an edited rating
function saveEditedRating(productId, ratingData, newEmoji, container) {
    // Show spinner
    showSpinner('Saving your changes...');
    
    // Simulate delay for better UX
    setTimeout(() => {
        try {
            // Get existing ratings
            const productRatings = getProductRatings(productId);
            
            // Find the rating in history
            const ratingIndex = productRatings.ratingHistory.findIndex(
                r => r.timestamp === ratingData.timestamp && r.user === ratingData.user
            );
            
            if (ratingIndex !== -1) {
                // If emoji is different, update counts
                if (ratingData.emoji !== newEmoji) {
                    // Decrement old emoji count
                    productRatings.emojiCounts[ratingData.emoji]--;
                    
                    // Increment new emoji count
                    productRatings.emojiCounts[newEmoji] = (productRatings.emojiCounts[newEmoji] || 0) + 1;
                    
                    // Update the emoji in history
                    productRatings.ratingHistory[ratingIndex].previousEmoji = ratingData.emoji;
                    productRatings.ratingHistory[ratingIndex].emoji = newEmoji;
                    productRatings.ratingHistory[ratingIndex].edited = true;
                    productRatings.ratingHistory[ratingIndex].editTimestamp = CURRENT_TIMESTAMP;
                    
                    // Save the updated ratings
                    saveProductRatings(productId, productRatings);
                    
                    // Update chart if available
                    if (typeof updateProductChart === 'function') {
                        updateProductChart(productId);
                    }
                }
                
                // Clean up edit UI
                container.classList.remove('edit-mode');
                const editForm = container.querySelector('.edit-rating-form');
                if (editForm) editForm.remove();
                
                // Show controls again
                const controls = container.querySelector('.rating-controls');
                if (controls) controls.style.display = 'flex';
                
                // Update the displayed emoji
                const emojiElement = container.querySelector('.history-emoji, .last-rated-emoji');
                if (emojiElement) emojiElement.textContent = newEmoji;
                
                // Add edited indicator
                container.classList.add('edited');
                
                // Add edit log
                const logElement = document.createElement('div');
                logElement.className = 'rating-action-log';
                logElement.textContent = `Edited ${getRelativeTimeString(CURRENT_TIMESTAMP)} (changed from ${ratingData.emoji} to ${newEmoji})`;
                container.appendChild(logElement);
                
                // Show notification
                showNotification('Your rating has been updated successfully!');
                
                // Update rating history if displayed
                refreshRatingHistory(productId);
            } else {
                throw new Error('Rating not found');
            }
        } catch (error) {
            console.error('Error saving edited rating:', error);
            showNotification('Error updating your rating. Please try again.', 'error');
        } finally {
            hideSpinner();
        }
    }, 1000);
}

// Cancel rating edit
function cancelEdit(container) {
    container.classList.remove('edit-mode');
    const editForm = container.querySelector('.edit-rating-form');
    if (editForm) editForm.remove();
    
    // Show controls again
    const controls = container.querySelector('.rating-controls');
    if (controls) controls.style.display = 'flex';
}

// Confirm rating deletion
function confirmDeleteRating(productId, ratingData, ratingElement) {
    // Create confirmation dialog
    const confirmDialog = document.createElement('div');
    confirmDialog.className = 'confirm-delete';
    confirmDialog.innerHTML = `
        <div class="confirm-delete-title">Delete Rating?</div>
        <p>Are you sure you want to delete your ${ratingData.emoji} rating? This action cannot be undone.</p>
        <div class="confirm-delete-btns">
            <button class="confirm-yes">Yes, Delete</button>
            <button class="confirm-no">Cancel</button>
        </div>
        <div class="rating-metadata">Time: ${CURRENT_TIMESTAMP} | User: ${CURRENT_USER}</div>
    `;
    
    // Add dialog to container
    const container = ratingElement.closest('.history-item') || ratingElement;
    container.appendChild(confirmDialog);
    
    // Hide rating controls during confirmation
    const controls = container.querySelector('.rating-controls');
    if (controls) controls.style.display = 'none';
    
    // Add click handler for yes button
    confirmDialog.querySelector('.confirm-yes').addEventListener('click', function() {
        deleteRating(productId, ratingData, container);
    });
    
    // Add click handler for no button
    confirmDialog.querySelector('.confirm-no').addEventListener('click', function() {
        confirmDialog.remove();
        // Show controls again
        if (controls) controls.style.display = 'flex';
    });
}

// Delete a rating
function deleteRating(productId, ratingData, container) {
    // Show spinner
    showSpinner('Deleting your rating...');
    
    // Add deleting animation
    container.classList.add('deleting');
    
    // Simulate delay for better UX
    setTimeout(() => {
        try {
            // Get existing ratings
            const productRatings = getProductRatings(productId);
            
            // Find the rating in history
            const ratingIndex = productRatings.ratingHistory.findIndex(
                r => r.timestamp === ratingData.timestamp && r.user === ratingData.user
            );
            
            if (ratingIndex !== -1) {
                // Decrement emoji count
                productRatings.emojiCounts[ratingData.emoji]--;
                
                // Mark as deleted in history (we keep it for record keeping)
                productRatings.ratingHistory[ratingIndex].deleted = true;
                productRatings.ratingHistory[ratingIndex].deleteTimestamp = CURRENT_TIMESTAMP;
                
                // Save the updated ratings
                saveProductRatings(productId, productRatings);
                
                // Update chart if available
                if (typeof updateProductChart === 'function') {
                    updateProductChart(productId);
                }
                
                // Clean up UI
                if (container.closest('.last-rated')) {
                    // If this is the last rated indicator, remove it
                    container.closest('.last-rated').remove();
                } else if (container.classList.contains('history-item')) {
                    // In history view, mark as deleted but keep visible
                    container.classList.add('deleted');
                    container.classList.remove('deleting');
                    
                    // Remove controls
                    const controls = container.querySelector('.rating-controls');
                    if (controls) controls.remove();
                    
                    // Remove confirmation dialog
                    const confirmDialog = container.querySelector('.confirm-delete');
                    if (confirmDialog) confirmDialog.remove();
                    
                    // Add deletion log
                    const logElement = document.createElement('div');
                    logElement.className = 'rating-action-log';
                    logElement.textContent = `Deleted ${getRelativeTimeString(CURRENT_TIMESTAMP)}`;
                    container.appendChild(logElement);
                } else {
                    // Otherwise just remove the container
                    container.remove();
                }
                
                // Show notification
                showNotification('Your rating has been deleted successfully.');
                
                // Update rating history if displayed
                refreshRatingHistory(productId);
            } else {
                throw new Error('Rating not found');
            }
        } catch (error) {
            console.error('Error deleting rating:', error);
            showNotification('Error deleting your rating. Please try again.', 'error');
            
            // Remove deleting animation
            container.classList.remove('deleting');
        } finally {
            hideSpinner();
        }
    }, 1000);
}

// Refresh rating history display
function refreshRatingHistory(productId) {
    const historyContainer = document.querySelector(`.product-card[data-product-id="${productId}"] .rating-history-container`);
    if (historyContainer) {
        // Re-show the history
        showRatingHistory(productId);
    }
}

// Check if a particular element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Modified show rating history function to include edit/delete controls
function showRatingHistory(productId) {
    // Get ratings for this product
    const productRatings = getProductRatings(productId);
    
    // Get product name
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    const productName = productCard ? productCard.querySelector('.product-name').textContent : `Product ${productId}`;
    
    // Create rating history container if it doesn't exist
    let historyContainer = productCard.querySelector('.rating-history-container');
    
    if (!historyContainer) {
        historyContainer = document.createElement('div');
        historyContainer.className = 'rating-history-container';
        
        // Add title
        const historyTitle = document.createElement('h4');
        historyTitle.className = 'rating-history-title';
        historyTitle.textContent = `Rating History for "${productName}"`;
        
        historyContainer.appendChild(historyTitle);
        
        // Add to product card
        productCard.appendChild(historyContainer);
    } else {
        // If container exists, just update content
        historyContainer.innerHTML = `<h4 class="rating-history-title">Rating History for "${productName}"</h4>`;
    }
    
    // Show loading spinner
    const loadingItem = document.createElement('div');
    loadingItem.className = 'history-loading';
    loadingItem.innerHTML = '<span class="inline-spinner"></span> Loading rating history...';
    historyContainer.appendChild(loadingItem);
    
    // Store if container was in viewport
    const wasInViewport = isInViewport(historyContainer);
    
    // Simulate loading delay
    setTimeout(() => {
        // Remove loading indicator
        loadingItem.remove();
        
        // Add history items - show non-deleted ratings first, then deleted ones
        const activeRatings = productRatings.ratingHistory.filter(rating => !rating.deleted);
        const deletedRatings = productRatings.ratingHistory.filter(rating => rating.deleted);
        
        if (activeRatings.length > 0 || deletedRatings.length > 0) {
            // Add active ratings
            activeRatings.forEach(rating => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                if (rating.edited) historyItem.classList.add('edited');
                
                const relativeTime = getRelativeTimeString(rating.timestamp);
                
                historyItem.innerHTML = `
                    <div class="history-emoji">${rating.emoji}</div>
                    <div class="history-details">
                        <div class="history-user">${rating.user}</div>
                        <div class="history-time timestamp-tooltip" data-full-time="${rating.timestamp}">
                            ${relativeTime}
                        </div>
                    </div>
                `;
                
                historyContainer.appendChild(historyItem);
                
                // Add edit/delete controls if this is the current user's rating
                addRatingControls(historyItem, productId, rating);
                
                // Add edit info if edited
                if (rating.edited) {
                    const logElement = document.createElement('div');
                    logElement.className = 'rating-action-log';
                    logElement.textContent = `Edited ${getRelativeTimeString(rating.editTimestamp)} (changed from ${rating.previousEmoji} to ${rating.emoji})`;
                    historyItem.appendChild(logElement);
                }
            });
            
            // Add deleted ratings if any
            if (deletedRatings.length > 0) {
                const deletedTitle = document.createElement('h5');
                deletedTitle.className = 'deleted-ratings-title';
                deletedTitle.textContent = 'Deleted Ratings';
                historyContainer.appendChild(deletedTitle);
                
                deletedRatings.forEach(rating => {
                    const historyItem = document.createElement('div');
                    historyItem.className = 'history-item deleted';
                    
                    const relativeTime = getRelativeTimeString(rating.timestamp);
                    
                    historyItem.innerHTML = `
                        <div class="history-emoji">${rating.emoji}</div>
                        <div class="history-details">
                            <div class="history-user">${rating.user}</div>
                            <div class="history-time timestamp-tooltip" data-full-time="${rating.timestamp}">
                                ${relativeTime}
                            </div>
                        </div>
                    `;
                    
                    historyContainer.appendChild(historyItem);
                    
                    // Add deletion log
                    const logElement = document.createElement('div');
                    logElement.className = 'rating-action-log';
                    logElement.textContent = `Deleted ${getRelativeTimeString(rating.deleteTimestamp)}`;
                    historyItem.appendChild(logElement);
                });
            }
        } else {
            // Show empty state
            const emptyState = document.createElement('div');
            emptyState.className = 'rating-history-empty';
            emptyState.textContent = 'No ratings have been submitted yet.';
            historyContainer.appendChild(emptyState);
        }
        
        // Add metadata
        const metadata = document.createElement('div');
        metadata.className = 'rating-metadata';
        metadata.textContent = `Updated: ${CURRENT_TIMESTAMP} | User: ${CURRENT_USER}`;
        historyContainer.appendChild(metadata);
        
        // Show the container if hidden
        historyContainer.style.display = 'block';
        
        // Scroll to it if it was in viewport before
        if (wasInViewport) {
            historyContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, 800);
}

// Modified submitRating function to check for existing ratings
function submitRatingWithManagement(event) {
    const submitButton = event.target;
    const emojiPicker = submitButton.closest('.emoji-picker');
    const productCard = submitButton.closest('.product-card');
    const productId = productCard.dataset.productId;
    const selectedEmoji = emojiPicker.querySelector('.emoji.selected');
    
    if (!selectedEmoji) {
        showNotification('Please select an emoji first!', 'error');
        return;
    }
    
    // Add spinner to button
    addButtonSpinner(submitButton);
    
    // Check if user has already rated this product
    const existingRating = findUserRating(productId);
    
    if (existingRating) {
        // If already rated, show confirmation dialog
        removeButtonSpinner(submitButton);
        
        const confirmDialog = document.createElement('div');
        confirmDialog.className = 'confirm-delete';
        confirmDialog.innerHTML = `
            <div class="confirm-delete-title">Update Existing Rating?</div>
            <p>You've already rated this product with ${existingRating.emoji}. Do you want to update your rating to ${selectedEmoji.dataset.emoji}?</p>
            <div class="confirm-delete-btns">
                <button class="confirm-yes">Yes, Update</button>
                <button class="confirm-no">Cancel</button>
            </div>
            <div class="rating-metadata">Time: ${CURRENT_TIMESTAMP} | User: ${CURRENT_USER}</div>
        `;
        
        emojiPicker.appendChild(confirmDialog);
        
        // Add click handler for yes button
        confirmDialog.querySelector('.confirm-yes').addEventListener('click', function() {
            confirmDialog.remove();
            updateExistingRating(productId, existingRating, selectedEmoji.dataset.emoji, emojiPicker, productCard);
        });
        
        // Add click handler for no button
        confirmDialog.querySelector('.confirm-no').addEventListener('click', function() {
            confirmDialog.remove();
        });
        
        return;
    }
    
    // Get the current timestamp
    const timestamp = CURRENT_TIMESTAMP;
    
    try {
        // Show loading spinner
        showSpinner('Saving your rating...');
        
        // Simulate network delay
        setTimeout(() => {
            // Get emoji value
            const rating = selectedEmoji.dataset.emoji;
            
            // Save rating with timestamp
            saveRatingWithTimestamp(productId, rating, timestamp);
            
            // Update chart if available
            if (typeof updateChartWithNewRating === 'function') {
                updateChartWithNewRating(productId, rating);
            } else if (typeof updateProductChart === 'function') {
                updateProductChart(productId);
            }
            
            // Hide emoji picker and show rate button again
            hideSpinner();
            emojiPicker.style.display = 'none';
            productCard.querySelector('.rate-button').style.display = 'block';
            
            // Get product name for the notification
            const productName = productCard.querySelector('.product-name').textContent;
            
            // Show success notification with timestamp
            showNotification(`Thanks for rating "${productName}"! Your ${rating} rating has been recorded.`);
            
            // Update the last rated indicator
            updateLastRatedIndicator(productCard, rating, timestamp);
            
            // Add rating history button if not already present
            addRatingHistoryButton(productCard);
            
            // Remove button spinner
            removeButtonSpinner(submitButton);
        }, 1000);
    } catch (error) {
        hideSpinner();
        showNotification('Error saving rating. Please try again.', 'error');
        removeButtonSpinner(submitButton);
    }
}

// Update an existing rating
function updateExistingRating(productId, existingRating, newEmoji, emojiPicker, productCard) {
    // Show spinner
    showSpinner('Updating your rating...');
    
    // Simulate delay for better UX
    setTimeout(() => {
        try {
            // Get existing ratings
            const productRatings = getProductRatings(productId);
            
            // Find the rating in history
            const ratingIndex = productRatings.ratingHistory.findIndex(
                r => r.timestamp === existingRating.timestamp && r.user === existingRating.user
            );
            
            if (ratingIndex !== -1) {
                // Decrement old emoji count
                productRatings.emojiCounts[existingRating.emoji]--;
                
                // Increment new emoji count
                productRatings.emojiCounts[newEmoji] = (productRatings.emojiCounts[newEmoji] || 0) + 1;
                
                // Update the emoji in history
                productRatings.ratingHistory[ratingIndex].previousEmoji = existingRating.emoji;
                productRatings.ratingHistory[ratingIndex].emoji = newEmoji;
                productRatings.ratingHistory[ratingIndex].edited = true;
                productRatings.ratingHistory[ratingIndex].editTimestamp = CURRENT_TIMESTAMP;
                
                // Save the updated ratings
                saveProductRatings(productId, productRatings);
                
                // Update chart if available
                if (typeof updateProductChart === 'function') {
                    updateProductChart(productId);
                }
                
                // Hide emoji picker and show rate button again
                emojiPicker.style.display = 'none';
                productCard.querySelector('.rate-button').style.display = 'block';
                
                // Get product name for the notification
                const productName = productCard.querySelector('.product-name').textContent;
                
                // Show success notification
                showNotification(`Your rating for "${productName}" has been updated to ${newEmoji}.`);
                
                // Update the last rated indicator
                updateLastRatedIndicator(productCard, newEmoji, existingRating.timestamp);
                
                // Update rating history if displayed
                refreshRatingHistory(productId);
            } else {
                throw new Error('Rating not found');
            }
        } catch (error) {
            console.error('Error updating rating:', error);
            showNotification('Error updating your rating. Please try again.', 'error');
        } finally {
            hideSpinner();
        }
    }, 1000);
}

// Update the UI to show when this product was last rated with edit/delete controls
function updateLastRatedIndicator(productCard, rating, timestamp) {
    let lastRated = productCard.querySelector('.last-rated');
    
    if (!lastRated) {
        lastRated = document.createElement('div');
        lastRated.className = 'last-rated';
        
        // Add after the rate button
        const rateButton = productCard.querySelector('.rate-button');
        if (rateButton) {
            rateButton.after(lastRated);
        } else {
            productCard.appendChild(lastRated);
        }
    }
    
    // Update content with relative time
    const relativeTime = getRelativeTimeString(timestamp);
    lastRated.innerHTML = `
        <span class="last-rated-emoji">${rating}</span>
        <span class="last-rated-text">You rated this</span>
        <span class="rating-timestamp timestamp-tooltip" data-full-time="${timestamp}">${relativeTime}</span>
    `;
    
    // Add edit/delete controls
    const ratingData = {
        emoji: rating,
        timestamp: timestamp,
        user: CURRENT_USER
    };
    
    addRatingControls(lastRated, productCard.dataset.productId, ratingData);
}

// Initialize rating management features
function initRatingManagement() {
    console.log(`[RATING MANAGEMENT] Initializing rating edit/delete features | ${CURRENT_TIMESTAMP} | User: ${CURRENT_USER}`);
    
    // Add styles
    addRatingManagementStyles();
    
    // Replace submitRating function with management version
    if (typeof submitRating === 'function') {
        window.submitRating = submitRatingWithManagement;
    }
    
    // Set up event delegation for dynamically added elements
    document.addEventListener('click', function(event) {
        // Handle rating submission
        if (event.target.classList.contains('submit-rating')) {
            submitRatingWithManagement(event);
        }
    });
    
    // Add controls to existing last rated indicators
    setTimeout(() => {
        document.querySelectorAll('.last-rated').forEach(lastRated => {
            const productCard = lastRated.closest('.product-card');
            if (!productCard) return;
            
            const productId = productCard.dataset.productId;
            const emoji = lastRated.querySelector('.last-rated-emoji')?.textContent;
            const timestamp = lastRated.querySelector('.rating-timestamp')?.dataset?.fullTime;
            
            if (productId && emoji && timestamp) {
                const ratingData = {
                    emoji: emoji,
                    timestamp: timestamp,
                    user: CURRENT_USER
                };
                
                addRatingControls(lastRated, productId, ratingData);
            }
        });
    }, 1000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize rating management features after a short delay
    setTimeout(initRatingManagement, 800);
    
    // Update page metadata with current timestamp
    if (document.getElementById('metadata')) {
        document.getElementById('metadata').innerHTML = 
            `Last accessed: ${CURRENT_TIMESTAMP} | User: ${CURRENT_USER} | 
            <span class="management-badge">✏️ Rating Management: Enabled</span>`;
    }
});

// Constants
const CURRENT_TIMESTAMP = '2025-05-30 14:45:26';
const CURRENT_USER = 'BeingSeight';

// Add CSS for badges
function addBadgeStyles() {
    if (document.getElementById('badge-styles')) return;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'badge-styles';
    styleElement.textContent = `
        /* Badge styles */
        .product-badges {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            flex-direction: column;
            gap: 5px;
            z-index: 5;
        }
        
        .product-badge {
            padding: 5px 10px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            transition: all 0.3s ease;
            animation: badgeAppear 0.5s forwards;
            max-width: 150px;
            text-align: center;
        }
        
        .most-loved-badge {
            background-color: #ff7675;
            color: white;
            border: 1px solid #e74c3c;
        }
        
        .trending-badge {
            background-color: #74b9ff;
            color: white;
            border: 1px solid #0984e3;
        }
        
        .badge-icon {
            margin-right: 5px;
            font-size: 16px;
        }
        
        .badge-text {
            font-size: 11px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .badge-tooltip {
            position: relative;
        }
        
        .badge-tooltip:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            top: -30px;
            left: 0;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 11px;
            white-space: nowrap;
            z-index: 100;
        }
        
        /* Dark theme support */
        body.dark-theme .most-loved-badge {
            background-color: #d63031;
            border-color: #b71540;
        }
        
        body.dark-theme .trending-badge {
            background-color: #0984e3;
            border-color: #0652DD;
        }
        
        /* Badge animation */
        @keyframes badgeAppear {
            0% {
                transform: translateX(20px);
                opacity: 0;
            }
            100% {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes badgePulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .badge-pulse {
            animation: badgePulse 0.5s 3;
        }
        
        /* Badge summary section */
        .badge-summary {
            margin: 20px 0;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        body.dark-theme .badge-summary {
            background-color: #2d3436;
        }
        
        .badge-summary-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }
        
        .badge-summary-title::before {
            content: '🏆';
            margin-right: 10px;
        }
        
        .badge-summary-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .badge-summary-item {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            background-color: white;
            border-radius: 6px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        body.dark-theme .badge-summary-item {
            background-color: #34495e;
        }
        
        .badge-summary-icon {
            font-size: 20px;
            margin-right: 8px;
        }
        
        .badge-summary-text {
            font-size: 14px;
        }
        
        .badge-summary-metadata {
            font-size: 10px;
            color: #999;
            margin-top: 10px;
            text-align: right;
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Calculate badge data for all products
function calculateBadgeData() {
    console.log(`[BADGES] Calculating badge data | ${CURRENT_TIMESTAMP}`);
    
    // Get all ratings data
    const allRatings = JSON.parse(localStorage.getItem('productRatings') || '{}');
    
    // Object to store badge data
    const badgeData = {
        mostLoved: [],
        trending: [],
        updated: CURRENT_TIMESTAMP
    };
    
    // Track highest love percentage for "Most Loved" badge
    let highestLovePercentage = 0;
    
    // Track product with fastest growing positive sentiment for "Trending" badge
    let fastestGrowingScore = 0;
    
    // Process each product
    Object.entries(allRatings).forEach(([productId, productRatings]) => {
        // Calculate total ratings
        const totalRatings = Object.values(productRatings.emojiCounts).reduce((sum, count) => sum + count, 0);
        
        if (totalRatings > 0) {
            // Calculate love percentage (😍 ratings)
            const loveCount = productRatings.emojiCounts['😍'] || 0;
            const lovePercentage = (loveCount / totalRatings) * 100;
            
            // Calculate positive ratings (😍 + 😊)
            const positiveCount = (productRatings.emojiCounts['😍'] || 0) + (productRatings.emojiCounts['😊'] || 0);
            const positivePercentage = (positiveCount / totalRatings) * 100;
            
            // Check if qualifies for "Most Loved" badge (must have at least 3 ratings)
            if (totalRatings >= 3 && lovePercentage >= 50) {
                badgeData.mostLoved.push({
                    productId,
                    lovePercentage,
                    loveCount,
                    totalRatings
                });
                
                if (lovePercentage > highestLovePercentage) {
                    highestLovePercentage = lovePercentage;
                }
            }
            
            // Calculate trending score - using timestamp to determine recent ratings
            // Get ratings from the last 7 days (if we have timestamps)
            if (productRatings.ratingHistory && productRatings.ratingHistory.length > 0) {
                // Get the current date for comparison
                const currentDate = new Date(CURRENT_TIMESTAMP.replace(' ', 'T') + 'Z');
                
                // Filter ratings from the last 7 days
                const recentRatings = productRatings.ratingHistory.filter(rating => {
                    const ratingDate = new Date(rating.timestamp.replace(' ', 'T') + 'Z');
                    const daysDiff = (currentDate - ratingDate) / (1000 * 60 * 60 * 24);
                    return daysDiff <= 7 && !rating.deleted;
                });
                
                // Calculate recent positive ratings
                const recentPositiveCount = recentRatings.filter(rating => 
                    rating.emoji === '😍' || rating.emoji === '😊'
                ).length;
                
                // Only consider products with at least 3 recent ratings
                if (recentRatings.length >= 3) {
                    const recentPositivePercentage = (recentPositiveCount / recentRatings.length) * 100;
                    
                    // Calculate trend score (weighing recent positive ratings higher than overall)
                    const trendScore = (recentPositivePercentage * 0.7) + (positivePercentage * 0.3);
                    
                    badgeData.trending.push({
                        productId,
                        trendScore,
                        recentRatings: recentRatings.length,
                        recentPositivePercentage
                    });
                    
                    if (trendScore > fastestGrowingScore) {
                        fastestGrowingScore = trendScore;
                    }
                }
            }
        }
    });
    
    // Sort badges by highest scores
    badgeData.mostLoved.sort((a, b) => b.lovePercentage - a.lovePercentage);
    badgeData.trending.sort((a, b) => b.trendScore - a.trendScore);
    
    // Limit to top 3 for each badge type
    badgeData.mostLoved = badgeData.mostLoved.slice(0, 3);
    badgeData.trending = badgeData.trending.slice(0, 3);
    
    // Save badge data to localStorage
    localStorage.setItem('badgeData', JSON.stringify(badgeData));
    console.log(`[BADGES] Badge data calculated and saved | ${CURRENT_TIMESTAMP}`, badgeData);
    
    return badgeData;
}

// Add badges to product cards
function updateBadges() {
    // Get badge data (calculate if not available)
    const badgeData = JSON.parse(localStorage.getItem('badgeData')) || calculateBadgeData();
    
    // Get all product cards
    document.querySelectorAll('.product-card').forEach(productCard => {
        const productId = productCard.dataset.productId;
        
        // Remove existing badges
        const existingBadges = productCard.querySelector('.product-badges');
        if (existingBadges) {
            existingBadges.remove();
        }
        
        // Create badges container
        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'product-badges';
        
        // Check if product has "Most Loved" badge
        const mostLovedBadge = badgeData.mostLoved.find(badge => badge.productId === productId);
        if (mostLovedBadge) {
            const badge = document.createElement('div');
            badge.className = 'product-badge most-loved-badge badge-tooltip';
            badge.setAttribute('data-tooltip', `${mostLovedBadge.loveCount} out of ${mostLovedBadge.totalRatings} users loved this (${mostLovedBadge.lovePercentage.toFixed(1)}%)`);
            badge.innerHTML = `
                <span class="badge-icon">❤️</span>
                <span class="badge-text">Most Loved</span>
            `;
            badgesContainer.appendChild(badge);
        }
        
        // Check if product has "Trending" badge
        const trendingBadge = badgeData.trending.find(badge => badge.productId === productId);
        if (trendingBadge) {
            const badge = document.createElement('div');
            badge.className = 'product-badge trending-badge badge-tooltip';
            badge.setAttribute('data-tooltip', `${trendingBadge.recentPositivePercentage.toFixed(1)}% positive ratings in the last 7 days`);
            badge.innerHTML = `
                <span class="badge-icon">📈</span>
                <span class="badge-text">Trending</span>
            `;
            badgesContainer.appendChild(badge);
        }
        
        // Add badges container to product card if it has any badges
        if (badgesContainer.children.length > 0) {
            productCard.appendChild(badgesContainer);
            
            // Add pulse animation to newly added badges
            badgesContainer.querySelectorAll('.product-badge').forEach(badge => {
                badge.classList.add('badge-pulse');
                
                // Remove animation class after it completes
                setTimeout(() => {
                    badge.classList.remove('badge-pulse');
                }, 1500);
            });
        }
    });
}

// Create a badge summary section
function createBadgeSummary() {
    // Get badge data
    const badgeData = JSON.parse(localStorage.getItem('badgeData')) || calculateBadgeData();
    
    // Check if summary already exists
    let summarySection = document.querySelector('.badge-summary');
    if (!summarySection) {
        // Create summary section
        summarySection = document.createElement('div');
        summarySection.className = 'badge-summary';
        
        // Add after product list
        const productList = document.getElementById('product-list');
        if (productList && productList.nextElementSibling) {
            productList.parentNode.insertBefore(summarySection, productList.nextElementSibling);
        } else if (productList) {
            productList.parentNode.appendChild(summarySection);
        } else {
            // Fallback if product list not found
            document.body.appendChild(summarySection);
        }
    }
    
    // Clear existing content
    summarySection.innerHTML = '';
    
    // Add title
    const title = document.createElement('div');
    title.className = 'badge-summary-title';
    title.textContent = 'Product Badges';
    summarySection.appendChild(title);
    
    // Create list container
    const listContainer = document.createElement('div');
    listContainer.className = 'badge-summary-list';
    
    // Add "Most Loved" badges
    if (badgeData.mostLoved.length > 0) {
        badgeData.mostLoved.forEach(badge => {
            const productName = getProductName(badge.productId);
            if (productName) {
                const badgeItem = document.createElement('div');
                badgeItem.className = 'badge-summary-item';
                badgeItem.innerHTML = `
                    <span class="badge-summary-icon">❤️</span>
                    <span class="badge-summary-text">${productName} (${badge.lovePercentage.toFixed(1)}% Love)</span>
                `;
                listContainer.appendChild(badgeItem);
            }
        });
    } else {
        const emptyItem = document.createElement('div');
        emptyItem.className = 'badge-summary-item';
        emptyItem.innerHTML = `
            <span class="badge-summary-icon">❤️</span>
            <span class="badge-summary-text">No products qualify for Most Loved yet</span>
        `;
        listContainer.appendChild(emptyItem);
    }
    
    // Add "Trending" badges
    if (badgeData.trending.length > 0) {
        badgeData.trending.forEach(badge => {
            const productName = getProductName(badge.productId);
            if (productName) {
                const badgeItem = document.createElement('div');
                badgeItem.className = 'badge-summary-item';
                badgeItem.innerHTML = `
                    <span class="badge-summary-icon">📈</span>
                    <span class="badge-summary-text">${productName} (${badge.recentPositivePercentage.toFixed(1)}% Trending)</span>
                `;
                listContainer.appendChild(badgeItem);
            }
        });
    } else {
        const emptyItem = document.createElement('div');
        emptyItem.className = 'badge-summary-item';
        emptyItem.innerHTML = `
            <span class="badge-summary-icon">📈</span>
            <span class="badge-summary-text">No products are trending yet</span>
        `;
        listContainer.appendChild(emptyItem);
    }
    
    // Add list to summary
    summarySection.appendChild(listContainer);
    
    // Add metadata
    const metadata = document.createElement('div');
    metadata.className = 'badge-summary-metadata';
    metadata.textContent = `Updated: ${CURRENT_TIMESTAMP} | User: ${CURRENT_USER}`;
    summarySection.appendChild(metadata);
}

// Get product name by ID
function getProductName(productId) {
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    return productCard ? productCard.querySelector('.product-name').textContent : `Product ${productId}`;
}

// Update badges when ratings change
function setupBadgeUpdates() {
    // Set up mutation observer to detect rating changes
    const observer = new MutationObserver(mutations => {
        let shouldUpdateBadges = false;
        
        mutations.forEach(mutation => {
            // Check if chart container was updated (indicating rating changes)
            if (mutation.target.classList.contains('chart-container') || 
                mutation.target.classList.contains('last-rated') ||
                (mutation.type === 'childList' && mutation.addedNodes.length > 0)) {
                shouldUpdateBadges = true;
            }
        });
        
        if (shouldUpdateBadges) {
            // Recalculate badge data and update UI
            setTimeout(() => {
                const badgeData = calculateBadgeData();
                updateBadges();
                createBadgeSummary();
            }, 500);
        }
    });
    
    // Start observing the document body
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
    });
    
    // Also set up a regular refresh interval (every 5 minutes)
    setInterval(() => {
        const badgeData = calculateBadgeData();
        updateBadges();
        createBadgeSummary();
    }, 300000); // 5 minutes
}

// Integration with the existing product rating submission
function enhanceRatingSubmissionWithBadgeUpdates() {
    // Store original function
    const originalSubmitRating = window.submitRating;
    
    // Replace with enhanced version
    window.submitRating = function(event) {
        // Call original function
        if (typeof originalSubmitRating === 'function') {
            originalSubmitRating.call(this, event);
        }
        
        // Update badges after a delay to allow rating to be processed
        setTimeout(() => {
            const badgeData = calculateBadgeData();
            updateBadges();
            createBadgeSummary();
        }, 1500);
    };
}

// Initialize badge system
function initBadgeSystem() {
    console.log(`[BADGES] Initializing badge system | ${CURRENT_TIMESTAMP} | User: ${CURRENT_USER}`);
    
    // Add styles
    addBadgeStyles();
    
    // Calculate initial badge data
    const badgeData = calculateBadgeData();
    
    // Update badges on product cards
    updateBadges();
    
    // Create badge summary section
    createBadgeSummary();
    
    // Set up updates for when ratings change
    setupBadgeUpdates();
    
    // Enhance rating submission
    enhanceRatingSubmissionWithBadgeUpdates();
    
    // Update page metadata
    if (document.getElementById('metadata')) {
        document.getElementById('metadata').innerHTML = 
            `Last accessed: ${CURRENT_TIMESTAMP} | User: ${CURRENT_USER} | 
            <span class="badge-system-badge">🏆 Badge System: Active</span>`;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize badge system after a short delay to ensure products are loaded
    setTimeout(initBadgeSystem, 1000);
});

// Add CSS for emoji tooltips
function addEmojiTooltipStyles() {
    if (document.getElementById('emoji-tooltip-styles')) return;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'emoji-tooltip-styles';
    styleElement.textContent = `
        /* Emoji tooltip styles */
        .emoji {
            position: relative;
            cursor: pointer;
        }
        
        .emoji-tooltip {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-bottom: 8px;
            padding: 6px 10px;
            background-color: #333;
            color: white;
            font-size: 12px;
            font-weight: normal;
            border-radius: 4px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s ease, transform 0.2s ease;
            transform-origin: bottom center;
            z-index: 100;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        .emoji-tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 5px;
            border-style: solid;
            border-color: #333 transparent transparent transparent;
        }
        
        .emoji:hover .emoji-tooltip,
        .emoji:focus .emoji-tooltip,
        .emoji.keyboard-focused .emoji-tooltip {
            opacity: 1;
            transform: translateX(-50%) scale(1);
        }
        
        /* Dark theme styles */
        body.dark-theme .emoji-tooltip {
            background-color: #222;
            color: #eee;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }
        
        body.dark-theme .emoji-tooltip::after {
            border-color: #222 transparent transparent transparent;
        }
        
        /* Animation for tooltip appearance */
        @keyframes tooltipAppear {
            0% {
                opacity: 0;
                transform: translateX(-50%) scale(0.8);
            }
            100% {
                opacity: 1;
                transform: translateX(-50%) scale(1);
            }
        }
        
        .emoji-tooltip.show {
            animation: tooltipAppear 0.2s forwards;
        }
        
        /* For touch devices */
        @media (hover: none) {
            .emoji:hover .emoji-tooltip {
                opacity: 0;
            }
            
            .emoji.touch-active .emoji-tooltip {
                opacity: 1;
                transform: translateX(-50%) scale(1);
            }
        }
        
        /* Metadata tooltip */
        .tooltip-metadata {
            font-size: 8px;
            color: #aaa;
            display: block;
            margin-top: 3px;
            text-align: center;
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Emoji mood descriptions
const EMOJI_MOODS = {
    '😍': 'Love it!',
    '😊': 'Like it',
    '😐': 'It\'s okay',
    '😕': 'Dislike it',
    '😠': 'Hate it'
};

// Add tooltips to all emoji elements
function addEmojiTooltips() {
    // Get all emoji elements
    document.querySelectorAll('.emoji').forEach(emoji => {
        // Skip if already has tooltip
        if (emoji.querySelector('.emoji-tooltip')) return;
        
        // Get emoji value
        const emojiValue = emoji.dataset.emoji;
        
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'emoji-tooltip';
        tooltip.setAttribute('role', 'tooltip');
        
        // Add mood description
        const moodDescription = EMOJI_MOODS[emojiValue] || 'Rate this product';
        tooltip.innerHTML = `
            ${moodDescription}
            <span class="tooltip-metadata">Updated: 2025-05-30 14:47:14</span>
        `;
        
        // Add tooltip to emoji
        emoji.appendChild(tooltip);
        
        // Add aria attributes for accessibility
        emoji.setAttribute('aria-describedby', `tooltip-${emojiValue}`);
        tooltip.id = `tooltip-${emojiValue}`;
        
        // Add touch event handlers for mobile
        emoji.addEventListener('touchstart', handleEmojiTouch);
    });
}

// Handle touch events for mobile devices
function handleEmojiTouch(event) {
    // Get all emojis
    const allEmojis = document.querySelectorAll('.emoji');
    
    // Remove touch-active class from all emojis
    allEmojis.forEach(e => e.classList.remove('touch-active'));
    
    // Add touch-active class to current emoji
    this.classList.add('touch-active');
    
    // Prevent immediate click to allow tooltip to be seen
    event.preventDefault();
    
    // Add click handler after short delay
    setTimeout(() => {
        const handleClick = () => {
            // Simulate click on emoji
            this.click();
            
            // Remove touch-active class
            this.classList.remove('touch-active');
            
            // Remove click handler
            document.removeEventListener('touchend', handleClick);
        };
        
        // Add click handler
        document.addEventListener('touchend', handleClick, { once: true });
    }, 300);
}

// Add keyboard support for tooltips
function setupKeyboardTooltipSupport() {
    // Listen for keydown events on emoji options
    document.addEventListener('keydown', function(event) {
        if (event.target.classList.contains('emoji-options')) {
            // Find focused emoji
            const focusedEmoji = event.target.querySelector('.emoji.keyboard-focused');
            
            if (focusedEmoji && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                // Show tooltip on focused emoji when navigating
                const tooltip = focusedEmoji.querySelector('.emoji-tooltip');
                if (tooltip) {
                    tooltip.classList.add('show');
                }
            }
        }
    });
}

// Enhance the existing setupEmojiPicker function
function enhanceEmojiPickerWithTooltips() {
    // Store original function
    const originalSetupEmojiPicker = window.setupEmojiPicker;
    
    // Replace with enhanced version
    window.setupEmojiPicker = function() {
        // Call original function first
        if (typeof originalSetupEmojiPicker === 'function') {
            originalSetupEmojiPicker();
        }
        
        // Add tooltips to emojis
        addEmojiTooltips();
        
        // Set up keyboard support
        setupKeyboardTooltipSupport();
        
        // Add MutationObserver to handle dynamically added emojis
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Check for newly added emoji elements
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && node.classList && node.classList.contains('emoji-picker')) {
                            // Add tooltips after a short delay to ensure DOM is ready
                            setTimeout(() => {
                                addEmojiTooltips();
                            }, 50);
                        }
                    });
                }
            });
        });
        
        // Start observing the document body
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    };
    
    // If emoji pickers already exist, enhance them now
    if (document.querySelectorAll('.emoji-picker').length > 0) {
        addEmojiTooltips();
        setupKeyboardTooltipSupport();
    }
}

// Update mood phrase when emoji is selected
function enhanceMoodPhraseUpdates() {
    // Add event delegation for emoji clicks
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('emoji')) {
            const emoji = event.target;
            const emojiPicker = emoji.closest('.emoji-picker');
            
            if (emojiPicker) {
                const moodPhrase = emojiPicker.querySelector('.mood-phrase');
                
                if (moodPhrase) {
                    const emojiValue = emoji.dataset.emoji;
                    moodPhrase.textContent = EMOJI_MOODS[emojiValue] || '';
                    moodPhrase.setAttribute('aria-live', 'polite');
                }
            }
        }
    });
}

// Initialize emoji tooltips
function initEmojiTooltips() {
    console.log(`[TOOLTIPS] Initializing emoji tooltips | 2025-05-30 14:47:14 | User: BeingSeight`);
    
    // Add styles
    addEmojiTooltipStyles();
    
    // Enhance emoji picker
    enhanceEmojiPickerWithTooltips();
    
    // Enhance mood phrase updates
    enhanceMoodPhraseUpdates();
    
    // Add tooltips to any existing emojis
    setTimeout(addEmojiTooltips, 500);
    
    // Update page metadata
    if (document.getElementById('metadata')) {
        document.getElementById('metadata').innerHTML = 
            `Last accessed: 2025-05-30 14:47:14 | User: BeingSeight | 
            <span class="tooltip-badge">🔍 Tooltips: Enabled</span>`;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize emoji tooltips after a short delay
    setTimeout(initEmojiTooltips, 800);
});

// Add CSS for the clear ratings button
function addClearRatingsStyles() {
    if (document.getElementById('clear-ratings-styles')) return;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'clear-ratings-styles';
    styleElement.textContent = `
        /* Clear ratings button styles */
        .clear-ratings-btn {
            margin-top: 20px;
            padding: 10px 15px;
            background-color: #f44336;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .clear-ratings-btn:hover {
            background-color: #d32f2f;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        .clear-ratings-btn::before {
            content: '🗑️';
            margin-right: 8px;
            font-size: 16px;
        }
        
        /* Dark theme styles */
        body.dark-theme .clear-ratings-btn {
            background-color: #d32f2f;
        }
        
        body.dark-theme .clear-ratings-btn:hover {
            background-color: #b71c1c;
        }
        
        /* Settings section styles */
        .settings-section {
            margin: 20px 0;
            padding: 15px;
            background-color: #f5f5f5;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        body.dark-theme .settings-section {
            background-color: #333;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .settings-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
        }
        
        body.dark-theme .settings-title {
            border-bottom-color: #555;
        }
        
        .settings-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .settings-metadata {
            font-size: 10px;
            color: #999;
            margin-top: 10px;
            text-align: right;
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Create settings section with clear ratings button
function createSettingsSection() {
    // Check if settings section already exists
    if (document.querySelector('.settings-section')) return;
    
    // Create settings section
    const settingsSection = document.createElement('div');
    settingsSection.className = 'settings-section';
    
    // Add title
    const settingsTitle = document.createElement('h3');
    settingsTitle.className = 'settings-title';
    settingsTitle.textContent = 'Ratings Settings';
    
    // Create actions container
    const settingsActions = document.createElement('div');
    settingsActions.className = 'settings-actions';
    
    // Create clear ratings button
    const clearBtn = document.createElement('button');
    clearBtn.className = 'clear-ratings-btn';
    clearBtn.textContent = 'Clear All Ratings';
    clearBtn.addEventListener('click', confirmClearRatings);
    
    // Add metadata
    const metadata = document.createElement('div');
    metadata.className = 'settings-metadata';
    metadata.textContent = `Last accessed: 2025-05-30 14:49:24 | User: BeingSeight`;
    
    // Assemble settings section
    settingsActions.appendChild(clearBtn);
    settingsSection.appendChild(settingsTitle);
    settingsSection.appendChild(settingsActions);
    settingsSection.appendChild(metadata);
    
    // Add to DOM - after badge summary if it exists, otherwise after product list
    const badgeSummary = document.querySelector('.badge-summary');
    const productList = document.getElementById('product-list');
    
    if (badgeSummary) {
        badgeSummary.after(settingsSection);
    } else if (productList) {
        productList.after(settingsSection);
    } else {
        // Fallback
        document.body.appendChild(settingsSection);
    }
}

// Show confirmation dialog and clear ratings if confirmed
function confirmClearRatings() {
    // Get ratings count
    const ratingsData = JSON.parse(localStorage.getItem('productRatings') || '{}');
    let totalRatings = 0;
    
    // Count total ratings
    Object.values(ratingsData).forEach(productRating => {
        const productTotal = Object.values(productRating.emojiCounts).reduce((sum, count) => sum + count, 0);
        totalRatings += productTotal;
    });
    
    // Show confirmation dialog
    const confirmMessage = `Are you sure you want to clear all ratings?\n\n` +
                          `This will delete ${totalRatings} ${totalRatings === 1 ? 'rating' : 'ratings'} ` +
                          `across all products and cannot be undone.\n\n` +
                          `Time: 2025-05-30 14:49:24 | User: BeingSeight`;
    
    const isConfirmed = confirm(confirmMessage);
    
    if (isConfirmed) {
        // User confirmed, clear all ratings
        clearAllRatings();
    } else {
        // User cancelled
        showNotification('Ratings clear operation cancelled.', 'info');
        console.log(`[RATINGS] Clear operation cancelled | 2025-05-30 14:49:24 | User: BeingSeight`);
    }
}

// Clear all ratings data
function clearAllRatings() {
    // Show loading spinner
    showSpinner('Clearing all ratings...');
    
    // Simulate delay for better UX
    setTimeout(() => {
        try {
            // Clear ratings data from localStorage
            localStorage.removeItem('productRatings');
            localStorage.removeItem('badgeData');
            
            console.log(`[RATINGS] All ratings cleared | 2025-05-30 14:49:24 | User: BeingSeight`);
            
            // Update UI to reflect cleared ratings
            updateUIAfterClear();
            
            // Show success notification
            showNotification('All ratings have been successfully cleared.', 'success');
        } catch (error) {
            console.error('Error clearing ratings:', error);
            showNotification('Error clearing ratings. Please try again.', 'error');
        } finally {
            hideSpinner();
        }
    }, 1500);
}

// Update UI after ratings are cleared
function updateUIAfterClear() {
    // 1. Update charts to show empty state
    document.querySelectorAll('.chart-canvas').forEach(canvas => {
        if (canvas.chart) {
            // Reset data to zeros
            canvas.chart.data.datasets[0].data = [0, 0, 0, 0, 0];
            canvas.chart.update();
        }
    });
    
    // 2. Remove all "last rated" indicators
    document.querySelectorAll('.last-rated').forEach(el => {
        el.remove();
    });
    
    // 3. Hide rating history sections
    document.querySelectorAll('.rating-history-container').forEach(el => {
        el.remove();
    });
    
    // 4. Remove all badges
    document.querySelectorAll('.product-badges').forEach(el => {
        el.remove();
    });
    
    // 5. Update badge summary to empty state
    const badgeSummary = document.querySelector('.badge-summary');
    if (badgeSummary) {
        createBadgeSummary(); // This will show the empty state
    }
    
    // 6. Log the action
    const logMessage = document.createElement('div');
    logMessage.className = 'clear-ratings-log';
    logMessage.innerHTML = `
        <p><strong>All ratings cleared at 2025-05-30 14:49:24 by BeingSeight</strong></p>
        <p>Products have been reset to their initial state with no ratings.</p>
    `;
    
    // Add log message at the top of settings section
    const settingsSection = document.querySelector('.settings-section');
    if (settingsSection) {
        // Insert after title
        const settingsTitle = settingsSection.querySelector('.settings-title');
        if (settingsTitle) {
            settingsTitle.after(logMessage);
        } else {
            settingsSection.prepend(logMessage);
        }
    }
}

// Initialize clear ratings functionality
function initClearRatings() {
    console.log(`[CLEAR RATINGS] Initializing clear ratings functionality | 2025-05-30 14:49:24 | User: BeingSeight`);
    
    // Add styles
    addClearRatingsStyles();
    
    // Create settings section with clear button
    createSettingsSection();
    
    // Update page metadata
    if (document.getElementById('metadata')) {
        document.getElementById('metadata').innerHTML = 
            `Last accessed: 2025-05-30 14:49:24 | User: BeingSeight | 
            <span class="clear-ratings-badge">🗑️ Clear Ratings: Enabled</span>`;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize clear ratings functionality after a short delay
    setTimeout(initClearRatings, 1200);
});