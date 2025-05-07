import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import AboutPage from './components/AboutPage'; // Import the AboutPage component
import jsPDF from 'jspdf';
import ErrorBoundary from './components/ErrorBoundary'; // Import the ErrorBoundary component

const API_URL = "http://127.0.0.1:8000/api/";

const styles = {
  navbar: {
    backgroundColor: '#007bff',
    padding: '1rem',
    color: 'white',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  navTitle: {
    margin: 0,
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  hero: {
    backgroundColor: '#f4f4f4',
    padding: '2rem',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '2.5rem',
    margin: '0.5rem 0',
    color: '#333',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '1rem',
  },
  platformImages: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1rem',
    flexWrap: 'wrap',
  },
  platformImage: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
  },
  form: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '90%',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    margin: '0.5rem 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  select: {
    width: '100%',
    padding: '0.8rem',
    margin: '0.5rem 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  outputPage: {
    padding: '2rem',
    textAlign: 'center',
  },
  platformCard: {
    width: '250px',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    margin: '1rem',
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1rem 0',
  },
  infoContainer: {
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    textAlign: 'left',
  },
  aboutPage: {
    padding: '2rem',
    textAlign: 'left',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  summaryContainer: {
    margin: '1rem auto',
    padding: '1.5rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    textAlign: 'center',
  },
  platformAllocations: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
  },
};

