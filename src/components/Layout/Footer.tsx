import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const footerSections = [
  {
    title: "Platform",
    links: [
      { name: "Courses", href: "/courses" },
      { name: "Webinars", href: "/webinars" },
      { name: "Community", href: "/community" },
      { name: "Certificates", href: "/profile" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Help Center", href: "/help" },
      { name: "API", href: "/api" },
      { name: "Status", href: "/status" },
    ],
  },
];

const socialLinks = [
  { name: "Github", href: "#", icon: Github },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Email", href: "mailto:contact@vlcp.edu", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="bg-islamic-navy border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gold-gradient rounded-lg flex items-center justify-center star-pattern">
                <span className="text-islamic-navy font-bold text-xl">V</span>
              </div>
              <span className="text-3xl font-bold text-foreground">VLCP</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              A next-generation Islamic educational platform providing high-quality courses, 
              webinars, and community forums built on blockchain technology.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-islamic-gold transition-colors duration-200 p-2 rounded-lg hover:bg-islamic-gold/10"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="sr-only">{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-foreground font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-islamic-teal transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} VLCP. All rights reserved. Built with Islamic values.
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Powered by Sidra Chain</span>
            <span className="hidden md:inline">•</span>
            <span>Ethical Learning</span>
          </div>
        </div>
      </div>
    </footer>
  );
}