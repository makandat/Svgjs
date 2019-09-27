/* SVG class v2.3.0 */
'use strict';

/* == SVG コンテナクラス (v2.3.0) == */
class SvgContainer {
  /* バージョン */
  get Version() {
    "2.3.0";
  }
  
  /* コンストラクタ */
  constructor(width, height) {
    // キャンバスのサイズ
    this._width = width;
    this._height = height;
    // SVG 図形のコレクション
    this._elements = new Array();
    // viewBox (v2.1.0)
    this._viewBox = {x:0, y:0, width:this._width, height:this._height};
    // defs タグのリテラル
    this._defs_literal = "";
  }

  /* xml タグ */  
  get tagXML() {
    return "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"no\" ?>\n";
  }
  
  /* svg タグ */
  get tagSVG() {
    return `<svg width="${this._width}" height="${this._height}" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="${this._viewBox.x} ${this._viewBox.y} ${this._viewBox.width} ${this._viewBox.height}">\n`;
  }
  
  /* キャンバスの幅 */
  get width() {
    return this._width;
  }

  /* キャンバスの高さ */
  get height() {
    return this._height;
  }
  
  /* defs のリテラル (v2.2.0) */
  get defs_literal() {
    return this._defs_literal;
  }

  set defs_literal(literal) {
    this._defs_literal = literal;
  }
  
  /* SVG 要素（図形）を追加する。*/
  add(svg) {
    svg.setSize(this.width, this.height);
    this._elements.push(svg);
  }
  
  /* viewBox を設定する。(v2.1.0) */
  viewBox(x, y, w, h) {
    this._viewBox.x = x;
    this._viewBox.y = y;
    this._viewBox.width = w;
    this._viewBox.height = h;
  }

  /* 文字列表現 (v2.2.0) */
  toString(xml=false) {
    let str = "";
    if (xml) {
      str += this.tagXML;
    }
    str += this.tagSVG;
    if (this.defs_literal != "")
      str += this.defs_literal;
    for (let elem of this._elements) {
      str += elem;
    }
    str += "</svg>\n";
    return str;
  }
  
  /* id で指定された内容に body を設定する。*/
  static setSvgById(id, body) {
    let el = document.getElementById(id);
    el.innerHTML = body;
  } 

  /* cls で指定された内容に body を設定する。*/
  static setSvgByClass(cls, body) {
    let elements = document.getElementsByClassName(cls);
    for (let el of elements) {
      el.innerHTML =body;
    }
  } 

  /* tag で指定された内容に body を設定する。*/
  static setSvgByTag(tag, body) {
    let elements = document.getElementsByTagName(tag);
    for (let el of elements) {
      el.innerHTML =body;
    }
  } 
}


/* == SVG 図形の基本クラス (v2.3.0) == */
class SvgShape {
 
  /* コンストラクタ (v.2.3.0) */
  constructor(options=null) {
    this._width = 640;
    this._height = 480;
    if (options == null) {
      this._fgcolor = "black";
      this._bgcolor = "white";
      this._borderWidth = 1;
      this._title = "";
      this._borderType = SvgShape.SOLID;
      this._opacity = 0;
      this._movex = 0;
      this._movey = 0;
      this._rotate = 0;
      this._scalex = 1;
      this._scaley = 1;
      this._marker = "";
    }
    else {
      this._fgcolor = options["fgcolor"] == undefined ? "black" : options["fgcolor"];
      this._bgcolor = options["bgcolor"] == undefined ? "white" : options["bgcolor"];
      this._borderWidth = options["borderWidth"] == undefined ? 1 : options["borderWidth"];
      this._title = options["title"] == undefined ? "" : options["title"];
      this._borderType = options["borderType"] == undefined ? SvgShape.SOLID : options["borderType"];
      this._opacity = options["opacity"] == undefined ? 0 : options["opacity"];
      this._movex = options["movex"] == undefined ? 0 : options["movex"];
      this._movey = options["movey"] == undefined ? 0 : options["movey"];
      this._rotate = options["rotate"] == undefined ? 0 : options["rotate"];
      this._scalex = options["scalex"] == undefined ? 1 : options["scalex"];
      this._scaley = options["scaley"] == undefined ? 1 : options["scaley"];
      this._marker = options["marker"] == undefined ? "" : options["marker"];
    }
  }
  
  /* 線種(実線) */
  static get SOLID() {
    return 0;
  }
  
  /* 線種(点線) */
  static get DOTTED() {
    return 1;
  }
  
  /* 線種(破線) */
  static get DASSHED() {
    return 2;
  }

