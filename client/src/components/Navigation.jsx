import { Link } from 'react-router-dom';

export function Navigation() {
    return (
        <div>
            <Link to="/users">
                <h1>Record App</h1>
            </Link>
            <Link to="/login">Login</Link>
        </div>
    );
}