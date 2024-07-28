#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DHT.h>


ESP8266WebServer server(80);

DHT dht(2, DHT11);




float temperature = 0;
float humidity = 0;
int mq5Value = 0;




void setup() {


  Serial.begin(115200);

  WiFi.begin("HKT-C", "HKT2024@");

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  // Print out the IP address once connected
  Serial.println("Connected to WiFi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

   
  dht.begin();
  server.on("/", HTTP_GET, handleRoot);
  server.begin();


}

void loop() {
  server.handleClient();

  temperature = dht.readTemperature();
  humidity = dht.readHumidity();
  Serial.println(temperature);
  Serial.println(humidity);
  mq5Value = analogRead(A0);

  delay(2000);
}

void handleRoot() {



  
String html = "<!DOCTYPE html> <html> <head> </head> ";
  html += "<style> body { font-family: Arial, sans-serif; background-color: #a0a0a0; margin: 0; padding: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-size: x-large; text-align: center; font-weight: 900; background-image: url('https://mounseflit.surge.sh/images/im.png'); background-size: contain; background-position: center; background-repeat: no-repeat; } .container { align-items: center; background-color: rgba(0, 0, 0, 0); padding: 20px; height: auto; width: auto; } .data { display: flex; align-items: center; padding: 10px; text-align: center; margin: auto;} .segment { width: 150px; height: 40px; display: inline-block; font-size: xx-large; line-height: 1.2; padding: 5px; text-align:start; margin: 5px; color: rgb(66, 66, 66); } .seg { width: 600px; height: 95px; display: inline-block; font-size: 69px; line-height: 1.2; text-align: center; margin: 5px; color: #f00; } .parent { display: grid; grid-template-columns: repeat(6, 1fr); grid-template-rows: repeat(7, 1fr); grid-column-gap: 13px; grid-row-gap: 25px; } .div1 { grid-area: 2 / 5 / 3 / 7; } .div2 { grid-area: 4 / 5 / 5 / 7; } .div3 { grid-area: 6 / 5 / 7 / 7; } .div4 { grid-area: 2 / 1 / 4 / 5; } .div5 { grid-area: 5 / 1 / 7 / 5; } </style> <body> <div class='container'><br> <div class='parent'><br> ";
  html += "<div class='div1'> <div class='segment'> " + String(temperature) + " &#8451;</div></div>";
  html += "<div class='div2'> <div class='segment'> " + String(humidity) + " %</div></div>";
  html += "<div class='div3'> <div class='segment'> " + String(mq5Value) + "</div></div>";
  html += "<div class='div4'><br> <div class='seg' id='date-segment'></div> </div> <div class='div5'><br> <div class='seg' id='time-segment'></div> </div> </div> </div> </body><script> function updateDateTimeSegments() { const dateSegment = document.getElementById('date-segment'); const timeSegment = document.getElementById('time-segment');const now = new Date();const date = now.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit', });const time = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 1, });dateSegment.textContent = date; timeSegment.textContent = time.replace('.', ''); } updateDateTimeSegments(); setInterval(updateDateTimeSegments, 1000); </script></html>";


// String html = "<!DOCTYPE html> <html> <body> <h1> Hello </h1></body> </html> ";

  server.send(200, "text/html", html);
}










