window.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    data: {
      pageName: 'createPage',
      repTotal: 3,
      repCount: 1,
      restSeconds: 3,
      restMinutes: 0,
      setTotal: 2,
      setCount: 1,
      breakSeconds: 5,
      breakMinutes: 0,
      countdown: 0,
      timer: null,
      timerMode: 'GO',
      tobyImageCount: 17,
      workoutRange: 100,
      secondsRange: 61,
      minutesRange: 61,
      isTimerPaused: false
    },
    created() {
      this.timer = new moment.duration(1000).timer({ loop: true, start: false }, () => this.timerCallback());
    },
    methods: {
      changePage(pageName) {
        this.pageName = pageName;
        if (pageName === 'timerPage') {
          this.countdown = parseInt(this.restTime);
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
        if (!parseInt(this.countdown)) {
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
        if ((parseInt(this.repCount) === parseInt(this.repTotal)) && (parseInt(this.setCount) === parseInt(this.setTotal))) {
          this.timerMode = 'COMPLETE';
          return true;
        } else if ((parseInt(this.repCount) === parseInt(this.repTotal)) && (parseInt(this.setCount) !== parseInt(this.setTotal))) {
          this.timerMode = 'BREAK';
          this.countdown = parseInt(this.breakTime);
          this.repCount = 1;
        } else {
          this.timerMode = 'REST';
          this.countdown = parseInt(this.restTime);
        }

        this.timer.start();
      },
      pauseTimer() {
        if (this.isTimerPaused) {
          this.isTimerPaused= false;
          this.timer.start();
        } else {
          this.isTimerPaused = true;
          this.timer.stop();
        }
      },
      timeSelectFormat(time) {
        return `${time < 10 ? '0' : ''}${time}`
      }
    },
    computed: {
      restTime() {
        if (parseInt(this.repTotal) <= 1) {
          return 0;
        }
        return (this.restMinutes * 60) + parseInt(this.restSeconds);
      },
      breakTime() {
        if (parseInt(this.setTotal) <= 1) {
          return 0;
        }
        return (this.breakMinutes * 60) + parseInt(this.breakSeconds);
      },
      countdownString() {
        const minutesString = this.timeSelectFormat(parseInt(this.countdown / 60));
        const secondsString = this.timeSelectFormat(parseInt(this.countdown % 60));
        return `${minutesString}:${secondsString}`;
      },
      timerMessage() {
        if (this.isTimerPaused) {
          return 'Pause';
        }

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
        if ((parseInt(this.repCount) === parseInt(this.repTotal)) && (parseInt(this.setCount) === parseInt(this.setTotal))) {
          return 'Finish';
        }

        if ((parseInt(this.repCount) === parseInt(this.repTotal)) && (parseInt(this.setCount) !== parseInt(this.setTotal))) {
          return 'Break';
        }

        return 'Rest';
      },
      pauseButtonMessage() {
        if (this.isTimerPaused) {
          return 'Continue';
        }

        return 'Pause'
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
      },
      disableRestTimeInput() {
        return parseInt(this.repTotal) <= 1;
      },
      disableBreakTimeInput() {
        return parseInt(this.setTotal) <= 1;
      },
      disableGoButton() {
        if (
          (parseInt(this.repTotal) >= 2 && parseInt(this.restTime) <= 0) ||
          (parseInt(this.setTotal) >= 2 && parseInt(this.breakTime) <= 0) ||
          (parseInt(this.repTotal) <= 0 || parseInt(this.setTotal) <= 0)) {
          return true;
        }
        return false;
      }
    }
  });
});
