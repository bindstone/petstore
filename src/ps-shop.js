import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import './ps-status-list'
import './ps-pet-list'

class PsShop extends PolymerElement {

    static get template() {
        return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <ps-status-list status="{{status}}"></ps-status-list>
      </div>
      
      <div class="card">
        <ps-pet-list status="{{status}}"></ps-pet-list>
      </div>
    `;
    }

    static get properties() {
        return {
            status: {
                type: Object
            }
        };
    }
}

window.customElements.define('ps-shop', PsShop);
