import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

import styles from './NavBar.module.css'


const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      {user ? (
        <nav className={styles.container}>
          <ul>
            <li>Welcome, {user.username}</li>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/hoots">HOOTS</Link>
            </li>
            <li>
              <Link to="/hoots/new">NEW HOOT</Link>
            </li>
            <li>
              <Link to="" onClick={handleSignout}>
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default NavBar;
