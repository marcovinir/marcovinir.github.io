import * as es from './cv';
import * as en from './cv.en';

export type Lang = 'es' | 'en';
export type CvData = typeof es;

/** Datos del CV en el idioma pedido; los dos archivos tienen la misma forma. */
export function cvData(lang: Lang): CvData {
  return lang === 'en' ? en : es;
}
