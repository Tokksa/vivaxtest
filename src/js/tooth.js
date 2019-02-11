var transformProp = (function(){
  var testEl = document.createElement('div');
  if(testEl.style.transform == null) {
    var vendors = ['Webkit', 'Moz', 'ms'];
    for(var vendor in vendors) {
      if(testEl.style[ vendors[vendor] + 'Transform' ] !== undefined) {
        return vendors[vendor] + 'Transform';
      }
    }
  }
  return 'transform';
})();

let isVisible = function (el) {
  var coords = el.getBoundingClientRect();
  var windowHeight = document.documentElement.clientHeight;

  var topVisible = coords.top > 0 && coords.top < windowHeight;
  var bottomVisible = coords.bottom > 0 && coords.bottom < windowHeight;

  return topVisible || bottomVisible;
};

class SpriteAnimate {

  constructor(selector, options) {
    this.element = document.querySelector(selector);
    if (! this.element) { return; }

    this._default = {
      frameCount: 1,
    };

    this.options = Object.assign(this._default, options);

    this.init();
  }

  step(direction) {
    this.currentOffset = direction === 'down' ? this.currentOffset - this.stepOffset : this.currentOffset + this.stepOffset;

    if (this.currentOffset > 0) {
      this.currentOffset = 0 - this.maxOffset;
    } else if (Math.abs(this.currentOffset) > this.maxOffset) {
      this.currentOffset = 0;
    }

    this.element.style[transformProp] = 'translate3d(' + this.currentOffset + '%,0,0)';
    // setElementStyle(this.element, 'transform', 'translate3d(' + this.currentOffset + '%,0,0)');
    // this.element.style.transform = 'translate3d(' + this.currentOffset + '%,0,0)';
  }

  scroll(e) {
    let st = window.pageYOffset || document.documentElement.scrollTop,
      direction = st > this.lastScrollTop ? 'down' : 'up';

    if (Math.abs(st - this.lastScrollTop) < 10) { return; }

    this.lastScrollTop = st;

    if (isVisible(this.element)) { this.step(direction); }
  }

  init() {
    this.stepOffset = 100 / this.options.frameCount,
    this.maxOffset = 100 - this.stepOffset,
    this.currentOffset = 0;

    document.addEventListener('scroll', this.scroll.bind(this));
  }
}

let tooth = new SpriteAnimate('.js-tooth', {
  frameCount: 61,
});
