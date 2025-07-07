import { type I18nOptions, type LocaleMessages, type VueMessageType, createI18n } from 'vue-i18n'
import { type App } from 'vue'
import * as locales from '../index'

type LocaleMessagesType = Record<string, VueMessageType>

function configureI18n<T extends LocaleMessagesType>(options?: {
  locale?: string
  locales?: string[]
}): ReturnType<typeof createI18n> {
  const messages: LocaleMessages<T> = {}
  const configLocales = options?.locales || (options?.locale ? [options.locale] : [])

  Object.values(locales as Record<string, { locale: string }>).forEach((localeConfig) => {
    if (configLocales.includes(localeConfig.locale)) {
      messages[localeConfig.locale] = localeConfig as unknown as T[keyof T]
    }
  })

  return createI18n({
    legacy: false,
    globalInjection: true,
    locale: options?.locale || 'en',
    fallbackLocale: 'en',
    messages,
    ...options,
  } as I18nOptions)
}

export default function (
  app: App,
  options?: {
    legacy?: boolean
    locale?: string
    locales?: string[]
    fallbackLocale?: string
  },
) {
  const i18n = configureI18n(options)

  app.config.globalProperties.$setLocale = (locale: string) => {
    if (!i18n.global) {
      throw new Error('i18n not properly initialized')
    }
    i18n.global.locale.value = locale
  }

  app.use(i18n)
  return i18n
}
