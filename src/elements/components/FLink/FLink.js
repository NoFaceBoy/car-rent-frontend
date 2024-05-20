import {Link} from 'react-router-dom';

function FLink({ to, children }) {
    return <Link to={to} className="text-decoration-none">
        {children}
    </Link>
}

export default FLink;