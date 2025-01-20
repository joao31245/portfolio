import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);
  const GITHUB_USERNAME = "joao31245";
  const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
          headers: { Authorization: `token ${TOKEN}` },
          params: { page, per_page: 6 },
        });
        setProjects((prev) => [...prev, ...response.data]);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="text-white py-10 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-primary mb-6 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-card backdrop-blur-md p-4 rounded shadow-md transition-transform transform hover:scale-105"
            >
              {/* Fetch project image or hide if not found */}
              <img
                src={`https://raw.githubusercontent.com/${GITHUB_USERNAME}/${project.name}/main/preview.PNG`}
                alt={`${project.name} preview`}
                onError={(e) => (e.target.style.display = "none")} // Hide image if not found
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-2xl font-bold text-primary mb-2">{project.name}</h3>
              <p className="text-gray-300 mb-4">{project.description || "No description provided."}</p>
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-white"
              >
                View on GitHub
              </a>
            </div>
          ))}
        </div>
        {loading && <p className="text-center mt-6">Loading...</p>}
        <div ref={observerRef} className="h-10"></div>
      </div>
    </section>
  );
}

export default ProjectList;
