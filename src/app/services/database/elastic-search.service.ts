import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ElasticSearchService {
  path: string = 'search';

  getUsersByStartChar(startChar: string) {
    const regex = `${startChar.toLowerCase()}*`;
    const ref = this.db.database.ref().child(this.path);

    //prettier-ignore
    let body = {
      "query": {
        "wildcard": {
          "name": {
            "value": regex
          }
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

    let onValueChanges = ref.child(`response/${key}`).on('value', snap => {
      if (!snap.exists()) {
        return;
      } // wait until we get data
      let data = snap.val().hits;
      console.log(data);

      // when a value arrives from the database, stop listening
      // and remove the temporary data from the database
      snap.ref.off('value', onValueChanges);
      // snap.ref.remove();
    });
  }

  constructor(private db: AngularFireDatabase) {}
}
