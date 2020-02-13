window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);


var Key = {
  _pressed: {},
    A: 65,
    B: 66,
    D: 68,
    F: 70,
    L: 76,
    K: 75,
    R: 82,
    S: 83,
    U: 85,
    W: 87,
    T: 84,
    Q: 81,
    X: 88,
    M: 77,
    PLUS :107,
    MINUS :109,
    SPACE: 32,
    1 :97,
    2: 98,
    3: 99,
    4: 100,
    5: 101,
    6: 102,
    7: 103,
    8: 104,
    9: 105,

    LEFTARROW: 37,
    UPARROW: 38,
    RIGHTARROW: 39,
    DOWNARROW: 40,
  
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};


/*
    window.addEventListener("keydown", function(evt) {
        alert("keydown: " + evt.keyCode);
    }, false);
*/