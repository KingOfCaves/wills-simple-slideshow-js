(function(){
	// VARIABLES
	const $slideshow = document.querySelector('.slideshow__imgs');
	const $slideshowImages = Array.from(document.querySelectorAll('.slideshow__img'));
	const $slideshowSelection = document.querySelector('.slideshow__selectors');
	let $slideshowSelectors = [];
	let currentIndex = 0;

	const TIMING = 10000;
	let autoSwitch = setInterval(() => imageSwitch('cycle'), TIMING);

	// LOOPS

	/* creates selectors based on how many images there are 
	and removes the active class from every image element*/

	$slideshowImages.forEach(img => {
		img.classList.remove('active');

		const el = document.createElement('div');
		el.className = 'slideshow__selector';
		$slideshowSelection.appendChild(el);
		
		$slideshowSelectors = Array.from(document.querySelectorAll('.slideshow__selector'));
	});
	
	// FUNCTIONS

	function imageSwitch(type, index) {
		function removeImage() {
			$slideshowImages[currentIndex].classList.remove('active');
			$slideshowSelectors[currentIndex].classList.remove('active');
		}

		function selectImage() {
			$slideshowImages[currentIndex].classList.add('active');
			$slideshowSelectors[currentIndex].classList.add('active');
		}

		function resetTimer() {
			clearInterval(autoSwitch);
			autoSwitch = setInterval(() => imageSwitch('cycle'), TIMING);
		}

		switch(type) {
			case 'reset':
				selectImage();
				break;
			case 'cycle':
				removeImage();
				currentIndex === $slideshowImages.length - 1 
					? currentIndex = 0 
					: currentIndex++;
				selectImage();
				resetTimer();
				break;
			case 'select':
				if (index !== currentIndex) {
					removeImage();
					currentIndex = index
					selectImage();
				};
				resetTimer();
				break;
		}
	}

	//EVENTS
	$slideshow.addEventListener('click', () => imageSwitch('cycle'))
	$slideshowSelectors.forEach(selector => selector.addEventListener('click', () => {
		event.stopPropagation();
		imageSwitch('select', $slideshowSelectors.indexOf(event.target));
	}))

	// INIT
	imageSwitch('reset');
}())