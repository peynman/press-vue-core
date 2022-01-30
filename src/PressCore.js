export default class PressCore {
    constructor(options = {}) {
        this.options = options
    }

    /**
     * Install PressCore Vue extensions
     * 
     * @param {Vue} Vue
     */
    install(Vue) {
        
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
     * Get array of extra types for widget renderer
     * @param {VueComponent} $component
     * @returns {Array}
     */
    getRendererComponentsList($component) {
        return this.options?.schemaTypesArray?.($component) ?? {}
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
        return this.options?.importAsyncComponentCallback?.(name)
    }
}