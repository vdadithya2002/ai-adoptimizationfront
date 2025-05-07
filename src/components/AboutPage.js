import React from 'react';

const AboutPage = () => {
  return (
    <div style={styles.aboutPage}>
      <h2>About the Project</h2>
      <h3>Problem Statement</h3>
      <p>Businesses struggle to allocate their ad budgets effectively across multiple platforms.</p>
      <h3>Solution</h3>
      <p>Our app uses AI and optimization techniques to intelligently allocate budgets and maximize reach.</p>
      <h3>Workflow</h3>
      <p>1. Input your budget and campaign details.</p>
      <p>2. The app calculates the best allocation using optimization algorithms.</p>
      <p>3. View the results with detailed charts and insights.</p>
      <h3>Tech Stack</h3>
      <ul>
        <li>Frontend: React, Recharts</li>
        <li>Backend: Django, Scipy</li>
        <li>Database: SQLite</li>
      </ul>
    </div>
  );
};

const styles = {
  aboutPage: {
    padding: '2rem',
    textAlign: 'left',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default AboutPage;