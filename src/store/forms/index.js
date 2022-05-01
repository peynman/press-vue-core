export default {
    namespaced: true,

    stat: {
    },

    actions: {
        submitSignedForm (context, { formId, formName, data, tags }) {
            return context.dispatch('apiCall', {
                method: 'POST',
                url: `/api/form-entries/fill`,
                body: {
                    formId,
                    formName,
                    data,
                    tags,
                },
            }, { root: true })
        },

        submitUnsignedForm (context, { formId, formName, data, tags }) {
            return context.dispatch('methodCall', {
                method: 'POST',
                url: `/api/form-entries/fill`,
                body: {
                    formId,
                    formName,
                    data,
                    tags,
                },
            }, { root: true })
        }
    }
}