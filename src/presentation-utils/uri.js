const ABSOLUTE_URL = /^\/\//;
export default class URI {
  constructor(url, params = {}) {
    let _groups = url.split("/");
    let _params = _groups
      .filter(name => /^:/.test(name))
      .map(name => name.substring(1))
      .reduce((o, key) => { o[key] = ""; return o; }, {});
    this._url = url;
    this._base = "";
    this.params = Object.assign({}, _params, params);
  }
  set base(base) {
    this._base = base;
  }
  get length() {
    return Object.keys(this.params).length;
  }
  get url() {
    const { params } = this;
    let url = this._url;
    Object.keys(params).forEach(key => {
      let regExp = new RegExp(`:${key}`, "g");
      url = url.replace(regExp, params[key] || "");
    });
    return this._base + url.replace(/\/+/g, "/");
  }
  get isAbsolute() {
    return ABSOLUTE_URL.test(this._url);
  }
  toString() {
    return this.url;
  }
}