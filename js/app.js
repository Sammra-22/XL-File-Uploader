/*
 * XL File Uploader
 *
 */
$(function() {
  "use strict";

  // Initialize the jQuery File Upload widget:
  var loc = window.location;
  var uploaderUrl = loc.protocol + "//" + loc.hostname + "/uploader/";

  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  $("#fileupload")
    .fileupload({
      maxChunkSize: 1000000, // 1 MB -- Enable chuncked upload
      xhrFields: { withCredentials: true },
      url: uploaderUrl
    })
    .bind("fileuploadsubmit", function(e, data) {
      data.formData = { uploadId: uuid() };
    });

  // Enable iframe cross-domain access via redirect option:
  $("#fileupload").fileupload(
    "option",
    "redirect",
    window.location.href.replace(/\/[^\/]*$/, "/cors/result.html?%s")
  );

  // load existing files:
  $("#fileupload").addClass("fileupload-processing");
  $.ajax({
    xhrFields: { withCredentials: true }, //Enable cross-domain cookies
    url: $("#fileupload").fileupload("option", "url"),
    dataType: "json",
    context: $("#fileupload")[0]
  })
    .always(function() {
      $(this).removeClass("fileupload-processing");
    })
    .done(function(result) {
      $(this)
        .fileupload("option", "done")
        .call(this, $.Event("done"), { result: result });
    })
    .fail(function() {
      $('<div class="alert alert-danger"/>')
        .text("Upload server currently unavailable - " + new Date())
        .appendTo("#fileupload");
    });
});