  /* キャンバスサイズを設定する。*/
  setSize(w, h) {
    this._width = w;
    this._height = h;
  }

  /* 前景(描画)色 */
  get fgColor() {
    return this._fgcolor;
  }
  
  set fgColor(c) {
    this._fgcolor = c;
  }
  
  /* 背景色 */
  get bgColor() {
    return this._bgcolor;
  }
  
  set bgColor(c) {
    this._bgcolor = c;
  }
  
  /* 描画幅 */
  get borderWidth() {
    return this._borderWidth;
  }
  
  set borderWidth(c) {
    this._borderWidth = c;
  }
  
  /* タイトル */
  get title() {
    return this._title;
  }
  
  set title(c) {
    this._title = c;
  }
  
  /* 線種 */
  get borderType() {
    return this._borderType;
  }
  
  set borderType(c) {
    this._borderType = c;
  }
  
  /* 背景色の透過度 */
  get opacity() {
    return this._opacity;
  }
  
  set opacity(c) {
    this._opacity = c;
  }
  
  /* 境界線コードをダッシュ配列に変換する。*/
  static getDashArray(border) {
    var dash = "";
    switch (border) {
      case SvgShape.DOTTED:
        dash = "2,2";
        break;
        
      case SvgShape.DASHED:
        dash = "8,2";
        break;
        
      default:
        break;
    }  
    return dash;
  }
  
  /* 起点を移動 (v2.3.0) */
  move(x, y) {
    this._movex = x;
    this._movey = y;
  }
  
  /* 回転する (v2.3.0) */
  rotate(a) {
    this._rotate = a;
  }
  
  /* 拡大・縮小 (v2.3.0) */
  scale(rx, ry) {
    this._scalex = rx;
    this._scaley = ry;
  }
  
  /* マーカ (矢印) */
  get marker() {
    return this._marker;
  }
  
  set marker(c) {
    this._marker = c;
  }
  
  /* 画像 */
  get image() {
    return this._image;
  }
  
  set image(c) {
    this._image = c;
  }  
}

/* == 直線クラス == */
class SvgLine extends SvgShape {
  /* コンストラクタ */
  constructor(x1, y1, x2, y2, options=null) {
    super(options);
    this._x1 = x1;
    this._y1 = y1;
    this._x2 = x2;
    this._y2 = y2;
  }

  /* SVG の文字列 (SvgLine) */
  toString() {
    let shape = `<line x1="${this._x1}" y1="${this._y1}" x2="${this._x2}" y2="${this._y2}" stroke="${this._fgcolor}" stroke-width="${this._borderWidth}" />\n`;
    // 線種
    if (this._borderType != SvgShape.SOLID) {
      let dash = SvgShape.getDashArray(this._borderType);
      shape = `<line x1="${this._x1}" y1="${this._y1}" x2="${this._x2}" y2="${this._y2}" stroke="${this._fgcolor}" stroke-width="${this._borderWidth}" stroke-dasharray="${dash}" />\n`;
    }
    // 矢印
    if (this._marker != "") {
      let marker_id = "#" + this._marker;
      shape = shape.replace("/>", `marker-end="url(${marker_id})" />`);
    }
    // 変形
    let transform = "";
    if (this._movex == 0 && this._movey == 0) {
      // そのまま
    }
    else {
      transform += `translate(${this._movex}, ${this._movey})`;
    }
    if (this._rotate == 0) {
      // そのまま
    }
    else {
      transform += ` rotate(${this._rotate})`;
    }
    if (this._scalex == 1 && this._scaley == 1) {
      // そのまま
    }
    else {
      transform += ` scale(${this._scalex}, ${this._scaley})`;
    }
    
    if (transform != "") {
      shape = shape.replace("/>", `transform="${transform}"` + " />");
    }
    
    return shape;
  }
}


