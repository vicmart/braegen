import React from 'react';
import ReactDOM from 'react-dom';
import {animateScroll as scroll} from "react-scroll";

function getCurPage(event) {
  let scrollTop = event.srcElement.body.scrollTop;
  let curPage = 0;
  let curHeight = document.getElementsByClassName("page")[0].offsetHeight;

  while (scrollTop > curHeight - (window.innerHeight/2) && curPage < document.getElementsByClassName("page").length - 1) {
    curPage++;
    curHeight += document.getElementsByClassName("page")[curPage].offsetHeight;
  }

  return curPage;
}

function getExactCurPage(event) {
  let scrollTop = event.srcElement.body.scrollTop;

  for (var i = 0; i < document.getElementsByClassName("page").length; i++) {
    if (scrollTop > document.getElementsByClassName("page")[i].offsetTop && scrollTop < document.getElementsByClassName("page")[i].offsetTop + document.getElementsByClassName("page")[i].offsetHeight - window.innerHeight) {
      return i;
    }
  }

  return -1;
}

function getHalfCurPage(event) {
  let scrollTop = event.srcElement.body.scrollTop;
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
      <div>
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
    scroll.scrollTo(pageHeight);
    this.lastScroll = (new Date()).getTime();
    
    this.setState({ 
      active_page: num,
      hover_page: num 
    });
  }

  handleScroll(event) {
    let curPage = getCurPage(event);
    let pageHeight = document.getElementsByClassName("page")[0].offsetHeight;

    if (event.srcElement.body.scrollTop > pageHeight - 100) {
      document.getElementById("nav-bar").classList.add("fixed");
      document.getElementById("nav-bar").classList.remove("partially-fixed-1");
      document.getElementById("nav-bar").classList.remove("partially-fixed-2");
    } else if (event.srcElement.body.scrollTop > pageHeight/2) {
      document.getElementById("nav-bar").classList.remove("fixed");
      document.getElementById("nav-bar").classList.remove("partially-fixed-1");
      document.getElementById("nav-bar").classList.add("partially-fixed-2");
    } else if (event.srcElement.body.scrollTop > 100) {
      document.getElementById("nav-bar").classList.remove("fixed");
      document.getElementById("nav-bar").classList.add("partially-fixed-1");
      document.getElementById("nav-bar").classList.remove("partially-fixed-2");
    } else {
      document.getElementById("nav-bar").classList.remove("fixed");
      document.getElementById("nav-bar").classList.remove("partially-fixed-1");
      document.getElementById("nav-bar").classList.remove("partially-fixed-2");
    }

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
    
    return <Hexagon size={size} opacity={opacity} pos={[left, 0]} animated={false} />;
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
    let curPage = getCurPage(event);
    
    if (curPage !== this.state.curPage) {
      this.setState({
        curPage: curPage
      });
    } 

    let exactCurPage = getExactCurPage(event);
    let halfCurPage = getHalfCurPage(event);
    if (exactCurPage === 2) {
      document.querySelector("#impactText").classList.add("fixing");
      this.setState({
        scrollOffset: (event.srcElement.body.scrollTop - document.querySelector("#impact").offsetTop)
      });
    } else if (exactCurPage === 3) {
      document.querySelector("#teamText").classList.add("fixing");
      this.setState({
        scrollOffset: (event.srcElement.body.scrollTop - document.querySelector("#team").offsetTop)
      });
    } else {
      this.setState({
        scrollOffset: 0
      });
      document.querySelector("#impactText").classList.remove("fixing");
      document.querySelector("#impactText").classList.remove("higher");

      document.querySelector("#teamText").classList.remove("fixing");
      document.querySelector("#teamText").classList.remove("higher");

      if (halfCurPage > 2) {
        if (curPage === 2) {
          this.setState({
            scrollOffset: document.querySelector("#impact").offsetHeight - (window.innerHeight)
          });
        }
        document.querySelector("#impactText").classList.add("higher");
      }
      
      if (halfCurPage > 3) {
        if (curPage === 3) {
          this.setState({
            scrollOffset: document.querySelector("#team").offsetHeight - (window.innerHeight)
          });
        }
        document.querySelector("#teamText").classList.add("higher");
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
ReactDOM.render(<Quotes />, document.querySelector("#quotes"));
ReactDOM.render(<ScrollHex />, document.querySelector("#scroll-hex"));
ReactDOM.render(<HexagonOutline size={150}/>, document.querySelector("#hexagon-outline1"));
ReactDOM.render(<HexagonOutline size={150}/>, document.querySelector("#hexagon-outline2"));
ReactDOM.render(<HexagonButton size={120}/>, document.querySelector("#hexagon-button"));
//ReactDOM.render(<HexagonGraphs size={90}/>, document.querySelector("#hexagon-graphs"));

resize();

window.onresize = function(event) {
  resize();
};

function resize() {
  var bios = document.getElementsByClassName('bio');
  Array.prototype.forEach.call(bios, function(elements, index) {
    var bioheight = document.getElementsByClassName('bio')[index].offsetHeight;
    var hexheight = document.getElementsByClassName('headshot')[index].height.baseVal.value;
  
    document.getElementsByClassName('headshot')[index].style.marginTop = (hexheight - bioheight)/-2;
  });
  
  var sponsor_bios = document.getElementsByClassName('sponsor-bio');
  Array.prototype.forEach.call(sponsor_bios, function(elements, index) {
    var biowidth = document.getElementsByClassName('sponsor-bio')[index].offsetWidth;
    var hexwidth = document.getElementsByClassName('sponsor-headshot')[index].width.baseVal.value;
    var hexleft = document.getElementsByClassName('sponsor-headshot')[index].getBoundingClientRect().x;
  
    document.getElementsByClassName('sponsor-bio')[index].style.left = (hexwidth - biowidth)/2 + (hexleft - (window.innerWidth/2)) + "px";
  });  
}