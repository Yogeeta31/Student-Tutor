import Header from "../layout/header"


const Layout = (props) => {
    return (
        <div className="container-fluid" style={{ padding: "0px" }}>
            <Header />
            <div className="container">
                {props.children}
            </div>
        </div>
    )
}
export default Layout