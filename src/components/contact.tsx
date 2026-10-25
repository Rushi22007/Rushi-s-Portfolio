import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { toast } from "sonner";

import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import {
  CONTACT_RECAPTCHA_ACTION,
  isValidContactEmail,
  isValidContactMessage,
  isValidContactName,
  type ContactFormFields,
} from "../lib/contact";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";

const FIELD_VALIDATORS: Record<
  keyof ContactFormFields,
  (value: string) => boolean
> = {
  name: isValidContactName,
  email: isValidContactEmail,
  message: isValidContactMessage,
};

const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const formRef = useRef<HTMLFormElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const hasAttemptedSubmit = useRef(false);
  const [form, setForm] = useState<ContactFormFields>({
    name: "",
    email: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const el = messageRef.current;
    if (!el) return;

    el.style.overflowY = "hidden";
    el.style.height = "auto";

    const nextHeight = el.scrollHeight;
    const maxHeight = Number.parseFloat(getComputedStyle(el).maxHeight);

    if (Number.isFinite(maxHeight) && nextHeight >= maxHeight) {
      el.style.height = `${maxHeight}px`;
      el.style.overflowY = "auto";
      return;
    }

    el.style.height = `${nextHeight}px`;
  }, [form.message]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = e.target.name as keyof ContactFormFields;
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));

    if (!hasAttemptedSubmit.current) return;

    const isInvalid = !FIELD_VALIDATORS[field](value);
    setFieldErrors((prev) =>
      prev[field] === isInvalid ? prev : { ...prev, [field]: isInvalid },
    );
  };

  const validateForm = () => {
    hasAttemptedSubmit.current = true;

    const nextErrors = {
      name: !isValidContactName(form.name),
      email: !isValidContactEmail(form.email),
      message: !isValidContactMessage(form.message),
    };

    setFieldErrors(nextErrors);

    return !nextErrors.name && !nextErrors.email && !nextErrors.message;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!executeRecaptcha) {
      toast.error("reCAPTCHA is not ready. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const recaptchaToken = await executeRecaptcha(CONTACT_RECAPTCHA_ACTION);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          recaptchaToken,
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        toast.error(data?.error ?? "Something went wrong.");
        return;
      }

      toast.success("Thanks for contacting me.");
      setForm({
        name: "",
        email: "",
        message: "",
      });
      setFieldErrors({
        name: false,
        email: false,
        message: false,
      });
    } catch (error) {
      console.error("[CONTACT_ERROR]: ", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mt-12 flex flex-col gap-8"
    >
      <label htmlFor="name" className="flex flex-col">
        <span className="text-white font-medium mb-4">Your Name*</span>
        <input
          type="text"
          name="name"
          id="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
          title="What's your name?"
          maxLength={200}
          disabled={loading}
          aria-disabled={loading}
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-hidden border-none font-medium disabled:bg-tertiary/20 disabled:text-white/60"
        />

        <span
          className={`text-red-400 mt-2 ${fieldErrors.name ? "" : "hidden"}`}
          id="name-error"
        >
          Invalid Name!
        </span>
      </label>

      <label htmlFor="email" className="flex flex-col">
        <span className="text-white font-medium mb-4">Your Email*</span>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          placeholder="johndoe@email.com"
          title="What's your email?"
          maxLength={100}
          disabled={loading}
          aria-disabled={loading}
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-hidden border-none font-medium disabled:bg-tertiary/20 disabled:text-white/60"
        />

        <span
          className={`text-red-400 mt-2 ${fieldErrors.email ? "" : "hidden"}`}
          id="email-error"
        >
          Invalid E-mail!
        </span>
      </label>

      <label htmlFor="message" className="flex flex-col">
        <span className="text-white font-medium mb-4">Your Message*</span>
        <textarea
          ref={messageRef}
          rows={7}
          name="message"
          id="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Hello there!"
          title="What do you want to say?"
          maxLength={500}
          disabled={loading}
          aria-disabled={loading}
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-hidden border-none font-medium resize-none overflow-hidden max-h-96 disabled:bg-tertiary/20 disabled:text-white/60"
        />

        <span
          className={`text-red-400 mt-2 ${fieldErrors.message ? "" : "hidden"}`}
          id="message-error"
        >
          Invalid Message!
        </span>
      </label>

      <button
        type="submit"
        title={loading ? "Sending..." : "Send"}
        className="bg-tertiary py-3 px-8 outline-hidden w-fit text-white font-bold shadow-md shadow-primary rounded-xl disabled:bg-tertiary/20 disabled:text-white/60"
        disabled={loading}
        aria-disabled={loading}
      >
        {loading ? "Sending..." : "Send"}
      </button>
      <p className="mt-3 text-xs text-secondary/70">
        This site is protected by reCAPTCHA.
      </p>
    </form>
  );
};