/* == 矩形クラス == */
class SvgRect extends SvgShape {
  /* コンストラクタ */
  constructor(x, y, w, h, options=null) {
    super(options);
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

  /* SVG の文字列 (SvgRect) */
  toString() {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};fill:${this._bgcolor};`;
    let transform = "";
    if (this._movex == 0 && this._movey == 0) {
      // そのまま
    }
    else {
      transform += `translate(${this._movex}, ${this._movey})`;
    }
    if (this._rotate == 0) {
      // そのまま
    }
    else {
      transform += ` rotate(${this._rotate})`;
    }
    if (this._scalex == 1 && this._scaley == 1) {
      // そのまま
    }
    else {
      transform += ` scale(${this._scalex}, ${this._scaley})`;
    }
       
    if (this._borderType != SvgShape.SOLID) {
      let dash = SvgShape.getDashArray(this._borderType);
      style += `stroke-dasharray:${dash};`;
    }
    if (this._opacity > 0 && this._opacity <= 1) {
      style += `fill-opacity:${this._opacity};`;
    }
    let shape = `<rect x="${this._x}" y ="${this._y}" width="${this._rect_width}" height="${this._rect_height}" rx="${this._rx}" ry="${this._ry}" style="${style}" />\n`;
    if (transform != "") {
      shape = shape.replace("/>", `transform="${transform}"` + " />");
    }
    return shape;    
  }
}

/* == 円クラス == */
class SvgCircle extends SvgShape {
  /* コンストラクタ */
  constructor(x, y, r, options=null) {
    super(options);
    this._x = x;
    this._y = y;
    this._r = r;
  }

  /* SVG の文字列 (SvgCircle) */
  toString() {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};fill:${this._bgcolor};`;
    if (this._borderType != SvgShape.SOLID) {
      let dash = SvgShape.getDashArray(this._borderType);
      style += `stroke-dasharray:${dash};`;
    }
    if (this._opacity > 0 && this._opacity <= 1) {
      style += `fill-opacity:${this._opacity};`;
    }
    let transform = "";
    if (this._movex == 0 && this._movey == 0) {
      // そのまま
    }
    else {
      transform += `translate(${this._movex}, ${this._movey})`;
    }
    if (this._rotate == 0) {
      // そのまま
    }
    else {
      transform += ` rotate(${this._rotate})`;
    }
    if (this._scalex == 1 && this._scaley == 1) {
      // そのまま
    }
    else {
      transform += ` scale(${this._scalex}, ${this._scaley})`;
    }
    let shape = `<circle cx="${this._x}" cy ="${this._y}" r="${this._r}" style="${style}" />\n`;
    if (transform != "") {
      shape = shape.replace("/>", `transform="${transform}"` + " />");
    }
    return shape;
  }
}


/* == 楕円クラス == */
class SvgEllipse extends SvgShape {
  /* コンストラクタ */
  constructor(x, y, rx, ry, options=null) {
    super(x, y, options);
    this._x = x;
    this._y = y;
    this._rx = rx;
    this._ry = ry;
  }

  /* SVG の文字列 (SvgEllipse) */
  toString() {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};fill:${this._bgcolor};`;
    if (this._borderType != SvgShape.SOLID) {
      let dash = SvgShape.getDashArray(this._borderType);
      style += `stroke-dasharray:${dash};`;
    }
    if (this._opacity > 0 && this._opacity <= 1) {
      style += `fill-opacity:${this._opacity};`;
    }
    let transform = "";
    if (this._movex == 0 && this._movey == 0) {
      // そのまま
    }
    else {
      transform += `translate(${this._movex}, ${this._movey})`;
    }
    if (this._rotate == 0) {
      // そのまま
    }
    else {
      transform += ` rotate(${this._rotate})`;
    }
    if (this._scalex == 1 && this._scaley == 1) {
      // そのまま
    }
    else {
      transform += ` scale(${this._scalex}, ${this._scaley})`;
    }
    let shape = `<ellipse cx="${this._x}" cy ="${this._y}" rx="${this._rx}" ry="${this._ry}" style="${style}" />`;
    if (transform != "") {
      shape = shape.replace("/>", `transform="${transform}"` + " />");
    }
    return shape;
  }
}


/* == 折れ線 クラス == */
class SvgPolyline extends SvgShape {
  /* コンストラクタ */
  constructor(options=null) {
    super(options);
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

  /* SVG の文字列 (SvgPolyline) */
  toString() {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};`;
    if (this._borderType != SvgShape.SOLID) {
      let dash = SvgShape.getDashArray(this._borderType);
      style += `stroke-dasharray:${dash};`;
    }
    if (this._marker != "") {
      let marker_id = "#" + this._marker;
      style += `marker-end:url(${marker_id});`;
    }
    let p = this._points.join(' ');
    let transform = "";
    if (this._movex == 0 && this._movey == 0) {
      // そのまま
    }
    else {
      transform += `translate(${this._movex}, ${this._movey})`;
    }
    if (this._rotate == 0) {
      // そのまま
    }
    else {
      transform += ` rotate(${this._rotate})`;
    }
    if (this._scalex == 1 && this._scaley == 1) {
      // そのまま
    }
    else {
      transform += ` scale(${this._scalex}, ${this._scaley})`;
    }
    let shape = `<polyline fill="none" points="${p}" style="${style}" />`;
    if (transform != "") {
      shape = shape.replace("/>", `transform="${transform}"` + " />");
    }
    return shape;
  }
}


