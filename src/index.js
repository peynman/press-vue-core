import Store from './store/index'

export default class PressCore {
    constructor(Vue, options = {}) {
        this.options = options
        if (this.options?.store) {
            this.registerStoreModules(this.options.store, this.options.excludeModules)
        }
        Vue.prototype.$press = this
    }

    /**
     *
     * @param {Store} store 
     * @param {array} exclude 
     */
    registerStoreModules(store, exclude = []) {
        Object.keys(Store).forEach(moduleName => {
            if (exclude.indexOf(moduleName) === -1) {
                store.registerModule((this.options.storePrefix ?? '') + moduleName, Store[moduleName])
            }
        })
    }

    /**
     * Load Crud Object from webpack by name
     * @param {string} crud
     * @returns {Promise}
     */
    loadCrudWithName(crud) {
        return this.options?.crudImportCallback?.(crud) ??
            Promise.reject(
                new Error('No Crud load callback is provided (options.crudImportCallback as crud => import Promise')
            )
    }

    /**
     * Get dictionary of extra types for widget renderer
     * @param {VueComponent} $component
     * @returns {Object}
     */
    getRendererDictionary($component) {
        return this.options?.schemaTypesDictionary?.($component) ?? {}
    }

    /**
     * Get dictionary of extra rules for widget renderer
     * @param {VueComponent} $component
     * @returns {Object}
     */
    getRendererRulesDictionary ($component) {
        return this.options?.schemaRulesDictionary?.($component) ?? {}
    }

    /**
     * Get array of extra types for widget renderer
     * @param {VueComponent} $component
     * @returns {Array}
     */
    getBuilderComponentsDictionary($component) {
        return this.options?.builderTypesDictionary?.($component) ?? {}
    }

    /**
     * Get list of available cart statuses
     * @param {VueComponent} $component
     * @returns {Array}
     */
    getAvailableCartStatuses($component) {
        return this.options?.cartStatusList?.($component) ?? []
    }

    /**
     * 
     * @param {VueComponent} $component
     * @returns {Array}
     */
    getAvailableChatRoomTypes($component) {
        return this.options?.chatRoomTypeList?.($component) ?? []
    }

    /**
     * Get List of all available delivery agents
     * @param {VueComponent} $component
     * @returns {Array}
     */
    getAvailableDeliveryAgents($component) {
        return this.options?.deliveryAgentList?.($component) ?? []
    }

    /**
     * Import async component with name
     * @param {string} name
     * @returns {VueComponent}
     */
    importAsyncComponent(name) {
        return this.options?.importAsyncComponentCallback?.(name) ??
            Promise.reject(
                new Error('No async component load callback is provided (options.importAsyncComponentCallback as name => import Promise')
            )
    }
}