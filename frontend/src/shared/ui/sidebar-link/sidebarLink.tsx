import { Link } from "react-router-dom";

import './styles.scss';

interface SidebarLinkProps {
    linkPath : string;
    linkValue : string;
}

export const SidebarLink = (props: SidebarLinkProps) => {
    return <Link className="sidebar-link" to={props.linkPath}>{props.linkValue}</Link>
}