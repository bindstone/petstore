import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-ajax';
import './shared-styles.js';
import '@material/mwc-chips';

class PsPetList extends PolymerElement {

    constructor() {
        super();
        this._petListBaseUrl = 'http://petstore.swagger.io/v2/pet/findByStatus?status=';
        this._petListUrl = ''
    }

    static get template() {
        return html`
      <style include="shared-styles">
      </style>

      <iron-ajax id="ajaxPetList"
        url="[[_petListUrl]]"
        auto method="get" handle-as="json"
        on-response="_prePetList"
        last-response="{{petList}}">    
      </iron-ajax> 
      <div class="card container-status">
        <template is="dom-repeat" items="{{petList}}">
        <div class$="[[_styleSelectedPet(item)]]" on-click="_selectPet">
            <span>[[item.name]]</span>
        </div>
        </template>
      </div>
    `;
    }

    static get properties() {
        return {
            pet: {
                type: Object,
                notify: true
            }
        };
    }


    ready() {
        super.ready();
    }
}

window.customElements.define('ps-pet-list', PsPetList);
