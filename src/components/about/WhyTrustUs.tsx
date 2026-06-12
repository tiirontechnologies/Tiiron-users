
import React from 'react';

interface CertificateBadgeProps {
  title: string;
  subtitle: string;
  imgUrl: string;
}

const CertificateCard: React.FC<CertificateBadgeProps> = ({
  title,
  subtitle,
  imgUrl,
}) => {
  return (
    <div className="group relative bg-white border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-indigo-950/5 hover:-translate-y-1 overflow-hidden">
      
      {/* Hover Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

      {/* Certificate Image */}
      <div className="w-40 h-36 bg-slate-50 rounded-xl flex items-center justify-center mb-5 p-3 border border-slate-100 group-hover:bg-indigo-50/50 group-hover:border-indigo-100 transition-colors duration-300">
        <img
          src={imgUrl}
          alt={title}
          className="max-h-full max-w-full object-contain transition-all duration-300 transform group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <h3 className="font-bold text-slate-800 text-sm md:text-base tracking-wide uppercase group-hover:text-indigo-900 transition-colors duration-200">
        {title}
      </h3>

      <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-[220px]">
        {subtitle}
      </p>
    </div>
  );
};

export default function WhyTrustUs() {
  const certifications = [
    {
      title: 'ISO 9001:2015',
      subtitle: 'Certified Quality Management System ensuring consistent service quality and operational excellence.',
      imgUrl: '/iso9001.png',
    },
    {
      title: 'MSME Registered',
      subtitle: 'Officially registered under the Ministry of Micro, Small & Medium Enterprises, Government of India.',
      imgUrl: '/msme.png',
    },
    {
      title: 'Startup India',
      subtitle: 'Recognized by DPIIT under Startup India initiative for innovation and technology-driven solutions.',
      imgUrl: '/startup-india.jpeg',
    },
    {
      title: 'MCA Compliant',
      subtitle: 'Compliant with Ministry of Corporate Affairs regulations and verified corporate standards.',
      imgUrl: '/mca.png',
    },
  ];

  return (
    <section className="w-full bg-slate-50 py-16 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Center Heading */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">
            Trusted • Verified • Certified
          </span>

          <h2 className="text-3xl md:text-4xl font-black text-red-600 mt-3 tracking-tight">
            {/* Why Trust Us */}
            <span className="bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent"> Why Trust Us </span>
          </h2>

          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            We are backed by government recognition, verified certifications,
            and trusted compliance standards that reflect our commitment to
            quality, transparency, and innovation.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <CertificateCard
              key={index}
              title={cert.title}
              subtitle={cert.subtitle}
              imgUrl={cert.imgUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}