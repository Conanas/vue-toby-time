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
      timerStarted: false,
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
        if (pageName === 'createPage') {
          this.repCount = 1;
          this.setCount = 1;
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
          if (this.timerMode === 'BREAK') {
            this.setCount++;
          } else if (this.timerMode === 'REST') {
            this.repCount++;
            this.countdown = this.restTime;
          }
          this.timerMode = 'GO';
        }
      },
      startTimer() {
        if ((this.repCount === this.repTotal) && (this.setCount !== this.setTotal)) {
          this.timerMode = 'BREAK';
          this.countdown = this.breakTime;
          this.repCount = 1;
        } else {
          this.timerMode = 'REST';
        }
        
        this.timerStarted = true;
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

        if (this.timerMode === 'COMPLETE') {
          return 'NOICE!!';
        }
      },
      startButtonMessage() {
        if ((this.repCount === (this.repTotal + 1))) {
          return 'Finish';
        }

        if (this.timerMode === 'BREAK') {
          return 'Break';
        }

        return 'Rest';
      }
    }
  });
});
