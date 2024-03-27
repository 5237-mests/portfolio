import { Suspense, useState } from "react";
import emailjs from "@emailjs/browser";
import Fox from "../models/Fox";
import { Canvas } from "@react-three/fiber";

import Loader from "../components/Loader.jsx";
import useAlert from "../hooks/useAlert.js";
import Alert from "../components/Alert.jsx";
import { contact, mail } from '../assets/icons/index.js'

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFocus = () => {
    setCurrentAnimation("walk");
  };

  const handleBlur = () => {
    setCurrentAnimation("idle");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Mesfin",
          from_email: form.email,
          to_email: "mesfin-mulugeta@outlook.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsLoading(false);

        showAlert({
          show: true,
          text: "Message sent successfully",
          type: "success",
        });

        setTimeout(() => {
          setForm({
            name: "",
            email: "",
            message: "",
          });

          setCurrentAnimation("idle");
          hideAlert();
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setCurrentAnimation("idle");

        showAlert({
          show: true,
          text: "Something went wrong",
          type: "danger",
        });
      });
  };

  return (
    <div className="py-20 h-full">
      <div className="w-7/12 mx-auto">
         <h1 className="text-2xl font-bold">Get in Touch</h1>
          <p className="text-lg text-gray-500">
            I am always open to new opportunities and projects. Feel free to contact me if you have any questions or would like to work together.
          </p>
      </div>
      <section className="relative flex lg:flex-row flex-col w-7/12 mx-auto">
        {alert.show && <Alert {...alert} />}
        <div className="flex-1 min-w-[50%] flex flex-col pt-10">
          <form
            className="w-full flex flex-col gap-7 mt-7"
            onSubmit={handleSubmit}
          >
            <label className="text-black-500 font-semibold">
              Name <br />
              <input
                type="text"
                value={form.name}
                onChange={handleChange}
                name="name"
                placeholder="John Doe"
                className="input"
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <label className="text-black-500 font-semibold">
              Email <br />
              <input
                type="email"
                value={form.email}
                onChange={handleChange}
                name="email"
                placeholder="john@gmail.com"
                className="input"
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <label className="text-black-500 font-semibold">
              Message <br />
              <textarea
                value={form.message}
                onChange={handleChange}
                name="message"
                rows={4}
                placeholder="Let me know how I can help you!"
                className="textarea"
                required
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <button type="submit" className="btn">
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
          <Canvas
            camera={{
              position: [0, 0, 5],
              fov: 75,
              near: 0.1,
              far: 1000,
            }}
          >
            <directionalLight position={[0, 0, 1]} intensity={2.5} />
            <ambientLight intensity={0.5} />
            <Suspense fallback={<Loader />}>
              <Fox
                position={[0.5, 0.35, 0]}
                scale={[0.5, 0.5, 0.5]}
                rotation={[12.7, -0.7, 0]}
                currentAnimation={currentAnimation}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>
      
      <div className="flex justify-end justify-centerr items-centerr flex-coll pt-20 w-11/12">
        <div className="flex gap-8">
          <div>
            <a href="tel:+251931256054">
              <img src={contact} alt="phone" width={24}/>
            </a>
          </div>

          <div>
            <a href="mailto:msfnmulgeta@gmail.com">
              <img src={mail} alt="E-mail" width={24}/>
            </a>
          </div>
        </div>
      </div>
    </div>);
};

export default Contact;
