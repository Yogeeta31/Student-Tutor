import Header from "../layout/Header"
import Footer from "../layout/Footer"
const Layout = (props) => {
    return (
        <div className="container-fluid" style={{ padding: "0px", overflowX: "hidden", overflowY: "auto", maxHeight: "700px" }}>
            <Header />
            <div className="container">
                {props.children}
            </div>
            <Footer />
        </div>
    )
}
export default Layout