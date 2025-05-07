const About = () => {
  return (
    <div className="max-w-5xl mx-auto flex flex-col items-center justify-center pt-12 sm:pt-44 px-4 sm:px-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-4">
        About This Project
      </h1>
      <div className="max-w-2xl space-y-4 text-gray-700 text-lg sm:pl-12">
        <ul className="list-disc list-inside space-y-2">
          <li>
            This is a full-stack authentication app created as a personal
            project.
          </li>
          <li>
            The main focus is on handling user requests and managing secure
            login/registration flow.
          </li>
        </ul>

        <div>
          <h2 className="text-2xl font-semibold text-indigo-500 mb-2">
            Read More
          </h2>
          <p>
            For more information, please check out the{" "}
            <a
              href="https://github.com/lapazyygeli/signup-login-system"
              target="_blank"
              className="text-indigo-500 underline"
            >
              README
            </a>{" "}
            file included with the project repository.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
