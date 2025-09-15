import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <section className="relative w-full bg-ui-bg-subtle min-h-[70vh] flex items-center justify-center border-b border-ui-border-base">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-16 gap-8">
        <div className="flex-1 flex flex-col items-start justify-center text-left gap-6">
          <Heading
            level="h1"
            className="text-4xl md:text-5xl font-extrabold text-ui-fg-base leading-tight"
          >
            Kits & sclérotes de blob
          </Heading>
          <Heading
            level="h2"
            className="text-lg md:text-2xl text-ui-fg-subtle font-medium"
          >
            Des blobo (Physarum polycephalum) pour vos expériences scientifiques&nbsp;!
          </Heading>
          <a href="#products" className="mt-4">
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all text-lg border-none">
              Acheter
            </Button>
          </a>
        </div>
        <div className="flex-1 flex items-center justify-center">

        </div>
      </div>
      <style jsx>{`
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
