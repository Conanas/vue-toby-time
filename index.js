window.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    data: {
      pageName: 'createPage',
      reps: 1,
      restTime: 1,
      sets: 1,
      breakTime: 1,
      countdown: 0
    },
    methods: {
      changePage(pageName) {
        this.pageName = pageName;
        if (pageName === 'countdownPage') {
          this.countdown = this.restTime;
        }
      },
      startWorkout() {
        this.countdown = this.restTime;
        const timer = new moment.duration(1000).timer({ loop: true }, () => {
          this.countdown--;
          if (!this.countdown) {
            timer.stop();
          }
        });
        timer.start();
      }
    },
    computed: {

    }
  });
});
