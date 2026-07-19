"use client";

import Image from "next/image";
import Link from "next/link";
import InitiativesCarousel from "@/components/InitiativesCarousel";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Users, Calendar, Award, Globe, BookOpen, Star, Target, Handshake, Trophy } from "lucide-react";
export default function Home() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const highlightCards = [
    { value: "150+", label: "Active Volunteers", icon: Users },
    { value: "6+", label: "Annual Events", icon: Calendar },
    { value: "IIT", label: "Student Branch", icon: Globe },
    { value: "2026", label: "Designing the Future", icon: Star },
  ];

  const initiatives = [
    {
      title: "Mentorship",
      description: "Connect with industry professionals and IEEE alumni to guide your career path.",
      icon: Users,
    },
    {
      title: "Skill Development",
      description: "Hands-on workshops in programming, AI, and essential soft skills for the modern workplace.",
      icon: BookOpen,
    },
    {
      title: "Competitions",
      description: "Participate in hackathons like SHErlock and ideathons.",
      icon: Award,
    },
    {
      title: "Global Network",
      description: "Become part of the world's largest professional network for women in tech.",
      icon: Globe,
    },
    {
      title: "Recognition & Awards",
      description: "Celebrate your achievements through certificates, leadership recognition, competitions, and volunteer appreciation.",
      icon: Trophy,
    },
    {
      title: "Women in STEM Empowerment",
      description: "Be part of a supportive community that empowers women to lead, innovate, and excel in technology and engineering.",
      icon: Target,
    },
    {
      title: "Volunteer Experience",
      description: "Contribute to impactful events and initiatives while gaining valuable experience in organizing, leadership, and collaboration.",
      icon: Handshake,
    },
  ];

  const allEvents = [
    {
      title: "Weave & Worth",
      date: "June 13, 2026",
      description: "Weave & Worth was an inspiring roundtable discussion conducted for women on confidence, personal branding, and navigating the modern workplace.",
      image: "/Images/WeavenWorth/WW.png",
      link: "/events/weave-and-worth",
    },
    {
      title: "Becoming",
      date: "March 11, 2026",
      description: "Becoming was an inspiring Women’s Day session where Dr. Dilhari Attygalle shared real, unspoken lessons from her journey as a woman in tech and leadership.",
      image: "/Images/Becoming/becoming.jpg",
      link: "/events/becoming",
    },
    {
      title: "SHElock 3.0",
      date: "February 07, 2026",
      description: "The event brought a thrilling challenge to undergraduates across Sri Lanka, fostering problem-solving, strategic thinking, and teamwork.",
      image: "/Images/SHErlock 3.0/sherlock3.0.jpg",
      link: "/events/sherlock-3",
    },
    {
      title: "FUSION",
      date: "December 13, 2025",
      description: "FUSION was a career development workshop where experts from WSO2 shared their valuable insights and deep knowledge on Site Reliability Engineering (SRE).",
      image: "/Images/Fusion/Fusion.jpg",
      link: "/events/fusion",
    },
    {
      title: "AdaptIQ",
      date: "October - November 2025",
      description: "AdaptIQ was a nationwide innovation initiative featuring regional workshops in Colombo, Galle, and Kurunegala, followed by a 24-hour finale.",
      image: "/Images/Adaptiq/Adaptiq.jpg",
      link: "/events/adaptiq",
    },
    {
      title: "SyncUp",
      date: "March 27, 2025",
      description: "An inspiring journey of mentorship, growth, and connection bringing 150+ students together through keynotes, activities, and 1:1 guidance.",
      image: "/Images/SyncUp/Syncuphomepage.jpg",
      link: "/events/syncup",
    },
    {
      title: "SheSpark",
      date: "March 27, 2025",
      description: "SheSpark is an inspiring event empowering female undergraduates with essential skills, confidence, connections, mentorship, insights, and leadership to thrive in their careers.",
      image: "/Images/hesparkh.jpg",
      link: "/events/shespark",
    },
    {
      title: "WS02 Visit",
      date: "March 19, 2025",
      description: "IIT students visited WSO2 to explore tech innovations, interact with professionals, and experience the dynamic culture of one of Sri Lanka’s leading tech companies.",
      image: "/Images/wso2.jpg",
      link: "/events/wso2-visit",
    },
    {
      title: "SHElock 2.0",
      date: "February 08, 2025",
      description: "The event brought a thrilling challenge to undergraduates across Sri Lanka, fostering problem-solving, strategic thinking, and teamwork.",
      image: "/Images/Sherlock2.0.jpg",
      link: "/events/sherlock-2",
    },
    {
      title: "Elevate Me",
      date: "August 03, 2024",
      description: "It's your ultimate power-up! A dynamic workshop that supercharges your personal and professional growth, guiding you to unlock new levels of success.",
      image: "/Images/Eleve Me copy.jpg",
      link: "/events/elevate-me",
    },
    {
      title: "SHErlock",
      date: "June 08, 2024",
      description: "IEEE WIE IIT hosted a hybrid problem-solving competition, highlighting women's contributions to STEM through puzzles and storytelling.",
      image: "/Images/SHErlock.jpg",
      link: "/events/sherlock-1",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex flex-col justify-between pt-32 pb-10 overflow-hidden">
        {/* Background Image & Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{ maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" }}
        >
          <Image
            src="/Images/bgphoto.jpg"
            alt="Hero Background"
            fill
            className="object-cover object-top"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/70 via-[#030303]/60 to-[#030303]" />
        </div>

        {/* Huge Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none opacity-5">
          <h1 className="text-[15vw] font-black tracking-widest text-transparent uppercase" style={{ WebkitTextStroke: "2px #ffffff" }}>
            IEEE WIE
          </h1>
        </div>

        {/* Hero Content */}
        <div className="container px-4 md:px-6 mx-auto relative z-10 flex-grow flex flex-col justify-center items-center text-center mb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-foreground drop-shadow-lg"
            >
              IEEE Women In Engineering <br className="hidden md:block" />
              <span className="text-primary font-light">Affinity Group of IIT</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
            >
              Join the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity. Empowering women in STEM.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSejHQ_xvdMFQAJx6kzegu04RKTDMbG6WigsT6z6ISbeyDq8iQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 text-base font-semibold text-foreground bg-primary rounded-md transition-all hover:bg-primary/80 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] border border-primary"
              >
                Become a Volunteer
              </Link>
              <Link
                href="#about"
                className="px-8 py-3.5 text-base font-semibold text-foreground bg-card backdrop-blur-md rounded-md transition-all hover:bg-muted border border-border"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Highlight Cards (Bottom of Hero) */}
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap md:flex-nowrap gap-4 justify-center"
          >
            {highlightCards.map((card, idx) => (
              <div
                key={idx}
                className="glass rounded-xl p-4 md:p-5 flex-1 min-w-[140px] max-w-[200px] flex flex-col items-center justify-center text-center border border-border hover:border-primary/50 transition-colors"
              >
                <card.icon className="w-6 h-6 text-primary mb-3 opacity-80" />
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{card.value}</h3>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">{card.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-center mb-20">
            <div className="h-px bg-border flex-grow max-w-[100px]" />
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] text-foreground mx-6 text-center">
              About Us
            </h2>
            <div className="h-px bg-border flex-grow max-w-[100px]" />
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={fadeInUp}
              className="w-full lg:w-5/12 space-y-6 lg:sticky lg:top-32 h-fit"
            >
              <motion.h3
                className="text-3xl md:text-4xl font-bold leading-tight"
                variants={{
                  hidden: { opacity: 1 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.04 }
                  }
                }}
              >
                {"Empowering Women in ".split("").map((char, index) => (
                  <motion.span
                    key={`t1-${index}`}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 }
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                <br />
                <span className="text-primary italic font-serif">
                  {"Technology".split("").map((char, index) => (
                    <motion.span
                      key={`t2-${index}`}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.h3>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed pt-4">
                <p>
                  IEEE Women in Engineering (WIE) at IIT is a dynamic student-led organization committed to empowering women in technology, engineering, and STEM fields. As part of the global IEEE WIE community, we aim to foster an inclusive environment where students can grow, innovate, and lead.
                </p>
                <p>
                  Our mission is to inspire and support the next generation of women in STEM by providing opportunities for skill development, mentorship, and networking.
                </p>
              </div>
            </motion.div>

            <div className="w-full lg:w-7/12 relative" ref={timelineRef}>
              {/* Background line */}
              <div className="absolute left-[15px] md:left-[27px] top-4 bottom-4 w-[2px] bg-border/30 hidden sm:block" />
              {/* Animated foreground line */}
              <motion.div
                className="absolute left-[15px] md:left-[27px] top-4 bottom-4 w-[2px] bg-primary hidden sm:block origin-top z-0"
                style={{ scaleY: scrollYProgress }}
              />
              <div className="space-y-16">
                {/* Timeline Item 1 */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="relative pl-8 md:pl-20 sm:pl-16 flex flex-col md:flex-row gap-8 items-start"
                >
                  <motion.div
                    initial={{ backgroundColor: "rgba(255,255,255,0.2)", scale: 0.8 }}
                    whileInView={{ backgroundColor: "#8b5cf6", scale: 1.2 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-[-2px] sm:left-[10px] md:left-[22px] top-[10px] w-3 h-3 rounded-full hidden sm:block z-10"
                  />
                  <div className="flex-1">
                    <span className="text-primary font-mono text-sm tracking-widest uppercase mb-2 block">Pillar 01 / Educate</span>
                    <h4 className="text-2xl font-bold mb-3">Workshops & Sessions</h4>
                    <p className="text-muted-foreground">Interactive technical training, career insight sessions, and expert-led panels that build foundational and advanced skills.</p>
                  </div>
                  <div className="w-full md:w-48 h-32 relative rounded-lg overflow-hidden border border-border shrink-0">
                    <Image src="/Images/Becoming/becoming.jpg" alt="Educate" fill className="object-cover" unoptimized />
                  </div>
                </motion.div>

                {/* Timeline Item 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative pl-8 md:pl-20 sm:pl-16 flex flex-col md:flex-row gap-8 items-start"
                >
                  <motion.div
                    initial={{ backgroundColor: "rgba(255,255,255,0.2)", scale: 0.8 }}
                    whileInView={{ backgroundColor: "#8b5cf6", scale: 1.2 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-[-2px] sm:left-[10px] md:left-[22px] top-[10px] w-3 h-3 rounded-full hidden sm:block z-10"
                  />
                  <div className="flex-1">
                    <span className="text-primary font-mono text-sm tracking-widest uppercase mb-2 block">Pillar 02 / Empower</span>
                    <h4 className="text-2xl font-bold mb-3">Hackathons & Challenges</h4>
                    <p className="text-muted-foreground">Thrilling competitions like SHErlock that challenge students with immersive puzzles, coding problems, and real-world scenarios.</p>
                  </div>
                  <div className="w-full md:w-48 h-32 relative rounded-lg overflow-hidden border border-border shrink-0">
                    <Image src="/Images/SHElock3.0.jpg" alt="Empower" fill className="object-cover" unoptimized />
                  </div>
                </motion.div>

                {/* Timeline Item 3 */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative pl-8 md:pl-20 sm:pl-16 flex flex-col md:flex-row gap-8 items-start"
                >
                  <motion.div
                    initial={{ backgroundColor: "rgba(255,255,255,0.2)", scale: 0.8 }}
                    whileInView={{ backgroundColor: "#8b5cf6", scale: 1.2 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-[-2px] sm:left-[10px] md:left-[22px] top-[10px] w-3 h-3 rounded-full hidden sm:block z-10"
                  />
                  <div className="flex-1">
                    <span className="text-primary font-mono text-sm tracking-widest uppercase mb-2 block">Pillar 03 / Excel</span>
                    <h4 className="text-2xl font-bold mb-3">Outreach & Mentorship</h4>
                    <p className="text-muted-foreground">Mentoring young minds and giving back to the community through school outreach programs and industry collaborations.</p>
                  </div>
                  <div className="w-full md:w-48 h-32 relative rounded-lg overflow-hidden border border-border shrink-0">
                    <Image src="/Images/SyncUp/Syncuphomepage.jpg" alt="Excel" fill className="object-cover" unoptimized />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer (Initiatives Section) */}
      <section className="py-24 bg-card/20 border-y border-border/30">
        <div className="container px-4 md:px-6 mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-center mb-16">
            <div className="h-px bg-border flex-grow max-w-[100px]" />
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-foreground mx-6 text-center">
              What We Offer
            </h2>
            <div className="h-px bg-border flex-grow max-w-[100px]" />
          </div>

          <InitiativesCarousel initiatives={initiatives} />
        </div>
      </section>

      {/* Our Work Section */}
      <section id="our-work" className="py-24 md:py-32 relative overflow-hidden bg-transparent">

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex items-center justify-center mb-16">
            <div className="h-px bg-border flex-grow max-w-[100px]" />
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[0.2em] text-foreground mx-6 text-center">
              Our <span className="text-primary italic font-serif lowercase">Work</span>
            </h2>
            <div className="h-px bg-border flex-grow max-w-[100px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative backdrop-blur-xl bg-muted border border-border rounded-2xl overflow-hidden hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:-translate-y-2 hover:border-primary/60 transition-all duration-500 flex flex-col"
              >
                <div className="relative h-60 w-full overflow-hidden shrink-0 border-b border-border">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                </div>
                <div className="p-6 flex flex-col flex-grow relative">
                  <div className="text-xs tracking-wider text-primary font-bold uppercase mb-2">{event.date}</div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">{event.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-4 flex-grow">
                    {event.description}
                  </p>
                  <Link
                    href={event.link}
                    className="inline-flex items-center text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors mt-auto group/btn"
                  >
                    Read More <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section (Footer Join Us Overlay) */}
      <section id="contact" className="relative py-32 lg:py-48 overflow-hidden border-t border-border/30">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{ maskImage: "linear-gradient(to top, black 70%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 70%, transparent 100%)" }}
        >
          <Image
            src="/Images/aboutus image.jpg"
            alt="About Us Background"
            fill
            className="object-cover"
            unoptimized
          />
          {/* Dark gradient mask for the form area */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/90 to-[#030303]/40" />
        </div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
              className="bg-zinc-950/60 p-8 md:p-10 rounded-2xl border border-purple-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden"
            >
              <h3 className="text-3xl font-bold text-foreground mb-2">Want to join us,</h3>
              <h4 className="text-xl text-muted-foreground font-light mb-8">but still have questions?</h4>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input
                    type="text"
                    placeholder="Leave a request or comment"
                    className="w-full bg-transparent border-b border-border pb-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-border pb-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-transparent border-b border-border pb-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-black font-semibold py-3.5 rounded mt-4 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  Send <ArrowRight size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
