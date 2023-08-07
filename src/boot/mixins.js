import { openURL } from 'quasar';

export default async ({ Vue /* app, router, Vue, ... */ }) => {
  Vue.mixin({
    computed: {

      TR() {
        return this.$i18n.locale === 'tr';
        // return this.$q.lang.getLocale() === 'tr';
      },

      EN() {
        return this.$i18n.locale === 'en-us';
        // return this.$q.lang.getLocale() === 'en-us';
      },

      MOBILE() {
        return this.$q.platform.is.mobile;
      },

      DESKTOP() {
        return this.$q.platform.is.desktop;
      },
    },

    methods: {

      goto(link) {
        openURL(link);
      },

      od(val) {
        return this.$q.platform.is.desktop ? ` ${val} ` : ' ';
      },
      om(val) {
        return this.$q.platform.is.mobile ? ` ${val} ` : ' ';
      },

      md(valMobile, valDesktop) {
        return this.$q.platform.is.mobile
          ? ` ${valMobile} `
          : ` ${valDesktop} `;
      },
    },
  });
};
