import { useState, useEffect } from 'react';
import headerLogo              from '../images/header__logo.svg';

function Header({ loggedIn, children }) {

  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  function toggleAccountInfo() {
    if (!isBurgerMenuOpen && loggedIn) {
      setBurgerMenuOpen(true);
    } else setBurgerMenuOpen(false);
  }

  useEffect(() => {
    setBurgerMenuOpen(false);
  }, [loggedIn]);

  return (
    <header className={`header ${loggedIn && 'header__logged-in'}`}>
      <div className="header__icons">
        <img className="header__logo"
             src={headerLogo}
             alt="Логотип Место" />
        {loggedIn &&         
        <div className="burger">
          <input className="burger__switcher" 
                 id="burgerSwitcher"
                 type="checkbox"
                 onChange={toggleAccountInfo} />
          <label className="burger__button"
                 htmlFor="burgerSwitcher">
            <span className="burger__line"></span>
          </label>
        </div>
        }
      </div>
      <div className={`header__account ${loggedIn &&
                      'header__account_logged-in'} ${isBurgerMenuOpen &&
                      'header__account_visible'}`}>
        {children}
      </div>
    </header>
  )
}

export default Header;