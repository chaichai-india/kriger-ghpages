import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoginService } from '../authentication/login.service';

@Injectable({
  providedIn: 'root'
})
export class ElasticSearchService {
  path: string = 'search';
  user_list: any;

  queryBuilder(start: string, from: number = 0) {
    let wildcard = start + '*';
    //prettier-ignore
    let body = {
      "from": from,
      "query": {
        "query_string": {
          "default_field": "firstname",
          "query": wildcard
        },
        
      },
      "sort": {
        "firstname": {
          "order": "asc"
        }
      }
    };

    return {
      index: 'firebase1',
      type: 'user',
      body
    };
  }

  async getUsersByStartChar(startChar: string, from: number = 0, callback) {
    await this.loginService.loginIfNotAuth();
    const wildcard = startChar.toLowerCase();
    const ref = this.db.database.ref().child(this.path);

    let query = this.queryBuilder(wildcard, from);
    const key = ref.child('request').push(query).key;
    // console.log('search', query, key);
    this.getData(key, ref, res => callback(res));
  }

  getData(key: string, ref, callback) {
    let data: any;
    let onValueChanges = ref.child(`response/${key}`).on('value', snap => {
      if (!snap.exists()) {
        return;
      } // wait until we get data
      data = snap.val().hits;
      callback(data);
      // console.log(data, snap.val());

      // when a value arrives from the database, stop listening
      // and remove the temporary data from the database
      snap.ref.off('value', onValueChanges);
      // snap.ref.remove();
    });
  }

  constructor(
    private db: AngularFireDatabase,
    private loginService: LoginService
  ) {}
}
