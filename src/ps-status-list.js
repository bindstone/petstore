import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-ajax';
import './shared-styles.js';
import '@material/mwc-chips';

class PsStatusList extends PolymerElement {

    constructor() {
        super();
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
      </style>

      <iron-ajax id="ajaxStatusList"
        url="http://petstore.swagger.io/v2/store/inventory"
        auto method="get" handle-as="json"
        on-response="_preStatusList"
        last-response="{{statusObject}}">    
      </iron-ajax> 
      <div class="card container-status">
          <mwc-chip-set>
            <template is="dom-repeat" items="{{statusList}}">
              <mwc-chip label="[[item.status]] ([[item.count]])" on-click="_selectStatus" class="status">
              </mwc-chip>
            </template>
          </mwc-chip-set>
      </div>
    `;
    }

    static get properties() {
        return {
            statusObject: {
                type: Object
            },
            statusList: {
                type: Array,
                value() {
                    return []
                }
            },
            status: {
                type: Object,
                notify: true
            }
        };
    }

    _selectStatus(event) {
        this.status = event.model.item;
        this.dispatchEvent(new CustomEvent('chag', {detail: {model: event.model.item}}));
    }

    _preStatusList() {
        let keys = Object.keys(this.statusObject);
        this.statusList = [];
        keys.forEach(value => {
            this.statusList.push({status: value, count: this.statusObject[value]});
        });
        this.statusList.sort((a, b) => {
            let aa = a != null && a.status != null ? a.status.toUpperCase() : null;
            let bb = b != null && b.status != null ? b.status.toUpperCase() : null;
            return (aa < bb ? -1 : (aa > bb ? 1 : 0));
        });
    }

    ready() {
        super.ready();
        //this.$.ajaxStatusList.generateRequest();
    }
}

window.customElements.define('ps-status-list', PsStatusList);
