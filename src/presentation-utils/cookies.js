class Cookies {
  static setCookie(cname, cvalue, seconds) {
    let d = new Date();
    d.setTime(d.getTime() + (seconds * 1000));
    const expires = `expires=${d.toGMTString()}`;
    document.cookie = `${cname}=${cvalue}; ${expires}; path=/"`;
  }
  static getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}