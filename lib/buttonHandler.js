var serialPort = require("serialport");


var buttonHandler = function(espruino){

  this.serialPort = null;
  var that = this;
  serialPort.list(function (err, ports) {
    ports.forEach(function(port) {
      console.log(that.serialPort);
	  this.espruino = espruino;
      if(that.serialPort == null && port.manufacturer.indexOf('Arduino') >= 0){
        console.log('opened ' + port.comName);
        console.log(that.serialPort);
        that.serialPort = new serialPort.SerialPort(port.comName, {
          baudrate: 9600
        }, false); // this is the openImmediately flag [default is true]
        that.serialPort.open(function (error) {
          if ( error ) {
            console.log('failed to open: '+error);
            process.exit(1);
          } else {
            console.log('port open');
			that.serialPort.on('data', function(data) {
              console.log('data received: ' + data);
			  if(data.toString().trim().toUpperCase() == 'A'){
				//  that.espruino.A();
			  }
			    if(data.toString().trim().toUpperCase() == 'B'){
				//  that.espruino.B();
			  }
			    if(data.toString().trim().toUpperCase() == 'C'){
				 // that.espruino.C();
			  }
            });
            that.tilt(107)
          }
        });
      }
    }
  );
});
}

buttonHandler.prototype.sendKey = function(key){
var that = this;
  if (key == 'a'){
    this.pan(75);
    setTimeout(function(){
      that.press();
    },250);
  }
  if(key == 'b'){
    this.pan(59);
    setTimeout(function(){
    that.press();
  },250);
  }
  if (key == 'c'){
    this.pan(47);
    setTimeout(function(){
    that.press();
  },250);
  }
}

buttonHandler.prototype.press = function(){
  this.tilt(90);
  var that = this;
  setTimeout(function(){
    that.tilt(130);
	setTimeout(function(){
		that.tilt(112);
	},200);
  },700);
}

buttonHandler.prototype.pan = function(n){
  this.serialPort.write([1]);
  this.serialPort.write([n]);
}

buttonHandler.prototype.tilt = function(n){
  this.serialPort.write([0]);
  this.serialPort.write([n]);
}

module.exports = buttonHandler;
