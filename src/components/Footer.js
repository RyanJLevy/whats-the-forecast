import GitHubLogo from "../images/github.svg";
function Footer() {
  return (
    <div className="absolute bottom-0 left-0 flex items-center justify-center bg-gray-100 w-full p-4 cursor-default">
      <h1 className="text-purple-primary text-sm lg:text-base">
        Copyright © 2022
      </h1>
      <a
        className="cursor-pointer"
        href="https://github.com/RyanJLevy/whats-the-forecast"
        target={"_blank"}
        title="Link to GitHub repo."
        rel="noreferrer"
      >
        <img className="ml-4" src={GitHubLogo} alt="Link to Github." />
      </a>
    </div>
  );
}

export default Footer;
