// Data Structures
const products = [
    {
        id: 1,
        name: 'iPhone 15 Pro Case',
        description: 'Premium leather case with MagSafe compatibility',
        image: 'https://imgs.search.brave.com/9XB3HYY4BrVrHuaTffdxfMoXniXaCt9JjYYbY88iLpM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dGhld2lyZWN1dHRl/ci5jb20vd3AtY29u/dGVudC9tZWRpYS8y/MDI0LzEwL0JFU1Qt/SVBIT05FLTE2LUNB/U0VTLTIwNDhweC00/ODIzLmpwZz9hdXRv/PXdlYnAmcXVhbGl0/eT03NSZ3aWR0aD0x/MDI0',
        ratings: []
    },
    {
        id: 2,
        name: 'AirPods Pro Case',
        description: 'Sleek case with carabiner clip',
        image: 'https://imgs.search.brave.com/DqIa0kvxLGVYjlxAzqe9CFIb0915YNz0lDBK3J3XkEA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y25ldC5jb20vYS9p/bWcvcmVzaXplLzM2/ZDhhZjA5YjFjMjgx/MmZjYTgwN2M1Zjgy/OTk3MjhmNWNhN2U2/ODQvaHViLzIwMjIv/MTIvMTUvYTMzZTlj/ZGItZTVjOS00ZTg0/LTgxNzctYWY2YTc0/NTY3ZTY2L291bHVv/cWktY2FzZS1mb3It/YWlycG9kcy1wcm8t/Mi1waW5lLWdyZWVu/LWJsdWUtYmFja2dy/b3VuZC5wbmc_YXV0/bz13ZWJwJmZvcm1h/dD1wanBnJmhlaWdo/dD01MDA',
        ratings: []
    },
    {
        id: 3,
        name: 'Apple Watch Band',
        description: 'Horween leather band with quick-release pins',
        image: 'https://imgs.search.brave.com/K55qu3HsDOh8K-SgkgnZsUNmWLN9AvmfCSv_vb2X0RA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMw/MzU0NjU2Ny9waG90/by9hcHBsZS13YXRj/aC1zZXJpZXMtNS1z/aWx2ZXItYWx1bWlu/dW0tY2FzZS13aXRo/LXNwb3J0LWJhbmQt/d2hpdGUtY29sb3It/bmV3LXNtYXJ0LXdh/dGNoZXMtZnJvbS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/dDUydzlyNkhFV0tN/NFpuanhUTWdzV2tx/clVOVFc2VEk4Zm9S/aUl4RlE5QT0',
        ratings: []
    },
    {
        id: 4,
        name: 'Wireless Charger',
        description: 'Fast charging pad for all Qi-enabled devices',
        image: 'https://imgs.search.brave.com/qv-dYK0c9etCSyVjHhgNWQL_PRQ8M5Az6hd-w60OJ2U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzE4LzkxLzg1/LzM2MF9GXzMxODkx/ODU0M19TbkpsQ0RN/SGJGWFlSSEJ4aUVu/c2NHdWdlY2VMbmZG/Ni5qcGc',
        ratings: []
    }
];

// Mood configuration with emojis and phrases
const moods = [
    { emoji: '😍', phrase: 'Loved it!', score: 5 },
    { emoji: '😊', phrase: 'Really liked it', score: 4 },
    { emoji: '🙂', phrase: 'It was good', score: 3 },
    { emoji: '😐', phrase: 'It was okay', score: 2 },
    { emoji: '😞', phrase: 'Disappointed', score: 1 },
    { emoji: '😠', phrase: 'Hated it', score: 0 }
];

// DOM Elements
let productsContainer;
let emojiModal;
let emojiPicker;
let selectedMoodText;
let submitRatingBtn;
let closeModalBtn;
let currentProductId = null;
let selectedMood = null;

// Load ratings from localStorage
function loadRatings() {
    const savedRatings = localStorage.getItem('productRatings');
    if (savedRatings) {
        const parsedRatings = JSON.parse(savedRatings);
        products.forEach(product => {
            const savedProduct = parsedRatings.find(p => p.id === product.id);
            if (savedProduct) {
                product.ratings = savedProduct.ratings;
            }
        });
    }
}

