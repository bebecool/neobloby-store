import { Heading, Button } from "@medusajs/ui";
import { useI18nTranslation } from "@lib/hooks/useI18nTranslation";

const Hero = () => {
  const { t } = useI18nTranslation();
  
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <Heading level="h1" className="text-3xl leading-10 text-ui-fg-base font-normal">
          {t("hero_title")}
        </Heading>
        <Heading level="h2" className="text-xl leading-8 text-ui-fg-subtle font-normal">
          {t("hero_subtitle")}
        </Heading>
        <Button className="mt-4">
          {t("hero_button")}
        </Button>
      </div>
    </div>
  )
}

export default Hero
