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
        <ps-status-list chag="_changeStatus" status="{{status}}"></ps-status-list>
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

    _changeStatus(event) {
        console.log(event.model.item);
    }
}

window.customElements.define('ps-view1', PsShop);
