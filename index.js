window.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    data: {
      pageName: 'createPage',
      repTotal: 3,
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
        const startTime = moment();
        const endTime = moment().add(5, 'seconds');
        let count = 1;
        let ticking = true;
        while (ticking) {
          console.log('startTime', startTime);
          const currentTime = moment().add(0, 'seconds');
          console.log('currentTime', currentTime);
          console.log('add', startTime.add(count, 'seconds'));
          if (currentTime.isSame(startTime.add(count, 'seconds')) || currentTime.isAfter(startTime.add(count, 'seconds'))) {
            console.log(count);
            count++;
          }
          if (currentTime.isSame(endTime) || currentTime.isAfter(endTime)) {
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
