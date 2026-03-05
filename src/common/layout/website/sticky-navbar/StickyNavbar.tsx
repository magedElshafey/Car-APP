import Navbar from "../navbar/Navbar";
const StickyNavbar: React.FC = () => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out
         
        `}
      >
        <Navbar />
      </div>
    </>
  );
};

export default StickyNavbar;
