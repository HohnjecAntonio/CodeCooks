import { Link} from "react-router-dom"

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to = "/">Home</Link>
                    </li>
                    <li>
                        <Link to = "/Registracija">Registracija</Link>
                    </li>
                    <li>
                        <Link to = "/Login">Login</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
};

export default Layout;