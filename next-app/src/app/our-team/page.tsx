"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";

export default function OurTeam() {
  const excoMembers = [
    {
      name: "Ganguli Hettiarachchi",
      role: "Chairperson",
      image: "/Images/TeamPhotoes/Ganguli.png",
      linkedin: "https://www.linkedin.com/in/lohansa-munasinghe-5691961b5/",
      email: "ganguli.20231948@iit.ac.lk",
    },
    {
      name: "Amnaah Aakiff",
      role: "Vice Chairperson",
      image: "/Images/TeamPhotoes/Amnaah.jpg",
      linkedin: "https://www.linkedin.com/in/amnaah-aakiff?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      email: "fathima.20231668@iit.ac.lk",
    },
    {
      name: "Sithuli Basnayake",
      role: "Secretary",
      image: "/Images/TeamPhotoes/Sithuli.jpg",
      linkedin: "http://linkedin.com/in/sithuli-basnayake-42101022a",
      email: "sithuli.20240380@iit.ac.lk",
    },
    {
      name: "Aayesha Fauz",
      role: "Treasurer",
      image: "/Images/TeamPhotoes/Aayesha.jpg",
      linkedin: "https://lk.linkedin.com/in/aayesha-fauz-26a9a0332",
      email: "aayesha.20240885@iit.ac.lk",
    },
    {
      name: "Imashi Waraketiya",
      role: "Webmaster",
      image: "/Images/TeamPhotoes/Imashi.jpeg",
      linkedin: "https://www.linkedin.com/in/imashi-waraketiya-63aa10332",
      email: "imashi.20240701@iit.ac.lk",
    },
  ];

  const standingCommittee = [
    {
      name: "Kasuni Jayasekara",
      role: "Publicity and Visibility Lead",
      image: "/Images/TeamPhotoes/Kasuni.jpg",
      linkedin: "https://www.linkedin.com/in/kasuni-jayasekara-16a578303?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      email: "kasuni.20240454@iit.ac.lk",
    },
    {
      name: "Amoda Liyanage",
      role: "Industry Outreach Co-Lead",
      image: "/Images/TeamPhotoes/Amoda.jpg",
      linkedin: "https://www.linkedin.com/in/amoda-liyanage-1b706332b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      email: "amoda.20240818@iit.ac.lk",
    },
    {
      name: "Sasni Lasadi",
      role: "Industry Outreach Co-Lead",
      image: "/Images/TeamPhotoes/Sasni.jpg",
      linkedin: "https://www.linkedin.com/in/sasni-lasadi-6bb1ab32a?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      email: "sasni.20240745@iit.ac.lk",
    },
    {
      name: "Hasini Siriwardena",
      role: "Logistics Lead",
      image: "/Images/TeamPhotoes/Hasini.jpg",
      linkedin: "https://www.linkedin.com/in/hasini-siriwardena-a34762332/",
      email: "hasini.20241565@iit.ac.lk",
    },
    {
      name: "Pawani Hettiarachchi",
      role: "Secretarial Lead",
      image: "/Images/TeamPhotoes/Pawani.jpg",
      linkedin: "https://www.linkedin.com/in/pawani-hettiarachchi-11b244302?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      email: "pawani.20240167@iit.ac.lk",
    },
    {
      name: "Vishara Jayalath",
      role: "Design Lead",
      image: "/Images/TeamPhotoes/Vishara.png",
      linkedin: "http://www.linkedin.com/in/vishara-jayalath",
      email: "nethmi.20240814@iit.ac.lk",
    },
    {
      name: "Dharani Wasundara",
      role: "Student Outreach Lead",
      image: "/Images/TeamPhotoes/Dharani.jpg",
      linkedin: "https://lk.linkedin.com/in/dharani-wasundara",
      email: "dharani.20240770@iit.ac.lk",
    },
  ];

  const TeamMemberCard = ({ member, index }: { member: any; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col items-center glass backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-primary/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-blue-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border-4 border-muted group-hover:border-primary/50 transition-colors duration-300 shrink-0">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
      </div>
      
      <h3 className="text-xl font-bold mb-1 text-center text-white">{member.name}</h3>
      <p className="text-primary font-medium text-sm text-center mb-6">{member.role}</p>
      
      <div className="flex gap-4 mt-auto relative z-10">
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-[#0A66C2] hover:text-white transition-all hover:-translate-y-1"
        >
          <FaLinkedinIn size={18} />
        </a>
        <a
          href={`mailto:${member.email}`}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all hover:-translate-y-1"
        >
          <Mail size={18} />
        </a>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col w-full bg-transparent min-h-screen relative overflow-hidden">

      {/* Header Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 z-10">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white drop-shadow-md">
              Our <span className="text-primary italic font-serif lowercase">Team</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Meet the dedicated student leaders behind IEEE Women In Engineering Affinity Group of IIT.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Executive Committee */}
      <section className="py-16 relative z-10">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold inline-block relative text-white">
              Executive Committee
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            {excoMembers.map((member, index) => (
              <div key={member.name} className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1.33rem)] max-w-sm">
                <TeamMemberCard member={member} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standing Committee */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold inline-block relative text-white">
              Standing Committee Leads
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            {standingCommittee.map((member, index) => (
              <div key={member.name} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] xl:w-[calc(25%-1.5rem)] max-w-sm">
                <TeamMemberCard member={member} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
