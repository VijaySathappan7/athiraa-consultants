import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import backgroundImage from '../assets/images/background.webp';

const Contact = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    division: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const dropdownRef = useRef(null);

  const divisions = [
    { id: "wealth", label: "Wealth Management" },
    { id: "corporate", label: "Corporate Finance & Advisory" },
    { id: "real-estate", label: "Real Estate Advisory" },
    { id: "tax", label: "Tax Planning & Compliance" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.division) newErrors.division = "Please select a service";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after success message
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", email: "", phone: "", division: "", message: "" });
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <section id="contact" className="bg-black py-28 lg:py-32 relative overflow-hidden flex flex-col justify-center border-t border-white/5 scroll-mt-0">
      
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 pointer-events-none"></div>
      
      {/* Animated Orbs */}
      <motion.div 
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-gold/20 rounded-full blur-[140px] pointer-events-none"
      ></motion.div>
      <motion.div 
        animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.3, 1], x: [0, -50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-brand-primary/50 rounded-full blur-[150px] pointer-events-none"
      ></motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex-1 flex flex-col justify-center max-w-[1440px]">
        
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-center justify-between">
          
          {/* LEFT: Contact Info */}
          <div className="w-full lg:w-[50%] flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-brand-gold"></div>
                <p className="text-[10px] md:text-xs tracking-[0.7em] uppercase text-brand-gold font-black">Get In Touch</p>
              </div>
              
              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-[3rem] lg:text-[3.4rem] xl:text-[3.8rem] font-playfair text-white leading-[1.15] tracking-tight mb-8 md:mb-10">
                Connect With Our <br />
                <span className="italic font-light text-brand-gold relative">
                  Advisory Team.
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-gold/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" fill="transparent" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
              </h2>
              
              <p className="text-white/70 font-light leading-relaxed text-base lg:text-lg mb-16 max-w-md">
                Whether you need help with wealth management, corporate finance, tax planning, or real estate — our team is here to guide you with honest, practical advice.
              </p>
            </motion.div>

            {/* Office & Contact Grid */}
            <div className="grid sm:grid-cols-2 gap-12 transform-gpu">
              {[
                { title: "Head Office", lines: ["Athiraa Consultants,", "Trichy, Tamil Nadu,", "India"], link: "mailto:advisory@athiraa.com", label: "advisory@athiraa.com", icon: "gold" },
                { title: "Client Services", lines: ["Available Mon - Sat", "09:00 AM - 06:00 PM IST", "Confidential & Personalised"], link: "tel:+916369888789", label: "+91 6369888789", icon: "white" }
              ].map((item, i) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.70, delay: 0.20 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col relative group"
                >
                  <div className="absolute -left-6 top-0 w-[2px] h-0 bg-brand-gold transition-all duration-500 group-hover:h-full opacity-50"></div>
                  <h3 className="text-white font-montserrat font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-3">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.icon === 'gold' ? 'bg-brand-gold animate-pulse' : 'bg-white'}`}></span> {item.title}
                  </h3>
                  <div className="text-white/70 font-light text-sm leading-relaxed mb-6">
                    {item.lines.map((line, idx) => <p key={idx}>{line}</p>)}
                  </div>
                  <a href={item.link} className="text-white text-xs font-bold tracking-[0.2em] hover:text-brand-gold transition-colors duration-300 uppercase">
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="w-full lg:w-[42%] flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.70, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold/30 via-white/5 to-brand-gold/30 rounded-[2.5rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-600 pointer-events-none"></div>
              
              <div className="bg-[#0b0a09]/80 backdrop-blur-3xl rounded-[2rem] border-t-2 border-t-brand-gold border-x border-b border-white/10 p-5 md:p-8 xl:p-9.5 relative shadow-[0_40px_100px_rgba(0,0,0,0.85)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>
                
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="w-24 h-24 bg-brand-gold/10 rounded-full flex items-center justify-center mb-8 relative">
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.20 }}
                          className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center"
                        >
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </motion.div>
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 0.70, repeat: Infinity }}
                          className="absolute inset-0 border-2 border-brand-gold rounded-full"
                        ></motion.div>
                      </div>
                      <h3 className="text-3xl font-playfair text-white mb-4">Message Sent.</h3>
                      <p className="text-white/70 font-light max-w-xs mx-auto">We've received your inquiry and our advisory team will contact you shortly.</p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="relative z-10 flex flex-col gap-6.5"
                      onSubmit={handleSubmit}
                    >
                      <div className="grid sm:grid-cols-2 gap-6 transform-gpu">
                        {[
                          { name: "name", label: "Full Name", type: "text" },
                          { name: "email", label: "Email Address", type: "email" }
                        ].map((field, _idx) => (
                          <div key={field.name} className="relative group/input">
                            <input 
                              id={`contact-${field.name}`}
                              type={field.type}
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleInputChange}
                              required 
                              className={`w-full bg-transparent border-b transition-colors duration-500 px-0 py-2.5 text-white placeholder:text-transparent focus:outline-none peer text-sm font-light ${errors[field.name] ? 'border-red-500/50' : 'border-white/10 group-hover/input:border-white/30 focus:border-brand-gold'}`} 
                              placeholder={field.label} 
                            />
                            <label htmlFor={`contact-${field.name}`} className={`absolute left-0 transition-all uppercase tracking-widest pointer-events-none font-light ${formData[field.name] ? '-top-4 text-[9.5px] text-white/50' : 'top-2.5 text-[13px] text-white/60 peer-focus:-top-4 peer-focus:text-[9.5px] peer-focus:text-brand-gold'}`}>
                              {field.label}
                            </label>
                            {errors[field.name] && <span className="absolute left-0 -bottom-5 text-[9px] text-red-500 font-bold uppercase tracking-tighter">{errors[field.name]}</span>}
                          </div>
                        ))}
                      </div>

                      <div className="relative group/input">
                        <input 
                          id="contact-phone"
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-white/10 group-hover/input:border-white/30 focus:border-brand-gold transition-colors duration-500 px-0 py-2.5 text-white placeholder:text-transparent focus:outline-none peer text-sm font-light" 
                          placeholder="Phone Number" 
                        />
                        <label htmlFor="contact-phone" className={`absolute left-0 transition-all uppercase tracking-widest pointer-events-none font-light ${formData.phone ? '-top-4 text-[9.5px] text-white/50' : 'top-2.5 text-[13px] text-white/60 peer-focus:-top-4 peer-focus:text-[9.5px] peer-focus:text-brand-gold'}`}>
                          Phone Number
                        </label>
                      </div>

                      {/* Custom Dropdown */}
                      <div className="relative" ref={dropdownRef}>
                        <div 
                          id="contact-division"
                          role="button"
                          aria-haspopup="listbox"
                          aria-expanded={dropdownOpen}
                          className={`w-full bg-transparent border-b transition-all duration-500 px-0 py-2.5 text-sm font-light cursor-pointer flex items-center justify-between relative ${errors.division ? 'border-red-500/50' : dropdownOpen ? 'border-brand-gold' : 'border-white/10 hover:border-white/30'}`}
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                          <span className={`transition-all duration-300 ${formData.division ? 'opacity-100 text-white' : 'opacity-0'}`}>
                            {formData.division ? divisions.find(d => d.id === formData.division)?.label : ''}
                          </span>
                          <label htmlFor="contact-division" className={`absolute left-0 transition-all uppercase tracking-widest pointer-events-none font-light ${formData.division || dropdownOpen ? '-top-4 text-[9.5px] ' + (dropdownOpen ? 'text-brand-gold' : 'text-white/50') : 'top-2.5 text-[13px] text-white/60'}`}>
                            Service Category
                          </label>
                          <motion.svg animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }} width="12" height="8" viewBox="0 0 12 8" fill="none" className={dropdownOpen ? 'text-brand-gold' : 'text-white/20'}>
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </motion.svg>
                        </div>

                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.70, ease: [0.16, 1, 0.3, 1] }}
                              className="absolute left-0 right-0 top-[calc(100%+12px)] z-50 bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden p-2"
                            >
                              <div className="flex flex-col gap-1">
                                {divisions.map((div) => (
                                  <div
                                    key={div.id}
                                    onClick={() => { setFormData(prev => ({ ...prev, division: div.id })); setDropdownOpen(false); setErrors(prev => ({ ...prev, division: null })); }}
                                    className={`px-4 py-3 rounded-xl cursor-pointer text-sm font-light transition-all flex items-center justify-between group/opt ${formData.division === div.id ? 'bg-brand-gold text-white' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                                  >
                                    {div.label}
                                    <div className={`w-1.5 h-1.5 rounded-full ${formData.division === div.id ? 'bg-white' : 'bg-transparent group-hover/opt:bg-white/30'}`}></div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {errors.division && <span className="absolute left-0 -bottom-5 text-[9px] text-red-500 font-bold uppercase tracking-tighter">{errors.division}</span>}
                      </div>

                      {/* Textarea */}
                      <div className="relative mt-2 group/input">
                        <textarea 
                          id="contact-message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required 
                          rows="3" 
                          className={`w-full bg-transparent border-b transition-colors duration-500 px-0 py-2.5 text-white placeholder:text-transparent focus:outline-none peer text-sm font-light resize-none ${errors.message ? 'border-red-500/50' : 'border-white/10 group-hover/input:border-white/30 focus:border-brand-gold'}`} 
                          placeholder="Your Message"
                        ></textarea>
                        <label htmlFor="contact-message" className={`absolute left-0 transition-all uppercase tracking-widest pointer-events-none font-light ${formData.message ? '-top-4 text-[9.5px] text-white/50' : 'top-2.5 text-[13px] text-white/60 peer-focus:-top-4 peer-focus:text-[9.5px] peer-focus:text-brand-gold'}`}>
                          Consultation Brief
                        </label>
                        {errors.message && <span className="absolute left-0 -bottom-2 text-[9px] text-red-500 font-bold uppercase tracking-tighter">{errors.message}</span>}
                      </div>

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full mt-3 lg:py-3 py-3.5 rounded-xl text-[11px] font-black tracking-[0.4em] uppercase transition-all duration-400 relative overflow-hidden group shadow-2xl ${isSubmitting ? 'bg-[#1a1a1a] text-white/30 cursor-not-allowed' : 'bg-brand-gold text-white hover:bg-white hover:text-black hover:-translate-y-1'}`}
                      >
                        <div className={`absolute inset-0 bg-white transform origin-left transition-transform duration-400 scale-x-0 group-hover:scale-x-100 -z-10`}></div>
                        <span className="relative z-10 flex items-center justify-center gap-4">
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              Request Consultation
                              <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500 text-white group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </>
                          )}
                        </span>
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
