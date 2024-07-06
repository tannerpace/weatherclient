'use client'
import { useState } from "react"
import Confetti from 'react-confetti'
import { FaAddressBook, FaPaperPlane } from "react-icons/fa"

import { title } from "@/app/contact/config"
import Input from "@/app/shared/Input"

import styles from "./styles.module.css"
export default function ContactForm() {
  const [message, setMessage] = useState('');
  const [confetti, setConfetti] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setMessage('Your message was sent successfully!, We will get back to you soon!');
      setConfetti(true);
      setConfetti(true);
    } else {
      setMessage('There was an error sending your message.');
      setConfetti(false);
    }
  };

  return (
    <div
      className={styles.container}
    >  {confetti && <Confetti />}
      <div className={styles.form}>
        <h1
          style={{
            textAlign: "center",
            margin: "2rem 0"
          }}
        >{title}</h1>
        <form name="contact" method="POST" action="/api/contact"

          onSubmit={handleSubmit}
        >
          <label
            style={{
              marginLeft: "2rem"
            }}
            htmlFor="firstName"> First Name</label>
          <Input type="text" name="name" label={"first name :"} required style={{ backgroundColor: "#f5f5f5" }} />
          {/* last name */}
          <label
            style={{
              marginLeft: "2rem"
            }}
            htmlFor="lastName">Last Name</label>
          <Input type="text" name="lastName" label={"last name :"} required style={{ backgroundColor: "#f5f5f5" }} />

          <label
            style={{
              marginLeft: "2rem"
            }}
            htmlFor="email">Email</label>
          <Input type="email" name="email" label={"email :"} required style={{ backgroundColor: "#f5f5f5" }} />
          <label
            style={{
              marginLeft: "2rem"
            }}
            htmlFor="message">Message</label>
          <input type="hidden" name="form-name" value="contact" />
          <Input
            as="textarea"
            style={{
              height: "10rem",
              borderRadius: "0.5rem",
              resize: "none",
              backgroundColor: "#f5f5f5",
              color: "#333",
            }}
            numberOfLines={10}
            name="message"
            required

          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
              width: "100%",
              padding: "0 2rem"
            }}>
            {message && <p>{message}</p>}
            <button type="submit"
              disabled={message}
              style={{
                marginBottom: "2rem",
                fontSize: "1.5rem",
                borderRadius: "0.5rem",
                backgroundColor: "#f5f5f5",
                color: "#333",

                cursor: "pointer",
                border: "1px solid #333",
                padding: "0.5rem 1rem",
              }}
            >
              {!message ? <FaPaperPlane /> : <FaAddressBook />} {message ? 'Sent!' : 'Send'}
            </button>
          </div>
        </form>
        {message && (
          <p style={{ color: confetti ? 'green' : 'red' }}>
            {message}
          </p>
        )}
      </div>
    </div >

  )
}