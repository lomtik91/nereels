// Models
import { NereelsVideo} from '../models/NereelsVideo';

// Classes
import { NereelsItem } from './NereelsItem';

class NereelsList {
    /**
     *
     * @param {HTMLElement} parentElement - The parent DOM element where the component will be rendered.
     * @param {NereelsVideo[]} videos - Array of videos to be used in the list.
     * @param {number} itemsToRenderCount - Number of videos to render in the list at one time
     * (reduce for better performance). Minimal value is 3.
     * @param {number} aspectRatio - The aspect ratio of the list content.
     */
    constructor({
        parentElement,
        videos,
        itemsToRenderCount = 3,
        aspectRatio = 9 / 16
    }) {
        this.parentElement = parentElement;
        this.videos = videos;
        this.itemsToRenderCount = itemsToRenderCount;
        this.aspectRatio = aspectRatio;
        this.currentItemIndex = 0;
        this.renderedItems = [];
        this.isMuted = true;
    }

    static CLASS_NAME = 'nereels-list';
    static ITEMS_RENDER_GAP = 2;
    static ITEMS_TO_RENDER_COUNT_MIN = 3;

    init() {
        this._createListContainer();
        this._createIntersectionObserver();
        this._updateSizes();
        this._addItemsToRender();
        this._addEventListeners();
    }

    _addEventListeners() {
        window.addEventListener('resize', () => {
            this._updateSizes();
        });
    }

    _createListContainer() {
        this.element = document.createElement('div');
        this.element.classList.add(NereelsList.CLASS_NAME);
        this.parentElement.appendChild(this.element);
    }

    _createIntersectionObserver() {
        const observerOptions = {
            root: this.element,
            threshold: 0.5
        }

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
                const itemIndex = this._getItemIndexById(entry.target.dataset.nereelsItemId);
                const item = this.renderedItems[itemIndex];

                if (
                    item
                    && isVisible
                ) {
                    this.currentItemIndex = itemIndex;
                    item.play();
                    this._addItemsToRender();
                } else
                if (
                    item
                    && !entry.isIntersecting
                ) {
                    item.pause();
                    item.uninteract();
                }
            });
        }, observerOptions);
    }
    
    _updateSizes() {
        const pageWidth = document.documentElement.clientWidth;
        const pageHeight = document.documentElement.clientHeight;

        let contentHeight = pageHeight;
        let contentWidth = Math.min(pageHeight * this.aspectRatio, pageWidth);

        this.element.style.setProperty('--page-height', `${pageHeight}px`);
        this.element.style.setProperty('--content-width', `${contentWidth}px`);
        this.element.style.setProperty('--content-height', `${contentHeight}px`);
    }

    _getItemIndexById(id) {
        return this.renderedItems.findIndex((renderedItem) => {
            return renderedItem.id === id;
        });
    }

    _renderItem(video) {
        const item = new NereelsItem({
            id: crypto.randomUUID(),
            src: video.src,
            previewSrc: video.previewSrc,
            muted: this.isMuted,
            onMuteToggle: (isMuted) => {
                this._onItemMuteToggle(isMuted);
            }
        });

        const itemContainer = document.createElement('div');

        itemContainer.dataset.nereelsItemId = item.id;
        itemContainer.classList.add(`${NereelsList.CLASS_NAME}__item`);

        this.element.appendChild(itemContainer);
        this.renderedItems.push(item);
        this.observer.observe(itemContainer);
        item.render(itemContainer);
    }

    _addItemsToRender() {
        if (
            (
                (this.currentItemIndex !== this.renderedItems.length - NereelsList.ITEMS_RENDER_GAP)
                && this.renderedItems.length !== 0
            )
            || this.renderedItems.length >= this.videos.length
        ) {
            return;
        }

        const limit = Math.max(NereelsList.ITEMS_TO_RENDER_COUNT_MIN, this.itemsToRenderCount);
        const offset = this.renderedItems.length === 0 ? 0 : this.currentItemIndex + NereelsList.ITEMS_RENDER_GAP;

        const itemsToRender = this.videos.slice(offset, offset + limit);

        itemsToRender.forEach((video) => {
            this._renderItem(video);
        });

        console.log(this.videos, this.renderedItems);
    }

    _onItemMuteToggle(isMuted) {
        this.isMuted = isMuted;
        this.renderedItems.forEach((item) => {
            if (isMuted) {
                item.mute();
            } else {
                item.unmute();
            }
        });
    }
}

export { NereelsList };