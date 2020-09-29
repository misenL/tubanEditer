export const dialog = {
  props: {
    show: Boolean
  },
  data() {
    return {
      showDialog: false,
      showClose: false
    }
  },
  watch: {
    show(val) {
      this.showDialog = val
    },
    showDialog(val) {
      this.$emit('update:show', val)
    }
  }
}
