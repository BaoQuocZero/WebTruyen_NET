
import { Link } from 'react-router-dom';
import '../Homepage/Style.css';

const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/">Tác giả</Link>
            <Link to="/comic">Truyện tranh</Link>
            <Link to="/genre">Thể loại</Link>
        </nav>
    )
}

export default Nav;