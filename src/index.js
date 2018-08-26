import React from 'react';
import ReactDOM from 'react-dom';
import {animateScroll as scroll} from "react-scroll";

function getCurPage(scrollTop) {
  let curPage = 0;
  let curHeight = document.getElementsByClassName("page")[0].offsetHeight;

  while (scrollTop > curHeight - (window.innerHeight/2) && curPage < document.getElementsByClassName("page").length - 1) {
    curPage++;
    curHeight += document.getElementsByClassName("page")[curPage].offsetHeight;
  }

  return curPage;
}

function getExactCurPage(scrollTop) {
  for (var i = 0; i < document.getElementsByClassName("page").length; i++) {
    if (scrollTop > document.getElementsByClassName("page")[i].offsetTop && scrollTop < document.getElementsByClassName("page")[i].offsetTop + document.getElementsByClassName("page")[i].offsetHeight - window.innerHeight) {
      return i;
    }
  }

  return -1;
}

function getHalfCurPage(scrollTop) {
  let curPage = 0;
  let curHeight = document.getElementsByClassName("page")[0].offsetHeight;

  while (scrollTop >= curHeight - window.innerHeight && curPage < document.getElementsByClassName("page").length - 1) {
    curPage++;
    curHeight += document.getElementsByClassName("page")[curPage].offsetHeight;
  }

  return curPage;
}

class Hexagon extends React.Component {
  render() {
    const size = this.props.size;
    const opacity = this.props.opacity;

    let pt_87 = 87 * (size/100);
    let pt_50 = size * 0.5;

    let points_string = pt_87 + ",0 " + (pt_87 * 2) + "," + pt_50 + " " + (pt_87 * 2) + "," + (pt_50 * 3) + " " + pt_87 + "," + (pt_50 * 4) + " 0," + (pt_50 * 3) + " 0," + pt_50 + " " + pt_87 + ",0";
    let class_string = "hex hex-" + opacity + " " + this.props.className;
    class_string = this.props.animated ? class_string + " animated" : class_string;
    let style = {
      left: this.props.pos[0] + "px",
      top: this.props.pos[1] + "px",
      animationDelay: (Math.random() * 5) + "s",
      animationDuration: (Math.random() * 10) + 10 + "s"
    };

    return (
      <div className={class_string} style={style}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={size * 2} height={size * 2}>
          <polygon 
          className="hex" 
          points= {points_string}
          ></polygon>                    
        </svg>
      </div>
    );
  }
}

class Hexagons extends React.Component {
  constructor(props) {
    super(props);
    const size = this.props.size;

    this.x = (-2.5 * size) - 10;
    this.y = window.innerHeight/2 - size/2 + 37.5;
    this.state = {
      size: size
    };
  }

