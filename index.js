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
        }
      },
      startWorkout() {
        this.timer.start();
      },
      pauseWorkout() {
        this.timer.stop();
      },
      stopWorkout() {
        this.timer.stop();
      },
      resetWorkout() {
        this.countdown = this.restTime;
      },
    },
    computed: {

    }
  });
});
