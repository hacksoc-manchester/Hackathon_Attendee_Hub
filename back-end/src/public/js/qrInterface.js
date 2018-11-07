let scanner;
let camera;

function startScanner() {
  $("#qr-scanner-container").fadeIn("slow");
  scanner = new Instascan.Scanner({ video: document.getElementById('qr-scanner') });
  scanner.addListener('scan', function (content) {
    var info = JSON.parse(content);
    // console.log(response);
    $.post({
      url: "/achievements/" + info.id + "/incrementProgress",
      data: {
        step: info.step,
        token: info.token
      },
      success: function(response) {
        console.log(response);
      }
    })
  });
  Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
      camera = cameras[0];
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
  scanner = new Instascan.Scanner({ video: document.getElementById(videoObjId) });
  scanner.addListener('scan', function (content) {
    callback(content);
  });
  Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
      camera = cameras[0];
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