// Save ratings to localStorage
function saveRatings() {
    const productsToSave = products.map(({ id, ratings }) => ({
        id,
        ratings: [...ratings] // Create a new array to avoid reference issues
    }));
    localStorage.setItem('productRatings', JSON.stringify(productsToSave));
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    productsContainer = document.getElementById('productsContainer');
    emojiModal = document.getElementById('emojiModal');
    emojiPicker = document.getElementById('emojiPicker');
    selectedMoodText = document.getElementById('selectedMoodText');
    submitRatingBtn = document.getElementById('submitRating');
    closeModalBtn = document.querySelector('.close-modal');
    
    // Load saved ratings
    loadRatings();
    
    // Setup event listeners
    setupEventListeners();
    
    // Render products
    renderProducts();
    
    // Initialize emoji picker
    renderEmojiPicker();
});

// Set up event listeners
function setupEventListeners() {
    // Close modal when clicking the close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === emojiModal) {
            closeModal();
        }
    });
    
    // Submit rating button click handler
    if (submitRatingBtn) {
        submitRatingBtn.addEventListener('click', handleRatingSubmission);
    }
}

// Render products to the DOM
function renderProducts() {
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Calculate average rating
        const averageRating = calculateAverageRating(product.ratings);
        const mood = getMoodByScore(averageRating);
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <span class="rating-emoji">${mood ? mood.emoji : '🤔'}</span>
                    <span class="rating-count">${product.ratings.length} ${product.ratings.length === 1 ? 'rating' : 'ratings'}</span>
                </div>
                <button class="btn rate-btn" data-product-id="${product.id}">
                    Rate This Product
                </button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
    
    // Add event listeners to rate buttons
    document.querySelectorAll('.rate-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            openModal(productId);
        });
    });
}

// Render emoji picker with accessibility features
function renderEmojiPicker() {
    if (!emojiPicker) return;
    
    emojiPicker.innerHTML = '';
    
    moods.forEach((mood, index) => {
        const emojiBtn = document.createElement('button');
        emojiBtn.className = 'emoji-option';
        emojiBtn.setAttribute('data-mood-index', index);
        emojiBtn.textContent = mood.emoji;
        emojiBtn.setAttribute('aria-label', `Rate ${mood.phrase.toLowerCase()}`);
        emojiBtn.setAttribute('aria-pressed', 'false');
        emojiBtn.setAttribute('role', 'radio');
        emojiBtn.setAttribute('tabindex', '0');
        
        // Add tooltip
        const tooltip = document.createElement('span');
        tooltip.className = 'emoji-tooltip';
        tooltip.textContent = mood.phrase;
        emojiBtn.appendChild(tooltip);
        
        // Event listeners
        emojiBtn.addEventListener('click', () => selectMood(index));
        emojiBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectMood(index);
            }
        });
        
        emojiPicker.appendChild(emojiBtn);
    });
}

// Open rating modal with animation
function openModal(productId) {
    currentProductId = productId;
    selectedMood = null;
    
    // Reset selected mood text with animation
    selectedMoodText.style.opacity = '0';
    selectedMoodText.style.transform = 'translateY(-10px)';
    selectedMoodText.textContent = '';
    selectedMoodText.classList.remove('show');
    
    submitRatingBtn.disabled = true;
    
    // Remove selected class from all emojis
    document.querySelectorAll('.emoji-option').forEach(emoji => {
        emoji.classList.remove('selected');
        emoji.setAttribute('aria-pressed', 'false');
    });
    
    // Show modal with animation
    emojiModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    
    // Trigger animation on next frame
    requestAnimationFrame(() => {
        emojiModal.classList.add('show');
    });
    
    // Focus on first emoji for keyboard navigation
    setTimeout(() => {
        const firstEmoji = emojiPicker.querySelector('.emoji-option');
        if (firstEmoji) firstEmoji.focus();
        
        // Add ARIA live region for modal open
        const liveRegion = document.createElement('div');
        liveRegion.className = 'sr-only';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.textContent = 'Rating dialog opened. Use arrow keys to navigate between emoji options.';
        document.body.appendChild(liveRegion);
        
        // Remove after announcement
        setTimeout(() => {
            liveRegion.remove();
        }, 1000);
    }, 100);
    
    // Add keyboard event listener for modal
    document.addEventListener('keydown', handleModalKeyDown);
}

// Close rating modal with animation
function closeModal() {
    // Start fade out animation
    emojiModal.classList.remove('show');
    
    // Add ARIA live region for modal close
    const liveRegion = document.createElement('div');
    liveRegion.className = 'sr-only';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.textContent = 'Rating dialog closed.';
    document.body.appendChild(liveRegion);
    
    // Remove after announcement
    setTimeout(() => {
        liveRegion.remove();
    }, 1000);
    
    // Remove modal after animation completes
    setTimeout(() => {
        emojiModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }, 300); // Match this with CSS transition time
    
    // Remove keyboard event listener
    document.removeEventListener('keydown', handleModalKeyDown);
}

