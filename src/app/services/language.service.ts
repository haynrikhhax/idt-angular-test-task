import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<'en' | 'hy' | 'ru'>('en');
  selectedLanguage$ = this.languageSubject.asObservable();

  constructor() { }

  get selectedLanguage(): 'en' | 'hy' | 'ru' {
    return this.languageSubject.value;
  }

  setLanguage(lang: 'en' | 'hy' | 'ru') {
    this.languageSubject.next(lang);
  }

  translate(key: string): string {
    return TRANSLATIONS[this.selectedLanguage][key] || key;
  }
}

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {},
  hy: {
    EN: "Անգ",
    HY: "Հայ",
    RU: "Ռուս",
    home: 'տունը',
    Password: "Գաղտնաբառ",
    Next: 'Հաջորդ',
    Login: 'Մուտք',
    Search: 'Փնտրել',
    Title: 'Վերնագիր',
    Currency: 'Արժույթ',
    Balance: "Հաշիվ",
    "Account Type": "Հաշվի տեսակը",
    "Account Number": "Հաշվեհամար",
    "ADDITIONAL INFO": "ԼՐԱՑՈՒՑԻՉ ՏԵՂԵԿՈՒԹՅՈՒՆՆԵՐ",
    'LOG IN': "Մուտք",
    'Make all transactions': "Կատարեք բոլոր գործարքները",
    'without leaving': "առանց լքելու",
    'Select Code': "Ընտրեք Կոդը",
    'Enter mobile number': "Մուտքագրեք հեռախոսահամարը",
    'Enter your password': "Մուտքագրեք ձեր գաղտնաբառը",
  },
  ru: {
    EN: "Анг",
    HY: "Арм",
    RU: "Рус",
    home: 'из дома',
    Password: "Пароль",
    Next: 'Следующий',
    Login: 'Войти',
    Search: 'Поиск',
    Title: 'Заголовок',
    Currency: "Валюта",
    Balance: "Баланс",
    "Account Type": "Тип учетной записи",
    "Account Number": "Номер счета",
    "ADDITIONAL INFO": "ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ",
    'LOG IN': "Войти",
    'Make all transactions': "Совершайте все транзакции",
    'without leaving': "не выходя",
    'Select Code': "Выберите код",
    'Enter mobile number': "Введите номер мобильного телефона",
    'Enter your password': "Введите ваш пароль",
  }
};
