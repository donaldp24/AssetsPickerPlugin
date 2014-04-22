/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

/**
 * array of selected assets.
 * getPicture's onSuccess() function has dataArray parameter.
 * caller could set dataArray as selected assets next selection.
 */
var selectedAssets = new Array();
/**
 Camera Options
 { quality : 75,
 destinationType : Camera.DestinationType.DATA_URL,
 sourceType : Camera.PictureSourceType.CAMERA,
 allowEdit : true,
 encodingType: Camera.EncodingType.JPEG,
 targetWidth: 100,
 targetHeight: 100,
 popoverOptions: CameraPopoverOptions,
 saveToPhotoAlbum: false
 selectedAssets: assetsArray,
 scrollToDate: currDate
 };
 */
// called when "pick" button is clicked
function onPick()
{
    var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        selectedAssets: selectedAssets
    };
    Camera.getPicture(onSuccess, onFailure, options);
}

// called when "clear" button is clicked
function onClear()
{
    selectedAssets = new Array();
    document.getElementById("imagetable").innerHTML = "";
}

// success callback
function onSuccess(dataArray)
{
    selectedAssets = dataArray;
    var strTr = "";
    for (i = 0; i < selectedAssets.length; i++)
    {
        strTr += "<tr><td><img id='img" + i + "' /></td></tr>";
    }
    document.getElementById("imagetable").innerHTML = strTr;
    for (i = 0; i < selectedAssets.length; i++)
    {
        var obj = selectedAssets[i];
        var image = document.getElementById("img"+i);
        image.src = "data:image/jpeg;base64," + obj.data;
    }
}

// cancel callback
function onFailure(message)
{
    //alert(message);
}

