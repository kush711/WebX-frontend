import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// DashboardPage displays logged-in user info and provides logout/edit actions
export default function DashboardPage({ darkMode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  //check if user is logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!storedUser) {
      //Redirect to login
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  //Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  // If user data is not yet loaded, render nothing
  if (!user) return null;

  //Button class according to the theme
  const buttonClass = darkMode ? 'btn-light text-dark' : 'btn-dark text-light';

  const houseColors ={
    Gryffindor: { backgroundColor: '#7F0909', color: '#FFD700' },
    Ravenclaw: { backgroundColor: '#0E1A40', color: '#AAAAFF' },
    Hufflepuff: { backgroundColor: '#FFDB00', color: '#000000' },
    Slytherin: { backgroundColor: '#2A623D', color: '#D0D0D0' }   
  }
  const houseStyle = {
    ...houseColors[user.house],
    padding: '5px 10px',
    borderRadius: '20px',
    display: 'inline-block',
    fontWeight: 'bold',
    marginTop: '10px'
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-12 col-lg-8 text-center">
          <h1>Welcome back, {user.name}!</h1>
          <p><strong>Email:</strong> {user.email || 'N/A'}</p>
          <p><strong>Description:</strong> {user.description || 'Not provided'}</p>

          {user.house && (
            <p>
              <strong>House:</strong> <span style={houseStyle}>{user.house}</span>
            </p>
          )}
          <button className={`btn ${buttonClass} m-2`} onClick={handleLogout}>
            Logout
          </button>
          <button className={`btn ${buttonClass} m-2`} onClick={() => navigate('/edit-profile')}>
          Edit Profile
        </button>
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
  );
}
