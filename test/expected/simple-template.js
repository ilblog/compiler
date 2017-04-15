riot.define('simple-template', {
  render(h) {
    return h`
  <p>${ this.message }</p>
    `
  }
})