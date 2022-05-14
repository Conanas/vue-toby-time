window.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    data: {
      pageName: 'createPage',
      repTotal: 3,
      repCount: 1,
      restTime: 3,
      setTotal: 3,
      setCount: 1,
      breakTime: 5,
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
          this.countdown = this.restTime;
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
          return 'BREAK';
        } else if ((this.repCount !== this.repTotal) && (this.setCount !== this.setTotal)) {
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
