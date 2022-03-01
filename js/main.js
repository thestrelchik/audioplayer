    let options = document.querySelector('.options');

	function sidebar(){
		options.classList.toggle('active');
	}


	const player = document.querySelector('.main')
	const play = document.querySelector('#play_btn')
	const prev = document.querySelector('#prev')
	const next = document.querySelector('#next')
	const audio = document.querySelector('.audio')
	const progressSlider = document.querySelector('.range_slider')
	const slider = document.querySelector('.slider')
	const title = document.querySelector('.song')
	const artist = document.querySelector('#artist')
	const img = document.querySelector('#img')
	const imgbtn = document.querySelector('.imgbtn')
    const playPause = document.querySelector('.play_pause')
	const time = document.querySelector('.time')

	//названия песен
	const songs = ['Егор Крид - Отпускай', 'Gayazov Brother - Малиновая Лада', 'NЮ - Останься']

	//песня по умолчанию
	let songIndex = 1

	//init
	function loadSong(song) {
		title.innerHTML= song
		audio.src = `music/${song}.mp3`
		img.src = `./img/img${songIndex + 1}.jpg`
	}
	loadSong(songs[songIndex])

	//play
	function playSong() {
		player.classList.add('play')
		audio.play()
		imgbtn.src = './img/pause-regular-24.png'
	}

	//pause
	function pauseSong() {
		player.classList.remove('play')
		audio.pause()
		imgbtn.src = './img/play-regular-24.png'
	}

	play.addEventListener('click', () => {
		const isPlaying = player.classList.contains('play')
		if (isPlaying) {
			pauseSong()
		} else {
			playSong()
		}
	})

	//next song
	function nextSong() {
		songIndex++

		if(songIndex > songs.length -1) {
			songIndex = 0
		}
		
		loadSong(songs[songIndex])
		playSong()
	}
	next.addEventListener('click', nextSong)

	//prev song
	function prevSong() {
		songIndex--

		if(songIndex < 0) {
			songIndex = songs.length -1
		}
		loadSong(songs[songIndex])
		playSong()
	}
	prev.addEventListener('click', prevSong)

	//progress Bar
	function updateProgress(e) {
		const {duration, currentTime} = e.srcElement
		const progressPercent = (currentTime / duration) * 100
		slider.style.width = `${progressPercent}%`
	}
	audio.addEventListener('timeupdate', updateProgress)

//time

function timeProgress(e) {
    const {duration,currentTime} = e.srcElement
    time.innerHTML = `${timeFormat(currentTime)}/${timeFormat(duration)}`
  }
  audio.addEventListener('timeupdate', timeProgress)

  function timeFormat(currentTime) {
    minutes = Math.floor(currentTime / 60);
    seconds = Math.floor(currentTime % 60);

    if(seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  }
  timeFormat(time)
	
	
	//set slider
	function setSlider(e) {
		const width = this.clientWidth
		const clickX = e.offsetX
		const duration = audio.duration

		audio.currentTime = (clickX / width) * duration

	}
	progressSlider.addEventListener('click', setSlider)

	//autoplay
	audio.addEventListener('ended', nextSong)

	//time
	