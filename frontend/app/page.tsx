import Header from "./components/Header";

export default function LandingPage() {
  return (
    <main className="">
      {/* Hero section */}
      <div className="bg-[url('../public/Hero-bg.jpg')] bg-cover bg-center bg-no-repeat min-h-screen">
        <Header />
        {/* Intro statements */}
        <div className="text-white mt-[4rem] text-[2rem]  text-left ml-[7%]">
          <p className="w-[50%] font-bold">
            Build Brilliance with Sandenly: Your One-Stop Destination for
            Construction Sand Orders!
          </p>
          <p className="text-[0.8rem] text-white mt-[2rem] text-left w-[40%]">
            Welcome to Sandenly, where convenience meets construction
            excellence. Our platform simplifies the sand ordering process,
            ensuring hassle-free delivery for your projects. Say goodbye to
            logistical headaches and hello to smooth sailing with Sandenly.
          </p>
        </div>
      </div>
    </main>
  );
}
