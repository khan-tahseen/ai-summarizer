import { logo } from '../assets';

const Hero = () => {
  return (
    <header className="w-full justify-center items-center flex flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-4">
        <img src={logo} alt="logo" className="w-[100px]" />
        <button
          className="black_btn"
          type="button"
          onClick={() => {
            window.open('https://github.com/khan-tahseen');
          }}
        >
          GitHub
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>

      <h2 className='desc'>
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into concise and easy-to-understand
        summaries.
      </h2>
    </header>
  );
};

export default Hero;
