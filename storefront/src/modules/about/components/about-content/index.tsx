'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

export default function AboutContent() {
  const { t } = useTranslation()
  
  const [copied, setCopied] = React.useState(false)
  const email = "Hello@neobloby.com"
  
  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 py-2">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-2">
          <div className="flex flex-col items-center justify-center gap-2 mb-2 relative overflow-visible">
            <div className="absolute -top-4 left-0 w-16 h-16 rounded-full bg-yellow-300 opacity-60 blur-md"></div>
            <div className="absolute top-8 right-0 w-12 h-12 rounded-full bg-purple-300 opacity-50 blur-md"></div>
            <div className="absolute bottom-0 left-12 w-10 h-10 rounded-full bg-pink-300 opacity-40 blur-md"></div>
            <div className="absolute bottom-2 right-16 w-8 h-8 rounded-full bg-blue-300 opacity-40 blur-md"></div>
            <Image
              src="/images/blob-family-hi.png"
              alt="NeoBloby Family says Hi!"
              width={220}
              height={220}
              className="w-52 h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 drop-shadow-xl mb-0"
            />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-primary bg-clip-text text-transparent mt-0 mb-1 px-4 py-2 leading-tight">
              {t('about.title')}
            </h1>
            <p className="text-lg text-gray-600 mt-0 mb-0 px-4">
              {t('about.subtitle')}
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-8">
          
          {/* Who We Are Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">🌟</span>
              {t('about.whoWeAre.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {t('about.whoWeAre.p1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('about.whoWeAre.p2')}
            </p>
          </div>

          {/* Vision Section */}
          <div className="mb-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">🚀</span>
              {t('about.vision.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('about.vision.intro')}
            </p>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <span className="text-2xl">🌍</span>
                <p className="text-gray-700 pt-1">{t('about.vision.goal1')}</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">✨</span>
                <p className="text-gray-700 pt-1">{t('about.vision.goal2')}</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">🎨</span>
                <p className="text-gray-700 pt-1">{t('about.vision.goal3')}</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              {t('about.vision.conclusion')}
            </p>
          </div>

          {/* What We Offer Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">🎁</span>
              {t('about.offer.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('about.offer.intro')}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🎯</span>
                  <h3 className="font-bold text-gray-900">{t('about.offer.attractive.title')}</h3>
                </div>
                <p className="text-gray-600 text-sm">{t('about.offer.attractive.description')}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🎮</span>
                  <h3 className="font-bold text-gray-900">{t('about.offer.playful.title')}</h3>
                </div>
                <p className="text-gray-600 text-sm">{t('about.offer.playful.description')}</p>
              </div>
              <div className="bg-pink-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🎉</span>
                  <h3 className="font-bold text-gray-900">{t('about.offer.fun.title')}</h3>
                </div>
                <p className="text-gray-600 text-sm">{t('about.offer.fun.description')}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🤝</span>
                  <h3 className="font-bold text-gray-900">{t('about.offer.accessible.title')}</h3>
                </div>
                <p className="text-gray-600 text-sm">{t('about.offer.accessible.description')}</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              {t('about.offer.conclusion')}
            </p>
          </div>

          {/* Close to Our Customers Section */}
          <div className="mb-8 bg-blue-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">💙</span>
              {t('about.customers.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('about.customers.intro')}
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span>👂</span>
                <span>{t('about.customers.point1')}</span>
              </li>
              <li className="flex gap-2">
                <span>🔄</span>
                <span>{t('about.customers.point2')}</span>
              </li>
              <li className="flex gap-2">
                <span>🤲</span>
                <span>{t('about.customers.point3')}</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              {t('about.customers.question')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('about.customers.answer')}
            </p>
          </div>

          {/* The Future Section */}
          <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 relative overflow-hidden">
            {/* Decorative blob with telescope */}
            <div className="absolute top-4 right-4 opacity-20 hidden md:block">
              <Image
                src="/images/blob-telescope.png"
                alt="Blob exploring"
                width={220}
                height={220}
                className="w-56 h-56 lg:w-64 lg:h-64"
              />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">🌈</span>
              {t('about.future.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {t('about.future.p1')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              {t('about.future.p2')}
            </p>
            
            {/* Mobile version of telescope blob */}
            <div className="flex justify-center my-4 md:hidden">
              <Image
                src="/images/blob-telescope.png"
                alt="Blob exploring"
                width={160}
                height={160}
                className="w-40 h-40 opacity-80"
              />
            </div>
            
            <div className="bg-white rounded-xl p-4 mt-4">
              <p className="text-gray-900 leading-relaxed font-medium text-center">
                {t('about.future.thanks')}
              </p>
              <p className="text-purple-600 leading-relaxed font-bold text-center text-xl mt-2">
                {t('about.future.welcome')}
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center bg-gray-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <span className="text-3xl">💌</span>
              {t('about.contact.title')}
            </h2>
            <p className="text-gray-600 mb-4">
              {t('about.contact.description')}
            </p>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('about.contact.copied')}</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span>{email}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
