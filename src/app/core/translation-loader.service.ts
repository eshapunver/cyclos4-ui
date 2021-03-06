import { Injectable } from '@angular/core';
import { FormatService } from 'app/core/format.service';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

/**
 * Service used to load translations
 */
@Injectable()
export class TranslationLoaderService {
  constructor(
    private formatService: FormatService,
    private httpClient: HttpClient) {
  }

  public load(file: string): Promise<any> {
    // Maybe the translations was statically compiled?
    const translations = environment.translations;
    if (translations && translations[file]) {
      return Promise.resolve(translations[file]);
    }

    // We have to dynamically load the translation
    const dataForUi = this.formatService.dataForUi;
    const locales = [null];
    if (dataForUi) {
      const lang = dataForUi.language.code;
      const country = dataForUi.country;
      locales.push(lang);
      locales.push(`${lang}_${country}`);
    }
    return this.doLoad(file, locales);
  }

  private doLoad(file: string, locales: string[]): Promise<any> {
    if (locales.length === 0) {
      // Nothing else to try
      return Promise.resolve({});
    }

    // Fetch for this locale
    let locale = locales.pop();
    if (locale === 'en') {
      // English is the default
      locale = locales.pop();
    }
    const suffix = locale == null ? '' : `_${locale}`;
    return this.httpClient.get(`translations/${file}${suffix}.json`, {
      responseType: 'json'
    })
      .toPromise()
      .catch(err => this.doLoad(file, locales));
  }
}
