import { Heading, Button } from "@medusajs/ui";

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <Heading level="h1" className="text-3xl leading-10 text-ui-fg-base font-normal">
          Kits & sclérotes de blob
        </Heading>
        <Heading level="h2" className="text-xl leading-8 text-ui-fg-subtle font-normal">
          Des blobo (Physarum polycephalum) pour vos expériences scientifiques !
        </Heading>
        <Button className="mt-4">
          Acheter
        </Button>
      </div>
    </div>
  )
}

export default Hero