  renderHexagon(size, opacity, is_down, is_left, animated = false) {
    let x_diff = is_left ? (-size * 1) : (size * 1);
    x_diff = is_down === 0 ? x_diff * 2 : x_diff;

    let y_diff = is_down * size * 1.7;
  
    this.x += x_diff;
    this.y += y_diff;

    return <Hexagon className={""} size={size} opacity={opacity} pos={[this.x, this.y]} animated={animated} />;
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return(
      <div>
        {this.renderHexagon(this.props.size, 60, 0, false)}
        {this.renderHexagon(this.props.size, 60, 1, false)}
        {this.renderHexagon(this.props.size, 60, -1, false)}
        {this.renderHexagon(this.props.size, 60, -1, true)}
        {this.renderHexagon(this.props.size, 60, -1, true)}
        {this.renderHexagon(this.props.size, 60, -1, true)}
        {this.renderHexagon(this.props.size, 30, -1, false)}
        {this.renderHexagon(this.props.size, 10, -1, false)}
        {this.renderHexagon(this.props.size, 10, 1, false)}
        {this.renderHexagon(this.props.size, 30, 1, true)}
        {this.renderHexagon(this.props.size, 30, 0, false)}
        {this.renderHexagon(this.props.size, 30, 1, true)}
        {this.renderHexagon(this.props.size, 30, 1, false)}
        {this.renderHexagon(this.props.size, 30, 1, false)}
        {this.renderHexagon(this.props.size, 30, 1, false)}
        {this.renderHexagon(this.props.size, 30, 0, true)}
        {this.renderHexagon(this.props.size, 30, 1, true)}
        {this.renderHexagon(this.props.size, 30, 0, true)}
        {this.renderHexagon(this.props.size, 10, 1, false)}
        {this.renderHexagon(this.props.size, 10, 1, false, true)}
        {this.renderHexagon(this.props.size, 10, -1, false)}
        {this.renderHexagon(this.props.size, 10, -1, false)}
        {this.renderHexagon(this.props.size, 10, 0, false)}
        {this.renderHexagon(this.props.size, 10, 1, false, true)}
        {this.renderHexagon(this.props.size, 10, -1, false, true)}
        {this.renderHexagon(this.props.size, 10, -1, true)}
        {this.renderHexagon(this.props.size, 10, -1, true)}
        {this.renderHexagon(this.props.size, 10, -1, false, true)}
        {this.renderHexagon(this.props.size, 10, 0, true)}
        {this.renderHexagon(this.props.size, 10, -1, true)}
        {this.renderHexagon(this.props.size, 10, -1, false)}
        {this.renderHexagon(this.props.size, 10, -1, true)}
        {this.renderHexagon(this.props.size, 10, -1, false, true)}
      </div>
    );
  }
}

class HexagonOutline extends React.Component {
  constructor(props) {
    super(props);
    const size = this.props.size;

    this.x = 0;
    this.y = 0;

    this.state = {
      size: size
    };
  }

  renderHexagon(size, opacity, animated = false, classname = "") {
    return <Hexagon className={classname} size={size} opacity={opacity} pos={[this.x, this.y]} animated={animated} />;
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return(
      <div>
        {this.renderHexagon(this.props.size, 100, false)}
        {this.renderHexagon(this.props.size - 5, 100, false, "bg-hex")}
      </div>
    );
  }
}

class HexagonButton extends React.Component {
  constructor(props) {
    super(props);
    const size = this.props.size;

    this.x = 0;
    this.y = 0;

    this.state = {
      size: size,
      hover: false
    };
  }

  renderHexagon(size, opacity, animated = false, classname = "animated") {
    return <Hexagon className={classname} size={size} opacity={opacity} pos={[this.x, this.y]} animated={animated} />;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return(
      <div>
        {this.renderHexagon(this.props.size, 100, false)}
      </div>
    );
  }
}


class HexagonGraphs extends React.Component {
  constructor(props) {
    super(props);
    const size = this.props.size;

    this.x = 0;
    this.y = 0;

    this.state = {
      size: size,
      hover: false
    };
  }

  renderHexagon(size, opacity, animated = false, classname = "animated") {
    return <Hexagon className={classname} size={size} opacity={opacity} pos={[this.x, this.y]} animated={animated} />;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return(
      <div className="graphs">
        {this.renderHexagon(this.props.size, 100, false, "first")}
        {this.renderHexagon(this.props.size, 100, false, "second")}
      </div>
    );
  }
}

