window.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    data: {
      pageName: 'createPage',
      repTotal: 2,
      repCount: 1,
      restTime: 2,
      setTotal: 2,
      setCount: 1,
      breakTime: 3,
      countdown: 0,
      timerStarted: false
    },
    methods: {
      changePage(pageName) {
        this.pageName = pageName;
        if (pageName === 'countdownPage') {
          this.countdown = this.restTime;
        }
        if (pageName === 'createPage') {
          this.repCount = 1;
          this.setCount = 1;
          this.countdown = 0;
          this.timerStarted = false;
        }
      },
      startTimer() {
        this.timerStarted = true;
        if (this.repCount === this.repTotal) {
          this.repCount = 1;
          this.countdown = this.breakTime;
        } else {
          this.countdown = this.restTime;
        }
        const interval = setInterval(() => {
          this.countdown--;
          if (!this.countdown) {
            clearInterval(interval);
            this.repCount++;
          }
        }, 1000);
      }
    },
    computed: {

    }
  });
});
