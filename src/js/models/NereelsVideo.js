class NereelsVideo {
    /**
     *
     * @param {string} src - Video source URL.
     * @param {string} previewSrc - Preview video image source URL.
     */
    constructor({
        src,
        previewSrc
    }) {
        this.src = src;
        this.previewSrc = previewSrc;
    }
}

export { NereelsVideo };