class NavItem extends React.Component {
  render() {
    this.active = (this.props.active - this.props.num) === 0 ? true : false;
    let classes = this.active ? "nav-item active" : "nav-item";
    return <button className={classes} onClick={() => this.props.onClick(this.props.num)} onMouseEnter={() => this.props.onMouseEnter(this.props.num)} onMouseLeave={() => this.props.onMouseLeave(this.props.num)} >{this.props.text}</button>;
  }
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.numItems = 0;
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollOffset = 1000;
    this.lastScroll = (new Date()).getTime() - this.scrollOffset;
    this.state = {
      active_page: 0,
      hover_page: 0
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleClick(num) {
    let pageHeight = document.getElementsByClassName("page")[num].offsetTop;

    if (window.innerWidth > 900) {
      scroll.scrollTo(pageHeight);
    } else {
      scroll.scrollTo(pageHeight - 50);
    }

    this.lastScroll = (new Date()).getTime();
    
    this.setState({ 
      active_page: num,
      hover_page: num 
    });

    toggleNav();
  }

  handleScroll(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    var scrollTopVal = target.scrollingElement.scrollTop;

    let curPage = getCurPage(scrollTopVal);
    let pageHeight = document.getElementsByClassName("page")[0].offsetHeight;

    if (window.innerWidth < 900) {
      document.getElementById("nav-bar").classList.add("fixed");
      document.getElementById("nav-bar").classList.remove("partially-fixed-1");
      document.getElementById("nav-bar").classList.remove("partially-fixed-2");
    } else {
      if (scrollTopVal > pageHeight - 100) {
        document.getElementById("nav-bar").classList.add("fixed");
        document.getElementById("nav-bar").classList.remove("partially-fixed-1");
        document.getElementById("nav-bar").classList.remove("partially-fixed-2");
      } else if (scrollTopVal > pageHeight/2) {
        document.getElementById("nav-bar").classList.remove("fixed");
        document.getElementById("nav-bar").classList.remove("partially-fixed-1");
        document.getElementById("nav-bar").classList.add("partially-fixed-2");
      } else if (scrollTopVal > 100) {
        document.getElementById("nav-bar").classList.remove("fixed");
        document.getElementById("nav-bar").classList.add("partially-fixed-1");
        document.getElementById("nav-bar").classList.remove("partially-fixed-2");
      } else {
        document.getElementById("nav-bar").classList.remove("fixed");
        document.getElementById("nav-bar").classList.remove("partially-fixed-1");
        document.getElementById("nav-bar").classList.remove("partially-fixed-2");
      }
    }

    var paragraphs = document.getElementsByClassName('paragraph');
    var titles = document.getElementsByClassName('title');

    scrollElementShow(paragraphs, scrollTopVal);
    scrollElementShow(titles, scrollTopVal);
    
    if (this.lastScroll <= ((new Date()).getTime() - this.scrollOffset) && curPage !== this.state.active_page) {
      this.setState({
        active_page: curPage,
        hover_page: curPage
      });
    } 
  }

  handleMouseOver(num) {
    this.setState({ hover_page: num });
  }

  handleMouseOut() {
    let active = this.state.active_page;
    this.setState({ hover_page: active });
  }

  renderNavItem(string, active) {
    return <NavItem text={string} num={this.numItems++} active={active} onClick={num => this.handleClick(num)} onMouseEnter={num => this.handleMouseOver(num)} onMouseLeave={num => this.handleMouseOut()}/>;
  }

  renderHexagon(size, opacity) {
    let active = this.state.active_page;
    //let hover = this.state.hover_page;

    let nav_item = document.querySelectorAll(".nav-item")[active];
    let left = nav_item ? nav_item.offsetLeft + (nav_item.offsetWidth/2 - size * 0.85): (35 - size * 0.85);

    //left += (hover - active) * 10;
    
    return <Hexagon size={size} opacity={opacity} pos={[left, 0]} animated={false} className="nav-hex" />;
  }

  render() {
    this.numItems = 0;
    return(
      <div>
        {this.renderNavItem("Home", this.state.active_page)}
        {this.renderNavItem("Mission", this.state.active_page)}
        {this.renderNavItem("Impact", this.state.active_page)}
        {this.renderNavItem("People", this.state.active_page)}
        {this.renderNavItem("Contact", this.state.active_page)}
        {this.renderHexagon(25, 90)}
        <div className="hamburger" id="hamburger">
          <hr noshade="true" />
          <hr noshade="true" />
          <hr noshade="true" />
        </div>
      </div>
    );
  }
}

class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.size = 60;
  }

  renderHexagon(size, opacity) {
    return <Hexagon size={size} opacity={opacity} pos={[0, 0]} animated={false} />;
  }

  renderQuote(top_quote) {
    if (top_quote) {
      return <div className="actual-quote">“</div>;
    } else {
      return <div className="actual-quote" id="bottom-quote">”</div>;
    }
  }

  render() {
    let style = {
      left: this.props.posx - this.size,
      top: this.props.posy - this.size
    }
    return(
      <div style={style} className="quote-container">
        {this.renderHexagon(this.size, 10)}
        {this.renderQuote(this.props.top_quote)}
      </div>
      );
  }
}

