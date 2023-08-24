import { useState } from 'react'
import images from '../../assets/images'
import '../../components/Stylesheets/Public.css'

const ContactPage = () => {
    const [msg, setMsg] = useState({
        firstname: "", lastname: "", email: "", message: ""
    })

    let fieldname, fieldvalue;

    const handleInputs = (e) => {
        fieldname = e.target.name;
        fieldvalue = e.target.value;

        setMsg({ ...msg, [fieldname]: fieldvalue })
    }

    return (
        <div className="ContactBG">
            <div className="container">
                <div className="ContactHeading">
                    <h3>Get in Touch</h3>
                </div>
                <div className="row">

                    <div className="col-sm">
                        <div className="" id='ContactColumn'>
                            <div className="ContactRows">
                                <div className="ContactDetails" >
                                    <img src={images.phone} id='ContactIcons' alt="" />
                                    <p>+91-9313641762</p>
                                </div>
                            </div>
                            <div className="ContactRows">
                                <div className="ContactDetails">
                                    <img src={images.email} id='ContactIcons' alt="" />
                                    <p>siphera.architects@gmail.com</p>
                                </div>
                            </div>
                            <div className="ContactRows">
                                <div className="ContactDetails">
                                    <img src={images.thumbsup} id='ContactIcons' alt="" />
                                    <img src={images.linkedinLogo} alt="" />
                                    <img src={images.instagramLogo} id='ContactSocial' alt="" />
                                    <img src={images.facebookLogo} id='ContactSocial' alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="ContactForm">
                            <form className="row g-3">
                                <div className=" col-md-6">
                                    <input type="text" name='firstname' className="form-control shadow-none" onChange={handleInputs} value={msg.firstname} id="inputEmail4" placeholder='First Name' />
                                </div>
                                <div className="col-md-6">
                                    <input type="text" name='lastname' className="form-control shadow-none" onChange={handleInputs} value={msg.lastname} id="inputPassword4" placeholder='Last Name' />
                                </div>
                                <div className="col-12">
                                    <input type="email" name='email' className="form-control shadow-none" onChange={handleInputs} value={msg.email} id="inputAddress" placeholder="Email" />
                                </div>
                                <div className="col-12">
                                    <textarea className="form-control shadow-none" name="message" onChange={handleInputs} value={msg.message} id="" cols="30" rows="5" placeholder='Your Message...' />
                                </div>
                                <div className="col-12">
                                    <button type="submit" id='MyButtonLight' className="btn btn-primary">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default ContactPage