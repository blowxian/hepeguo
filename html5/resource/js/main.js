;
(function(win, doc) {
	var $ = function(id) {
		return doc.getElementById(id) || doc.getElementsByClassName(id) ||doc.getElementsByTagName(id);
	}

	var $text = $("text");
	var $speak = $("speak");
	var $audio = $("audio");
	var $carmer = $("carmer");
	var $video = $("video");
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
	$carmer.onclick = function() {
		console.log("clicked carmer!!!!!!!!!!!!!!!!");
	}

//录音
	$audio.onclick = function() {

	}

//语言识别
	$recognize.onclick = function() {
		console.log("recognize!!!!!!!!!!!!!!!!!!!!!");
	}
})(window, document);