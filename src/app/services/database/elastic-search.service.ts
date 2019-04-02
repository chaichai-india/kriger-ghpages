import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ElasticSearchService {
  path: string = 'search';
  user_list: any;

  async getUsersByStartChar(startChar: string, callback) {
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

    let query = {
      index: 'firebase1',
      type: 'user',
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
      console.log(data);

      // when a value arrives from the database, stop listening
      // and remove the temporary data from the database
      snap.ref.off('value', onValueChanges);
      // snap.ref.remove();
    });
  }

  constructor(private db: AngularFireDatabase) {}
}
