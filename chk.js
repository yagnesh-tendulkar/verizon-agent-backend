const WebSocket = require("ws");
const express = require("express");
const app = express();
var cors = require('cors')
const requests = require('request');
const bodyParser = require('body-parser')
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });
// var data = require('./data.json')
// sw = require('stopword')
// var each = require('async-each');
// fuzz = require('fuzzball');
var twilio = require('twilio')('AC59fc6cf08072dd44b82623f6785599be', '8f67b7d6a0e972901440b17c2bbf0927');
const voiceresponse = require('twilio').twiml.VoiceResponse
var cc = require('twilio').jwt.ClientCapability
var capability = new cc({
  'accountSid': 'AC59fc6cf08072dd44b82623f6785599be',
  'authToken': '8f67b7d6a0e972901440b17c2bbf0927'
})
capability.addScope(new cc.IncomingClientScope('yagnesh'))
const token = capability.toJwt();
console.log(token)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
// const speech = require("@google-cloud/speech");
// const client = new speech.SpeechClient();
const request = {
  config: {
    encoding: "MULAW",
    useEnhanced: true,
    model: 'phone_call',
    sampleRateHertz: 8000,
    languageCode: "en-US",
    enableSpeakerDiarization: true,
    diarizationSpeakerCount: 2
  },
  interimResults: false
};
wss.on("connection", function connection(ws) {
  console.log("sadadsadadasdassdsadasd",WebSocket.OPEN)
app.post("/sock",(req,res)=>{
  console.log(req.body.event,req.body.data)


  wss.clients.forEach(client => {   
      client.send(
        JSON.stringify({event:req.body.event,data:req.body.data})
      );
  })
  console.log("sadasd")   
})
  

});

console.log("Listening at Port 8080");
server.listen(4000);
