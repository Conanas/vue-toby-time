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
      timerMode: 'GO',
      tobyImageCount: 17
    },
    created() {
      this.timer = new moment.duration(1000).timer({ loop: true, start: false }, () => this.timerCallback());
    },
    methods: {
      changePage(pageName) {
        this.pageName = pageName;
        if (pageName === 'timerPage') {
          this.countdown = this.restTime;
        }

        if (pageName === 'createPage') {
          this.repCount = 1;
          this.setCount = 1;
          this.countdown = 0;
          this.timerMode = 'GO';
          this.timer.stop();
        }
      },
      timerCallback() {
        this.countdown--;
        if (!this.countdown) {
          this.timer.stop();
          if (this.timerMode === 'BREAK') {
            this.setCount++;
          } else if (this.timerMode === 'REST') {
            this.repCount++;
          }
          this.timerMode = 'GO';
        }
      },
      startTimer() {
        if ((this.repCount === this.repTotal) && (this.setCount === this.setTotal)) {
          this.timerMode = 'COMPLETE';
          return true;
        } else if ((this.repCount === this.repTotal) && (this.setCount !== this.setTotal)) {
          this.timerMode = 'BREAK';
          this.countdown = this.breakTime;
          this.repCount = 1;
        } else {
          this.timerMode = 'REST';
          this.countdown = this.restTime;
        }

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
        if ((this.repCount === this.repTotal) && (this.setCount === this.setTotal)) {
          return 'Finish';
        }

        if ((this.repCount === this.repTotal) && (this.setCount !== this.setTotal)) {
          return 'Break';
        }

        return 'Rest';
      },
      tobyImage() {
        if (this.timerMode === 'GO') {
          return '';
        }

        return `/images/toby_${Math.ceil(Math.random() * this.tobyImageCount)}.jpg`;
      },
      tobyMessage() {
        if (this.timerMode === 'GO') {
          return '';
        }

        if (this.timerMode === 'REST') {
          return 'Keep going Mamma!';
        }

        if (this.timerMode === 'BREAK') {
          return 'Nap time Mamma!';
        }

        if (this.timerMode === 'COMPLETE') {
          return 'You da best Mamma!';
        }
      }
    }
  });
});
