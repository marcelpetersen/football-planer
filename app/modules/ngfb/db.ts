/**
 * Created by drmabuse on 04/10/15.
 */
'use strict';
import {App, IonicApp, IonicPlatform} from 'ionic-angular';
import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
let Firebase = require('firebase');

interface DBInterface {
  db: any;
  token: string;
  uri: string;
  unauth(): any;
  authWithPassword(email: string, password: string): any;
}
@Injectable()
class DBService implements DBInterface {
  private _app: IonicApp;
  private _http: Http;
  private _cfg: any = null;
  private _token: string;
  private _uri: string;
  private _db: any;

  public dbAuth: boolean = false
  public dbAuthChange: any = new EventEmitter();
  public loggedInUser: any = null;

  constructor(app: IonicApp, http: Http) {
    this._app = app;
    this._http = http;
  }

  private _getConfig() {
    return new Promise((resolve, reject) => {
      return this._http.get('build/config.json')
        .map(res => res.json())
        .subscribe(
        (data) => {
          this._token = data.token;
          this._uri = data.api;
          this._db = new Firebase(this.uri);
        },
        err => { return reject(err) },
        () => { return resolve(this.token) }
        );
    });
  }

  onAuthCallback(authData) {
    if (authData) {
      // console.log("Authenticated with uid:", authData);
    } else {
      // console.log("Client unauthenticated.")
    }
  }

  auth() {
    if (!this.token || !this.uri) {
      return new Promise((resolve, reject) => {
        return reject('No Config', this.token);
      });
    }
    let self = this;
    return new Promise((resolve, reject) => {
      return this.db.authWithCustomToken(this.token, function(err, data) {
        if (err) {
          console.error(err);
          return reject(err);
        }
        self.dbAuth = true;
        //debugger;
        self.dbAuthChange.subscribe(self.dbAuth);
        return resolve(data);
      });
    });
  }

  getDb() {
    return this.db;
  }

  unauth() {
    return this.db.unauth();
  }
  authWithPassword(email, password) {
    // console.log('(email, password', email, password);
    let self = this;
    //CryptoJS.HmacSHA256(password, this.cfg.token).toString()
    return new Promise((resolve, reject) => {

      return this.db.authWithPassword({
        "email": email,
        "password": password
      }, function(error, authData) {
        self.db.onAuth(self.onAuthCallback);
        self.db.offAuth(self.onAuthCallback);
        if (error) {
          console.error(error);
          return reject(error);
        } else {
          self.loggedInUser = authData;
          return resolve(authData);
        }
      });
    });
  }

  public get token(): string {
    return this._token;
  }

  public get uri(): string {
    return this._uri;
  }

  public get db(): any {
    return this._db;
  }

}
module DBService { };
export {DBService as DBServiceTemp};
