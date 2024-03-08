import { Link } from "react-router-dom";
import { projects } from "../constants";
import { arrow } from "../assets/icons";
import CTA from "../components/CTA";


const Projects = () => {
  return (
    <div className="py-1">
      <section className="max-container">
        <h1 className="head-text">
          My{" "}
          <span className="blue-gradient_text font-semibold drop-shadow">
            Projects
          </span>
        </h1>

        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>
            I have embarked on numerous projects throughout the years, but these
            are the ones I hold closest to my heart. Many of them are open
            source, so if you like what you see, feel free to check them out.
          </p>
        </div>

        <div className="flex flex-wrap gap-16 my-20">
          {projects.map((project) => (
            <div key={project.name} className="w-full lg:w-[400px]">
              <div className="block-container btnn w-12 h-12">
                <div className={`btn-back rounded-xl ${project.theme}`} />
                <div className="btn-front rounded-xl flex justify-center items-center">
                  <img
                    src={project.iconUrl}
                    alt={project.name}
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              </div>

              <div className="mt-5" flex flex-col>
                <h4 className="font-semibold font-mono text-2xl">
                  {project.name}
                </h4>
                <p className="text-slate-500 mt-2">{project.description}</p>

                <div className="mt-5 flex gap-2 items-center">
                  <Link
                    to={project.link}
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600"
                  >
                    Live Link
                  </Link>
                  <img
                    className="w-4 h-4 object-contain"
                    src={arrow}
                    alt="arrow"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-slate-300" />

        <CTA />
      </section>
    </div>
  );
};

export default Projects;
