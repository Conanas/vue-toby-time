window.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    data: {
      pageName: 'createPage',
      reps: 1,
      restTime: 1,
      sets: 1,
      breakTime: 1,
      countdown: 0,
      timer: null,
      timerMode: 'GO'
    },
    created() {
      this.timer = new moment.duration(1000).timer({ loop: true, start: false }, () => this.timerCallback());
    },
    methods: {
      changePage(pageName) {
        this.pageName = pageName;
        if (pageName === 'countdownPage') {
          this.countdown = this.restTime;
        }
      },
      timerCallback() {
        this.countdown--;
        if (!this.countdown) {
          this.timer.stop();
          this.timerMode = 'GO';
          this.countdown = this.restTime;
        }
      },
      startTimer() {
        this.timerMode = 'REST';
        this.timer.start();
      }
    },
    computed: {
      timerMessage() {
        if (this.timerMode === 'GO') {
          return 'Go!';
        }

        if (this.timerMode === 'REST') {
          return 'Rest';
        }

        if (this.timerMode === 'BREAK') {
          return 'Break';
        }
      }
    }
  });
});
