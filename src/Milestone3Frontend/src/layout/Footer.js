import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-dark text-center text-lg-start" style={{ color: "white", backgroundColor: "#212529", position: "absolute", bottom: "0", width: "100%" }}>
            <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                {/* © 2022 Copyright : <Link className="text-light" to="/">MentorMe.com</Link> */}
                This Website is for learning purpose - Hochschule Fulda
            </div>
        </footer>
    )
}

export default Footer;