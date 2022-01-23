import PaasCore from './PaasCore'

// Declare install function executed by Vue.use()
export function install(Vue, options) {
	if (install.installed) return;
	install.installed = true;
	const paas = new PaasCore(options);
	paas.install(Vue)
	Vue.prototype.$paas = paas
}

// Create module definition for Vue.use()
const plugin = {
	install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}