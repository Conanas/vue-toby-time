window.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    data: {
      pageName: 'createPage',
      repTotal: 3,
      repCount: 0,
      restTime: 2,
      setTotal: 2,
      setCount: 0,
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
          this.repCount = 0;
          this.setCount = 0;
          this.countdown = 0;
          this.timerStarted = false;
        }
      },
      startTimer() {
        this.timerStarted = true;
        let tick = moment().add(1, 'seconds');
        const endTime = moment().add(3, 'seconds');
        let count = 1;
        let ticking = true;
        while (ticking) {
          if (moment().isSameOrAfter(tick)) {
            console.log(count)
            tick = moment().add(1, 'seconds');
            count++;
          }
          if (moment().isSameOrAfter(endTime)) {
            ticking = false;
          }
        }
        console.log('finish')
      }
    },
    computed: {
      timerMode() {
        if (!this.timerStarted) {
          return 'GO';
        }

        if (this.repCount === (this.repTotal + 1)) {
          this.repCount = this.repTotal;
          return 'COMPLETE';
        }
        
        if ((this.repCount === this.repTotal) && (this.setCount !== this.setTotal)) {
          this.countdown = this.breakTime;
          this.repCount = 1;
          this.setCount++;
          return 'BREAK';
        }
        
        if ((this.repCount !== this.repTotal) || ((this.repCount === this.repTotal) && (this.setCount === this.setTotal))) {
          this.countdown = this.restTime;
          return 'REST';
        }
        
        return 'COMPLETE';
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
      },
      startButtonMessage() {
        if ((this.repCount === (this.repTotal + 1))) {
          return 'Finish';
        }

        if ((this.repCount === this.repTotal) && (this.setCount !== this.setTotal)) {
          return 'Break';
        }

        return 'Rest';
      }
    }
  });
});
