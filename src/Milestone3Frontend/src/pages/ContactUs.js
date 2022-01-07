// import "../css/ContactUs.css"
// const ContactUs = () => {
//     return (
//         <div class="container contact-form">
//             <div class="contact-image">
//                 <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact" />
//             </div>
//             {/* class="btnContact" */}
//             <form method="post">
//                 <h3>Drop Us a Message</h3>
//                 <div class="row">
//                     <div class="col-md-6">
//                         <div class="form-group">
//                             <input type="text" name="txtName" class="form-control" placeholder="Your Name *" value="" />
//                         </div>
//                         <div class="form-group">
//                             <input type="text" name="txtEmail" class="form-control" placeholder="Your Email *" value="" />
//                         </div>
//                         <div class="form-group">
//                             <input type="text" name="txtPhone" class="form-control" placeholder="Your Phone Number *" value="" />
//                         </div>
//                         <div class="form-group mr-3">
//                             <input type="submit" name="btnSubmit" className="btn btn-outline-dark" value="Send Message" />
//                         </div>
//                     </div>
//                     <div class="col-md-6">
//                         <div class="form-group">
//                             <textarea name="txtMsg" class="form-control" placeholder="Your Message *" style={{ width: "100%", height: "150px" }}></textarea>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }
// export default ContactUs;


import "../css/ContactUs.css"
const ContactUs = () => {
    return (
        <div className="container py-5">

            <div className="row mb-4 rounded">
                <div className="col-lg-8 mx-auto text-center">
                    <h1 className="display-4">CONTACT US</h1>
                    <p className="lead mb-0">We are here to answer any question that you may have.</p>
                    <p className="lead">We will get back to you as soon as possible.</p>
                </div>

                <div className="row">
                    <div className="col-lg-7 mx-auto">
                        <div className="bg-white rounded-lg shadow-sm p-5">

                            <div className="tab-content">
                                <div id="nav-tab-card" className="tab-pane fade show active">

                                    <form>
                                        <div className="form-group mt-2">
                                            <label>Email</label>
                                            <input type="text" name="username" placeholder="Enter Your Email" className="form-control" />
                                        </div>
                                        <div className="form-group mt-2">
                                            <label>Tell us about issue</label>
                                            <textarea className="form-control" name="username" placeholder="Explain your issue" rows="3"></textarea>
                                        </div>
                                        <button type="button" className="btn btn-outline-dark mt-3">Confirm</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default ContactUs;