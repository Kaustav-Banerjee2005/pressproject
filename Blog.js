import React, { useState, useRef } from 'react';
import './App.css';

const categories = [
  'All',
  'News',
  'Events',
  'Features',
  'Opinion',
  'Campus',
  'Culture',
  'Other'
];

const initialCategory = window.selectedBlogCategory === 'Create' ? 'All' : window.selectedBlogCategory || 'All';
const initialShowForm = window.selectedBlogCategory === 'Create';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState([]);
  const [category, setCategory] = useState('News');
  const [showForm, setShowForm] = useState(initialShowForm);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const fileInputRef = useRef();

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMedia(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content && category) {
      setBlogs([{ title, content, media, category }, ...blogs]);
      setTitle('');
      setContent('');
      setMedia([]);
      setCategory('News');
      fileInputRef.current.value = '';
      setShowForm(false);
    }
  };

  const filteredBlogs =
    selectedCategory === 'All'
      ? blogs
      : blogs.filter(blog => blog.category === selectedCategory);

  return (
    <section className="blog-section">
      <div className="blog-header">
        <h2>Blog</h2>
        <div className="blog-actions">
          <div className="blog-dropdown">
            <label htmlFor="category-select">View by Category:</label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="blog-category-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <button
            className="blog-create-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Create Blog'}
          </button>
        </div>
      </div>
      {showForm && (
        <form className="blog-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="blog-input"
            required
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="blog-category-select"
            required
          >
            {categories.filter(cat => cat !== 'All').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <textarea
            placeholder="Blog Content (supports basic HTML like <b>, <i>, <u>)"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="blog-textarea"
            required
          />
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleMediaChange}
            ref={fileInputRef}
            className="blog-media-input"
          />
          <button type="submit" className="blog-submit">Publish</button>
        </form>
      )}
      <div className="blog-list">
        {filteredBlogs.length === 0 ? (
          <p>No blogs in this category yet.</p>
        ) : (
          filteredBlogs.map((blog, idx) => (
            <div key={idx} className="blog-item">
              <div className="blog-category-label">{blog.category}</div>
              <h3>{blog.title}</h3>
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              <div className="blog-media-preview">
                {blog.media.map((file, i) => {
                  const url = URL.createObjectURL(file);
                  if (file.type.startsWith('image/')) {
                    return <img key={i} src={url} alt="blog-media" className="blog-media-img" />;
                  }
                  if (file.type.startsWith('video/')) {
                    return (
                      <video key={i} controls className="blog-media-video">
                        <source src={url} type={file.type} />
                        Your browser does not support the video tag.
                      </video>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Blog;