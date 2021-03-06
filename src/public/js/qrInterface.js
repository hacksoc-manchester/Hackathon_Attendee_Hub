let scanner;
let camera;
let maxCameras;
let camera_option = 0;

function startScanner() {
  $("#qr-scanner-container").fadeIn("slow");
  scanner = new Instascan.Scanner({ video: document.getElementById('qr-scanner'), mirror: false });
  scanner.addListener('scan', function (content) {
    location.href = content;
    closeScanner();
  });
  Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
      maxCameras = cameras.length;
      camera = cameras[camera_option];
      scanner.start(camera);
    } else {
      couldNotStartCamera();
    }
  }).catch(function (e) {
    couldNotStartCamera();
    console.error(e);
  });
}

function startCustomScanner(videoObjId, callback) {
  closeScanner();
  scanner = new Instascan.Scanner({ video: document.getElementById(videoObjId), mirror: false });
  scanner.addListener('scan', function (content) {
    callback(content);
  });
  Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
      maxCameras = cameras.length;
      camera = cameras[camera_option];
      scanner.start(camera);
    } else {
      couldNotStartCamera();
    }
  }).catch(function (e) {
    couldNotStartCamera();
    console.error(e);
  });
}

function closeScanner() {
  if (camera && scanner) {
    scanner.stop(camera);
    $("#qr-scanner-container").fadeOut("slow");
  }
}

function changeScanner(isCustomScanner) {
  if (maxCameras) {
    camera_option = (camera_option + 1) % maxCameras;
    if (!isCustomScanner) {
      closeScanner();
      startScanner();
    }
  }
}

function couldNotStartCamera() {
  $.notify({
    message: 'Could not start webcam!'
  }, {
      type: 'danger'
    });
  $("#qr-scanner-container").fadeOut("slow");
}

function getQRCode(url) {
  return "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + url;
}