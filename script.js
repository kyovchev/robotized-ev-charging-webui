var ws = new WebSocket('ws://127.0.0.1:8999/');

const pages = document.getElementsByClassName('page'),
      sendButton = document.getElementById('send'),
      commandInput = document.getElementById('command');
      waitResponse = document.getElementById('waitResponse');

function logAppend(text) {
  var log = document.getElementById('log');
  var date = new Date();
  var hh = ('0' + date.getHours()).slice(-2);
  var mm = ('0' + date.getMinutes()).slice(-2);
  var ss = ('0' + date.getSeconds()).slice(-2);
  log.value = log.value + '\n[' + hh + ':' + mm + ':' + ss + '] ' + text;
  if (document.getElementById('autoScroll').checked) {
    log.scrollTop = log.scrollHeight;
  }
}

ws.onmessage = function(event) {
  logAppend(event.data);
  waitResponse.style.display = 'none';
}

function sendCommand(command) {
  if (!command)
      return;
  waitResponse.style.display = 'block';
  logAppend('> ' + command);
  ws.send(command);
}

var commandsHistory = [];
var currentCommand = 0;
var savedCommand = '';

(function() {
  sendButton.onclick = function() {
     sendCommand(commandInput.value);
  }

  commandInput.oninput = function() {
    if (commandInput.value == '') {
      currentCommand = commandsHistory.length;
      savedCommand = '';
    }
  }

  commandInput.onkeyup = function(e) {
    if (e.keyCode == 13) { // enter
      sendButton.click();
      commandsHistory.push(commandInput.value);
      currentCommand = commandsHistory.length;
      commandInput.value = '';
      savedCommand = '';
    } else if (e.keyCode == 38) { // arrow up
      if (currentCommand == commandsHistory.length) {
        savedCommand = commandInput.value;
      }
      if (currentCommand > 0) {
        commandInput.value = commandsHistory[--currentCommand];
      }
    } else if (e.keyCode == 40) { // arrow down
      if (currentCommand < commandsHistory.length) {
        ++currentCommand;
      }
      if (currentCommand < commandsHistory.length) {
        commandInput.value = commandsHistory[currentCommand];
      } else {
        commandInput.value = savedCommand;
      }
    }
  }

  document.getElementById('clear').onclick = function() {
     document.getElementById('log').value = '';
  }

  document.getElementById('startCharging').onclick = function() {
    sendCommand('start');
  }

  document.getElementById('stopCharging').onclick = function() {
    sendCommand('stop');
  }
})();