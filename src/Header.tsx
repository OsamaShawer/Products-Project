import { Link } from "react-router-dom";
import Alban from "./assets/alban.png";
function HeaderComponent() {
  return (
    <header>
      <div className="container">
        <nav>
          <ul>
            <li><Link className="link-react" to="/website">الرئيسية</Link></li>
            <li><Link className="link-react" to="/store">المتجر</Link></li>
            <li><Link className="link-react" to="/contact-us">تواصل معنا</Link></li>
            <li><Link className="link-react" to="/sign-in">تسجيل دخول</Link></li>
          </ul>
        </nav>
        <img src={Alban} alt="meaw" />
      </div>
    </header>
  );
}

export default HeaderComponent;