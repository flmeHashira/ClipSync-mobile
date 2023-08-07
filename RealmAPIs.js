import Realm from 'realm';
import {createRealmContext} from '@realm/react';

export class clipContent extends Realm.Object {
    static generate() {
        return {
          owner_id,  
          _id: new UUID(),
          type,
          value
        };
      }


    static schema = {
        name: "clipContent",
        properties: {
            owner_id: "string",
            _id: "uuid",
            type: "string",
            value: "string",
        },
        primaryKey: "_id",
    }
}

const realmContext = createRealmContext({
  schema: [clipContent],
});

export default realmContext
