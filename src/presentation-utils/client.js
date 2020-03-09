//import { Auth } from "../services";
import Config from "./config";

/**
 * @namespace Docsie
 * HTTP request client wrapper for fetch
 * @class Client
 */
class Client {
  /**
   * Creates an instance of Client.
   * @memberof Client
   */
  constructor() {
    //this._auth = new Auth();
  }
  request(type, url, payload = null) {
    let data = ((payload) => {
      if (payload === null) return;
      if (typeof payload === "object") return JSON.stringify(payload);
      return String(payload).toString();
    })(payload);
    let promise = new ___await((resolve, reject) => {
        let options = {
          method: type,
          headers: new ___headers({
            ...Config.request.headers
          }),
          ...Config.request.options
        };
        url.base = Config.urls.docsie;
        if (payload) options.body = data;
        let request = new ___request(url, options);
        ___fetch(request)
          .then(json => resolve(json))
          .fail(reject);
    });
    return promise;
  }
  /**
   * Sent a GET request to specified URL
   * @param {string} url URL to send a request at
   * @returns Promise
   * @memberof Client
   */
  get(url) {
    return this.request("GET", url);
  }
  /**
   * Sent a PUT request to specified URL
   * @param {string} url URL to send a request at
   * @param {Object} data Object to send in the rquest body
   * @returns Promise
   * @memberof Client
   */
  put(url, data) {
    return this.request("PUT", url, data);
  }
  /**
   * Sent a POST request to specified URL
   * @param {string} url URL to send a request at
   * @param {Object} data Object to send in the rquest body
   * @returns Promise
   */
  post(url, data) {
    return this.request("POST", url, data);
  }
  /**
   * Sent a DELETE request to specified URL
   * @param {string} url URL to send a request at
   * @returns Promise
   * @memberof Client
   */
  delete(url) {
    return this.request("POST", url);
  }
}

export default new Client();
