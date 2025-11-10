
'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

export default function UserGuideContent() {
  const { t } = useTranslation()
  
  const [copied, setCopied] = React.useState(false)
  const email = "Hello@neobloby.com"
  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image
              src="/images/mascotte.png"
              alt="NeoBloby Mascotte"
              width={80}
              height={80}
              className="w-20 h-20"
            />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {t('userguide.title')}
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            {t('userguide.subtitle')}
          </p>
        </div>

        {/* Guide Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-8">
          {/* Video Tutorial Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">🎥</span>
              {t('userguide.videoTitle')}
            </h2>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                src="https://www.youtube.com/embed/uyVVknT0gpY"
                title="NeoBloby Tutorial Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center">
              {t('userguide.videoDescription')}
            </p>
          </div>

          {/* Preparation Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">🧪</span>
              {t('userguide.prepareTitle')}
            </h2>
            <p className="text-gray-600 mb-4">
              ⏱️ {t('userguide.duration')}
            </p>
            
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <p className="text-gray-700 pt-1">{t('userguide.step1')}</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <p className="text-gray-700 pt-1">{t('userguide.step2')}</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <p className="text-gray-700 pt-1">{t('userguide.step3')}</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">4</span>
                <p className="text-gray-700 pt-1">{t('userguide.step4')}</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">5</span>
                <p className="text-gray-700 pt-1">{t('userguide.step5')}</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">6</span>
                <p className="text-gray-700 pt-1">{t('userguide.step6')}</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">7</span>
                <p className="text-gray-700 pt-1">{t('userguide.step7')}</p>
              </div>
            </div>
          </div>
          {/* Info réveil du blob */}
          <div className="mb-8 flex items-center justify-center">
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 flex items-center gap-3 shadow-sm">
              <Image
                src="/images/blob-sleep.png"
                alt="Blob endormi"
                width={100}
                height={100}
                className="w-300 h-30"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              <span className="text-blue-900 font-medium text-base">{t('userguide.wakeInfo')}</span>
            </div>
          </div>

          {/* Golden Rules Section */}
          <div className="mb-8 bg-yellow-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">⭐</span>
              {t('userguide.goldenRules')}
            </h2>
            
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <span className="text-2xl">🌡️</span>
                <p className="text-gray-700 pt-1">{t('userguide.rule1')}</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">💧</span>
                <p className="text-gray-700 pt-1">{t('userguide.rule2')}</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">☀️</span>
                <p className="text-gray-700 pt-1">{t('userguide.rule3')}</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">🌾</span>
                <p className="text-gray-700 pt-1">{t('userguide.rule4')}</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">🦠</span>
                <p className="text-gray-700 pt-1">{t('userguide.rule5')}</p>
              </div>
            </div>
          </div>

          {/* Experiments Section */}
          <div className="bg-purple-50 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">🔬</span>
              {t('userguide.experiments')}
            </h2>
            
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span>•</span>
                <span>{t('userguide.exp1')}</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>{t('userguide.exp2')}</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>{t('userguide.exp3')}</span>
              </li>
            </ul>
          </div>

          {/* Safety & Storage Section */}
          <div className="bg-red-50 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">⚠️</span>
              {t('userguide.safetyTitle')}
            </h2>
            
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span>🚫</span>
                <span>{t('userguide.safety1')}</span>
              </li>
              <li className="flex gap-2">
                <span>👶</span>
                <span>{t('userguide.safety2')}</span>
              </li>
              <li className="flex gap-2">
                <span>🧊</span>
                <span>{t('userguide.safety3')}</span>
              </li>
              <li className="flex gap-2">
                <span>♻️</span>
                <span>{t('userguide.safety4')}</span>
              </li>
            </ul>
          </div>

          {/* Troubleshooting Section */}
          <div className="bg-blue-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">🛠️</span>
              {t('userguide.troubleshootingTitle')}
            </h2>
            
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-1">❌ {t('userguide.problem1')}</p>
                <p className="text-gray-700 ml-6">💡 {t('userguide.solution1')}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">❌ {t('userguide.problem2')}</p>
                <p className="text-gray-700 ml-6">💡 {t('userguide.solution2')}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">❌ {t('userguide.problem3')}</p>
                <p className="text-gray-700 ml-6">💡 {t('userguide.solution3')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Card */}
        <div className="bg-gradient-to-br from-primary to-purple-600 rounded-3xl shadow-2xl p-6 md:p-8 text-white text-center mb-8">
          <h3 className="text-2xl font-bold mb-3">💡 {t('userguide.tipsTitle')}</h3>
          <p className="text-lg opacity-90">
            {t('userguide.tipsText')}
          </p>
        </div>

        {/* Contact & Support Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/images/blob-mail.png"
              alt="NeoBloby Mail"
              width={60}
              height={60}
              className="w-12 h-12 md:w-15 md:h-15"
            />
            <h3 className="text-2xl font-bold text-gray-900">📧 {t('userguide.contactTitle')}</h3>
          </div>
          <p className="text-gray-600 mb-4">
            {t('userguide.contactText')}
          </p>
          <a 
            href={`mailto:${email}`}
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {t('userguide.contactButton')}
          </a>
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="flex items-center justify-between gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 w-full max-w-md">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="text-gray-700 font-mono text-sm md:text-base font-medium truncate">{email}</span>
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                <span className="hidden sm:inline">{t('userguide.copyButton')}</span>
              </button>
            </div>
            {copied && (
              <div className="flex items-center gap-2 text-green-600 font-semibold animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('userguide.copied')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
