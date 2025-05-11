import React, { useState } from 'react';

function LoginPage() {
  const [showPopup, setShowPopup] = useState(false);

  const handleLogin = () => {
    setShowPopup(true);
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button onClick={handleLogin}>Login</button>

      {showPopup && (
        <div className="popup">
          <p>Login successful!</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
