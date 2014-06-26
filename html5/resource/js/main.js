;
(function(win, doc) {
	var $ = function(id) {
		return doc.getElementById(id) || doc.getElementsByClassName(id) || doc.getElementsByTagName(id);
	}

	var $text = $("text");
	var $speak = $("speak");
	var $audio = $("audio");
	var $camera = $("camera");
	var $video = $("video");
	var $videoSrc = $("videoSrc");
	var $recognize = $("recognize");

	//发音
	$speak.onclick = function() {
		console.log("clicked speak!!!!!!!!!!!!!!!!");
		var msg = new SpeechSynthesisUtterance();
		var voices = win.speechSynthesis.getVoices();
		//Note: some voices don't support altering params 语气
		// msg.voice = voices[10];
		msg.voiceURI = "native";
		//0 to 1 音量
		msg.volume = 1;
		//0.1 to 10 音速
		msg.rate = 0.5;
		//0 to 2 音色 男声 - 女声
		msg.pitch = 2;
		msg.text = $text.value || "I love html 5";
		msg.lang = "en-US";

		msg.onstart = function() {
			console.log("start!!!!!");
		}
		msg.onend = function(event) {
			console.log("finished in" + event.elapsedTime + "seconds.");
		}
		speechSynthesis.speak(msg);

		//输出语气列表
		win.speechSynthesis.getVoices().forEach(function(voice) {
			console.log(voice.name, voice.default ? '(default)' : '');
		});
	};

	//视频
	var videoStream;
	$camera.onclick = function() {
		console.log("clicked camera!!!!!!!!!!!!!!!!");
		if (videoStream) {
			videoStream.stop();
			videoStream = undefined;
			return;
		}
		var ctx = $video.getContext("2d");
		navigator.getUserMedia_ = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
		window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;
		if (navigator.getUserMedia_) {
			navigator.getUserMedia_({
				video: {
					mandatory: {
						minWidth: 1280,
						minHeight: 720,
						minFrameRate: 30
					},
					optional: [{minFrameRate: 60}]
				},
				audio: true
			}, function(stream) {
				$videoSrc.src = window.URL.createObjectURL(stream) || stream;
				videoStream = stream;
			}, function() {
				return;
			});
		}
		$videoSrc.addEventListener('play', function() {
			(function loop() {
				ctx.drawImage($videoSrc, 0, 0, $video.width, $video.height);
				setTimeout(loop, 1000 / 30);
			})();
		}, 0);
		$videoSrc.addEventListener('ended', function() {
			ctx.clearRect(0, 0, 1160, 678);
		});
	}

	//录音
	$audio.onclick = function() {

	}

	//语言识别
	$recognize.onclick = function() {
		console.log("recognize!!!!!!!!!!!!!!!!!!!!!");
	}
})(window, document);