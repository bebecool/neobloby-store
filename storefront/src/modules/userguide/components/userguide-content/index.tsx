'use client'

import { useTranslation } from 'react-i18next'
import Image from 'next/image'

export default function UserGuideContent() {
  const { t } = useTranslation()
  
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
          <div className="bg-purple-50 rounded-2xl p-6">
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
        </div>

        {/* Tips Card */}
        <div className="bg-gradient-to-br from-primary to-purple-600 rounded-3xl shadow-2xl p-6 md:p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">💡 {t('userguide.tipsTitle')}</h3>
          <p className="text-lg opacity-90">
            {t('userguide.tipsText')}
          </p>
        </div>
      </div>
    </div>
  )
}
