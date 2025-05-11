import React, { useState } from 'react';

function TrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  const handleTrackOrder = async () => {
    setStatus(null);
    setError('');

    try {
      // Example: Simulate backend tracking response
      const response = await fetch(`http://localhost:4000/track/${trackingId}`);
      if (!response.ok) {
        throw new Error('Tracking ID not found');
      }

      const data = await response.json();
      setStatus(data.status);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="tracking-page">
      <h2>Track Your Order</h2>

      <input
        type="text"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        placeholder="Enter Tracking ID"
      />
      <button onClick={handleTrackOrder}>Track</button>

      {status && (
        <div className="tracking-result">
          <h4>Order Status:</h4>
          <p>{status}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default TrackingPage;
