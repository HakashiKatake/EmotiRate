# 🔥 EmotiRate: Mood-Based Product Rating System 🔥

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-completed-success)
![Last Updated](https://img.shields.io/badge/last%20updated-2025--05--30-green)

> **A revolutionary way to rate products based on emotional responses rather than boring star ratings.**
> 
> Developed by Saurabh Yadav, Chaitanya and Sahil Shah (CS430 Interactive Web Applications, Summer 2025)

## 📱 Live Demo

Check out our live demo at ...

## 🚀 Overview

EmotiRate reimagines the traditional product rating system by focusing on emotional responses. Users can express how they feel about products using emoji reactions (from 😍 to 😠) instead of the standard 5-star rating system. This creates a more intuitive, engaging, and emotionally intelligent feedback mechanism.

![EmotiRate Preview](...)

## ✨ Features

### 🏗️ Core System & Data Architecture
- Custom JS environment with modular architecture
- Dynamic product rendering from JSON data sources
- Interactive emoji picker with animated transitions
- Mood phrases that translate emotions into words
- Responsive design that works across all devices

### 🎭 Mood Selection & Rating System
- Real-time emoji selection with visual feedback
- Secure rating submission with validation
- Local storage persistence with timestamp tracking
- Duplicate rating prevention with update confirmations
- Average mood calculations with weighted algorithms

### 📋 Review Management
- Detailed review modal with sorting options
- Filter reviews by mood type or date range
- Advanced input validation for user submissions
- Smooth animations and state transitions
- Toast notification system for user feedback

### 📊 Data Visualization
- Interactive mood distribution charts (pie and bar)
- Real-time chart updates when new ratings are submitted
- Search functionality with highlighted results
- Pagination system for large product catalogs
- User preference storage (theme, chart type, products per page)

### 🔍 User Experience Enhancements
- Timestamp tracking with relative time display ("2 days ago")
- Rating editing and deletion capabilities
- Dynamic badges for "Most Loved" and "Trending" products
- Tooltip system explaining each emoji's meaning
- Confirmation dialogs for destructive actions
- Full keyboard accessibility support

### 🛠️ Advanced Capabilities
- Dark/light theme toggle with CSS variable switching
- Browser notifications for rating confirmations
- Internationalization support for multiple languages
- JSON export of user ratings and preferences
- Undo functionality for accidental actions
- Complete reset option with confirmation

### 🔒 System Robustness
- Comprehensive error handling and fallbacks
- Input sanitization to prevent code injection
- Social sharing integration
- Smooth animations and transitions
- Local storage sync across browser tabs
- Administrator dashboard for analytics
- Cross-browser testing and compatibility

## 💻 Technologies Used

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: LocalStorage API, JSON
- **Visualization**: Chart.js
- **Design**: Custom CSS animations, CSS variables
- **Performance**: Lazy loading, efficient DOM operations
- **Accessibility**: ARIA attributes, keyboard navigation
- **Testing**: Jest, Puppeteer

## 🔧 Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/college-projects/emoterate.git
cd emoterate
```

2. Open the project in your preferred code editor

3. Launch with a local server:
```bash
# If you have Python installed:
python -m http.server 8000

# If you have Node.js installed:
npx serve
```

4. Open your browser and navigate to `http://localhost:8000`

## 🎮 How to Use

1. **Browse Products**: Scroll through the product list or use the search bar to find specific items.

2. **Rate a Product**: Click the "Rate This Product" button and select the emoji that best represents your feeling.

3. **View Ratings**: Check the mood distribution chart to see how others have rated the product.

4. **Read & Filter Reviews**: Click "View Reviews" to see detailed feedback and filter by mood type.

5. **Edit Your Ratings**: Your previous ratings are marked and can be edited or deleted as needed.

6. **Customize Experience**: Toggle between light and dark themes, change chart types, and set your preferred emoji.

## 👥 Team Members

- HakashiKatake (Saurabh Yadav)
- Chaitanya-Dev26 (Chaitanya)
- BeingSeight (Sahil Shah)


## 📝 College Project Information

This project was developed as part of CS430 Interactive Web Applications course at ITM Skills University during Summer 2025. The assignment challenged us to create an interactive web application that demonstrates:

- Modern JavaScript techniques
- Effective data management
- Interactive UI components
- Accessibility considerations
- Performance optimization

Our implementation received top marks for innovation, code quality, and user experience design.

## 🙏 Acknowledgments

- Professor Poonam Khanvilkar for guidance and feedback


---

*Last updated: 2025-05-30 16:23:43 UTC by BeingSeight*

*Note: This project is for educational purposes only. The EmotiRate system was developed as a college assignment and is not intended for commercial use without proper licensing and additional development.*
