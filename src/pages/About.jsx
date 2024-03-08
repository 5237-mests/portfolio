import { skills, experiences } from "../constants";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import CTA from "../components/CTA";

const About = () => {
  return (
    <div className="w-full bg-slate-100 pt-16">
      <section className="w-11/12 mx-auto lg:w-8/12 pt-20">
        <h1 className="text-3xl font-bold">
          Hello, I'm{" "}
          <span className="font-semibold text-blue-500 drop-shadow">
            Mesfin.
          </span>
        </h1>

        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p className="">
            Software Engineer based in Ethiopia, specializing in web
            development.
          </p>
        </div>

        <div className="py-10 flex flex-col">
          <h3 className="font-bold">My Skills</h3>

          <div className="mt-16 flex flex-wrap gap-12">
            {skills.map((skill) => (
              <div key={skill.name} className="w-20 h-20 block-container">
                <div className="btn-back rounded-xl" />
                <div className="btn-front rounded-xl flex justify-center items-center">
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-16">
          <h3 className="subhead-text">Work Experience</h3>

          <div className="mt-5 flex flex-col gap-3 text-slate-500">
            <p className="">
              I've worked with all sorts of companies, leveling up my skills and
              teaming up with smart people. Here's the rundown:
            </p>
          </div>

          <div className="mt-12 flex">
            <VerticalTimeline>
              {experiences.map((experience) => (
                <VerticalTimelineElement
                  key={experience.company_name}
                  // className="vertical-timeline-element--work"
                  // contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
                  date={experience.date}
                  icon={
                    <div className="flex justify-center items-center w-full h-full">
                      <img
                        src={experience.icon}
                        alt={experience.company_name}
                        className="w-[60%] h-[60%] object-contain"
                      />
                    </div>
                  }
                  contentStyle={{
                    borderBottom: "8px",
                    borderStyle: "solid",
                    borderBottomColor: experience.iconBg,
                    boxShadow: "none",
                  }}
                  iconStyle={{ background: experience.iconBg }}
                >
                  <div>
                    <h3 className="text-black text-xl font-semibold font-mono">
                      {experience.title}
                    </h3>

                    <p
                      className="text-black-500 font-medium font-base"
                      style={{ margin: "0" }}
                    >
                      {experience.company_name}
                    </p>
                  </div>

                  <ul className="my-5 list-disc ml-5 space-y-2">
                    {experience.points.map((point, index) => (
                      <li
                        key={index}
                        className="text-slate-500 font-sm font-normal pl-1"
                        style={{ margin: "0" }}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </div>

        <hr className="border-slate-200" />
        <CTA />
        <br />
        <br />
        <br />
      </section>
    </div>
  );
};

export default About;
