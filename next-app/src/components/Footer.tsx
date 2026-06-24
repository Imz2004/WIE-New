import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Our Work", href: "/our-work" },
    { name: "Our Team", href: "/our-team" },
    { name: "Contact Us", href: "/#contact" },
  ];

  return (
    <footer className="bg-card text-card-foreground py-12 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/share/14DNsp2yrmi/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all hover:-translate-y-1"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://www.instagram.com/ieeewieiit?igsh=MWpwdHR6c2ZhNzVzaA=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-white transition-all hover:-translate-y-1"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/wie-affinity-group-of-iit/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#0A66C2] hover:text-white transition-all hover:-translate-y-1"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        <div className="text-center border-t border-border/50 pt-8 mt-8">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} IEEE WIE Affinity Group of IIT. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
