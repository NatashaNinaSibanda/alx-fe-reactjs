import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav
      style={{
        padding: '12px 20px',
        backgroundColor: '#004080',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div style={{ fontWeight: 'bold' }}>My Company</div>
      <div>
        <Link to="/" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>Home</Link>
        <Link to="/about" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>About</Link>
        <Link to="/services" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>Services</Link>
        <Link to="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;

