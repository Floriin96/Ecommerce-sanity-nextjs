import React, { useEffect, useState } from "react";
import classes from "./style.module.css";

const ContactView = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, message }),
    })
      .then((res) => res.json())
      .then((res) =>
        setMsg(
          res.error
            ? "Something went wrong, please try again later"
            : "¡Message sended!"
        )
      )
      .catch(() => setMsg("Something went wrong, please try again later"))
      .finally(() => {
        setSending(false);
      });
  };

  useEffect(() => {
    let key = null;
    if (msg) {
      key = setTimeout(() => {
        setMsg("");
      }, 2000);
    }
    return () => key && clearTimeout(key);
  }, [msg]);

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "2em" }}>Contact</h2>
      <div className={classes.container}>
        <form className={classes.form} onSubmit={onSubmit}>
          <h3>Send Us A Message</h3>
          <label>
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <textarea
            placeholder="How Can We Help?"
            value={message}
            rows={10}
            required={true}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button disabled={sending} type="submit">
            Submit
          </button>
          {msg && <p>{msg}</p>}
        </form>
        <div>
          <p>Sale Support</p>
          <p>contact@example.com</p>
        </div>
      </div>
    </>
  );
};

export default ContactView;
