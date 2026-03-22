import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { data } = await axios.post('/api/users/login', { email, password });
        login(data);
        navigate('/');
      } else {
        const { data } = await axios.post('/api/users', { name, email, password });
        login(data);
        navigate('/');
      }
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container" style={{ padding: '80px 20px', maxWidth: '500px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' }}>
        {isLogin ? 'Sign In' : 'Create Account'}
      </h1>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--text-muted)' }}>
        {isLogin ? "Welcome back!" : "Join us to get the best deals."}
      </p>

      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {!isLogin && (
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', color: '#fff' }}
              required
            />
          </div>
        )}
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', color: '#fff' }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', color: '#fff' }}
            required
          />
        </div>
        <button type="submit" className="btn" style={{ width: '100%', marginTop: '10px' }}>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontSize: '1rem', fontFamily: 'inherit', padding: 0 }}
          >
            {isLogin ? 'Register Here' : 'Login Here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
