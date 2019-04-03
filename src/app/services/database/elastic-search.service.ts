import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class ElasticSearchService {
  path: string = 'search';
  user_list: any;

  async getUsersByStartChar(startChar: string, callback) {
    await this.loginService.loginIfNotAuth();
    const wildcard = startChar.toLowerCase();
    const ref = this.db.database.ref().child(this.path);

    //prettier-ignore
    let body = {
      "query": {
        "span_first": {
          "match": {
            "span_multi": {
              "match": {
                "prefix": {
                  "name": {
                    "value": wildcard
                  }
                }
              }
            }
          },
          "end": 1
        }
      }
    };

    //prettier-ignore
    let query = {
      index: 'firebase1',
      type: 'user',
      scroll: '1m',
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id'],
      body
    };

    const key = ref.child('request').push(query).key;
    console.log('search', query, key);
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
      console.log(data, snap.val());
      this.getNextPage(snap.val()._scroll_id, res => console.log(res));

      // when a value arrives from the database, stop listening
      // and remove the temporary data from the database
      snap.ref.off('value', onValueChanges);
      // snap.ref.remove();
    });
  }

  getNextPage(scroll_id, callback): any {
    const ref = this.db.database.ref().child(this.path);
    let query = {
      index: 'firebase1',
      type: 'user',
      scrollId: scroll_id,
      scroll: '1m',
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id']
    };
    const key = ref.child('request').push(query).key;
    console.log('search', query, key);
    this.getData(key, ref, res => callback(res));
  }

  constructor(
    private db: AngularFireDatabase,
    private loginService: LoginService
  ) {}
}
