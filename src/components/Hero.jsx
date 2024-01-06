import { logo } from '../assets';

const Hero = () => {
  return (
    <header className="w-full justify-center items-center flex flex-col">
      <nav className="flex justify-between items-center flex-col">
        <img src={logo} alt="logo" className="w-[100px]" />
      </nav>
    </header>
  );
};

export default Hero;
