import { Linkedin, Twitter } from "lucide-react";

/**
 * Team - modern, accessible team grid
 *
 * teamMembers: array of {
 *   name, role, image, bio?, socials?: { linkedin?, twitter? }
 * }
 */

const teamMembers = [
  {
    name: "Rishabh Kumar Singh",
    role: "Founder & CEO",
    image: "https://via.placeholder.com/400?text=Rishabh",
    bio: "Rishabh leads product strategy and growth. Passionate about learning tech and building delightful developer experiences.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Aditi Sharma",
    role: "Head of Product",
    image: "https://via.placeholder.com/400?text=Aditi",
    bio: "Aditi drives product design and roadmap — she turns user insights into polished experiences.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Arjun Mehta",
    role: "Lead Developer",
    image: "https://via.placeholder.com/400?text=Arjun",
    bio: "Arjun architects the platform and focuses on performance, DX, and scalable systems.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Sanya Kapoor",
    role: "Marketing Lead",
    image: "https://via.placeholder.com/400?text=Sanya",
    bio: "Sanya builds growth strategy and storytelling — great at turning data into delight.",
    socials: { linkedin: "#", twitter: "#" },
  },
];

const MemberCard = ({ member }:any) => {
  const { name, role, image, bio, socials = {} } = member;
  return (
    <article
      tabIndex={0}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md focus-within:shadow-md transition transform hover:-translate-y-1 focus-within:-translate-y-1"
      aria-labelledby={`${name.replace(/\s+/g, "-")}-name`}
    >
      <div className="relative">
        <img
          src={image}
          alt={`${name} — ${role}`}
          loading="lazy"
          className="w-full h-56 object-cover"
        />

        {/* overlay appears on hover or focus */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-250 flex items-end p-4">
          {bio && <p className="text-xs text-white/90 line-clamp-3">{bio}</p>}
        </div>
      </div>

      <div className="p-5">
        <h3
          id={`${name.replace(/\s+/g, "-")}-name`}
          className="text-lg font-semibold text-gray-900"
        >
          {name}
        </h3>
        <p className="mt-1 text-sm text-gray-600">{role}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                aria-label={`${name} on LinkedIn`}
                className="p-2 rounded-md bg-gray-50 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {socials.twitter && (
              <a
                href={socials.twitter}
                aria-label={`${name} on Twitter`}
                className="p-2 rounded-md bg-gray-50 text-gray-600 hover:text-sky-500 hover:bg-sky-50 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* "View profile" focusable CTA (keeps keyboard users happy) */}
          <a
            href="#"
            className="text-sm font-medium text-sky-600 hover:underline"
            aria-label={`View ${name}'s profile`}
          >
            View profile
          </a>
        </div>
      </div>
    </article>
  );
};

const Team = ({ members = teamMembers }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Meet Our Team
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            A small team with big ambitions — builders, designers, and
            storytellers committed to helping learners succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <MemberCard key={i} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