const DirectContactForm = () => {
  const [form, setForm] = useState<ContactFormFields>({
    name: "",
    email: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = {
      name: !isValidContactName(form.name),
      email: !isValidContactEmail(form.email),
      message: !isValidContactMessage(form.message),
    };
    setFieldErrors(nextErrors);
    if (nextErrors.name || nextErrors.email || nextErrors.message) return;

    const mailtoUrl = `mailto:officialrushikesh22@gmail.com?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${form.name}`
    )}&body=${encodeURIComponent(
      `Hi Rushikesh,\n\n${form.message}\n\nBest regards,\n${form.name}\n${form.email}`
    )}`;

    window.location.href = mailtoUrl;
    toast.success("Opening your email client to send the message!");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
      <label htmlFor="direct-name" className="flex flex-col">
        <span className="text-white font-medium mb-3">Your Name*</span>
        <input
          type="text"
          name="name"
          id="direct-name"
          value={form.name}
          onChange={handleChange}
          placeholder="What's your name?"
          maxLength={200}
          className="bg-tertiary py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-hidden border border-secondary/10 font-medium"
        />
        {fieldErrors.name && (
          <span className="text-red-400 mt-2 text-sm">Please enter a valid name (at least 3 characters).</span>
        )}
      </label>

      <label htmlFor="direct-email" className="flex flex-col">
        <span className="text-white font-medium mb-3">Your Email*</span>
        <input
          type="email"
          name="email"
          id="direct-email"
          value={form.email}
          onChange={handleChange}
          placeholder="What's your email?"
          maxLength={100}
          className="bg-tertiary py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-hidden border border-secondary/10 font-medium"
        />
        {fieldErrors.email && (
          <span className="text-red-400 mt-2 text-sm">Please enter a valid email address.</span>
        )}
      </label>

      <label htmlFor="direct-message" className="flex flex-col">
        <span className="text-white font-medium mb-3">Your Message*</span>
        <textarea
          rows={5}
          name="message"
          id="direct-message"
          value={form.message}
          onChange={handleChange}
          placeholder="How can I help you with Data Analytics or Python development?"
          maxLength={500}
          className="bg-tertiary py-3 px-5 placeholder:text-secondary text-white rounded-lg outline-hidden border border-secondary/10 font-medium resize-none"
        />
        {fieldErrors.message && (
          <span className="text-red-400 mt-2 text-sm">Please enter a message (at least 5 characters).</span>
        )}
      </label>

      <button
        type="submit"
        className="bg-[#915eff] hover:bg-[#804dee] py-3 px-8 outline-hidden w-fit text-white font-bold shadow-md shadow-primary rounded-xl transition cursor-pointer flex items-center gap-2"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
        Send Direct Message
      </button>
    </form>
  );
};

export const Contact = () => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  return (
    <SectionWrapper idName="contact">
      <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>

          {/* Direct Contact Details Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="mailto:officialrushikesh22@gmail.com"
              className="flex items-center gap-3.5 bg-tertiary/60 hover:bg-tertiary p-4 rounded-xl border border-secondary/15 hover:border-[#915eff]/50 transition group"
            >
              <div className="w-11 h-11 rounded-lg bg-[#915eff]/20 flex items-center justify-center text-[#915eff] shrink-0 group-hover:scale-110 transition">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-secondary font-medium uppercase tracking-wider">Email</span>
                <span className="text-[14px] font-semibold text-white group-hover:text-[#915eff] transition truncate">
                  officialrushikesh22@gmail.com
                </span>
              </div>
            </a>

            <a
              href="tel:+918767599309"
              className="flex items-center gap-3.5 bg-tertiary/60 hover:bg-tertiary p-4 rounded-xl border border-secondary/15 hover:border-[#915eff]/50 transition group"
            >
              <div className="w-11 h-11 rounded-lg bg-[#915eff]/20 flex items-center justify-center text-[#915eff] shrink-0 group-hover:scale-110 transition">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-secondary font-medium uppercase tracking-wider">Mobile</span>
                <span className="text-[14px] font-semibold text-white group-hover:text-[#915eff] transition">
                  +91 8767599309
                </span>
              </div>
            </a>

            <div className="sm:col-span-2 flex items-center gap-3.5 bg-tertiary/40 p-4 rounded-xl border border-secondary/10">
              <div className="w-11 h-11 rounded-lg bg-[#915eff]/20 flex items-center justify-center text-[#915eff] shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-secondary font-medium uppercase tracking-wider">Location</span>
                <span className="text-[14px] font-medium text-white">
                  Pune, Maharashtra, India
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-secondary/10 pt-6">
            <p className="text-sm font-medium text-secondary mb-2">Or send a message directly:</p>
            {siteKey ? (
              <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
                <ContactForm />
              </GoogleReCaptchaProvider>
            ) : (
              <DirectContactForm />
            )}
          </div>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-137.5 h-87.5"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
