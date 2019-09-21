/* SVG class */
'use strict';

/* SVG 基本クラス */
class SvgBase {
  /* コンストラクタ */
  constructor(width, height) {
    this._width = width;
    this._height = height;
    this._fgcolor = "black";
    this._bgcolor = "white";
    this._borderWidth = 1;
    this._title = "";
  }

  /* バージョン番号 */
  static Version() {
    return "1.0";
  }

  /* svg タグで囲む。*/
  wrap_svgtag(body, xml= false) {
    var str = "";
    if (xml) {
      str += "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"no\" ?>\n";
    }
    str += `<svg width="${this._width}" height="${this._height}" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this._width - 1} ${this._height -1}">\n`;
    if (this._title != "") {
      str += "  <title>${this.title}</title>\n";
    }
    str += "  " + body;
    str += "\n</svg>\n";
    return str;
  }

  /* このオブジェクトの文字列表現 (オーバーライドが必要) */
  toString(xml=false) {
    return "";
  }
 
  /* 図形の位置を変更する。*/
  move(x, y) {
    this._x = x;
    this._y = y;
  }
  
  /* 図形の位置を得る。*/
  position() {
    return [this._x, this._y];
  }
   
  /* 境界線の色 property */
  get fgColor() {
    return this._fgcolor;
  }
  
  set fgColor(c) {
    this._fgcolor = c;
  }
  
  /* 背景色 property */
  get bgColor() {
    return this._bgcolor;
  }
  
  set bgColor(c) {
    this._bgcolor = c;
  }
  
  /* 境界線の幅 property */
  get borderWidth() {
    return this._borderWidth;
  }
  
  set borderWidth(w) {
    this._borderWidth = w;
  }
  
  /* この図形のタイトル property */
  get title() {
    return this._title;
  }
  
  set title(s) {
    this._title = s;
  }
}


/* 直線 */
class SvgLine extends SvgBase {
  /* コンストラクタ */
  constructor(width, height, x1, y1, x2, y2) {
    super(width, height);
    this._x1 = x1;
    this._y1 = y1;
    this._x2 = x2;
    this._y2 = y2;
  }

  /* SVG の文字列(body+style) */
  toString(xml=false) {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};`;
    let body = `<line x1="${this._x1}" y1="${this._y1}" x2="${this._x2}" y2="${this._y2}" style="${style}" />`;
    let shape = this.wrap_svgtag(body, xml);
    return shape;
  }
}


/* 矩形 */
class SvgRect extends SvgBase {
  /* コンストラクタ */
  constructor(width, height, x, y, w, h) {
    super(width, height);
    this._x = x;
    this._y = y;
    this._rect_width = w;
    this._rect_height = h;
    this._rx = 0;
    this._ry = 0;
  }
  
  /* 矩形の丸みを設定 */
  setRound(rx, ry) {
    this._rx = rx;
    this._ry = ry;
  }

  /* SVG の文字列(body+style) */
  toString(xml=false) {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};fill:${this._bgcolor}`;
    let body = `<rect x="${this._x}" y ="${this._y}" width="${this._rect_width}" height="${this._rect_height}" rx="${this._rx}" ry="${this._ry}" style="${style}" />`;
    let shape = this.wrap_svgtag(body, xml);
    return shape;    
  }
}

/* 円 */
class SvgCircle extends SvgBase {
  /* コンストラクタ */
  constructor(width, height, x, y, r) {
    super(width, height);
    this._x = x;
    this._y = y;
    this._r = r;
  }

  /* SVG の文字列(body+style) */
  toString(xml=false) {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};fill:${this._bgcolor}`;
    let body = `<circle cx="${this._x}" cy ="${this._y}" r="${this._r}" style="${style}" />`;
    let shape = this.wrap_svgtag(body, xml);
    return shape;
  }
}


/* 楕円 */
class SvgEllipse extends SvgBase {
  /* コンストラクタ */
  constructor(width, height, x, y, rx, ry) {
    super(width, height, x, y);
    this._x = x;
    this._y = y;
    this._rx = rx;
    this._ry = ry;
  }

  /* SVG の文字列(body+style) */
  toString(xml=false) {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};fill:${this._bgcolor}`;
    let body = `<ellipse cx="${this._x}" cy ="${this._y}" rx="${this._rx}" ry="${this._ry}" style="${style}" />`;
    let shape = this.wrap_svgtag(body, xml);
    return shape;
  }
}


/* 折れ線 */
class SvgPolyline extends SvgBase {
  /* コンストラクタ */
  constructor(width, height) {
    super(width, height);
    this._points = new Array();
  }
  
  /* 点を追加する。*/
  addPoint(x, y) {
    this._points.push(x, y);
  }
  
  /* 点のリスト */
  get points() {
    return this._points;
  }
  
  set points(pts) {
    this._points = new Array();
    for (let p of pts) {
      this._points.push(p);
    } 
  }

  /* SVG の文字列(body+style) */
  toString(xml=false) {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};`;
    let p = this._points.join(' ');
    let body = `<polyline fill="none" points="${p}" style="${style}" />`;
    let shape = this.wrap_svgtag(body, xml);
    return shape;
  }
}


/* 多角形 */
class SvgPolygon extends SvgBase {
  /* コンストラクタ */
  constructor(width=640, height=480) {
    super(width, height);
    this._points = new Array();
  }

  /* 点を追加する。*/
  addPoint(x, y) {
    this._points.push(x, y);
  }
  
  /* 点のリスト */
  get points() {
    return this._points;
  }

  set points(pts) {
    this._points = new Array();
    for (let p of pts) {
      this._points.push(p);
    } 
  }

  /* SVG の文字列(body+style) */
  toString(xml=false) {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};fill:${this._bgcolor}`;
    let p = this._points.toString();
    let body = `<polygon fill="none" points="${p}" style="${style}" />`;
    let shape = this.wrap_svgtag(body, xml);
    return shape;
  }
}

/* 文字列 */
class SvgText extends SvgBase {
  /* コンストラクタ */
  constructor(width, height, text, x=0, y=0) {
    super(width, height);
    this._text = text;
    this._x = x;
    this._y = y;
    this._fontfamily = "メイリオ";
    this._fontsize = 24;
  }
  
  /* フォントサイズ */
  get fontSize() {
    return this._fontsize;
  }
  
  set fontSize(pt) {
    this._fontsize = pt;
  }
  
  /* フォント種別 */
  get fontFamily() {
    return this._fontfamily;
  }
  
  set fontFamily(name) {
    this._fontFamily = name;
  }

  /* SVG の文字列(body+style) */
  toString(xml=false) {
    let body = `<text x="${this._x}" y="${this._y}" fill="${this._fgcolor}" font-family="${this._fontfamily}" font-size="${this._fontsize}">`;
    body += this._text;
    body += "</text>";
    let text = this.wrap_svgtag(body, xml);
    return text;
  }
}

