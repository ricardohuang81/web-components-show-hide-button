class ShowHideButton extends HTMLElement {
  constructor() {
    super();
    this._isVisible = false;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        #info-box {
          display: none;
        }
      </style>
      <button>Show</button>
      <p id="info-box">
        <slot></slot>
      </p>
    `;
    this._toggleButton = this.shadowRoot.querySelector('button');
    this._infoMessage = this.shadowRoot.querySelector('#info-box');
    this._toggleButton.addEventListener('click', this._toggleInfoMessage.bind(this))
  }

  _toggleInfoMessage() {
    this._isVisible = !this._isVisible;
    this._infoMessage.style.display = this._isVisible ? 'block' : 'none';
    this._toggleButton.textContent = this._isVisible ? 'Hide' : 'Show';
  }

  connectedCallback() {
    if (this.hasAttribute('is-visible')) {
      if (this.getAttribute('is-visible') === 'true') {
        this._isVisible = true;
        this._infoMessage.style.display = 'block';
        this._toggleButton.textContent = 'Hide';
      }
    }
  }
}

customElements.define('rh-show-hide-button', ShowHideButton);