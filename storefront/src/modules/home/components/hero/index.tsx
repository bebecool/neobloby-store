'use client'

import { Heading, Button } from "@medusajs/ui";
import { useTranslation } from 'react-i18next';
import '@lib/i18n'; // Import de la configuration i18n

const Hero = () => {
  const { t } = useTranslation('common');

  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <Heading level="h1" className="text-3xl leading-10 text-ui-fg-base font-normal">
          {t('hero.title')}
        </Heading>
        <Heading level="h2" className="text-xl leading-8 text-ui-fg-subtle font-normal">
          {t('hero.subtitle')}
        </Heading>
        <Button className="mt-4">
          {t('hero.cta')}
        </Button>
      </div>
    </div>
  )
}

export default Hero
