import { useNavigate } from 'react-router-dom';
import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie'; 
import styles from '../../styles/components/common/Navbar.module.scss'

type SearchResult = {
  id: string;
  name: string;
};

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [cookies] = useCookies(['auth_token']);

  const homeClick = () => {
    navigate('/home');
  };

  const productClick = () =>{
    navigate('/products')
  }

  const MyCartClick = () => {
    navigate('/my-cart');
  };

  const signOutClick = () => {
    navigate('/');
    // removeCookies('auth_token');
  };

  const profileClick = () => {
    navigate('/my-addresses');
  }

  const MyOrdersClick = () => { 
    navigate('/my-orders')
  }

  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      console.log("This is the cookie", cookies)
      const token = cookies.auth_token; 
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get<SearchResult[]>(
          `${import.meta.env.VITE_API_BASE_URL}/search`,
          {
            params: { query },
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            
          }
        );

        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (id: string) => {
    navigate(`/product/${id}`);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className={styles['header']}>
  <nav className={styles['nav']}>
    <ul className={styles['nav-list']}>
      <li className={styles['nav-item']} onClick={homeClick}>
        Home
      </li>
      <li className={styles['nav-item']} onClick={productClick}>
        Products
      </li>
      <li className={styles['nav-item']}  onClick={MyCartClick}>
        My Cart
      </li>
      <li className={styles['nav-item']}  onClick={profileClick}>
        Addresses
      </li>
    </ul>

    <div className={styles['search-container']} >
      <input
        type="text"
        placeholder="Search"
        className={styles['search-input']}
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {searchResults.length > 0 && (
        <ul className={styles['search-results']}>
          {searchResults.map((item) => (
            <li
              key={item.id}
              className={styles["search-result-item"]}
              onClick={() => handleResultClick(item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>

    <button className={styles["my-orders-btn"]} onClick={MyOrdersClick}>
      My Orders
    </button>
    <button className={styles["sign-out-btn"]} onClick={signOutClick}>
      Sign Out
    </button>
  </nav>
</div>

  );
};

export default Navbar;
