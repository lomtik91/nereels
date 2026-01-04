class NereelsItem {
    constructor({
        id,
        src,
        previewSrc = null,
        muted = true,
        onMuteToggle = null
    }) {
        this.id = id;
        this.src = src;
        this.previewSrc = previewSrc;
        this.isMuted = muted;
        this.onMuteToggle = onMuteToggle;

        this.element = null;
        this.video = null;
        this.isPlaying = false;
        this.isInteracted = false;
        this.isReady = false;
        this.isLiked = false;
    }

    static CLASS_NAME = 'nereels-item';

    get isLiked() {
        return this._isLiked;
    }

    get isMuted() {
        return this._isMuted;
    }

    get isPlaying() {
        return this._isPlaying;
    }

    get isInteracted() {
        return this._isInteracted;
    }

    get isReady() {
        return this._isReady;
    }

    set isLiked(value) {
        this._isLiked = value;
        this._updateClassName();
    }

    set isMuted(value) {
        this._isMuted = value;

        if (this.video) {
            this.video.muted = value;
        }

        this._updateClassName();
    }

    set isPlaying(value) {
        this._isPlaying = value;
        this._updateClassName();
    }

    set isInteracted(value) {
        this._isInteracted = value;
        this._updateClassName();
    }

    set isReady(value) {
        this._isReady = value;
        this._updateClassName();
    }

    _addEventListeners() {
        this.video.addEventListener('play', () => {
            this.isPlaying = true;
        });

        this.video.addEventListener('pause', () => {
            this.isPlaying = false;
        });

        this.video.addEventListener('canplay', () => {
            this.isReady = true;
        });

        this.element.querySelector(`.${NereelsItem.CLASS_NAME}__play-button`).addEventListener('click', () => {
            this.togglePlay();
        });

        this.element.querySelector(`.${NereelsItem.CLASS_NAME}__mute-button`).addEventListener('click', () => {
            this.toggleMute();
        });

        this.element.querySelector(`.${NereelsItem.CLASS_NAME}__menu-button--like`).addEventListener('click', () => {
            this.toggleLike();
        });
    }

    _getControlsTemplate() {
        return `
            <div class="${NereelsItem.CLASS_NAME}__controls">
                <button class="${NereelsItem.CLASS_NAME}__play-button">
                    <span class="${NereelsItem.CLASS_NAME}__play-button-icon"></span>
                </button>
                <button class="${NereelsItem.CLASS_NAME}__mute-button"></button>
            </div>
        `;
    }

    _getContentTemplate() {
        return `
            <div class="${NereelsItem.CLASS_NAME}__content">
                <video
                    class="${NereelsItem.CLASS_NAME}__video"
                    loop
                    ${this.isMuted ? 'muted' : ''}
                    playsinline
                    preload="none"
                >
                    <source src="${this.src}" type="video/mp4" />
                </video>
                ${Boolean(this.previewSrc) ? (
                    `<img
                        class="${NereelsItem.CLASS_NAME}__preview"
                        src="${this.previewSrc}"
                    />`
                ) : ''}
                ${this._getControlsTemplate()}
            </div>
        `;
    }

    _getMenuTemplate() {
        return `
            <div class="${NereelsItem.CLASS_NAME}__menu">
                <button class="${NereelsItem.CLASS_NAME}__menu-button ${NereelsItem.CLASS_NAME}__menu-button--like"></button>
                <button class="${NereelsItem.CLASS_NAME}__menu-button ${NereelsItem.CLASS_NAME}__menu-button--comment"></button>
            </div>
        `;
    }

    _updateClassName() {
        if (!this.element) {
            return;
        }

        this.element.classList.toggle(`${NereelsItem.CLASS_NAME}--paused`, !this.isPlaying);
        this.element.classList.toggle(`${NereelsItem.CLASS_NAME}--muted`, this.isMuted);
        this.element.classList.toggle(`${NereelsItem.CLASS_NAME}--interacted`, this.isInteracted);
        this.element.classList.toggle(`${NereelsItem.CLASS_NAME}--ready`, this.isReady);
        this.element.classList.toggle(`${NereelsItem.CLASS_NAME}--liked`, this.isLiked);
    }

    play() {
        if (!this.video) {
            return;
        }

        this.video.play();
    }

    pause() {
        if (!this.video) {
            return;
        }

        this.video.pause();
    }

    togglePlay() {
        this.interact();

        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;

        if (typeof this.onMuteToggle === 'function') {
            this.onMuteToggle(this.isMuted);
        }
    }

    mute() {
        this.isMuted = true;
    }

    unmute() {
        this.isMuted = false;
    }

    interact() {
        this.isInteracted = true;
    }

    uninteract() {
        this.isInteracted = false;
    }

    toggleLike() {
        this.isLiked = !this.isLiked;
    }

    render(parentElement) {
        const renderHtml = `
            <div class="${NereelsItem.CLASS_NAME}">
                ${this._getContentTemplate()}
                ${this._getMenuTemplate()}
            </div>
        `;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = renderHtml;

        this.element = tempDiv.firstElementChild;
        this.video = this.element.querySelector(`.${NereelsItem.CLASS_NAME}__video`);

        this._updateClassName();
        this._addEventListeners();

        parentElement.appendChild(this.element);
    }
}

export { NereelsItem };