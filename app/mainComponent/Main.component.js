import Templates from '../share/Templates';
import Swiper from 'swiper';

import {
  swiperAnimateCache,
  swiperAnimate,
} from '../share/Swiper/swiper.animate';

import * as main from './main.pug';
import * as mainStyle from './main.scss';

// audio
import * as audioSrc from '../../static/media/Richard Clayderman - LOVE IS BLUE.mp3';

// component
import Slide1Component from '../slide1Component/Slide1.component';
import Slide2Component from '../slide2Component/Slide2.component';
import Slide3Component from '../slide3Component/Slide3.component';
import Slide4Component from '../slide4Component/Slide4.component';
import Slide5Component from '../slide5Component/Slide5.component';
import AudioComponent from '../share/audioComponent/Audio.component';

// service
import loadingOverlayService from '../loadingOverlay.service';

export default class MainSctComponent {
  constructor() {
    this.context = document.querySelector('.main-screen');
  }

  load() {
    // load flow
    return new Promise(resolve => {
      new Templates(main, this.context, {
        _style,
      }).load();

      setTimeout(() => {
        resolve();
      }, 0);
    })
      .then(() => {
        return new Promise(resolve => {
          // Swiper
          new Swiper(this.context, {
            pagination: '.' + _style.pagination,
            paginationClickable: true,
            bulletActiveClass: _style.bulletActive,

            direction: 'vertical',
            mousewheelControl: true,
            wrapperClass: _style.wrapper,

            hashnav: true,
            hashnavWatchState: true,
            replaceState: true,

            onInit: (swiper) => {
              setTimeout(() => {
                new loadingOverlayService().load();
                swiperAnimateCache(swiper);
                swiperAnimate(swiper);
              }, 500);
            },
            onSlideChangeEnd: (swiper) => {
              swiperAnimate(swiper);
            },
          });

          setTimeout(() => {
            resolve();
          }, 0);
        });
      })
      .then(() => {
        return Promise.all([
          new Slide1Component().load(),
          new Slide2Component().load(),
          new Slide3Component().load(),
          new Slide4Component().load(),
          new Slide5Component().load(),

          new AudioComponent({
            context: this.context,
            audioSrc: audioSrc,
          }).load(),
        ]);
      });
  };
};

// private
let
  _style = mainStyle
;