class Quotes extends React.Component {
  renderQuoteGroup(pos_x, pos_y, top_quote) {
    return <Quote posx={pos_x} posy={pos_y} top_quote={top_quote}/>;
  }

  render() {
    let mission_text = document.querySelector("#mission-text");
    let left = mission_text.offsetLeft;
    let top = mission_text.offsetTop;
    let width = mission_text.offsetWidth;
    let height = mission_text.offsetHeight;

    return(
      <div>
        {this.renderQuoteGroup(left - (width/2) - 10, top - (height/2), true)}
        {this.renderQuoteGroup(left + (width/2) + 20, top + (height/2) - 5, false)}
      </div>
    )
  }
}

class ScrollHex extends React.Component {
  constructor(props) {
    super(props);
    this.size = 30;
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      scrollOffset: 0,
      curPage: 0,
      maxPages: document.getElementsByClassName("page").length
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleClick() {
    let offset = (this.state.curPage !== this.state.maxPages - 1) ? 1 : -1 * (this.state.maxPages - 1);
    let pageHeight = document.getElementsByClassName("page")[this.state.curPage + offset].offsetTop;
    scroll.scrollTo(pageHeight);
  }

  handleScroll(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    var scrollTopVal = target.scrollingElement.scrollTop;

    let curPage = getCurPage(scrollTopVal);
    
    if (curPage !== this.state.curPage) {
      this.setState({
        curPage: curPage
      });
    } 

    let exactCurPage = getExactCurPage(scrollTopVal);
    let halfCurPage = getHalfCurPage(scrollTopVal);

    var percentImpact = (scrollTopVal - document.querySelector("#impact").offsetTop + (window.innerHeight * 0.5))/(document.querySelector("#impact").offsetHeight - (window.innerHeight * 0.5));
    var percentTeam = (scrollTopVal - document.querySelector("#team").offsetTop + (window.innerHeight * 0.5))/(document.querySelector("#team").offsetHeight - (window.innerHeight * 0.5));
    
    if (exactCurPage === 2) {
      document.querySelector("#impactText").classList.add("fixing");
      this.setState({
        scrollOffset: (scrollTopVal - document.querySelector("#impact").offsetTop)
      });

      partialHex(percentImpact * 100, document.querySelector("#hexagon-outline1").childNodes[0].childNodes[0]);
    } else if (exactCurPage === 3) {
      document.querySelector("#teamText").classList.add("fixing");
      this.setState({
        scrollOffset: (scrollTopVal - document.querySelector("#team").offsetTop)
      });

      partialHex(percentTeam * 100, document.querySelector("#hexagon-outline2").childNodes[0].childNodes[0]);
    } else {
      this.setState({
        scrollOffset: 0
      });
      document.querySelector("#impactText").classList.remove("fixing");
      document.querySelector("#impactText").classList.remove("higher");

      if (halfCurPage === 2 && curPage === 2 && exactCurPage === -1) {
        partialHex(percentImpact * 100, document.querySelector("#hexagon-outline1").childNodes[0].childNodes[0]);
      } else {
        partialHex(0, document.querySelector("#hexagon-outline1").childNodes[0].childNodes[0]);
      }

      document.querySelector("#teamText").classList.remove("fixing");
      document.querySelector("#teamText").classList.remove("higher");

      if (halfCurPage === 3 && curPage === 3 && exactCurPage === -1) {
        partialHex(percentTeam * 100, document.querySelector("#hexagon-outline2").childNodes[0].childNodes[0]);
      } else {
        partialHex(0, document.querySelector("#hexagon-outline2").childNodes[0].childNodes[0]);
      }

      if (halfCurPage > 2) {
        if (curPage === 2) {
          this.setState({
            scrollOffset: document.querySelector("#impact").offsetHeight - (window.innerHeight)
          });
        }
        document.querySelector("#impactText").classList.add("higher");

        partialHex(100, document.querySelector("#hexagon-outline1").childNodes[0].childNodes[0]);
      }
      
      if (halfCurPage > 3) {
        if (curPage === 3) {
          this.setState({
            scrollOffset: document.querySelector("#team").offsetHeight - (window.innerHeight)
          });
        }
        document.querySelector("#teamText").classList.add("higher");
        
        partialHex(100, document.querySelector("#hexagon-outline2").childNodes[0].childNodes[0]);
      }
    }
  }

  renderHexagon(size, opacity, class_string = "") {
    return <Hexagon className={class_string} size={size} opacity={opacity} pos={[0, 0]} animated={false} />;
  }

  renderArrow() {
    return <div id="arrow">↓</div>;
  }

  render() {
    let pageHeight = document.getElementsByClassName("page")[this.state.curPage].offsetTop;

    let style = {
      top: (window.innerHeight - 150) + pageHeight + this.state.scrollOffset
    }
    if (this.state.curPage === this.state.maxPages - 1) {
      style = {
        top: (window.innerHeight - 200) + pageHeight + this.state.scrollOffset
      }
    }

    let class_string = (this.state.curPage === this.state.maxPages - 1) ? "rotated" : "";
    class_string += (document.getElementsByClassName("page")[this.state.curPage].classList.contains("split")) ? "opaque" : "";

    return(
      <div style={style} className={class_string} id="scroll-container" onClick={() => this.handleClick()}>
        {this.renderHexagon(this.size + 3, 100, "bghex")}
        {this.renderHexagon(this.size, 100)}
        {this.renderArrow()}
      </div>
    );
  }
}

ReactDOM.render(<Hexagons size={30}/>, document.querySelector('#hexagons'));
ReactDOM.render(<NavBar />, document.querySelector('#nav-items'));
ReactDOM.render(<ScrollHex />, document.querySelector("#scroll-hex"));
ReactDOM.render(<HexagonOutline size={150}/>, document.querySelector("#hexagon-outline1"));
ReactDOM.render(<HexagonOutline size={150}/>, document.querySelector("#hexagon-outline2"));
ReactDOM.render(<HexagonButton size={120}/>, document.querySelector("#hexagon-button"));
ReactDOM.render(<HexagonGraphs size={90}/>, document.querySelector("#hexagon-graphs"));

resize();

window.onresize = function(event) {
  resize();
  ReactDOM.render(<Quotes />, document.querySelector("#quotes"));
};

function resize() {
  if (window.innerWidth < 900) {
    document.getElementById("nav-bar").classList.add("fixed");
    document.getElementById("nav-bar").classList.remove("partially-fixed-1");
    document.getElementById("nav-bar").classList.remove("partially-fixed-2");
  }

  var bios = document.getElementsByClassName('bio');
  Array.prototype.forEach.call(bios, function(elements, index) {
    var bioheight = document.getElementsByClassName('team-member')[index].offsetHeight;
    var hexheight = 150;
  
    document.getElementsByClassName('headshot')[index].style.marginTop = (hexheight - bioheight)/-2 + "px";
    if (window.innerWidth > 900) {
      document.getElementsByClassName('bio')[index].style.height = bioheight + 20 + "px";
    }
  });

  let mission_text = document.querySelector("#mission-text");
  let left = mission_text.offsetLeft;
  let top = mission_text.offsetTop;
  let width = mission_text.offsetWidth;
  let height = mission_text.offsetHeight;

  document.querySelector("#left-quote").style.left = left - (width/2) - 10 - 60 + "px";
  document.querySelector("#left-quote").style.top = top - (height/2) - 60 + "px";
  document.querySelector("#right-quote").style.left = left + (width/2) + 10 - 60 + "px";
  document.querySelector("#right-quote").style.top = top + (height/2) - 5 - 60 + "px";
}

document.getElementById("hamburger").onclick = function (oEvent) {
  toggleNav();
}

function toggleNav() {
  var navs = document.getElementsByClassName('nav-item');
  Array.prototype.forEach.call(navs, function(elements, index) {
    if (document.getElementsByClassName('nav-item')[index].classList.contains("expand")) {
      document.getElementsByClassName('nav-item')[index].classList.remove("expand");      
    } else {
      document.getElementsByClassName('nav-item')[index].classList.add("expand");      
    }
  });
}

function partialHex(percent, hexagon) {
  percent = Math.min(Math.max(0, percent), 100);

  var raw_points = hexagon.childNodes[0].childNodes[0].dataset.points;
  if (!raw_points)
  {
    raw_points = hexagon.childNodes[0].childNodes[0].attributes.points.value;
    hexagon.childNodes[0].childNodes[0].dataset.points = raw_points;
  }
  raw_points = raw_points.split(" ");

  if (percent === 0) {
    hexagon.childNodes[0].childNodes[0].attributes.points.value = " ";
    return;
  } else if (percent === 100) {
    hexagon.childNodes[0].childNodes[0].attributes.points.value = raw_points;
    return;
  }

  var pointsX = [];
  var pointsY = [];
  for (var i = 0; i < raw_points.length - 1; i++) {
    var raw_point = raw_points[i].split(",");
    pointsX.push(parseInt(raw_point[0], 10));
    pointsY.push(parseInt(raw_point[1], 10));
  }

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  var centerX = pointsX.reduce(reducer) / pointsX.length;
  var centerY = pointsY.reduce(reducer) / pointsY.length;
  
  var fullVertexUpTo = parseInt(percent / 16.6666, 10);
  var curVertex = 0;

  var result_string = "";

  while (curVertex <= fullVertexUpTo) {
    result_string += pointsX[curVertex] + "," + pointsY[curVertex] + " ";
    curVertex++;
  }

  curVertex--;
  
  var diffX = pointsX[(curVertex + 1) % pointsX.length] - pointsX[curVertex];
  var diffY = pointsY[(curVertex + 1) % pointsX.length] - pointsY[curVertex];

  var partialVertex = percent % 16.6666;

  var newX = (diffX * (partialVertex/16.6666)) + pointsX[curVertex];
  var newY = (diffY * (partialVertex/16.6666)) + pointsY[curVertex];
  result_string += newX + "," + newY + " ";

  result_string += parseInt(centerX, 10) + "," + parseInt(centerY, 10) + " ";
  result_string += pointsX[0] + "," + pointsY[0];
  hexagon.childNodes[0].childNodes[0].attributes.points.value = result_string;
}

function scrollElementShow(elementsByClass, scrollTopVal) {
  var index = 0;
    while (index < elementsByClass.length && scrollTopVal > getOffset(elementsByClass[index]).top - (window.innerHeight * 0.75)) {
      elementsByClass[index].classList.add("show-paragraph");
      index++;
    }

    while (index < elementsByClass.length) {
      elementsByClass[index].classList.remove("show-paragraph");
      index++;
    }
}

var newParent1 = document.getElementById('hexagon-graphs').childNodes[0].childNodes[0];
var newParent2 = document.getElementById('hexagon-graphs').childNodes[0].childNodes[1];
var graphText1 = document.getElementById('graph-text-1');
var graphText2 = document.getElementById('graph-text-2');

newParent1.appendChild(graphText1);
newParent2.appendChild(graphText2);

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

let mission_text = document.querySelector("#mission-text");
let left = mission_text.offsetLeft;
let top = mission_text.offsetTop;
let width = mission_text.offsetWidth;
let height = mission_text.offsetHeight;

document.querySelector("#left-quote").style.left = left - (width/2) - 10 - 60 + "px";
document.querySelector("#left-quote").style.top = top - (height/2) - 60 + "px";
document.querySelector("#right-quote").style.left = left + (width/2) + 10 - 60 + "px";
document.querySelector("#right-quote").style.top = top + (height/2) - 5 - 60 + "px";