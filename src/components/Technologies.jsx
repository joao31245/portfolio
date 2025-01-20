import React from 'react';
import { FaJava, FaAws, FaPhp, FaDatabase, FaPython } from 'react-icons/fa';
import { SiSpringboot } from 'react-icons/si';

const technologies = [
  { name: "Java", icon: <FaJava className="text-primary text-4xl" /> },
  { name: "Spring Boot 3", icon: <SiSpringboot className="text-primary text-4xl" /> },
  { name: "SQL", icon: <FaDatabase className="text-primary text-4xl" /> },
  { name: "AWS", icon: <FaAws className="text-primary text-4xl" /> },
  { name: "PHP", icon: <FaPhp className="text-primary text-4xl" /> },
  { name: "Python", icon: <FaPython className="text-primary text-4xl" /> },
];

function Technologies() {
  return (
    <section className="py-10 px-6 bg-background text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-6">Technologies</h2>
        <div className="flex justify-center flex-wrap gap-6">
          {technologies.map((tech) => (
            <div key={tech.name} className="flex flex-col items-center">
              {tech.icon}
              <p className="mt-2 text-gray-300">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Technologies;
