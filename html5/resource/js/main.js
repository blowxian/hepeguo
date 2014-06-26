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
	var $textarea = $("textarea");

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
		// win.speechSynthesis.getVoices().forEach(function(voice) {
		// 	console.log(voice.name, voice.default ? '(default)' : '');
		// });
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
					optional: [{
						minFrameRate: 60
					}]
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
	var final_transcript = "";
	//支持的语言类型
	var langs =
		[
			['Afrikaans', ['af-ZA']],
			['Bahasa Indonesia', ['id-ID']],
			['Bahasa Melayu', ['ms-MY']],
			['Català', ['ca-ES']],
			['Čeština', ['cs-CZ']],
			['Deutsch', ['de-DE']],
			['English', ['en-AU', 'Australia'],
				['en-CA', 'Canada'],
				['en-IN', 'India'],
				['en-NZ', 'New Zealand'],
				['en-ZA', 'South Africa'],
				['en-GB', 'United Kingdom'],
				['en-US', 'United States']
			],
			['Español', ['es-AR', 'Argentina'],
				['es-BO', 'Bolivia'],
				['es-CL', 'Chile'],
				['es-CO', 'Colombia'],
				['es-CR', 'Costa Rica'],
				['es-EC', 'Ecuador'],
				['es-SV', 'El Salvador'],
				['es-ES', 'España'],
				['es-US', 'Estados Unidos'],
				['es-GT', 'Guatemala'],
				['es-HN', 'Honduras'],
				['es-MX', 'México'],
				['es-NI', 'Nicaragua'],
				['es-PA', 'Panamá'],
				['es-PY', 'Paraguay'],
				['es-PE', 'Perú'],
				['es-PR', 'Puerto Rico'],
				['es-DO', 'República Dominicana'],
				['es-UY', 'Uruguay'],
				['es-VE', 'Venezuela']
			],
			['Euskara', ['eu-ES']],
			['Français', ['fr-FR']],
			['Galego', ['gl-ES']],
			['Hrvatski', ['hr_HR']],
			['IsiZulu', ['zu-ZA']],
			['Íslenska', ['is-IS']],
			['Italiano', ['it-IT', 'Italia'],
				['it-CH', 'Svizzera']
			],
			['Magyar', ['hu-HU']],
			['Nederlands', ['nl-NL']],
			['Norsk bokmål', ['nb-NO']],
			['Polski', ['pl-PL']],
			['Português', ['pt-BR', 'Brasil'],
				['pt-PT', 'Portugal']
			],
			['Română', ['ro-RO']],
			['Slovenčina', ['sk-SK']],
			['Suomi', ['fi-FI']],
			['Svenska', ['sv-SE']],
			['Türkçe', ['tr-TR']],
			['български', ['bg-BG']],
			['Pусский', ['ru-RU']],
			['Српски', ['sr-RS']],
			['한국어', ['ko-KR']],
			['中文', ['cmn-Hans-CN', '普通话 (中国大陆)'],
				['cmn-Hans-HK', '普通话 (香港)'],
				['cmn-Hant-TW', '中文 (台灣)'],
				['yue-Hant-HK', '粵語 (香港)']
			],
			['日本語', ['ja-JP']],
			['Lingua latīna', ['la']]
		];
		//初始化speechRecognition
	if ("webkitSpeechRecognition" in win) {
		var recognition = new webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;

		recognition.onstart = function() {
			console.log("start");
		}
		recognition.onresult = function(event) {
			var interim_transcript = '';
			for (var i = event.resultIndex; i < event.results.length; ++i) {
				if (event.results[i].isFinal) {
					final_transcript += event.results[i][0].transcript;
					if(event.results[i][0].transcript == "清空" || event.results[i][0].transcript == "清除") {
						final_transcript = " ";
					}
				} else {
					console.log(event.results[i][0].transcript);
				}
			}
			$textarea.value = final_transcript;
		}
		recognition.onerror = function(event) {
			console.log(event);
		}
		recognition.onend = function() {
			console.log("end");
		}
	}
	//设置语言类型
	recognition.lang = 'cmn-Hans-CN';
	//开始语音识别
	var isStart = false;
	$recognize.onclick = function() {
		if (recognition) {
			if (!isStart) {
				recognition.start();
				isStart = true;
			} else {
				recognition.stop();
				isStart = false;
			}
		}
	}
})(window, document);