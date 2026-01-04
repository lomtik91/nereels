import './scss/main.scss';
import { NereelsList} from './js/classes/NereelsList';

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.querySelector('#app');
    const nereelsList = new NereelsList({
        parentElement: appContainer,
        videos: [
            {
                src: 'https://eyampolskiy.ru/files/nereels/-425148686832983381.MP4',
                previewSrc: 'https://eyampolskiy.ru/files/nereels/-425148686832983381.jpeg',
            },
            {
                src: 'https://eyampolskiy.ru/files/nereels/-1058613081809774571.MP4',
                previewSrc: "https://eyampolskiy.ru/files/nereels/-1058613081809774571.jpeg"
            },
            {
                src: 'https://eyampolskiy.ru/files/nereels/-1381854028232193089.MP4',
                previewSrc: "https://eyampolskiy.ru/files/nereels/-1381854028232193089.jpeg"
            },
            {
                src: 'https://eyampolskiy.ru/files/nereels/-2466797579047759691.MP4',
                previewSrc: "https://eyampolskiy.ru/files/nereels/-2466797579047759691.jpeg"
            },
            {
                src: 'https://eyampolskiy.ru/files/nereels/-2635594312504430960.MP4',
                previewSrc: "https://eyampolskiy.ru/files/nereels/-2635594312504430960.jpeg"
            },
            {
                src: 'https://eyampolskiy.ru/files/nereels/-5621414600942581877.MP4',
                previewSrc: "https://eyampolskiy.ru/files/nereels/-5621414600942581877.jpeg"
            },
            {
                src: 'https://eyampolskiy.ru/files/nereels/-6974447037748169156.MP4',
                previewSrc: "https://eyampolskiy.ru/files/nereels/-6974447037748169156.jpeg"
            },
            {
                src: 'https://eyampolskiy.ru/files/nereels/-8449397279292773021.MP4',
                previewSrc: "https://eyampolskiy.ru/files/nereels/-8449397279292773021.jpeg"
            },
            {
                src: 'https://eyampolskiy.ru/files/nereels/3698940505591559678.MP4',
                previewSrc: "https://eyampolskiy.ru/files/nereels/3698940505591559678.jpeg"
            },
            {
                src: 'https://eyampolskiy.ru/files/nereels/3746059563046546718.MP4',
                previewSrc: "https://eyampolskiy.ru/files/nereels/3746059563046546718.jpeg"
            },
            {
                src: 'https://eyampolskiy.ru/files/nereels/3782221046270698096.MP4',
                previewSrc: "https://eyampolskiy.ru/files/nereels/3782221046270698096.jpeg"
            },
            {
                src: 'https://eyampolskiy.ru/files/nereels/6702137189532704568.MP4',
                previewSrc: "https://eyampolskiy.ru/files/nereels/6702137189532704568.jpeg"
            },
            {
                src: 'https://eyampolskiy.ru/files/nereels/6737137111559968548.MP4',
                previewSrc: "https://eyampolskiy.ru/files/nereels/6737137111559968548.jpeg"
            },
            {
                src: 'https://eyampolskiy.ru/files/nereels/7578542087815133230.MP4',
                previewSrc: "https://eyampolskiy.ru/files/nereels/7578542087815133230.jpeg"
            },
            {
                src: 'https://eyampolskiy.ru/files/nereels/7870372071727092435.MP4',
                previewSrc: "https://eyampolskiy.ru/files/nereels/7870372071727092435.jpeg"
            }
        ],
        itemsToRenderCount: 5
    });

    nereelsList.init();
});