// Navbar component
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.navTitle}>Ad Optimization Platform</h1>
      <div>
        <button
          style={{
            marginLeft: '1rem',
            padding: '0.8rem 2rem', // Increased padding for larger buttons
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px', // Slightly rounded corners
            fontSize: '1.2rem', // Increased font size
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <button
          style={{
            marginLeft: '1rem',
            padding: '0.8rem 2rem', // Increased padding for larger buttons
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px', // Slightly rounded corners
            fontSize: '1.2rem', // Increased font size
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onClick={() => navigate('/about')}
        >
          About
        </button>
      </div>
    </nav>
  );
};

// Hero section component
const HeroSection = () => {
  return (
    <div style={styles.hero}>
      <h2 style={styles.heroTitle}>Optimize Your Ad Campaigns with AI</h2>
      <p style={styles.heroSubtitle}>
        Allocate your budget intelligently and maximize your reach across platforms.
      </p>
      <div style={styles.platformImages}>
        <img src="/assests/images/google.png" alt="Google" style={styles.platformImage} />
        <img src="/assests/images/instagram.jpg" alt="Instagram" style={styles.platformImage} />
        <img src="/assests/images/youtube.png" alt="YouTube" style={styles.platformImage} />
        <img src="/assests/images/facebook.png" alt="Facebook" style={styles.platformImage} />
      </div>
    </div>
  );
};

const InfoContainer = () => {
  return (
    <div style={styles.infoContainer}>
      <h3>How to Use the App</h3>
      <p>1. Enter your total budget for the ad campaign. (e.g., ₹50,000)</p>
      <p>2. Enter the product or service you are advertising. (e.g., "Organic Snacks")</p>
      <p>3. Select the industry your product belongs to. (e.g., "Food")</p>
      <p>4. Optionally, select the target age ranges for your audience. (e.g., "20-30")</p>
      <p>5. Click "Optimize" to see the best budget allocation across platforms like Google, Instagram, YouTube, and Facebook.</p>
    </div>
  );
};

const exportToCSV = (response) => {
  const rows = [
    ['Platform', 'Allocated Budget', 'Estimated Reach', 'Estimated Ads'],
    ...Object.entries(response.platform_allocations).map(([platform, details]) => [
      platform,
      details.allocated_budget,
      details.estimated_reach,
      details.estimated_ads,
    ]),
  ];

  const csvContent = rows.map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'optimization_results.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const exportToPDF = (response) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text('Ad Optimization Results', 10, 10);

  // Add total budget and reach
  doc.setFontSize(12);
  doc.text(`Total Budget: ₹${response.total_budget}`, 10, 20);
  doc.text(`Total Estimated Reach: ${response.total_estimated_reach}`, 10, 30);

  // Add platform allocations
  doc.text('Platform Allocations:', 10, 40);
  const tableData = Object.entries(response.platform_allocations).map(([platform, details]) => [
    platform,
    `₹${details.allocated_budget}`,
    `${details.estimated_reach}`,
    `${details.estimated_ads}`,
  ]);

  const tableHeaders = ['Platform', 'Allocated Budget', 'Estimated Reach', 'Estimated Ads'];
  let y = 50;

  // Add table headers
  doc.setFontSize(10);
  tableHeaders.forEach((header, index) => {
    doc.text(header, 10 + index * 50, y);
  });

  // Add table rows
  y += 10;
  tableData.forEach((row) => {
    row.forEach((cell, index) => {
      doc.text(cell, 10 + index * 50, y);
    });
    y += 10;
  });

  // Save the PDF
  doc.save('optimization_results.pdf');
};

const ResultsPage = ({ response }) => {
  const navigate = useNavigate();

  if (!response || !response.platform_allocations) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Error</h2>
        <p>No valid data available. Please check your inputs and try again.</p>
      </div>
    );
  }

  // Prepare data for the charts
  const pieChartData = Object.entries(response.platform_allocations).map(([platform, details]) => ({
    name: platform,
    value: details.allocated_budget,
  }));

  const barChartData = Object.entries(response.platform_allocations).map(([platform, details]) => ({
    name: platform,
    reach: details.estimated_reach,
  }));

  const lineChartData = Object.entries(response.platform_allocations).map(([platform, details]) => ({
    name: platform,
    ads: details.estimated_ads,
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042']; // Keep this declaration here if only used in ResultsPage

  return (
    <div style={styles.outputPage}>
      <h2>🎉 Optimization Results 🎉</h2>
      <p>Total Budget: <strong>₹{response.total_budget}</strong></p>
      <p>Total Estimated Reach: <strong>{response.total_estimated_reach}</strong></p>

      {/* Render platform allocations */}
      <div style={styles.platformAllocations}>
        {Object.entries(response.platform_allocations).map(([platform, details]) => (
          <div key={platform} style={styles.platformCard}>
            <h4>{platform}</h4>
            <p><strong>Budget:</strong> ₹{details.allocated_budget}</p>
            <p><strong>Reach:</strong> {details.estimated_reach}</p>
            <p><strong>Ads:</strong> {details.estimated_ads}</p>
          </div>
        ))}
      </div>

      {/* Add Pie Chart */}
      <h3>Budget Allocation</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={pieChartData}
          cx={200}
          cy={150}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      {/* Add Bar Chart */}
      <h3>Platform Reach</h3>
      <BarChart width={500} height={300} data={barChartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="reach" fill="#82ca9d" />
      </BarChart>

      {/* Add Line Chart */}
      <h3>Ads Distribution</h3>
      <LineChart width={500} height={300} data={lineChartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ads" stroke="#8884d8" />
      </LineChart>

      {/* Export Buttons */}
      <div style={{ marginTop: '2rem' }}>
        <button
          style={{
            marginRight: '1rem',
            padding: '0.8rem 1.5rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
          onClick={() => exportToCSV(response)}
        >
          Export as CSV
        </button>
        <button
          style={{
            marginRight: '1rem',
            padding: '0.8rem 1.5rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
          onClick={() => exportToPDF(response)}
        >
          Export as PDF
        </button>
        <button
          style={{
            padding: '0.8rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

function App() {
  const [formData, setFormData] = useState({
    budget: '',
    product: '',
    industry: '',
    age_range_1: '',
    age_range_2: ''
  });

  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.budget || formData.budget < 1000) {
      alert('Please enter a budget of at least 1000.');
      return;
    }
    if (!formData.industry) {
      alert('Please select an industry.');
      return;
    }

    try {
      const res = await axios.post(`${API_URL}optimize/`, formData);
      console.log('Response from backend:', res.data); // Log the response
      setResponse(res.data);
      navigate('/results'); // Navigate to the results page
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.error) {
        alert(err.response.data.error); // Show backend error message
      } else {
        alert('Something went wrong. Please try again later.');
      }
      setResponse({}); // Reset response to avoid passing invalid data
    }
  };

  return (
    <div>
      <Navbar />
      <HeroSection />
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ padding: '2rem' }}>
              <InfoContainer /> {/* Add InfoContainer */}
              <form onSubmit={handleSubmit} style={styles.form}>
                <input
                  name="budget"
                  placeholder="Budget"
                  onChange={handleChange}
                  style={styles.input}
                /><br /><br />
                <input
                  name="product"
                  placeholder="Product"
                  onChange={handleChange}
                  style={styles.input}
                /><br /><br />
                <select name="industry" onChange={handleChange} style={styles.select}>
                  <option value="">Select Industry</option>
                  <option value="Food">Food</option>
                  <option value="Tech">Tech</option>
                  <option value="RealEstate">Real Estate</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Education">Education</option>
                  <option value="Travel">Travel</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Finance">Finance</option>
                </select><br /><br />
                <select name="age_range_1" onChange={handleChange} style={styles.select}>
                  <option value="">Select First Age Range</option>
                  <option value="15-20">15-20</option>
                  <option value="20-30">20-30</option>
                  <option value="30-40">30-40</option>
                  <option value="40-50">40-50</option>
                </select><br /><br />
                <select name="age_range_2" onChange={handleChange} style={styles.select}>
                  <option value="">Select Second Age Range (Optional)</option>
                  <option value="15-20">15-20</option>
                  <option value="20-30">20-30</option>
                  <option value="30-40">30-40</option>
                  <option value="40-50">40-50</option>
                </select><br /><br />
                <button type="submit" style={styles.button}>Optimize</button>
              </form>
            </div>
          }
        />
        <Route
          path="/results"
          element={
            <ErrorBoundary>
              <ResultsPage response={response} />
            </ErrorBoundary>
          }
        />
        <Route path="/about" element={<AboutPage />} /> {/* Add AboutPage route */}
      </Routes>
    </div>
  );
}

export default function RootApp() {
  return (
    <Router>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Router>
  );
}
