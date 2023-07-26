import { Link, useLocation, useMatch, useResolvedPath } from "react-router-dom";
import "./CustomLink.css";

interface CustomLinkProps {
  to: string;
  children: any;
}

function CustomLink(props: CustomLinkProps): JSX.Element {
  
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });
  // -------------------------------
  const location = useLocation();
  const isRootAndHome = location.pathname==='/' && props.to==="/home";
  // -------------------------------
  
  return (
    <div className="CustomLink">
      {/* <div className={(isRoot? " active":"")}> </div> */}
      <Link
        className={(match||isRootAndHome) ? "active" : "inactive"}
        to={props.to}
      >
        {props.children}
      </Link>
    </div>
  );
}

export default CustomLink;
