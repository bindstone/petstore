import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/iron-ajax';
import './shared-styles.js';
import '@material/mwc-chips';

class PsPetList extends PolymerElement {

    constructor() {
        super();
        this._lastSelected = undefined;
        this._petListBaseUrl = 'http://petstore.swagger.io/v2/pet/findByStatus?status=';
        this._petListUrl = ''
    }

    static get template() {
        return html`
      <style include="shared-styles">
        .container-status {
           max-height: 52px; 
           overflow: auto;
        }
        .status {
           margin: 1px;
        }
        .selected-pet {
           color: #fff;
           background: var(--app-primary-color); 
        }
      </style>

      <iron-ajax id="ajaxPetList"
        url="[[_petListUrl]]"
        auto method="get" handle-as="json"
        on-response="_prePetList"
        last-response="{{petList}}">    
      </iron-ajax> 
      <div class="card container-status">
      
      <iron-list items="[[petList]]" as="item" selected-items="{{pet}}" selection-enabled>
        <template>
          <div tabindex$="[[tabIndex]]" class$="[[_styleSelectedPet(selected)]]">
            [[item.name]]
          </div>
        </template>
      </iron-list>
    `;
    }

    static get properties() {
        return {
            petList: {
                type: Array,
                value() {
                    return []
                }
            },
            pet: {
                type: Object,
                notify: true
            },
            status: {
                type: String,
                observer: '_statusChanged'
            }
        };
    }

    _selectPet(event) {
        console.log(event);
        //if(this._lastSelected != null) {
        //    this._lastSelected.parentModel.classList.remove('selected-pet');
        //}
        //event.model.parentModel.classList.add('selected-pet');
        //this._lastSelected = event.model;
        this.pet = event.model.item;
    }

    _styleSelectedPet(selected) {
        if (selected) {
            return 'selected-pet'
        }
        return '';
    }

    _prePetList() {
        if (this.petList == null) {
            this.petList = [];
        }
        this.petList.sort((a, b) => {
            let aa = a != null && a.name != null ? a.name.toUpperCase() : null;
            let bb = b != null && b.name != null ? b.name.toUpperCase() : null;
            return (aa < bb ? -1 : (aa > bb ? 1 : 0));
        });
    }

    _statusChanged(newValue, oldValue) {
        this.status = newValue;
        this._petListUrl = this._petListBaseUrl + this.status.status;
        this.$.ajaxPetList.generateRequest();
    }

    ready() {
        super.ready();
    }
}

window.customElements.define('ps-pet-list', PsPetList);