// Handle keyboard navigation in modal
function handleModalKeyDown(e) {
    // Close on Escape key
    if (e.key === 'Escape') {
        closeModal();
        return;
    }
    
    // Handle arrow key navigation between emojis
    if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        const emojis = Array.from(document.querySelectorAll('.emoji-option'));
        const currentIndex = emojis.findIndex(el => el === document.activeElement);
        
        if (currentIndex === -1) return;
        
        let nextIndex;
        switch (e.key) {
            case 'ArrowRight':
                nextIndex = (currentIndex + 1) % emojis.length;
                break;
            case 'ArrowLeft':
                nextIndex = (currentIndex - 1 + emojis.length) % emojis.length;
                break;
            case 'ArrowUp':
                nextIndex = (currentIndex - 3 + emojis.length) % emojis.length;
                break;
            case 'ArrowDown':
                nextIndex = (currentIndex + 3) % emojis.length;
                break;
        }
        
        emojis[nextIndex].focus();
    }
    
    // Select emoji with Enter or Space
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const emojiIndex = document.activeElement.getAttribute('data-mood-index');
        if (emojiIndex !== null) {
            selectMood(parseInt(emojiIndex));
        }
    }
}

// Handle mood selection
function selectMood(moodIndex) {
    selectedMood = moods[moodIndex];
    
    // Animate mood text
    selectedMoodText.style.opacity = '0';
    selectedMoodText.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        selectedMoodText.textContent = selectedMood.phrase;
        selectedMoodText.style.opacity = '1';
        selectedMoodText.style.transform = 'translateY(0)';
        selectedMoodText.classList.add('show');
    }, 150);
    
    submitRatingBtn.disabled = false;
    
    // Update UI to show selected emoji
    document.querySelectorAll('.emoji-option').forEach((emoji, index) => {
        if (index === moodIndex) {
            emoji.classList.add('selected');
            emoji.setAttribute('aria-pressed', 'true');
            emoji.focus(); // Keep focus on selected emoji
        } else {
            emoji.classList.remove('selected');
            emoji.setAttribute('aria-pressed', 'false');
        }
    });
    
    // Auto-focus submit button after a short delay for better UX
    setTimeout(() => {
        submitRatingBtn.focus();
        
        // Add visual feedback for screen readers
        const notification = document.createElement('div');
        notification.className = 'sr-only';
        notification.setAttribute('aria-live', 'polite');
        notification.textContent = `Selected ${selectedMood.phrase} rating`;
        document.body.appendChild(notification);
        
        // Remove after announcement
        setTimeout(() => {
            notification.remove();
        }, 1000);
    }, 100);
}

// Handle rating submission
function handleRatingSubmission() {
    if (!currentProductId || !selectedMood) return;
    
    // Disable button and show loading state
    submitRatingBtn.disabled = true;
    submitRatingBtn.textContent = 'Submitting...';
    
    // Simulate API call delay
    setTimeout(() => {
        try {
            const product = products.find(p => p.id === currentProductId);
            if (product) {
                // Add new rating
                product.ratings.push({
                    mood: selectedMood.emoji,
                    score: selectedMood.score,
                    timestamp: new Date().toISOString()
                });
                
                // Save to localStorage
                saveRatings();
                
                // Update the UI
                renderProducts();
                
                // Close the modal
                closeModal();
                
                // Show success message with emoji
                showNotification(`Thanks for your ${selectedMood.emoji} ${selectedMood.phrase.toLowerCase()} rating!`, 'success');
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            showNotification('Failed to submit rating. Please try again.', 'error');
        } finally {
            // Reset button state
            if (submitRatingBtn) {
                submitRatingBtn.disabled = false;
                submitRatingBtn.textContent = 'Submit Rating';
            }
        }
    }, 800); // Simulate network delay
}

// Show notification with type (success/error)
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Add icon based on type
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    
    notification.innerHTML = `${icon} ${message}`;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Trigger fade in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Calculate average rating from an array of ratings
function calculateAverageRating(ratings) {
    if (!ratings.length) return null;
    
    const sum = ratings.reduce((total, rating) => total + rating.score, 0);
    return sum / ratings.length;
}

// Get mood object based on score
function getMoodByScore(score) {
    if (score === null) return null;
    
    // Find the mood with the closest score
    return moods.reduce((prev, curr) => {
        return (Math.abs(curr.score - score) < Math.abs(prev.score - score) ? curr : prev);
    });
}