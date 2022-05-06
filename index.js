window.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    data: {
      pageName: 'createPage',
      repsTotal: 3,
      repCount: 0,
      restTime: 3,
      setsTotal: 3,
      setCount: 0,
      breakTime: 5,
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
