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
      timer: null,
      timerStarted: false
    },
    created() {
      this.timer = new moment.duration(1000).timer({ loop: true, start: false, wait: 0, executeAfterWait: true }, () => this.timerCallback());
    },
    methods: {
      changePage(pageName) {
        this.pageName = pageName;
        if (pageName === 'countdownPage') {
          this.countdown = this.restTime;
        }
        if (pageName === 'createPage') {
          this.repTotal = 3;
          this.restTime = 3;
          this.repCount = 1;
          this.setTotal = 3;
          this.setCount = 1;
          this.breakTime = 5;
          this.countdown = 0;
          this.timerStarted = false;
          this.timer.stop();
        }
      },
      timerCallback() {
        this.countdown--;
        if (!this.countdown) {
          this.timerStarted = false;
          this.timer.stop();
          this.repCount++;
        }
      },
      startTimer() {
        this.timerStarted = true;
        this.timer.start();
      }
    },
    computed: {
      timerMode() {
        if (!this.timerStarted) {
          return 'GO';
        } else if ((this.repCount === this.repTotal) && (this.setCount === this.setTotal)) {
          return 'COMPLETE';
        } else if ((this.repCount === this.repTotal) && (this.setCount !== this.setTotal)) {
          this.countdown = this.breakTime;
          this.repCount = 1;
          this.setCount++;
          return 'BREAK';
        } else if (this.repCount !== this.repTotal) {
          this.countdown = this.restTime;
          return 'REST';
        } else {
          return 'GO';
        }
      },
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

        if (this.timerMode === 'COMPLETE') {
          return 'NOICE!!';
        }
      }
    }
  });
});
