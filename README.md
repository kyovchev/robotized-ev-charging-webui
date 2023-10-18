# Robotized EV Charging Experiment Web-based User Interface

This is a simple web-based user interface.

It allows sending a start or stop charging command to the [Robotized EV Charging Service](https://github.com/kyovchev/robotized-ev-charging-service).

The Web UI uses websockets to connect to the service at ws://127.0.0.1:8999/.

Supported commands:
- `start`: start charging;
- `stop`: stop charging.

The following [video](https://www.youtube.com/watch?v=EsUwTnE6e_E) demonstrates the work of the web-based user interface. The UI is sending commands to the service. The service is connected to a simulated Charge Point via OCPP 1.6.

[![WebUI Demonstration](https://img.youtube.com/vi/EsUwTnE6e_E/0.jpg)](https://www.youtube.com/watch?v=EsUwTnE6e_E)
