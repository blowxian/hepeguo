onmessage = function(message) {
    files = message.data;
    var html = "";
    var j = 1;
    for (var i = 0; i < files.length; i++) {
        var reader = new FileReader();
        reader.onload = function(event) {
            html += '<img src = "' + event.target.result + '" style="max-height: 300px; max-width: 300px;"/>';
            postMessage({"html": html, "j": j});
            j++;
        }
        reader.readAsDataURL(files[i]);
    }
}