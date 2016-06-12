"use strict";
const events = require('events');

const fooEvent = () => {
    console.log('Foo event triggered');
}

class CustomEvents{
    constructor(){
        this._emitter = new events.EventEmitter();
        this._bindEvents();
    }

    _bindEvents(){
        this._emitter.on('foo', fooEvent);
    }

    unbindEvents(){
        this._emitter.removeListener('foo', fooEvent);
    }

    trigger(eventName){
        this._emitter.emit(eventName);
    }
}

module.exports = CustomEvents;