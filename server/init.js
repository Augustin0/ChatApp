const path = require("path");
const express = require("express");
const app = require("express")();
const http = require("http");
const socketIo = require("socket.io");

const public = path.resolve(__dirname, "../public")
const on = http.createServer(app);
app.use(express.static(public));






module.exports = on;
module.exports.io = socketIo(on);