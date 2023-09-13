import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ReCAPTCHA from 'react-google-recaptcha';

import './contact.css';


const SITE_KEY = '6LeMrx0oAAAAAIQsJXy7_cFhdXrnL3clCJvnww_U';

const Result=()=>{
    return(
        <p>Your message has been successfully sent. I will cantact you soon.</p>
    )
}

export const ContactUs = () => {
    const form = useRef();
    const captchaRef = useRef();

    const [PhoneNumber, setPhoneNumber] = useState('');
    const [result, showResult] = useState(false);

    // reCaptcha value
    const [capVal, setCapVal] = useState(null);


    // update phone Number
    const handleChange = (value) => {
        setPhoneNumber(value);
    }

    // send details to your email via email.js
    const sendEmail = (e) => {

        e.preventDefault();
        captchaRef.current.reset();

        emailjs.sendForm('service_rlpm23l', 'template_fmqqxpm', form.current, 't-PuR3XowSyB03XRs')
            .then((result) => {
                console.log(result.text);
                console.log("message sent");
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
        setPhoneNumber('');
        showResult(true);

    };

    // hide result
    setTimeout(()=>{
        showResult(false);
    }, 3000);


    return (
        <div className='container'>
            <form ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" name="user_name" required />
                <label>Email</label>
                <input type="email" name="user_email" required />
                <label>Phone Number</label>
                <PhoneInput
                    country={'us'}
                    name="phone_number"
                    value={PhoneNumber}
                    onChange={handleChange}
                    inputProps={{
                        requied: true,
                    }}
                />
                <label>Message</label>
                <textarea name="message" />

                <div className='container mt-2'>
                    <ReCAPTCHA
                        sitekey={SITE_KEY}
                        onChange={(val) => setCapVal(val)}
                        ref={captchaRef}
                    />
                </div>

                <div children = "row">
                    {result ? <Result/> : null}
                </div>

                <button disabled={!capVal} type="submit">send</button>
            </form>
        </div>


    );
};
export default ContactUs;