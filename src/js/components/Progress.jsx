import './Progress.scss'
export default {
  props: {
    progress: {
      type: Number
    },
    barColor: {
      type: String
    }
  },
  render () {
    return (
      <div class="components-progress" onClick={this.changeProgress} ref="progressbar">
        <div class="progress" style={{
          width: `${this.progress}%`, background: this.barColor
        }} >
        </div>
      </div>
    )
  },
  methods: {
    changeProgress (e) {
      let progress = (e.clientX - this.$refs.progressbar.getBoundingClientRect().left) / this.$refs.progressbar.clientWidth
      console.log(progress)
      this.$emit('changeProgress', progress)
    }
  }
}