/* == 多角形 クラス == */
class SvgPolygon extends SvgShape {
  /* コンストラクタ */
  constructor(options=null) {
    super(options);
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

  /* SVG の文字列 (SvgPolygon) */
  toString() {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};fill:${this._bgcolor};`;
    if (this._borderType != SvgShape.SOLID) {
      let dash = SvgShape.getDashArray(this._borderType);
      style += `stroke-dasharray:${dash};`;
    }
    if (this._opacity > 0 && this._opacity <= 1) {
      style += `fill-opacity:${this._opacity};`;
    }
    let p = this._points.toString();
    let transform = "";
    if (this._movex == 0 && this._movey == 0) {
      // そのまま
    }
    else {
      transform += `translate(${this._movex}, ${this._movey})`;
    }
    if (this._rotate == 0) {
      // そのまま
    }
    else {
      transform += ` rotate(${this._rotate})`;
    }
    if (this._scalex == 1 && this._scaley == 1) {
      // そのまま
    }
    else {
      transform += ` scale(${this._scalex}, ${this._scaley})`;
    }
    let shape = `<polygon fill="none" points="${p}" style="${style}" />`;
    if (transform != "") {
      shape = shape.replace("/>", `transform="${transform}"` + " />");
    }
    return shape;
  }
}

/* == 文字列クラス == */
class SvgText extends SvgShape {
  /* コンストラクタ */
  constructor(text, x=0, y=0, options=null) {
    super(options);
    this._text = text;
    this._x = x;
    this._y = y;
    this._fontfamily = "sans-serif";
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

  /* SVG の文字列 (SvgText) */
  toString() {
    let transform = "";
    if (this._movex == 0 && this._movey == 0) {
      // そのまま
    }
    else {
      transform += `translate(${this._movex}, ${this._movey})`;
    }
    if (this._rotate == 0) {
      // そのまま
    }
    else {
      transform += ` rotate(${this._rotate})`;
    }
    if (this._scalex == 1 && this._scaley == 1) {
      // そのまま
    }
    else {
      transform += ` scale(${this._scalex}, ${this._scaley})`;
    }
    let body = `<text x="${this._x}" y="${this._y}" fill="${this._fgcolor}" font-family="${this._fontfamily}" font-size="${this._fontsize}">`;
    if (transform != "") {
      body = body.replace(">", ` transform="${transform}"` + ">");
    }
    body += this._text;
    let text = body + "</text>";
    return text;
  }
}

/* == Path クラス (v2.2.0) == */
class SvgPath extends SvgShape {
  /* コンストラクタ */
  constructor(options=null) {
    super(options);
    this._path = "";
  }
  
  /* パスコマンドを追加する。*/
  addCommand(cmd) {
    this._path += cmd;
  }
  
  /* パスを表すプロパティ */
  get path() {
    return this._path;
  }
  
  set path(p) {
    this._path = p;
  }
  
  /* 文字列表現 (SvgPath) */
  toString() {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};fill:${this._bgcolor};`;
    if (this._borderType != SvgShape.SOLID) {
      let dash = SvgShape.getDashArray(this._borderType);
      style += `stroke-dasharray:${dash};`;
    }
    if (this._marker != "") {
      let marker_id = "#" + this._marker;
      style += `marker-end=url(${marker_id});`;
    }
    let shape = `<path d="${this._path}" style="${style}" />`;
    return shape;
  }
}


/* == Use クラス (v2.2.0) == */
class SvgUse extends SvgShape {
  /* コンストラクタ */
  constructor(x, y, w, h, xlink, options=null) {
    super(options);
    this._x = x;
    this._y = y;
    this._width = w;
    this._height = h;
    this._xlink = xlink;
  }

  /* 文字列表現 */
  toString() {
    let use = `<use x="${this._x}" y="${this._y}" width="${this._width}" height="${this._height}" xlink:href="${this._xlink}" />`;
    return use;
  }
}

/* == Image クラス (v2.3.0) == */
class SvgImage extends SvgShape {
  /* コンストラクタ */
  constructor(x, y, w, h, xlink, options=null) {
    super(options);
    this._x = x;
    this._y = y;
    this._width = w;
    this._height = h;
    this._xlink = xlink;
  }

  /* 文字列表現 (SvgImage) */
  toString() {
    let use = `<image x="${this._x}px" y="${this._y}px" width="${this._width}px" height="${this._height}px" xlink:href="${this._xlink}" />`;
    return use;
  }
}


