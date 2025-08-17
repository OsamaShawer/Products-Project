import { Link } from "react-router-dom";

function HeaderComponent() {
  return (
    <header>
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/website">الرئيسية</Link></li>
            <li><Link to="/website">المتجر</Link></li>
          </ul>
        </nav>
        <img src="./assets/react.svg" alt="meaw" />
      </div>
    </header>
  );
}

export default HeaderComponent;