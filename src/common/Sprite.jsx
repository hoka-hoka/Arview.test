import React, { Component } from 'react';

const { body } = document;
const sprite = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style="display: none"
  >
    <symbol id="basket" viewBox="0 0 512 512" width="512" height="512">
      <path d="M156.679,185.072,171.2,410.852a6,6,0,0,0,5.982,5.614c.129,0,.26,0,.391-.012a6,6,0,0,0,5.6-6.373L168.654,184.3a6,6,0,1,0-11.975.771Z"/><path d="M334.426,416.454c.131.008.261.012.391.012a6,6,0,0,0,5.982-5.614l14.522-225.78a6,6,0,0,0-11.975-.771l-14.523,225.78A6,6,0,0,0,334.426,416.454Z"/><path d="M256,416.466a6,6,0,0,0,6-6V184.687a6,6,0,0,0-12,0V410.466A6,6,0,0,0,256,416.466Z"/><path d="M128.5,165.724c.113,0,.227,0,.341-.01a6,6,0,0,0,5.655-6.326l-.274-4.892a6,6,0,0,0-11.982.671l.275,4.893A6,6,0,0,0,128.5,165.724Z"/><path d="M135.752,181.735a6,6,0,1,0-11.981.672l4.431,79.032a6,6,0,0,0,5.985,5.664c.113,0,.227,0,.341-.009a6,6,0,0,0,5.655-6.327Z"/><path d="M94.043,136h.568L118.4,457.443A26.62,26.62,0,0,0,144.835,482H365a26.638,26.638,0,0,0,26.434-24.465L416.344,136h1.613a28.518,28.518,0,0,0,28.369-29.532C445.776,91.033,432.674,79,417.229,79H318V51.385A21.384,21.384,0,0,0,296.615,30H215.092A21.092,21.092,0,0,0,194,51.092V79H94.771c-15.445,0-28.547,12.033-29.1,27.468A28.518,28.518,0,0,0,94.043,136ZM206,51.385A9.149,9.149,0,0,1,215.092,42h81.816A9.149,9.149,0,0,1,306,51.385V79H206ZM94.043,91H417.4c9.138,0,17,7.473,16.942,16.61A16.5,16.5,0,0,1,417.957,124H194a6,6,0,0,0,0,12H404.309L379.47,456.608A14.582,14.582,0,0,1,365,470H144.835a14.571,14.571,0,0,1-14.473-13.442L106.644,136H152a6,6,0,0,0,0-12H94.6c-9.139,0-17-7.473-16.943-16.611A16.5,16.5,0,0,1,94.043,91Z"/>
    </symbol>

    <symbol id="pencil" viewBox="0 0 512 512" width="512" height="512">
      <path d="m500.076 61.086-9.921-9.92c-2.928-2.929-7.677-2.928-10.605 0-2.929 2.929-2.928 7.677 0 10.605l9.921 9.92c10.063 10.063 10.063 26.436 0 36.499l-13.673 13.673-85.633-85.633 13.673-13.673c10.063-10.063 26.436-10.063 36.499 0l14.515 14.515c2.928 2.928 7.677 2.928 10.605 0 2.929-2.928 2.929-7.677 0-10.605l-14.515-14.515c-7.707-7.707-17.954-11.952-28.855-11.952-10.9 0-21.148 4.245-28.855 11.952l-300.549 300.549c-2.929 2.928-2.929 7.677 0 10.605 2.928 2.928 7.677 2.928 10.605 0l243.22-243.22 37.514 37.514-308.452 308.448-24.506-11.011c-.887-.398-1.594-1.106-1.992-1.991l-11.013-24.508 40.611-40.611c2.929-2.928 2.929-7.677 0-10.605-2.928-2.928-7.677-2.928-10.605 0 0 0-44.345 44.363-44.388 44.408-1.935 2.03-2.156 4.862-2.663 7.511-.42 2.192-20.644 107.721-20.783 108.447-.764 3.986.493 8.079 3.363 10.95 2.317 2.317 5.431 3.583 8.643 3.583.766 0 1.539-.072 2.307-.22 0 0 112.164-21.496 112.221-21.508 1.271-.257 2.701-.967 3.685-1.885.063-.059 369.629-369.611 369.629-369.611 15.908-15.911 15.908-41.8-.003-57.711zm-479.135 408.014.402-2.098 23.684 23.684-.111.021-29.189 5.594zm41.886 18.175-38.073-38.073 7.239-37.771 3.397 7.56c1.904 4.238 5.286 7.62 9.525 9.526l26.627 11.964 11.967 26.631c1.904 4.237 5.287 7.619 9.524 9.523l7.566 3.4zm60.865-13.305-24.51-11.015c-.886-.398-1.594-1.106-1.992-1.992l-11.014-24.511 308.453-308.447 37.514 37.514zm319.055-319.055-85.633-85.633 22.446-22.446 85.633 85.633z"/>
    </symbol>

    <symbol id="field" viewBox="0 0 302 60" width="302" height="60">
      <path stroke-width="2" stroke="#18102b" fill="#fff" d="m1.74527,1.02649s65.477,2.936 116.593,1.849s168.068,-1.849 182.469,-1.849c0.978,0 -2,11.4 -1.666,24.734c0.385,15.335 1.889,29.684 1.666,30.979c-12.884,-3.482 -85.319,-1.161 -96.481,0s-141.038,-1.536 -146.7,-1.942s-55.881,1.942 -55.881,1.942a145.754,145.754 0 0 0 0,-29.017a119.907,119.907 0 0 1 0,-26.696z" id="Path_4821"/>
    </symbol>

</svg>`;

export default class Sprite extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    body.insertAdjacentHTML('beforeend', sprite);
  }

  render() {
    return <></>;
  }
}
