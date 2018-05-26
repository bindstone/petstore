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
        this._petListUrl = '';
        this._cls = '';
    }

    static get template() {
        return html`
      <style include="shared-styles">
      </style> 
        <iron-ajax id="ajaxPetDelete">    
      </iron-ajax>     
      <span class$="[[_cls]]">
        <paper-icon-button icon="delete" 
            disabled="[[disabled]]" 
            on-click="_deletePet">
        </paper-icon-button>
      </span>
    `;
    }

    static get properties() {
        return {
            pet: {
                type: Object,
                notify: true,
                observer: '_petChanged'
            },
            disabled: {
                type: Boolean,
                value: false,
                notify: true
            }
        };
    }

    _deletePet() {
        this.disabled = true;
        this._cls = 'ps-not-allow';
        this.dispatchEvent(new CustomEvent('delete', {}));
    }

    _petChanged(newValue, oldValue) {
        this.disabled = false;
        this._cls = '';
    }

    ready() {
        super.ready();
    }
}

window.customElements.define('ps-pet-delete', PsPetDelete);
