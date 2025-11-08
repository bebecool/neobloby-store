'use client'

import { useTranslation } from 'react-i18next'
import Image from 'next/image'

export default function HomeContent({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      {/* Section des produits avec design premium */}
      <div className="relative pt-4 pb-6 bg-white overflow-hidden">
        {/* Background pattern subtil */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>
        
        <div className="relative container max-w-7xl mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-1">
              {t('home.featuredProducts')}
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('home.featuredProductsDesc')}
            </p>
          </div>
          {children}
        </div>
      </div>

      {/* Section avantages */}
      <section className="relative py-6 bg-gradient-to-br from-gray-50 to-blue-50/50 overflow-hidden">
        {/* Pattern de fond animé */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute animate-pulse top-20 left-1/4 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-2xl"></div>
          <div className="absolute animate-pulse delay-1000 bottom-20 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl"></div>
        </div>
        
        <div className="relative container max-w-6xl mx-auto px-4">
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-2">
              ✨ {t('home.whyUs')}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {t('home.excellence')}
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('home.excellenceDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
            {/* Bloc Livraison internationale */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-400/20 rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl"></div>
              <div className="relative flex items-center gap-6 rounded-3xl bg-gradient-to-br from-white via-blue-50/50 to-purple-50/30 p-6 shadow-2xl border border-white/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.02]">
                <div className="flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                  <div className="relative bg-white rounded-full p-3 shadow-lg">
                    <Image 
                      src="/images/Blobyfusee.png" 
                      alt={t('home.internationalShipping')}
                      width={120} 
                      height={120} 
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain bg-transparent transition-transform duration-500 group-hover:scale-110"
                      draggable="false" 
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                    <span className="text-2xl">🚀</span>
                    <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                      {t('home.expressWorldwideDelivery')}
                    </span>
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed mb-3">
                    {t('home.fastSecureDelivery')}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <span>{t('home.learnMore')}</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Bloc Garantie et SAV */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl"></div>
              <div className="relative flex items-center gap-6 rounded-3xl bg-gradient-to-br from-white via-yellow-50/50 to-orange-50/30 p-6 shadow-2xl border border-white/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.02]">
                <div className="flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-pulse"></div>
                  <div className="relative bg-white rounded-full p-3 shadow-lg">
                    <Image 
                      src="/images/BlobyVivant.png" 
                      alt={t('home.qualityGuarantee')}
                      width={120} 
                      height={120} 
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain bg-transparent transition-transform duration-500 group-hover:scale-110"
                      draggable="false" 
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                      {t('home.qualityGuaranteeAndSupport')}
                    </span>
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed mb-3">
                    {t('home.customerSatisfaction')}
                  </p>
                  <div className="flex items-center gap-2 text-yellow-700 font-semibold text-sm">
                    <span>{t('home.learnMore')}</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section stats premium */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-4 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold text-primary mb-1">1426</div>
              <div className="text-gray-600 font-medium text-sm">{t('home.satisfiedCustomers')}</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold text-purple-600 mb-1">7+</div>
              <div className="text-gray-600 font-medium text-sm">{t('home.countriesServed')}</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold text-green-600 mb-1">99.8%</div>
              <div className="text-gray-600 font-medium text-sm">{t('home.satisfactionRate')}</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold text-orange-600 mb-1">24/7</div>
              <div className="text-gray-600 font-medium text-sm">{t('home.customerSupport')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action premium */}
      <section className="relative py-6 bg-gradient-to-br from-primary via-primary to-purple-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {t('home.readyToDiscover')}
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-4 leading-relaxed">
            {t('home.joinThousands')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/store" 
              className="group px-6 py-3 bg-white text-primary font-bold text-base rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2"
            >
              <span>{t('home.discoverProducts')}</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a 
              href="/about" 
              className="px-6 py-3 border-2 border-white text-white font-bold text-base rounded-full hover:bg-white hover:text-primary transition-all duration-300 transform hover:-translate-y-1"
            >
              {t('home.learnMore')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
