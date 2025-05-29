import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-20 px-4 max-w-5xl mx-auto">
        {children}
      </main>
    </>
  );
};

export default MainLayout;