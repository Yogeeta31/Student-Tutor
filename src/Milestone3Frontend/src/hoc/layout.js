import Header from "../layout/Header"
import Footer from "../layout/Footer"
const Layout = (props) => {
    return (
        <div className="container-fluid" style={{ padding: "0px" }}>
            <Header />
            <div className="container">
                {props.children}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
export default Layout