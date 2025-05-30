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

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    productsContainer = document.getElementById('productsContainer');
    emojiModal = document.getElementById('emojiModal');
    emojiPicker = document.getElementById('emojiPicker');
    selectedMoodText = document.getElementById('selectedMoodText');
    submitRatingBtn = document.getElementById('submitRating');
    closeModalBtn = document.querySelector('.close-modal');
    
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

// Render emoji picker
function renderEmojiPicker() {
    if (!emojiPicker) return;
    
    emojiPicker.innerHTML = '';
    
    moods.forEach((mood, index) => {
        const emojiBtn = document.createElement('button');
        emojiBtn.className = 'emoji-option';
        emojiBtn.setAttribute('data-mood-index', index);
        emojiBtn.textContent = mood.emoji;
        emojiBtn.setAttribute('aria-label', mood.phrase);
        
        emojiBtn.addEventListener('click', () => selectMood(index));
        
        emojiPicker.appendChild(emojiBtn);
    });
}

// Open rating modal
function openModal(productId) {
    currentProductId = productId;
    selectedMood = null;
    selectedMoodText.textContent = '';
    submitRatingBtn.disabled = true;
    
    // Remove selected class from all emojis
    document.querySelectorAll('.emoji-option').forEach(emoji => {
        emoji.classList.remove('selected');
    });
    
    emojiModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Close rating modal
function closeModal() {
    emojiModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Handle mood selection
function selectMood(moodIndex) {
    selectedMood = moods[moodIndex];
    selectedMoodText.textContent = selectedMood.phrase;
    submitRatingBtn.disabled = false;
    
    // Update UI to show selected emoji
    document.querySelectorAll('.emoji-option').forEach((emoji, index) => {
        if (index === moodIndex) {
            emoji.classList.add('selected');
        } else {
            emoji.classList.remove('selected');
        }
    });
}

// Handle rating submission
function handleRatingSubmission() {
    if (!currentProductId || !selectedMood) return;
    
    // Add rating to the product
    const product = products.find(p => p.id === currentProductId);
    if (product) {
        product.ratings.push({
            mood: selectedMood.emoji,
            score: selectedMood.score,
            timestamp: new Date().toISOString()
        });
        
        // Update the UI
        renderProducts();
        
        // Close the modal
        closeModal();
        
        // Show success message
        showNotification(`Thanks for your ${selectedMood.phrase.toLowerCase()} rating!`);
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = '#333';
    notification.style.color = 'white';
    notification.style.padding = '12px 24px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease';
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Trigger fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
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