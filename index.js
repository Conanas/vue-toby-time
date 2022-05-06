window.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    data: {
      pageName: 'createPage',
      repsTotal: 3,
      repCount: 1,
      restTime: 3,
      setsTotal: 3,
      setCount: 1,
      breakTime: 5,
      countdown: 0,
      timer: null
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
          this.repsTotal = 3;
          this.restTime = 3;
          this.repCount = 1;
          this.setsTotal = 3;
          this.setCount = 1;
          this.breakTime = 5;
          this.countdown = 0;
          this.timer.stop();
        }
      },
      timerCallback() {
        this.countdown--;
        if (!this.countdown) {
          this.timer.stop();
          this.countdown = this.restTime;
          this.repCount++;
          console.log('end', this.timer.isStarted())
        }
      },
      startTimer() {
        this.timer.start();
        console.log(this.timer.isStarted());
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
      timerMode() {
        if (!this.timer.isStarted() && !this.timer.isStopped() && (this.repCount === 1) && (this.setCount === 1)) {
          return 'GO';
        }

        if (this.timer.isStopped() && (this.repCount >= 1) && (this.setCount >= 1)) {
          return 'GO';
        }

        if (!this.timer.isStopped() && (this.repCount !== this.repsTotal) && (this.setCount !== this.setsTotal)) {
          return 'REST';
        }

        if (!this.timer.isStopped() && (this.repCount === this.repsTotal) && (this.setCount !== this.setsTotal)) {
          return 'BREAK';
        }

        if (!this.timer.isStarted() && (this.repCount === this.repsTotal) && (this.setCount === this.setsTotal)) {
          return 'COMPLETE';
        }
      }
    }
  });
});
