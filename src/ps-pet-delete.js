import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-ajax';
import '@polymer/paper-icon-button';
import '@polymer/iron-icons/iron-icons';
import './shared-styles.js';

class PsPetDelete extends PolymerElement {

    constructor() {
        super();
        this._petListBaseUrl = 'http://petstore.swagger.io/v2/pet/findByStatus?status=';
        this._petListUrl = ''
    }

    static get template() {
        return html`
      <style include="shared-styles">
      </style>     
      <span class$="[[_getDisabledClass()]]">
        <paper-icon-button icon="delete" disabled="[[disabled]]"></paper-icon-button>
      </span>
    `;
    }

    static get properties() {
        return {
            pet: {
                type: Object,
                notify: true
            },
            disabled: {
                type: Boolean,
                value: false,
                notify: true
            }
        };
    }

    _getDisabledClass() {
        return this.disabled ? 'ps-not-allow' : '';
    }

    ready() {
        super.ready();
    }
}

window.customElements.define('ps-pet-delete', PsPetDelete);
