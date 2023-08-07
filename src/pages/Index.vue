<template>
  <q-page class="container q-pa-none">
    <div>
      <div class="flex column items-center justify-center q-px-none ">
        <div class="logoanim">
          <img v-for="c in 60" :key="c" :src="TEMPLATE_IMAGE(counterStr(c))" :hidden="c !== counter"
            class="pngsec q-mt-none q-mb-none" alt="outer space labour office logo" />
        </div>

        <img srcset=" ~assets/oslo_ceo.png 1x,~assets/oslo_ceo@2x.png 2x," class="ceo" />

        <div class="q-my-xl flex column items-center">
          <h1 class="fontnunito text-black q-ma-none q-pa-none mainheader">JOIN ME!</h1>
          <h2 class="text-primary text-bold text-center maindesc">AS I LEAD THE WAY TOWARDS TO FUTURE!</h2>
        </div>

        <div class="row full-width items-center q-my-xl">
          <div class="col-md-6 col-sm-12 bg-black yellohero text-white "><span>GO FORTH TOWARDS NEW HORIZONS</span>
          </div>
          <div class="col-md-6 col-sm-12 q-pa-xl now-world"><img
              srcset="~assets/now_world.png 1x, ~assets/now_world@2x.png 2x" /></div>
        </div>

        <div class="flex justify-center text-h4 text-center q-my-xl full-width secdesc">
          Since the atomic war, our world has been in constant decay… <br>
          But there is still hope, there is OSLO.
        </div>

        <div class="future-world q-py-xl">
          <img srcset="~assets/future_world.png 1x, ~assets/future_world@2x.png 2x" />
          <div class="bg-black text-white">
            <p>Mother Earth is ash and ruin, our cities are hiding underground.</p>
            <p>Our once thriving economy, our streets full of life is now just a history…</p>
            <p>Now it’s time to look up, OSLO. envisions a new home full of opportunity.</p>
          </div>
        </div>

        <h2 class="redfrontier">THE RED FRONTIER</h2>

        <div class="future-world q-py-xl">
          <img srcset="~assets/future_mars.png 1x, ~assets/future_mars@2x.png 2x" />
          <div class="bg-black text-white">
            <h3>OSLO. is looking for entrepreneurs to venture forth</h3>
            <p>Take your place in the next stage of the economy, initiate your business in MARS</p>
          </div>
        </div>

        <div class="texter full-width q-my-xl purple">"a chance for rebirth"</div>
        <div class="texter full-width q-my-xl turquoi">"a new model of society"</div>

        <div class="spaceboys q-mt-lg ">
          <video autoplay loop muted>
            <source src="~assets/space.mp4" type="video/mp4">
          </video>
          <div>
            <img src="~assets/3boys.png" class="x3boys" />
          </div>
        </div>

        <div class="texter full-width bordeau ">
          <p>We are meticulously preparing to provide you more information. <br> <br></p>
          <p>Stay tuned.</p>
        </div>

        <q-footer class="bg-white text-black q-pa-xl">
          <div>
            <!-- <div>Outer Space Labor Office Newsletter</div>
            <div class="flex q-mt-sm items-center">
              <q-input outlined label="E-mail Address" dense />
              <q-btn color="black" no-wrap text-color="white" size="lg" label="Submit" dense class="q-ml-sm q-px-md" />
            </div> -->
            <div class="q-mt-xl">
              <div class="copy">© 2082 Outer Space Labor Office. All Rights Reserved. </div>
              <div class="text-red text-bold q-mt-md copy">
                <a href="#" class="text-red">Discord</a>  | <a href="#" class="text-red">Twitter</a>  |  <a href="#" class="text-red">Contact Us</a></div>
            </div>
          </div>

          <div class="absolute-bottom-right "><img src="~assets/footership.png" class="footership" /></div>

        </q-footer>

        <!-- <q-btn outline rounded
          color="black" no-wrap text-color="white" size="lg" label="JOB POSTINGS COMING SOON!"
          class="flex items-center q-mt-xl q-mb-xl" /> -->

      </div>
    </div>
  </q-page>
</template>

<script>
// import { init } from 'src/three/init';

let loaded = false;

window.onload = function () {
  // console.log("AAAAAAAAAAA")
  loaded = true;
};

export default {
  name: 'PageIndex',
  data() {
    return {
      width: 500,
      height: 500,
      top: 0,
      left: 0,
      counter: 1,
      loadedFn: null,
      myLoaded: false,
    };
  },

  created() {
    this.loadedFn = setInterval(() => {
      if (loaded) {
        this.myLoaded = true;
      }
    }, 100);
  },

  mounted() {
    const { container } = this.$refs;
    init(container);
  },

  watch: {
    myLoaded(n) {
      // console.log("Loaded!")
      if (n) {
        setInterval(() => {
          this.counter += 1;
          if (this.counter > 60) {
            this.counter = 1;
          }
        }, 20);
      }
    },
  },
  methods: {
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
    counterStr(val) {
      if (val < 10) {
        return `0${val}`;
      }
      return val.toString();
    },
    TEMPLATE_IMAGE(name) {
      const images = require.context(
        'src/assets/loop/',
        false,
        /\.png$/,
      );
      return images(`./oslo-logo-${name}.png`);
    },
  },
};
</script>

<style scoped>
.logoanim {margin: 8vh auto;}
.mainheader {margin: 8vh auto 3vh auto;}

</style>
