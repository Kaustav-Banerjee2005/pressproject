import React, { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';
import Blog from './Blog';

function App() {
  const [page, setPage] = useState('home');
  const [showBlogMenu, setShowBlogMenu] = useState(false);

  const handleBlogNavClick = () => {
    setShowBlogMenu(!showBlogMenu);
  };

  const handleBlogCategory = (category) => {
    setPage('blog');
    setShowBlogMenu(false);
    window.selectedBlogCategory = category; // Pass category to Blog component
  };

  const handleCreateBlog = () => {
    setPage('blog');
    setShowBlogMenu(false);
    window.selectedBlogCategory = 'Create'; // Signal Blog to show create form
  };

  return (
    <div className="App">
      {/* Header Section */}
      <header className="header-section">
        <div className="header-row">
          <img
            src="/sidelogos.png"
            alt="Logo Left"
            className="header-logo"
          />
          <div className="header-title" style={{ cursor: 'pointer' }} onClick={() => setPage('home')}>
            <img
              src="/centerlogo.png"
              alt="The Press Project Logo"
              className="center-logo"
              style={{ maxWidth: '600px', width: '100%' }}
            />
          </div>
          <img
            src="/sidelogos.png"
            alt="Logo Right"
            className="header-logo"
          />
        </div>
        <div className="header-subtitle">
          Upholding Democracy, One Story at a Time
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="navbar">
        <button className="nav-btn" onClick={() => setPage('home')}>HOME</button>
        <button className="nav-btn" onClick={() => setPage('about')}>ABOUT US</button>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button className="nav-btn" onClick={handleBlogNavClick}>BLOG</button>
          {showBlogMenu && (
            <div className="blog-nav-dropdown">
              <button className="blog-nav-item" onClick={handleCreateBlog}>Create Blog</button>
              <div className="blog-nav-divider"></div>
              {['All', 'News', 'Events', 'Features', 'Opinion', 'Campus', 'Culture', 'Other'].map(cat => (
                <button
                  key={cat}
                  className="blog-nav-item"
                  onClick={() => handleBlogCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="nav-btn">CONTACT US</button>
      </nav>

      {/* Main Content */}
      {page === 'home' && (
        <section className="hero-section">
          <img
            src="https://www.mrsmithworldphotography.com/photos/Buckingham-Palace-24.jpg"
            alt="Old Palace"
            className="hero-image"
          />
        </section>
      )}

      {page === 'about' && <AboutUs />}
      {page === 'blog' && <Blog />}
    </div>
  );
}

export default App;