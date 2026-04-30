// Debug version - check console for errors
console.log('App.jsx loading...');
console.log('React available:', typeof React);
console.log('ReactDOM available:', typeof ReactDOM);

// Simple test without JSX first
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
  
  // Test basic rendering
  const root = document.getElementById('root');
  if (root) {
    console.log('Root element found');
    root.innerHTML = `
      <div style="padding: 40px; font-family: Arial; background: #0f2138; color: white; min-height: 100vh;">
        <h1 style="font-size: 32px; margin-bottom: 20px;">Synersys Security Portal</h1>
        <p style="font-size: 18px;">App is loading...</p>
        <div id="react-test" style="margin-top: 20px; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 8px;">
          React test area
        </div>
      </div>
    `;
    
    // Try React after basic content
    setTimeout(() => {
      try {
        if (typeof React !== 'undefined' && typeof ReactDOM !== 'undefined') {
          console.log('Attempting React render...');
          const element = React.createElement('div', {
            style: { 
              padding: '20px', 
              background: '#f26b1f', 
              color: 'white',
              borderRadius: '8px',
              marginTop: '10px'
            }
          }, 'React Component Working!');
          
          ReactDOM.render(element, document.getElementById('react-test'));
        } else {
          console.error('React or ReactDOM not available');
        }
      } catch (err) {
        console.error('React render failed:', err);
      }
    }, 1000);
  } else {
    console.error('Root element not found');
  }
});

// Original App component (commented out for debugging)
/*
const { useState } = React;

function App() {
  return (
    <div style={{ padding: "40px", background: "#0f2138", color: "#fff" }}>
      <h1>Synersys Security Portal</h1>
      <p>App is working!</p>
    </div>
  );
}
*/
