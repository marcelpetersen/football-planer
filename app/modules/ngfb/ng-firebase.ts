import {FireBaseRecordTemp} from './firebase-record';
import {LoginServiceTemp} from './login-service';
import {DBServiceTemp} from './db';

export namespace NgFirebase {
  export import FireBaseRecord  = FireBaseRecordTemp;
  export import LoginService    = LoginServiceTemp;
  export import DBService       = DBServiceTemp;
}
